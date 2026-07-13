import { PrismaClient } from '@prisma/client';
import { hash } from '@node-rs/argon2';

const prisma = new PrismaClient();

async function main() {
  // Hash password untuk admin dan user
  const adminPassword = await hash('admin123', {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  const userPassword = await hash('user123', {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  // Buat user admin jika belum ada
  const adminUser = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      username: 'admin',
      email: 'admin@fintrack.com',
      name: 'Administrator',
      password: adminPassword,
      role: 'ADMIN',
      isActive: true,
    },
  });

  console.log('Admin user created/updated:', {
    id: adminUser.id,
    username: adminUser.username,
    email: adminUser.email,
    role: adminUser.role,
  });

  console.log('\n===========================================');
  console.log('LOGIN CREDENTIALS:');
  console.log('===========================================');
  console.log('ADMIN:');
  console.log('  Username: admin');
  console.log('  Password: admin123');
  console.log('  Role: ADMIN');
  console.log('  Can access: /admin/* pages');
  console.log('===========================================\n');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
