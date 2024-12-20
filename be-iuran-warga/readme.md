install module
NPM install

Setting env:
DATABASE_URL=  "postgresql://{USER}:{PASSWORD}@localhost:5432/iuran_warga"
JWT_SECRET=your_jwt_secret
PORT=8000

Migration DB
npx prisma migrate dev --name iuran_warga

Seeding Admin
node prisma/seed.js   

Run project
npm run dev


(Optional)
Run WebUI Prisma
npx prisma studio
