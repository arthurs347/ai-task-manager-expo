import {SignedIn, SignedOut, useSSO} from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import {useRouter} from "expo-router";
import {useCallback} from "react";
import {Text, View} from "react-native";
import {Button} from "tamagui";

export default function Page() {
    const {startSSOFlow} = useSSO();
    const router = useRouter();

    const onPress = useCallback(async () => {
        try {
            const {createdSessionId, setActive, signIn, signUp} =
                await startSSOFlow({
                    strategy: "oauth_github",
                    redirectUrl: AuthSession.makeRedirectUri(),
                });

            if (createdSessionId) {
                setActive!({session: createdSessionId});
                router.replace("/");
            } else {
                // Handle missing requirements based on status
                if (signIn) {
                    alert(signIn.status);
                    // Handle additional sign-in requirements here
                }
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    }, [router]);
    return (
        <View>
            <SignedIn>
                <Text>Signed in</Text>
            </SignedIn>
            <SignedOut>
                <Button onPress={onPress}>Sign in with Github</Button>
            </SignedOut>
        </View>
    );
}
