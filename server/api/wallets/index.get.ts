import { prisma } from "../../utils/db"

export default defineEventHandler(async (event) => {
  // 1. Cek Login (Wajib)
  if (!event.context.user) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" })
  }

  // 2. Ambil semua Master Wallet yang tersedia
  const masterWallets = await prisma.wallet.findMany({
    where: {
      // Bisa tambahkan filter jika hanya ingin menampilkan wallet tertentu
    },
    orderBy: {
      name: 'asc'
    }
  })

  return masterWallets
})
