import { useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function LandingPage() {
	const userFirstName = useUser().user?.firstName;

	return (
		<View className="items-center justify-center flex-1">
			<Text className="text-2xl">
				{" "}
				Welcome {userFirstName} to your new AI Task Manager
			</Text>
			<Link href={"/(auth)/auth"} className="border rounded text-xl">
				<Text>Get Started </Text>
			</Link>
		</View>
	);
}
