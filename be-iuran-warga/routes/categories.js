const express = require("express");
const { PrismaClient } = require("@prisma/client");

const { authenticateToken, authorizeAdmin } = require("../middleware/auth");
const prisma = new PrismaClient();
const router = express.Router();


// Get All Categories
router.get("/", authenticateToken, authorizeAdmin, async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        admin: true, // Include admin details (optional)
        user: true,  // Include user details (optional)
      },
    });
    res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    next(err);
  }
});


// Create Category

router.post("/", authenticateToken, authorizeAdmin, async (req, res, next) => {
  try {
    const { namaCategories, userId } = req.body;

    // Pastikan kategori memiliki nama
    if (!namaCategories) {
      return res.status(400).json({ error: "Category name is required" });
    }

    // Pastikan adminId tersedia dan role adalah "admin"
    const adminId = req.user.id;
    if (!adminId) {
      return res.status(403).json({ error: "Admin information is missing" });
    }

    // Pastikan userId yang diberikan ada dan dalam format angka (integer)
    if (!userId || isNaN(userId)) {
      return res.status(400).json({ error: "Valid User ID is required" });
    }

    // Convert userId to integer
    const userIdInt = parseInt(userId);

    // Periksa apakah user dengan userId yang diberikan ada
    const user = await prisma.user.findUnique({
      where: {
        user_id: userIdInt, // Ganti dengan user_id yang valid jika menggunakan ID selain default
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Buat kategori baru dan hubungkan dengan admin dan user
    const newCategory = await prisma.category.create({
      data: {
        namaCategories,
        admin: {
          connect: { id: adminId }, // Menghubungkan kategori dengan admin yang login
        },
        user: {
          connect: { user_id: userIdInt }, // Menghubungkan kategori dengan user yang ada
        },
      },
    });

    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    next(err);
  }
});


module.exports = router;
