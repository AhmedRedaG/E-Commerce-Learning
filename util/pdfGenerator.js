import PDFDocument from "pdfkit";
import { createWriteStream } from "fs";

export function generateInvoicePDF(order, outputPath) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const stream = createWriteStream(outputPath);

    doc.pipe(stream);

    // Title
    doc.fontSize(24).text("E-Shop Invoice", { align: "center" });
    doc.moveDown();

    // Order details
    doc.fontSize(12).text(`Order ID: ${order._id}`);
    doc.text(`User ID: ${order.userId}`);
    doc.moveDown();

    // Table headers
    const tableTop = doc.y + 20;
    const col1 = 50;
    const col2 = 250;
    const col3 = 330;
    const col4 = 420;

    doc.font("Helvetica-Bold");
    doc.text("Product", col1, tableTop);
    doc.text("Count", col2, tableTop);
    doc.text("Price", col3, tableTop);
    doc.text("Total", col4, tableTop);

    doc.moveDown();

    // Table rows
    doc.font("Helvetica");
    let positionY = tableTop + 25;

    order.products.forEach((product) => {
      const total = product.price * product.count;

      doc.text(product.title, col1, positionY);
      doc.text(product.count.toString(), col2, positionY);
      doc.text(`${product.price} EGP`, col3, positionY);
      doc.text(`${total} EGP`, col4, positionY);

      positionY += 25;
    });

    // Total Price
    doc
      .font("Helvetica-Bold")
      .text(`Total Price: ${order.totalPrice} EGP`, col1, positionY + 20);

    doc.fontSize(10).text("Thank you for your order!", 50, 720, {
      align: "center",
      width: 500,
    });

    doc.end();

    stream.on("finish", resolve);
    stream.on("error", reject);
  });
}
