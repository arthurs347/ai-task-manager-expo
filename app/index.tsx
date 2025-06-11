import {Button} from "@/components/ui/button";
import {Link} from "expo-router";
import {Text, View} from "react-native";

export default function LandingPage() {
    return (
        <View>
            <Text> Welcome to your new AI Task Manager</Text>
            <Link href="/(auth)/auth">
                <Button size={"lg"}>Get Started</Button>
            </Link>
        </View>
    );
}
