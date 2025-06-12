import {createUserAction} from "@/actions/user";
import {Button, ButtonText} from "@/components/ui/button";
import {OFFLINE_DEV_MODE} from "@/lib/constants";
import {SignedIn, SignedOut, useSSO, useUser} from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import {useRouter} from "expo-router";
import {useCallback} from "react";
import {Text, View} from "react-native";

export default function Page() {
    const {user} = useUser();
    const router = useRouter();

    if (user || OFFLINE_DEV_MODE) {
        router.replace("/(tabs)/home");
    }
    const {startSSOFlow} = useSSO();

    const handleSignIn = useCallback(async () => {
        try {
            const {createdSessionId, setActive, signIn} = await startSSOFlow({
                strategy: "oauth_github",
                redirectUrl: AuthSession.makeRedirectUri(),
            });

            // If the user is already signed in, redirect to home
            if (createdSessionId) {
                await setActive!({session: createdSessionId});
                // Handle user creation if needed
                await createUserAction()

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
    }, [router, startSSOFlow]);
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
