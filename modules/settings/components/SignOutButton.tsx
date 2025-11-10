import {useClerk} from "@clerk/clerk-expo";
import {useRouter} from "expo-router";
import {Button} from "tamagui";

export const SignOutButton = () => {
	const { signOut } = useClerk();
	const router = useRouter();

	const handleSignOut = async () => {
		try {
			await signOut();
			// Redirect to your desired page
			router.replace("/");
		} catch (err) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			console.error(JSON.stringify(err, null, 2));
		}
	};

	return (

		<Button className="text-white hover:" onPress={handleSignOut}>
			Sign Out
		</Button>
	);
};
