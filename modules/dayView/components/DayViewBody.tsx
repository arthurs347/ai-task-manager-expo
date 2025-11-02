import {ListPlus, PlusIcon} from "lucide-react-native";
import {Text} from "react-native";
import {ListViewBoxes} from "@/components/listViewBoxes/ListViewBoxes";
import {Button, ButtonIcon} from "@/components/ui/button";
import {VStack} from "@/components/ui/vstack";
import type {TaskTimeInfo} from "@/components/listViewBoxes/TaskTimeBox";
import {getRestructuredDailyTasksByIds} from "@/actions/aiActions";
import {HStack} from "@/components/ui/hstack";
import type {ListedTask} from "@/app/api/tasks+api";

interface DayViewBodyProps {
	isLoading: boolean;
	taskTimeInfos: TaskTimeInfo[] | null;
	setRefreshKey: (key: (prev: number) => number) => void;
	setDisplayCreateTaskPopup: (value: boolean) => void;
    isDayRestructured: boolean;
    setIsDayRestructured: (value: boolean) => void;
    setAiTasks: (tasks: ListedTask[]) => void;
}

export default function DayViewBody({
	isLoading,
	taskTimeInfos,
	setRefreshKey,
	setDisplayCreateTaskPopup,
                                        isDayRestructured,
    setIsDayRestructured,
    setAiTasks
}: DayViewBodyProps) {
    async function handleDayRestructure() {
        const taskIds = taskTimeInfos?.map(info => info.id) || []
        const restructuredTasks = await getRestructuredDailyTasksByIds(taskIds)
        setAiTasks(restructuredTasks)
        setIsDayRestructured(!isDayRestructured)
        setRefreshKey(prev => prev + 1)
    }
	return (
		<VStack className="flex-1 items-center">
			{/*Loading State*/}
			{isLoading && <Text>Loading Tasks...</Text>}

			{/*Loaded State*/}
			{!isLoading && taskTimeInfos && taskTimeInfos.length > 0 && (
				<ListViewBoxes
					taskTimeInfos={taskTimeInfos}
					setRefreshKey={setRefreshKey}
				/>
			)}
			{!isLoading && taskTimeInfos && taskTimeInfos.length === 0 && (
				<Text className="text-2xl">Create Your First Task!</Text>
			)}

            <HStack>
                <Button onPress={() => setDisplayCreateTaskPopup(true)}>
                    <ButtonIcon as={PlusIcon} />
                </Button>
                <Button onPress={handleDayRestructure}>
                    <ButtonIcon as={ListPlus} />a
                </Button>
            </HStack>
		</VStack>
	);
}
