const puppeteer = require('puppeteer');
const handlebars = require('handlebars');
const fs = require('fs-extra');
const path = require('path');

const generateInvoiceBuffer = (async(data)=> {
    const templatePath = path.resolve('templates', 'invoice_templates.html');
  const html = await fs.readFile(templatePath, 'utf8');
  const template = handlebars.compile(html);
  const finalHtml = template(data);

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'], // Important for deployment
  });
  const page = await browser.newPage();
  await page.setContent(finalHtml, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({ format: 'A4' });
  await browser.close();

  return pdfBuffer;
})

module.exports = {generateInvoiceBuffer}