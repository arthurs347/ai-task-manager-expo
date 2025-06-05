import { Text } from "react-native"
import { Tabs } from "expo-router";
import {Ionicons} from "@expo/vector-icons";

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen
            name="index"
            options={{
                tabBarIcon: () => <Ionicons name="home-sharp" size={20}/>,
                tabBarLabel: () => <Text> Home</Text>,
            }}
            >
            </Tabs.Screen>

            <Tabs.Screen
            name="settings"
            options={{
                tabBarIcon: () => <Ionicons name="settings-sharp" size={20}/>,
                tabBarLabel: () => <Text> Settings</Text>,

            }}
            >
            </Tabs.Screen>
        </Tabs>
    )
}