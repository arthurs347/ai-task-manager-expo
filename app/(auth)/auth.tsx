import {SignedIn, SignedOut, useSSO, useUser} from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import {useRouter} from "expo-router";
import {useCallback, useEffect, useState} from "react";
import {Text, View} from "react-native";
import {createUserAction} from "@/actions/userActions";
import {Button, ButtonText} from "@/components/ui/button";
import {OFFLINE_DEV_MODE} from "@/lib/constants";

export default function Page() {
	const { user } = useUser();
	const router = useRouter();
	const [authenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		const createUser = async () => await createUserAction();

		if (user || authenticated || OFFLINE_DEV_MODE) {
			if (!OFFLINE_DEV_MODE) {
				createUser();
			}
			router.replace("/(tabs)/listView");
		}
	});
	const { startSSOFlow } = useSSO();

	const handleSignIn = useCallback(async () => {
		const { createdSessionId, setActive, signIn } = await startSSOFlow({
			strategy: "oauth_github",
			redirectUrl: AuthSession.makeRedirectUri(),
		});

		// If the user is already signed in, redirect to home
		if (createdSessionId) {
			if (setActive) {
				await setActive({ session: createdSessionId });
			}
			setAuthenticated(true);
		} else {
			// Handle missing requirements based on status
			if (signIn) {
				throw new Error("Sign-in is required to complete the SSO flow.");
				// Handle additional sign-in requirements here
			}
		}
	}, [startSSOFlow]);

	return (
		<View>
			<SignedIn>
				<Text>Signed in</Text>
			</SignedIn>
			<SignedOut>
				<Button onPress={handleSignIn}>
					<ButtonText>Sign in with Github</ButtonText>
				</Button>
			</SignedOut>
		</View>
	);
}
