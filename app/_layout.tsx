import "@/global.css";
import {GluestackUIProvider} from "@/components/ui/gluestack-ui-provider";
import {ClerkProvider} from "@clerk/clerk-expo";
import {tokenCache} from "@clerk/clerk-expo/token-cache";
import {Stack} from "expo-router";

export default function RootLayout() {
    return (
        <GluestackUIProvider mode="light">
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
        </GluestackUIProvider>
    );
}
