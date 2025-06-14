import {Ionicons} from "@expo/vector-icons";
import {Tabs} from "expo-router";
import {Text} from "react-native";

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="listView"
                options={{
                    tabBarIcon: () => <Ionicons name="list-sharp" size={20}/>,
                    tabBarLabel: () => <Text> List View</Text>,
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
