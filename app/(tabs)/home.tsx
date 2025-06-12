import {authenticateUser} from "@/actions/auth";
import {SignOutButton} from "@/components/auth/SignOutButton";
import CreateTaskPopup from "@/components/home/CreateTaskPopup";
import {VStack} from "@/components/ui/vstack";
import {OFFLINE_DEV_MODE} from "@/lib/constants";
import {sortTasksByStartDateTime} from "@/lib/dateUtils";
import {testTasks} from "@/test/testTasks";
import {Text} from "react-native";

export default function Home() {
    if (!OFFLINE_DEV_MODE) {
        authenticateUser()
    }

    const sortedTasks = sortTasksByStartDateTime(testTasks);
    return (
        <VStack className="flex-1 justify-center items-center">
            <SignOutButton/>
            <CreateTaskPopup/>
            {sortedTasks.map((task, index) => (
                <Text key={index}>{task.title}</Text>
            ))}
            {/*<TaskAndTimeBox />*/}
        </VStack>
    );
}
