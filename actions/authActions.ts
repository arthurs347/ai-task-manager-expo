import { getClerkInstance } from "@clerk/clerk-expo";
import { router } from "expo-router";

/**
 * Authenticates session and user.
 * Routes to auth page if not authenticated or returns the user.
 */
export function authenticateUser() {
	const clerk = getClerkInstance();
	// Wait for Clerk to initialize
	if (!clerk || !clerk.session || !clerk.user) {
		router.replace("/(auth)/auth");
	}

	return clerk.user;
}
