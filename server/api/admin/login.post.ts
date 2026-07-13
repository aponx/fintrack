import { z } from 'zod';
import { prisma } from '../../utils/db';
import { lucia } from '../../utils/auth';
import { verify } from '@node-rs/argon2';

const adminLoginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi')
});

export default defineEventHandler(async (event) => {
  if (event.method !== 'POST') {
    return createError({ statusCode: 405, message: 'Method not allowed' });
  }

  const body = await readBody(event);

  // Validasi input
  const validation = adminLoginSchema.safeParse(body);
  if (!validation.success) {
    return createError({
      statusCode: 400,
      message: validation.error.issues.map(e => e.message).join(', ')
    });
  }

  const { email, password } = validation.data;

  // Cari user berdasarkan email dan harus role ADMIN
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user || !user.password) {
    return createError({ statusCode: 401, message: 'Email atau password salah' });
  }

  // Cek apakah user adalah admin
  if (user.role !== 'ADMIN') {
    return createError({ statusCode: 403, message: 'Akses ditolak. Akun ini bukan admin.' });
  }

  // Verifikasi password
  const validPassword = await verify(user.password, password);
  if (!validPassword) {
    return createError({ statusCode: 401, message: 'Email atau password salah' });
  }

  // Buat session
  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  appendHeader(event, 'Set-Cookie', sessionCookie.serialize());

  return {
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  };
});
