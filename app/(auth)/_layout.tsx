import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function AuthRoutesLayout() {
	const { isSignedIn } = useAuth();

	if (isSignedIn) {
		console.log("Signed in");
		return <Redirect href={"/"} />;
	}
	console.log("Not signed in");

	return <Stack />;
}
