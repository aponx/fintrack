import { prisma } from "../../utils/db"
import { z } from "zod"

// Schema Validasi Input
const createWalletUserSchema = z.object({
  walletId: z.string().min(1), // ID dari Master Wallet
  code: z.string().min(1),     // Misal: No Rekening atau Kode unik user
  name: z.string().min(1),     // Misal: "Tabungan Nikah"
  amount: z.number().default(0) // Saldo awal
})

export default defineEventHandler(async (event) => {
  // 1. Cek Login
  if (!event.context.user) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" })
  }

  // 2. Validasi Body
  const body = await readValidatedBody(event, createWalletUserSchema.parse)

  try {
    const newWallet = await prisma.walletUser.create({
      data: {
        id: crypto.randomUUID(),
        userId: event.context.user.id, // Otomatis ambil dari session
        walletId: body.walletId,
        code: body.code,
        name: body.name,
        amount: body.amount,
        isActive: true
      }
    })

    return { success: true, data: newWallet }

  } catch (error: any) {
    // Handle constraint unique [userId, walletId]
    // Artinya: User ini sudah punya wallet jenis ini
    if (error.code === 'P2002') {
      throw createError({
        statusCode: 409,
        statusMessage: "You already have this wallet type added."
      })
    }
    throw createError({ statusCode: 500, statusMessage: error.message })
  }
})