import { prisma } from "../../utils/db"

export default defineEventHandler(async (event) => {
  // 1. Cek Login (Wajib)
  if (!event.context.user) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" })
  }

  // 2. Ambil semua Master Wallet types yang tersedia
  const walletTypes = await prisma.wallet.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  return walletTypes
})
