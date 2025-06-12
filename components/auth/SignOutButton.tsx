import {Button, ButtonText} from "@/components/ui/button";
import {useClerk} from "@clerk/clerk-expo";
import * as Linking from "expo-linking";

export const SignOutButton = () => {
    // Use `useClerk()` to access the `signOut()` function
    const {signOut} = useClerk();

    const handleSignOut = async () => {
        try {
            await signOut();
            // Redirect to your desired page
            await Linking.openURL(Linking.createURL("/"));
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2));
        }
    };

    return (
        <Button className="text-white" onPress={handleSignOut}>
            <ButtonText>Sign Out</ButtonText>
        </Button>
    );
};
