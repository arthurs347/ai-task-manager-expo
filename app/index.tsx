import {useUser} from "@clerk/clerk-expo";
import {Link, useRouter} from "expo-router";
import {View} from "react-native";
import {Text} from "tamagui";

export default function Page() {
    const {user} = useUser();
    const router = useRouter();

    if (user) {
        router.replace("/(tabs)/home");
    }

    return (
        <View>
            <Link href="/(auth)/sign-in">
                <Text fontSize={40}>Sign in</Text>
            </Link>
            {/*<Link href="/(auth)/sign-up">*/}
            {/*    <Text>Sign up</Text>*/}
            {/*</Link>*/}
        </View>
    );
}
