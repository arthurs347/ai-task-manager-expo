import {prisma} from "@/lib/prisma";

export async function POST(request: Request) {
    const {id, email, fullName, image} = await request.json();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (!existingUser) {
        await prisma.user.create({
            data: {
                id,
                email,
                fullName,
                image,
            },
        });
    }

}
