import { prisma } from "../../utils/db"

export default defineEventHandler(async (event) => {
  if (!event.context.user) throw createError({ statusCode: 401 })

  const id = getRouterParam(event, 'id')

  const walletItem = await prisma.walletUser.findUnique({
    where: {
      id: id,
      userId: event.context.user.id // Security: Pastikan punya user sendiri
    },
    include: {
      wallet: true
    }
  })

  if (!walletItem) {
    throw createError({ statusCode: 404, statusMessage: "Wallet not found" })
  }

  return walletItem
})