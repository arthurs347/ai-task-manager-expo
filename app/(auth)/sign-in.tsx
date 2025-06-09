import {SignedIn, SignedOut, useSSO} from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import {useCallback} from "react";
import {Text, View} from "react-native";
import {Button} from "tamagui";

export default function Page() {
    const {startSSOFlow} = useSSO();

    const onPress = useCallback(async () => {
        try {
            // Start the authentication process by calling `startSSOFlow()`
            const {createdSessionId, setActive, signIn, signUp} =
                await startSSOFlow({
                    strategy: "oauth_google",
                    // For web, defaults to current path
                    // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
                    // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
                    redirectUrl: AuthSession.makeRedirectUri(),
                });

            // If sign in was successful, set the active session
            if (createdSessionId) {
                await setActive!({session: createdSessionId});
                alert("successful login");
            } else {
                alert(signIn?.status);
                // If there is no `createdSessionId`,
                // there are missing requirements, such as MFA
                // Use the `signIn` or `signUp` returned from `startSSOFlow`
                // to handle next steps
            }
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2));
        }
    }, [startSSOFlow]);

    return (
        <View>
            <SignedIn>
                <Text>Signed in</Text>
            </SignedIn>
            <SignedOut>
                <Button onPress={onPress}>Sign in with Google</Button>
            </SignedOut>
        </View>
    );
}
