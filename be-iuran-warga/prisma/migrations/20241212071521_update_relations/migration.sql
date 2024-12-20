-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_verified_at" TIMESTAMP(3),
    "password" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "tanggal_lahir" TIMESTAMP(3) NOT NULL,
    "jenis_kelamin" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_verified_at" TIMESTAMP(3),
    "password" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "tanggal_lahir" TIMESTAMP(3) NOT NULL,
    "jenis_kelamin" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Category" (
    "categories_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "namaCategories" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("categories_id")
);

-- CreateTable
CREATE TABLE "Fee" (
    "fees_id" SERIAL NOT NULL,
    "categories_id" INTEGER NOT NULL,
    "pemilik_iuran" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "jenis_iuran" TEXT NOT NULL,
    "jumlah_iuran" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fee_pkey" PRIMARY KEY ("fees_id")
);

-- CreateTable
CREATE TABLE "Finance" (
    "finances_id" SERIAL NOT NULL,
    "categories_id" INTEGER NOT NULL,
    "nama_penyetor" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "jumlah_setoran" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Finance_pkey" PRIMARY KEY ("finances_id")
);

-- CreateTable
CREATE TABLE "Officer" (
    "officers_id" SERIAL NOT NULL,
    "categories_id" INTEGER NOT NULL,
    "nama_petugas" TEXT NOT NULL,
    "status_petugas" TEXT NOT NULL,
    "jenis_kelamin" TEXT NOT NULL,
    "nomor_ktp" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "pangkat" TEXT NOT NULL,
    "nomor_hp" TEXT NOT NULL,
    "tempat_tugas" TEXT NOT NULL,
    "detail_tugas" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Officer_pkey" PRIMARY KEY ("officers_id")
);

-- CreateTable
CREATE TABLE "Residence" (
    "residences_id" SERIAL NOT NULL,
    "categories_id" INTEGER NOT NULL,
    "nama_penghuni" TEXT NOT NULL,
    "status_penghuni" TEXT NOT NULL,
    "nomor_ktp" TEXT NOT NULL,
    "nomor_hp" TEXT NOT NULL,
    "nomor_blok" TEXT NOT NULL,
    "nomor_rumah" TEXT NOT NULL,
    "rw" TEXT NOT NULL,
    "rt" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Residence_pkey" PRIMARY KEY ("residences_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_admin_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fee" ADD CONSTRAINT "Fee_categories_id_fkey" FOREIGN KEY ("categories_id") REFERENCES "Category"("categories_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Finance" ADD CONSTRAINT "Finance_categories_id_fkey" FOREIGN KEY ("categories_id") REFERENCES "Category"("categories_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Officer" ADD CONSTRAINT "Officer_categories_id_fkey" FOREIGN KEY ("categories_id") REFERENCES "Category"("categories_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Residence" ADD CONSTRAINT "Residence_categories_id_fkey" FOREIGN KEY ("categories_id") REFERENCES "Category"("categories_id") ON DELETE RESTRICT ON UPDATE CASCADE;
