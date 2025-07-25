const generateReport = require("../lib/generateReport");

const reportData = {
  name: "John Doe",
  department: "Engineering",
  attendance: {
    totalDays: 30,
    present: 26,
    absent: 2,
    halfDays: 2,
  },
  leave: {
    total: 3,
    approved: 2,
    rejected: 1,
  },
};

generateReport(reportData, "example/attendance_report.pdf");
