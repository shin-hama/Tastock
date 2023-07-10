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
      console.log('Before create')
      const newTask = await prisma.task.create({
        data: {
          name: input.name,
          userId: session.user.id
        }
      })
      console.log('After create')

      return newTask
    }),
  finish: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const { prisma } = ctx
      const task = await prisma.task.update({
        where: {
          id: input
        },
        data: {
          endedAt: new Date()
        }
      })

      return task
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: z
          .object({
            name: z.string().optional(),
            endedAt: z.date().optional(),
            startedAt: z.date().optional(),
            tag: z.string().optional()
          })
          .optional()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { prisma } = ctx
      const task = await prisma.task.update({
        where: {
          id: input.id
        },
        data: input.data || {}
      })

      return task
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
  }),
  current: protectedProcedure.query(async ({ ctx }) => {
    const { session, prisma } = ctx
    return await prisma.task.findFirst({
      where: {
        userId: {
          equals: session.user.id
        },
        startedAt: {
          not: undefined
        },
        endedAt: {
          equals: null
        }
      }
    })
  })
})
