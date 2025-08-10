import {Text} from "react-native";
import {_ListViewBoxes} from "@/components/ListViewBoxes/_ListViewBoxes";
import {HStack} from "@/components/ui/hstack";
import {Button, ButtonIcon} from "@/components/ui/button";
import {PlusIcon} from "lucide-react-native";
import type {ListedTask} from "@/app/api/tasks+api";

interface DayViewBodyProps {
    isLoading: boolean;
    listedTasks: ListedTask[] | null; // Replace with your actual data type
    setRefreshKey: (key: (prev: number) => any) => void;
    setDisplayCreateTaskPopup: (value: boolean) => void;
}
export default function DayViewBody({isLoading, listedTasks, setRefreshKey, setDisplayCreateTaskPopup}: DayViewBodyProps) {

    return (
        <>
            {isLoading ? (
                    <Text>Loading...</Text>
                ) : listedTasks && listedTasks.length > 0 ? (
                    <_ListViewBoxes listedTasks={listedTasks} setRefreshKey={setRefreshKey} />
                ) : (
                    <Text className="text-2xl">Create Your First Task!</Text>
                )}
            <HStack>
                {/*<Button*/}
                {/*    onPress={() => setDisplayQuickAddPopup(true)}*/}
                {/*>*/}
                {/*    <ButtonIcon as={CloudLightning}/>*/}
                {/*</Button>*/}
                <Button onPress={() => setDisplayCreateTaskPopup(true)}>
                    <ButtonIcon as={PlusIcon} />
                </Button>
            </HStack>
        </>
    )
}