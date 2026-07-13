import { z } from 'zod';
import { prisma } from '../utils/db';
import { lucia } from '../utils/auth';
import { verify } from '@node-rs/argon2';

const loginSchema = z.object({
  username: z.string().min(1, 'Username wajib diisi'),
  password: z.string().min(1, 'Password wajib diisi')
});

export default defineEventHandler(async (event) => {
  if (event.method !== 'POST') {
    return createError({ statusCode: 405, message: 'Method not allowed' });
  }

  const body = await readBody(event);

  // Validasi input
  const validation = loginSchema.safeParse(body);
  if (!validation.success) {
    return createError({
      statusCode: 400,
      message: validation.error.errors.map(e => e.message).join(', ')
    });
  }

  const { username, password } = validation.data;

  // Cari user berdasarkan username
  const user = await prisma.user.findUnique({
    where: { username }
  });

  if (!user || !user.password) {
    return createError({ statusCode: 401, message: 'Username atau password salah' });
  }

  // Verifikasi password
  const validPassword = await verify(user.password, password);
  if (!validPassword) {
    return createError({ statusCode: 401, message: 'Username atau password salah' });
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
      username: user.username,
      role: user.role
    }
  };
});
