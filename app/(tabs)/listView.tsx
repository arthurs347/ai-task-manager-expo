import {getTasksAction} from "@/actions/taskActions";
import CreateTaskPopup from "@/components/home/CreateTaskPopup/_CreateTaskPopup";
import {_ListViewBoxes} from "@/components/home/ListViewBoxes/_ListViewBoxes";
import {Button, ButtonIcon} from "@/components/ui/button";
import {VStack} from "@/components/ui/vstack";
import {OFFLINE_DEV_MODE} from "@/lib/constants";
import {Task} from "@/prisma/generated/prisma";
import {testTasks} from "@/test/testTasks";
import {PlusIcon} from "lucide-react-native";
import {useCallback, useState} from "react";
import {useAuth} from "@clerk/clerk-expo";
import {useFocusEffect} from "expo-router";

export default function ListView() {
    const [tasks, setTasks] = useState<Task[]>([]); // Replace with useState if not using test data
    const [refreshKey, setRefreshKey] = useState(0);
    const [displayCreateTaskPopup, setDisplayCreateTaskPopup] = useState(false);

    const {isLoaded} = useAuth()

    useFocusEffect(
        // biome-ignore lint/correctness/useExhaustiveDependencies: refreshKey allows code to run after new task creation
        useCallback(() => {
            if (!isLoaded) return; // Wait until Clerk is loaded
            getTasksAction()
                .then((fetchedTasks: Task[]) => !OFFLINE_DEV_MODE ? setTasks(fetchedTasks) : setTasks(testTasks));
            console.log("Ran")
        }, [isLoaded, refreshKey])
    );


    return (
        <VStack className="flex-1 items-center">
            <_ListViewBoxes tasks={tasks} setRefreshKey={setRefreshKey}/>
            <Button
                onPress={() => setDisplayCreateTaskPopup(true)}
            >
                <ButtonIcon as={PlusIcon}/>
            </Button>

            <CreateTaskPopup setRefreshKey={setRefreshKey} displayCreateTaskPopup={displayCreateTaskPopup} setDisplayCreateTaskPopup={setDisplayCreateTaskPopup}/>
        </VStack>
    );
}