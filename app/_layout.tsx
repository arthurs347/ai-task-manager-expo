import { Stack } from "expo-router";
import {config} from "@/tamagui.config";
import {TamaguiProvider} from "tamagui";

export default function RootLayout() {
  return (
      <TamaguiProvider config={config}>
      <Stack>
        <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}>
        </Stack.Screen>
      </Stack>
      </TamaguiProvider>
  )
}
