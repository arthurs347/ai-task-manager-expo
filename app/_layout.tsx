import { config } from "@/tamagui.config";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack } from "expo-router";
import { TamaguiProvider } from "tamagui";

export default function RootLayout() {
	return (
		<TamaguiProvider config={config}>
			<ClerkProvider tokenCache={tokenCache}>
				<Stack>
					<Stack.Screen
						name="(tabs)"
						options={{
							headerShown: false,
						}}
					></Stack.Screen>
				</Stack>
			</ClerkProvider>
		</TamaguiProvider>
	);
}
