import { prisma } from "../../utils/db"
import { z } from "zod"

const updateSchema = z.object({
  name: z.string().optional(),
  code: z.string().optional(),
  amount: z.number().optional(),
  isActive: z.boolean().optional()
})

export default defineEventHandler(async (event) => {
  if (!event.context.user) throw createError({ statusCode: 401 })

  const id = getRouterParam(event, 'id')
  const body = await readValidatedBody(event, updateSchema.parse)

  // Cek kepemilikan dulu (Opsional tapi recommended untuk error 404 yang jelas)
  const existing = await prisma.walletUser.findFirst({
    where: { id, userId: event.context.user.id }
  })

  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: "Wallet not found" })
  }

  // Lakukan Update
  const updatedWallet = await prisma.walletUser.update({
    where: { id },
    data: body
  })

  return { success: true, data: updatedWallet }
})