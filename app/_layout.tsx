import "@/global.css";
import {GluestackUIProvider} from "@/components/ui/gluestack-ui-provider";
import {ClerkProvider} from "@clerk/clerk-expo";
import {tokenCache} from "@clerk/clerk-expo/token-cache";
import {Stack} from "expo-router";
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://fd922d422b46fb0db5e408e564a8a85b@o4509517065486336.ingest.us.sentry.io/4509517073547264',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
    return (
        <GluestackUIProvider mode="light">
            <ClerkProvider tokenCache={tokenCache}>
                <Stack>
                    <Stack.Screen
                        name="(tabs)"
                    />
                </Stack>
            </ClerkProvider>
        </GluestackUIProvider>
    );
});