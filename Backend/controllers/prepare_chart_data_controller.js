const asyncHandler = require("express-async-handler");
const SaleOrder = require("../Model/sale_order");

const prepareSalesDataCount = asyncHandler(async (req, res) => {
  const scale = req.query.scale;
  const now = new Date();
  if (scale === "date") {
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month, daysInMonth, 23, 59, 59, 999);
    const result = await SaleOrder.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const filledData = [];
    const resultMap = new Map(result.map((item) => [item._id, item.count]));
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${yyyy}-${mm}-${dd}`;

      filledData.push({
        date: formattedDate,
        count: resultMap.get(formattedDate) || 0,
      });
    }
    return res.json(filledData);
  } else if (scale === "month") {
    const fullYear = now.getFullYear();
    const startOfYear = new Date(fullYear, 0, 1);
    const endOfYear = new Date(fullYear, 11, 31, 23, 23, 59, 59, 999);

    const result = await SaleOrder.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfYear,
            $lte: endOfYear,
          },
        },
      },
      {
        $group: {
          _id: {
            $month: "$createdAt", //here this month is 1 based index
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const resultMap = new Map(result.map((item) => [item._id, item.count]));
    const filledData = [];
    for (let month = 1; month <= 12; month++) {
      filledData.push({
        date: monthNames[month - 1],
        count: resultMap.get(month) || 0,
      });
    }
    return res.json(filledData);
  } else {
    const fullYear = now.getFullYear();
    const startYear = new Date(fullYear - 10, 0, 1);
    const endYear = new Date(fullYear, 11, 31, 23, 23, 59, 59, 999);

    const result = await SaleOrder.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startYear,
            $lte: endYear,
          },
        },
      },
      {
        $group: {
          _id: {
            $year: "$createdAt",
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const resultMap = new Map(result.map((r) => [r._id, r.count]));
    const filledData = [];
    for (let year = startYear.getFullYear(); year <= fullYear; year++) {
      filledData.push({
        date: year,
        count: resultMap.get(year) || 0,
      });
    }
    return res.json(filledData);
  }
});

const prepareSalesDataRevenue = asyncHandler(async (req, res) => {
  const scale = req.query.scale;
  const now = new Date();
  if (scale === "date") {
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month, daysInMonth, 23, 59, 59, 999);
    const result = await SaleOrder.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          totalAmount: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const filledData = [];
    const resultMap = new Map(
      result.map((item) => [item._id, item.totalAmount])
    );
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${yyyy}-${mm}-${dd}`;

      filledData.push({
        date: formattedDate,
        revenue: resultMap.get(formattedDate) || 0,
      });
    }
    return res.json(filledData);
  } else if (scale === "month") {
    const fullYear = now.getFullYear();
    const startOfYear = new Date(fullYear, 0, 1);
    const endOfYear = new Date(fullYear, 11, 31, 23, 23, 59, 59, 999);

    const result = await SaleOrder.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfYear,
            $lte: endOfYear,
          },
        },
      },
      {
        $group: {
          _id: {
            $month: "$createdAt", //here this month is 1 based index
          },
          totalAmount: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const resultMap = new Map(
      result.map((item) => [item._id, item.totalAmount])
    );
    const filledData = [];
    for (let month = 1; month <= 12; month++) {
      filledData.push({
        date: monthNames[month - 1],
        revenue: resultMap.get(month) || 0,
      });
    }
    return res.json(filledData);
  } else {
    const fullYear = now.getFullYear();
    const startYear = new Date(fullYear - 10, 0, 1);
    const endYear = new Date(fullYear, 11, 31, 23, 23, 59, 59, 999);

    const result = await SaleOrder.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startYear,
            $lte: endYear,
          },
        },
      },
      {
        $group: {
          _id: {
            $year: "$createdAt",
          },
          totalAmount: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const resultMap = new Map(result.map((r) => [r._id, r.totalAmount]));
    const filledData = [];
    for (let year = startYear.getFullYear(); year <= fullYear; year++) {
      filledData.push({
        date: year,
        revenue: resultMap.get(year) || 0,
      });
    }
    return res.json(filledData);
  }
});

const prepareGenresWiseSalesCount = asyncHandler(async (req, res) => {
  /* unwind will Flatten each product line from the array.
  Before: {
  _id: "order123",
  productwithquantity: [
    { product_id: "book1", quantity: 2 },
    { product_id: "book2", quantity: 1 }
  ]
}
  After:
  { _id: "order123", productwithquantity: { product_id: "book1", quantity: 2 } }
  { _id: "order123", productwithquantity: { product_id: "book2", quantity: 1 } }

  then we use the $lookup it's purpose is Join data from another collection into your current query or aggregation pipeline.
  so here we do lookup for books so that we can access the genres from that 
  $lookup parameteres.
  from: The collection to join (like a foreign table)
  localField: The field from the current document
  foreignField: The field from the target document to match
  as: The name of the new array field that will hold the joined data

  After lookup we again unwind the book because lookup will return array of object and we need flatten object
  after that we unwind the book.genres_ids to access each genres_ids seprately
  After that we again made lookup for the genres collection so that we can get the genres collection.
  After that we again unwind genres data after lookup to flatten them in to object so taht we can acceess its properties.
  Then we group based on the _id and count.
  Then we use the $project to transform the data in desired format.

  */
  const { scale } = req.query;
  const result = await SaleOrder.aggregate([
    { $unwind: "$productwithquantity" },
    {
      $lookup: {
        from: "books",
        localField: "productwithquantity.product_id",
        foreignField: "_id",
        as: "book",
      },
    },
    { $unwind: "$book" },
    { $unwind: "$book.genres_ids" },
    {
      $lookup: {
        from: "genres",
        localField: "book.genres_ids",
        foreignField: "_id",
        as: "genre",
      },
    },
    { $unwind: "$genre" },
    {
      $group: {
        _id: "$genre.name",
        data:
          scale === "revenue" //if scale is revenue we need the total amount  else we need the count
            ? {
                $sum: {
                  $multiply: ["$book.price", "$productwithquantity.quantity"],
                },
              }
            : { $sum: "$productwithquantity.quantity" },
      },
    },
    {
      $project: {
        _id: 0,
        genre: "$_id",
        data: 1,
      },
    },
    { $sort: { count: -1 } },
  ]);

  res.send(result);
});

module.exports = {
  prepareSalesDataCount,
  prepareSalesDataRevenue,
  prepareGenresWiseSalesCount,
};
