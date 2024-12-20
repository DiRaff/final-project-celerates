const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { authenticateToken, authorizeAdmin } = require("../middleware/auth");

const prisma = new PrismaClient();
const router = express.Router();

// Create Fee
router.post("/", authenticateToken, authorizeAdmin, async (req, res, next) => {
  try {
    const { categories_id, pemilik_iuran, deskripsi, jenis_iuran, jumlah_iuran } = req.body;

    const newFee = await prisma.fee.create({
      data: {
        categories_id: parseInt(categories_id),
        pemilik_iuran,
        deskripsi,
        jenis_iuran,
        jumlah_iuran: parseFloat(jumlah_iuran),
      },
    });

    res.status(201).json(newFee);
  } catch (err) {
    next(err);
  }
});

// Read All Fees
router.get("/", authenticateToken, authorizeAdmin, async (req, res, next) => {
  try {
    const fees = await prisma.fee.findMany({
      include: {
        category: true, // Include category relationship
      },
    });
    res.status(200).json(fees);
  } catch (err) {
    next(err);
  }
});

// Update Fee
router.put("/:id", authenticateToken, authorizeAdmin, async (req, res, next) => {
  const { id } = req.params;
  const { categories_id, pemilik_iuran, deskripsi, jenis_iuran, jumlah_iuran } = req.body;

  try {
    const updatedFee = await prisma.fee.update({
      where: { fees_id: parseInt(id) },
      data: {
        categories_id: parseInt(categories_id),
        pemilik_iuran,
        deskripsi,
        jenis_iuran,
        jumlah_iuran: parseFloat(jumlah_iuran),
      },
    });

    res.status(200).json(updatedFee);
  } catch (err) {
    next(err);
  }
});

// Delete Fee
router.delete("/:id", authenticateToken, authorizeAdmin, async (req, res, next) => {
  const { id } = req.params;

  try {
    await prisma.fee.delete({
      where: { fees_id: parseInt(id) },
    });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
