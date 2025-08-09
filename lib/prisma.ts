import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@/prisma/generated/prisma/edge";

export const prisma = new PrismaClient().$extends(withAccelerate());
