import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const taskRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { session, prisma } = ctx
      const newTask = await prisma.task.create({
        data: {
          name: input.name,
          userId: session.user.id
        }
      })

      return newTask
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const { session, prisma } = ctx
    return await prisma.task.findMany({
      where: {
        userId: {
          equals: session.user.id
        }
      }
    })
  })
})
