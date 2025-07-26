import {getTasksAction} from "@/actions/taskActions";
import CreateTaskPopup from "@/components/CreateTaskPopup/_CreateTaskPopup";
import {_ListViewBoxes} from "@/components/ListViewBoxes/_ListViewBoxes";
import {Button, ButtonIcon} from "@/components/ui/button";
import {VStack} from "@/components/ui/vstack";
import {Plus as PlusIcon} from "lucide-react-native";
import {useAuth} from "@clerk/clerk-expo";
import {useQuery} from "@tanstack/react-query";
import {useCallback, useState} from "react";
import {testTasks} from "@/test/testTasks";
import {useFocusEffect} from "expo-router";
import {Text} from "react-native";
import {OFFLINE_DEV_MODE} from "@/lib/constants";

export default function ListView() {
    const [refreshKey, setRefreshKey] = useState(0);
    const [displayCreateTaskPopup, setDisplayCreateTaskPopup] = useState(false);

    const {isLoaded} = useAuth()
    const { data, isLoading } = useQuery({
        queryFn: () => OFFLINE_DEV_MODE ? testTasks : getTasksAction(),
        queryKey: ['tasks', refreshKey],
    })

    useFocusEffect(
        // biome-ignore lint/correctness/useExhaustiveDependencies: refreshKey for debugging
        useCallback(() => {
            if (isLoaded) {
                setRefreshKey(prev => prev + 1 );
                console.log(refreshKey);
            }
        }, [isLoaded])
    );
    if (!isLoaded) return;

    return (
        <VStack className="flex-1 items-center">
            {isLoading ? (<Text className="text-2xl">Loading...</Text>) :
                data && data.length > 0 ? <_ListViewBoxes tasks={data!} setRefreshKey={setRefreshKey}/> :
                    <Text className="text-2xl">Create Your First Task!</Text>
            }
            <Button
                onPress={() => setDisplayCreateTaskPopup(true)}
            >
                <ButtonIcon as={PlusIcon}/>
            </Button>

            <CreateTaskPopup selectedDay={new Date()} setRefreshKey={setRefreshKey} displayCreateTaskPopup={displayCreateTaskPopup} setDisplayCreateTaskPopup={setDisplayCreateTaskPopup}/>
        </VStack>
    );
}