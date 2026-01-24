import { prisma } from "../../utils/db"

export default defineEventHandler(async (event) => {
  // 1. Cek Login (Wajib)
  if (!event.context.user) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" })
  }

  // 2. Ambil data walletUser milik user tersebut
  const myWallets = await prisma.walletUser.findMany({
    where: {
      userId: event.context.user.id,
      isActive: true // (Opsional) Hanya tampilkan yang aktif jika pakai soft delete
    },
    include: {
      wallet: true // Join ke Master Wallet untuk ambil icon/type/logo
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return myWallets
})