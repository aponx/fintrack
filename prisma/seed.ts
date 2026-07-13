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

  // Buat user customer jika belum ada
  const customerUser = await prisma.user.upsert({
    where: { username: 'customer' },
    update: {},
    create: {
      username: 'customer',
      email: 'customer@fintrack.com',
      name: 'Customer User',
      password: userPassword,
      role: 'USER',
      isActive: true,
    },
  });

  console.log('Customer user created/updated:', {
    id: customerUser.id,
    username: customerUser.username,
    email: customerUser.email,
    role: customerUser.role,
  });

  console.log('\n===========================================');
  console.log('LOGIN CREDENTIALS:');
  console.log('===========================================');
  console.log('ADMIN:');
  console.log('  Username: admin');
  console.log('  Password: admin123');
  console.log('  Role: ADMIN');
  console.log('  Can access: /admin/* pages');
  console.log('-------------------------------------------');
  console.log('CUSTOMER:');
  console.log('  Username: customer');
  console.log('  Password: user123');
  console.log('  Role: USER');
  console.log('  Can access: /wallets, /budgets pages');
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
