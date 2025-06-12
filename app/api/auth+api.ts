import {getClerkInstance} from "@clerk/clerk-expo";

export function GET() {
    const session = getClerkInstance().session
    if (!session) {
        return Response.json({redirectTo: "/(auth)/auth"}, {status: 401});
    }
    return Response.json({ success: true }, { status: 200 });
}