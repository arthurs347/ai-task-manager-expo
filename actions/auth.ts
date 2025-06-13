import {getClerkInstance} from "@clerk/clerk-expo";
import {router} from "expo-router";

/**
 * Authenticates session and user.
 * Routes to auth page if not authenticated or returns the user.
 * */
export function authenticateUser() {
    const clerkInstance = getClerkInstance();
    const session = clerkInstance?.session;
    const user = clerkInstance?.user;

    if (!session || !user) {
        router.replace("/(auth)/auth")
    }
    return user!
}