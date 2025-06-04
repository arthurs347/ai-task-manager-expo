import { Text, View } from "react-native";
import {Button, TamaguiProvider} from 'tamagui'
import { config } from '@/tamagui.config'

export default function Index() {
  return (
      <TamaguiProvider config={config}>

      <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
        <Button>hello</Button>
    </View>
      </TamaguiProvider>

  );
}
