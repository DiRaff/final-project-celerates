const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const feesPageRoutes = require("../routes/feesPage");
const categoryRoutes = require("../routes/categories");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require("cors");
app.use(cors());
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Template Engine (EJS Example)
app.set("view engine", "ejs");
app.set("views", "./views");

// Routes
app.use("/fees", feesPageRoutes);



// Middleware
app.use(express.json());
app.use(morgan("dev"));

const authRoutes = require("../routes/auth");
const feeRoutes = require("../routes/fees");



app.use("/api/auth", authRoutes); // Login Route
app.use("/api/fees", feeRoutes);  // Fee Route (Protected)
app.use("/api/categories", categoryRoutes);
// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
