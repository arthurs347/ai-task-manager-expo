import {Ionicons} from "@expo/vector-icons";
import {Tabs} from "expo-router";
import {Text} from "react-native";

export default function TabsLayout() {
	return (
		<Tabs>
			<Tabs.Screen
				name="dayView/index"
				options={{
					tabBarIcon: () => <Ionicons name="calendar" size={20} />,
					tabBarLabel: () => <Text> Day View</Text>,
					headerShown: false,
				}}
			/>

            <Tabs.Screen
                name="plannerView/index"
                options={{
                    tabBarIcon: () => <Ionicons name="calendar" size={20} />,
                    tabBarLabel: () => <Text> Planner View</Text>,
                    headerShown: false,
                }}
            />

			<Tabs.Screen
				name="listView/index"
				options={{
					tabBarIcon: () => <Ionicons name="list-sharp" size={20} />,
					tabBarLabel: () => <Text> List View</Text>,
					headerShown: false,
				}}
			/>

			<Tabs.Screen
				name="settings/index"
				options={{
					tabBarIcon: () => <Ionicons name="settings-sharp" size={20} />,
					tabBarLabel: () => <Text> Settings</Text>,
					headerShown: false,
				}}
			/>
		</Tabs>
	);
}
