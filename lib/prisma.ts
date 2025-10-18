import {withAccelerate} from "@prisma/extension-accelerate";
import {PrismaClient} from "@/prisma/generated/prisma";

export const prisma = new PrismaClient().$extends(withAccelerate());
