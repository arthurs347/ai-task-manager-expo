import {SignedOut, useClerk, useSSO, useUser} from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import {useRouter} from "expo-router";
import {useCallback, useEffect, useState} from "react";
import {View} from "react-native";
import {createUserAction} from "@/actions/userActions";
import {Button, ButtonText} from "@/components/ui/button";
import {OFFLINE_DEV_MODE} from "@/lib/constants";
import axios from "axios";
import {generateAPIUrl} from "@/utils/apiUtils";

export default function Page() {
    const { setActive } = useClerk()
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

    async function handleGuestSignIn() {
        console.log("Signing in as guest...");
        axios.post(generateAPIUrl("/api/guest"))
            .then((res) => {
                console.log(`${res}nice`);
                const { sessionId } = res.data;
                setActive({ session: sessionId }); // activate the backend-created session
            })
            .catch((reason) => {
                throw new Error(`Failed to create guest user: ${reason}`);
            });
        console.log("Signed guest successfully.");
    }

	return (
		<View>
			<SignedOut>
				<Button onPress={handleSignIn}>
					<ButtonText>Sign in with Github</ButtonText>
				</Button>
                <Button onPress={handleGuestSignIn}>
                    <ButtonText>Sign in as Guest</ButtonText>
                </Button>
			</SignedOut>
		</View>
	);
}
