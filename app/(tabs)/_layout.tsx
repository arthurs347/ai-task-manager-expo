import {Ionicons} from "@expo/vector-icons";
import {Tabs} from "expo-router";
import {Text} from "react-native";

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: () => <Ionicons name="home-sharp" size={20}/>,
                    tabBarLabel: () => <Text> Home</Text>,
                }}
            ></Tabs.Screen>

            <Tabs.Screen
                name="settings"
                options={{
                    tabBarIcon: () => <Ionicons name="settings-sharp" size={20}/>,
                    tabBarLabel: () => <Text> Settings</Text>,
                }}
            ></Tabs.Screen>
        </Tabs>
    );
}
