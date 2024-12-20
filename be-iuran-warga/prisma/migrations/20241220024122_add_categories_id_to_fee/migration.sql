-- DropForeignKey
ALTER TABLE "Fee" DROP CONSTRAINT "Fee_categories_id_fkey";

-- AddForeignKey
ALTER TABLE "Fee" ADD CONSTRAINT "Fee_categories_id_fkey" FOREIGN KEY ("categories_id") REFERENCES "Category"("categories_id") ON DELETE CASCADE ON UPDATE CASCADE;
