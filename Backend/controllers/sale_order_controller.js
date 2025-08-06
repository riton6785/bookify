const asyncHandler = require("express-async-handler");
const SaleOrder = require("../Model/sale_order");
const Book = require("../Model/bookModel");
const { generateInvoiceBuffer } = require("../utils/generate_invoicebuffer");
const { uploadBufferToCloudinary } = require("../utils/upload_buffer_to_cloudinary");
const mailSender = require("../utils/mail_sender");
const User = require("../Model/usermodel");

const createSaleOrder = asyncHandler((async(productAndQuantities, totalAmount, userId)=> {
    const saleOrder = await SaleOrder.create({
        userId,
        productwithquantity: productAndQuantities,
        totalAmount,
    })
    invoiceData = await prepareInvoiceDataAndUpdateInventory(saleOrder, productAndQuantities, totalAmount, userId);

    const filename = `invoice-${invoiceData._id}`;

    // 1. Generate PDF as buffer
    const pdfBuffer = await generateInvoiceBuffer(invoiceData);

    // 2. Upload buffer to Cloudinary
    const pdfUrl = await uploadBufferToCloudinary(pdfBuffer, filename);

    // 3. Respond with URL
    const updatedOrder = await SaleOrder.findByIdAndUpdate(
        saleOrder._id,
        { invoice: pdfUrl },
        { new: true }
    );
    const email = await User.findById(updatedOrder.userId)
    sendInvoiceViaEmail(email.email, updatedOrder);
}))

const sendInvoiceViaEmail = (async(email, updatedOrder) => {
    console.log(email, "emailllllllllllllllllllll")
    try {
        const mailResponse = await mailSender(
        email,
        "Invoice Email",
        `<h1>Your invoice for orderId ${updatedOrder._id, updatedOrder.invoice}</h1>`
        );
        console.log("Email sent successfully: ", mailResponse);
    } catch (error) {
        console.log("Error occurred while sending email: ", error);
        throw error;
    }
})

const prepareInvoiceDataAndUpdateInventory = asyncHandler((async(saleOrder, productAndQuantities, totalAmount, userId)=> {
      const enrichedProducts = [];

  for (const product of productAndQuantities) {
    // Decrease stock
    const book = await Book.findByIdAndUpdate(
      product.product_id,
      { $inc: { stock: -product.quantity } },
      { new: true, runValidators: true }
    );

    // Enrich product with name and price
    const unitPrice = book.price;
    const productName = book.name;
    const quantity = product.quantity;
    const totalPrice = unitPrice * quantity;

    enrichedProducts.push({
      productName,
      quantity,
      unitPrice,
      totalPrice,
    });
  }

  // 3. Prepare invoice data for HTML rendering
  const invoiceData = {
    _id: saleOrder._id.toString(),
    userId: userId.toString(),
    createdAt: new Date(saleOrder.createdAt).toLocaleDateString(),
    totalAmount,
    productWithQuantity: enrichedProducts,
  };

  return invoiceData; // You will pass this to Handlebars
}))

module.exports = {createSaleOrder};
