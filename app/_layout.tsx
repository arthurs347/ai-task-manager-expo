import "@/global.css";
import {ClerkProvider, useAuth} from "@clerk/clerk-expo";
import * as Sentry from "@sentry/react-native";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Stack, useRouter, useSegments} from "expo-router";
import * as SecureStore from "expo-secure-store";
import {useEffect} from "react";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {GluestackUIProvider} from "@/components/ui/gluestack-ui-provider";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
	async getToken(key: string) {
		return SecureStore.getItemAsync(key);
	},
	async saveToken(key: string, value: string) {
		return SecureStore.setItemAsync(key, value);
	},
};

Sentry.init({
	dsn: "https://fd922d422b46fb0db5e408e564a8a85b@o4509517065486336.ingest.us.sentry.io/4509517073547264",

	// Adds more context data to events (IP address, cookies, user, etc.)
	// For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
	sendDefaultPii: true,

	// Configure Session Replay
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1,
	integrations: [
		Sentry.mobileReplayIntegration(),
		Sentry.feedbackIntegration(),
	],

	// uncomment the line below to enable Spotlight (https://spotlightjs.com)
	// spotlight: __DEV__,
});

function InitialLayout() {
	const { isLoaded, isSignedIn } = useAuth();
	const segments = useSegments();
	const router = useRouter();

	// biome-ignore lint/correctness/useExhaustiveDependencies: Only running when user isSignedIn changes
	useEffect(() => {
		if (!isLoaded) return;

		const inTabsGroup = segments[0] === "(tabs)";
		if (isSignedIn && !inTabsGroup) {
			router.replace("/(tabs)/dayView");
		}
            // else if (!isSignedIn) {
		// 	router.replace("/(auth)/auth");
		// }
	}, [isSignedIn]);

	return (
		<Stack>
			<Stack.Screen
				name="(tabs)"
				options={{
					headerShown: false,
				}}
			/>
		</Stack>
	);
}

export default Sentry.wrap(function RootLayout() {
	const queryClient = new QueryClient();
	return (
		<SafeAreaProvider>
			<GluestackUIProvider mode="light">
				<ClerkProvider
					publishableKey={CLERK_PUBLISHABLE_KEY}
					tokenCache={tokenCache}
				>
					<QueryClientProvider client={queryClient}>
						<GestureHandlerRootView>
							<SafeAreaView style={{ flex: 1 }}>
								<InitialLayout />
							</SafeAreaView>
						</GestureHandlerRootView>
					</QueryClientProvider>
				</ClerkProvider>
			</GluestackUIProvider>
		</SafeAreaProvider>
	);
});
