export const config = {
  port: parseInt(process.env.PORT || "3000", 10),
  dbUrl: process.env.DB_URL || "",
};
