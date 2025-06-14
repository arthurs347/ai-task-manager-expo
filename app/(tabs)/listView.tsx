import {authenticateUser} from "@/actions/authActions";
import {getTasksAction} from "@/actions/taskActions";
import {SignOutButton} from "@/components/auth/SignOutButton";
import CreateTaskPopup from "@/components/home/CreateTaskPopup";
import {VStack} from "@/components/ui/vstack";
import {OFFLINE_DEV_MODE} from "@/lib/constants";
import {Task} from "@/prisma/generated/prisma";
import {useEffect, useState} from "react";
import {Text} from "react-native";

export default function ListView() {
    if (!OFFLINE_DEV_MODE) {
        authenticateUser();
    }
    const fetchTasks = async () => {
        const fetchedTasks = await getTasksAction()
        setTasks(fetchedTasks);
    }
    const [tasks, setTasks] = useState<Task[]>([]); // Replace with useState if not using test data
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        fetchTasks()
    }, [refreshKey])

    // const sortedTasks = sortTasksByStartDateTime(tasks);

    return (
        <VStack className="flex-1 justify-center items-center">
            <SignOutButton/>
            <CreateTaskPopup setRefreshKey={setRefreshKey}/>
            {/*{sortedTasks.map((task, index) => (*/}
            {/*    <Text className="border" key={index}>{task.title}</Text>*/}
            {/*))}*/}
            {tasks.map((task, index) => (
                <Text className="border" key={index}>{"Task" + task.title}</Text>
            ))}
            {/*<TaskAndTimeBox />*/}
        </VStack>
    );
}
