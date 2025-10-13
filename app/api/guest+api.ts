import {clerkClient} from '@clerk/express';
import {StatusCodes} from "http-status-codes";

export async function POST(req: Request) {
    const username = `guest_${crypto.randomUUID().slice(0, 8)}`;

    // 1) Create a provisional user
    const user = await clerkClient.users.createUser({
        username,
        publicMetadata: { role: 'guest' },
    });

    // 2) Create a session for that user
    const session = await clerkClient.sessions.createSession({ userId: user.id });

    // 3) Return what the client needs to activate the session
    return new Response(JSON.stringify({
        userId: user.id,
        username,
        sessionId: session.id
    }), {status: StatusCodes.OK});

}