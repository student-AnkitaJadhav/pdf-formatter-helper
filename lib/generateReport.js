const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

/**
 * Generates a styled employee report PDF
 * @param {Object} data - Employee data for the report
 * @param {string} outputPath - File path to save the PDF (e.g., "./report.pdf")
 */
function generateReport(data, outputPath) {
  if (!outputPath || typeof outputPath !== "string") {
    throw new Error("A valid outputPath string is required.");
  }

  const doc = new PDFDocument({ margin: 50 });

  const writeStream = fs.createWriteStream(path.resolve(outputPath));
  doc.pipe(writeStream);

  // 🔵 Header Section
  doc
    .rect(0, 0, doc.page.width, 60)
    .fill("#007ACC")
    .fillColor("white")
    .fontSize(24)
    .text("Employee Report", 50, 20);

  doc.moveDown(2).fillColor("black").font("Helvetica");

  // 🔹 Employee Info
  doc
    .fontSize(14)
    .text("Name: ", { continued: true })
    .font("Helvetica-Bold")
    .text(data.name || "N/A")
    .font("Helvetica")
    .text(`Department: ${data.department || "N/A"}`)
    .text(`Date: ${new Date().toLocaleDateString()}`)
    .moveDown();

  // 📊 Attendance Summary
  doc
    .fontSize(16)
    .fillColor("#333")
    .text("Attendance Summary", { underline: true })
    .moveDown(0.5)
    .fontSize(12)
    .list([
      `Total Days: ${data.attendance?.totalDays ?? "N/A"}`,
      `Present: ${data.attendance?.present ?? "N/A"}`,
      `Absent: ${data.attendance?.absent ?? "N/A"}`,
      `Half Days: ${data.attendance?.halfDays ?? "N/A"}`,
    ])
    .moveDown();

  // 📝 Leave Summary
  doc
    .fontSize(16)
    .text("Leave Summary", { underline: true })
    .moveDown(0.5)
    .fontSize(12)
    .list([
      `Total Leaves: ${data.leave?.total ?? "N/A"}`,
      `Approved: ${data.leave?.approved ?? "N/A"}`,
      `Rejected: ${data.leave?.rejected ?? "N/A"}`,
    ])
    .moveDown();

  doc.end();

  // Optional: log when done writing
  writeStream.on("finish", () => {
    console.log("✅ PDF created at", outputPath);
  });
}

module.exports = generateReport;
