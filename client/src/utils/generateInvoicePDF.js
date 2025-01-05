import { jsPDF } from "jspdf";

export const generateInvoicePDF = ({
  customerName,
  productName,
  price,
  quantity,
  totalAmount,
  category,
  date,
  _id
}) => {
  const doc = new jsPDF();

  // Set styles
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(12);

  // Header
  doc.setFontSize(16);
  doc.text("INVOICE", 105, 20, { align: "center" });

  // Company Info
  doc.setFontSize(10);
  doc.text("Demo Company Name", 10, 30);
  doc.text("123 Your Street, City, Country", 10, 35);
  doc.text("Phone: (123) 456-7890 | Email: support@democompany.com", 10, 40);

  // Invoice Details
  doc.text(`Invoice Date: ${date}`, 150, 30);
  doc.text(`Invoice No: INV-${_id}`, 150, 35);

  // Customer Details
  doc.setFontSize(12);
  doc.text("Bill To:", 10, 50);
  doc.setFontSize(10);
  doc.text(`Customer Name: ${customerName}`, 10, 55);

  // Product Details Table
  doc.setFontSize(12);
  doc.text("Product Details:", 10, 70);

  // Table Headers
  doc.setFontSize(10);
  doc.text("Product Name", 10, 80);
  doc.text("Category", 70, 80);
  doc.text("Price", 110, 80);
  doc.text("Quantity", 130, 80);
  doc.text("Total Amount", 160, 80);

  // Table Data
  doc.text(productName, 10, 90);
  doc.text(category, 70, 90);
  doc.text(`${price} INR`, 110, 90);
  doc.text(quantity.toString(), 130, 90);
  doc.text(`${totalAmount} INR`, 160, 90);

  // Footer
  doc.setFontSize(12);
  doc.text("Thank you for your business!", 105, 130, { align: "center" });

  // Save the PDF
  doc.save(`Invoice_${customerName}_${date}.pdf`);
};
