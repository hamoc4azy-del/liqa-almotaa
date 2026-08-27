import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main(){
 const email=process.env.ADMIN_EMAIL!; const password=process.env.ADMIN_PASSWORD!;
 const passwordHash=await bcrypt.hash(password,12);
 await prisma.adminUser.upsert({where:{email},update:{passwordHash},create:{email,passwordHash}});
 console.log(`Admin ready: ${email}`);
}
main().finally(()=>prisma.$disconnect());
