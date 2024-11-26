import { PrismaClient } from "@prisma/client"
 
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
 
// assigning this prisma client to work on local env, not to cause hot reload issues with next.js
export const prisma = globalForPrisma.prisma || new PrismaClient()
 
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma