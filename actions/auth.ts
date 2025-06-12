import {useAuth, useUser} from "@clerk/clerk-expo";
import {router} from "expo-router";

/**
 * Authenticates session and user.
 * Routes to auth page if not authenticated or returns the user.
 * */
export function authenticateUser() {
    const session = useAuth()
    const user = useUser().user
    if (!session || !user) {
        router.replace("/(auth)/auth")
    }
    return user!
}