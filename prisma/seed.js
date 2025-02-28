import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10); 

  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL }, 
    update: {},
    create: {
        name: "Admin",
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        image:'https://res.cloudinary.com/dbbvilfd4/image/upload/v1736497747/logo_sxlrmx.png'
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });