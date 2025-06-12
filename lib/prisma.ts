import {PrismaClient} from "@/prisma/generated/prisma/edge";
import {withAccelerate} from '@prisma/extension-accelerate'

export const prisma = new PrismaClient().$extends(withAccelerate())