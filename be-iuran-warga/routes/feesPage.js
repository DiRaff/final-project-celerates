const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
  const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczNDAwODMzOCwiZXhwIjoxNzM0MDExOTM4fQ.-9L4nqZrLxT_AAwbCLrwXQ3rmjLFpLJbAQaaeEeX8QY"; // Ganti dengan token yang valid
  try {
    const response = await axios.get("http://localhost:8000/api/fees", {
      headers: { Authorization: token },
    });
    const fees = response.data;
    res.render("feesPage", { fees });
  } catch (error) {
    console.error("Error Details:", error.response?.data || error.message);
    res.status(500).send("Failed to fetch fees");
  }
});


module.exports = router;
