import { prisma } from "@/lib/prisma";
//TODO: TEST AND SEE IF THIS WORKS
export async function POST(request: Request) {
    try {
        const { userId, email } = await request.json();

        if (!userId || !email) {
            return new Response(
                JSON.stringify({ error: "userId and email are required" }),
                { status: 400 }
            );
        }

        const user = await prisma.user.create({
            data: {
                id: userId,
                email,
            },
        });

        return new Response(JSON.stringify(user), { status: 201 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Failed to create user", details: error }),
            { status: 500 }
        );
    }
}
