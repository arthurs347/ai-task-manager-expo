import {getTasksAction} from "@/actions/taskActions";
import CreateTaskPopup from "@/components/home/CreateTaskPopup/_CreateTaskPopup";
import ListViewDayHeaders from "@/components/home/DayHeaders/_ListViewDayHeaders";
import {_ListViewBoxes} from "@/components/home/ListViewBoxes/_ListViewBoxes";
import {Button, ButtonIcon} from "@/components/ui/button";
import {VStack} from "@/components/ui/vstack";
import {OFFLINE_DEV_MODE} from "@/lib/constants";
import {Task} from "@/prisma/generated/prisma";
import {testTasks} from "@/test/testTasks";
import {PlusIcon} from "lucide-react-native";
import {useEffect, useState} from "react";
import {useAuth} from "@clerk/clerk-expo";
import {isSameDay} from "@/utils/dateUtils";

export default function DayView() {
    const today = new Date();

    const [selectedDay, setSelectedDay] = useState<Date>(today);
    const [tasks, setTasks] = useState<Task[]>([]); // Replace with useState if not using test data
    const [refreshKey, setRefreshKey] = useState<number>(0);
    const [displayCreateTaskPopup, setDisplayCreateTaskPopup] = useState(false);

    const {isLoaded} = useAuth()

    // biome-ignore lint/correctness/useExhaustiveDependencies: refreshKey allows code to run after new task creation
    useEffect(() => {
        //TODO: Prefetch tasks for week or something, no fetch on every render
        if (!isLoaded) return; // Wait until Clerk is loaded
        getTasksAction()
            .then((fetchedTasks: Task[]) => {
                const tasksToDisplay = !OFFLINE_DEV_MODE ? fetchedTasks:  testTasks;
                const tasksFilteredByDay = tasksToDisplay.filter(task => {
                    return isSameDay(selectedDay, task.start);
                })
                setTasks(tasksFilteredByDay);
            })
        console.log("Ran")
    }, [isLoaded, refreshKey, selectedDay]);

    return (
        <VStack className="flex-1 items-center">
            <ListViewDayHeaders selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>
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