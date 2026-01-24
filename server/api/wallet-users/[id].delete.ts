import { prisma } from "../../utils/db"

export default defineEventHandler(async (event) => {
  if (!event.context.user) throw createError({ statusCode: 401 })

  const id = getRouterParam(event, 'id')

  // OPSI 1: SOFT DELETE (Disarankan)
  // Data tidak hilang, cuma tidak tampil di list aktif
  const softDeleted = await prisma.walletUser.update({
    where: { 
        id, 
        userId: event.context.user.id // Security check
    },
    data: { isActive: false }
  })
  
  return { success: true, message: "Wallet deactivated", data: softDeleted }

  /* // OPSI 2: HARD DELETE (Hanya jika belum ada transaksi)
  try {
      await prisma.walletUser.delete({
          where: { id, userId: event.context.user.id }
      })
      return { success: true, message: "Wallet deleted permanently" }
  } catch (e) {
      // Biasanya error Foreign Key Constraint kalau sudah ada transaksi
      throw createError({ statusCode: 400, statusMessage: "Cannot delete wallet with existing transactions" })
  }
  */
})