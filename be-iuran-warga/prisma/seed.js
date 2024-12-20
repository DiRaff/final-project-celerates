const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const username = "admin";
  const email = "admin@example.com";
  const passwordHash = await bcrypt.hash("admin123", 10);

  // Check if admin with the same username or email already exists
  const existingAdmin = await prisma.admin.findUnique({
    where: { username },
  });

  if (!existingAdmin) {
    // Seed Admin if it doesn't exist
    await prisma.admin.create({
      data: {
        username,
        email,
        password: passwordHash,
        nama: "Administrator",
        tanggal_lahir: new Date("1980-01-01"),
        jenis_kelamin: "Laki-laki",
        role: "admin",
        alamat: "Main Street",
      },
    });
    console.log("Admin user created successfully!");
  } else {
    console.log("Admin user already exists, skipping seeding.");
  }
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
