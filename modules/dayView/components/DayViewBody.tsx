import {ListPlus, PlusIcon} from "lucide-react-native";
import {Text} from "react-native";
import {ListViewBoxes} from "@/modules/components/listViewBoxes/ListViewBoxes";
import type {TaskTimeInfo} from "@/modules/components/listViewBoxes/TaskTimeBox";
import {getRestructuredDailyTasksByIds} from "@/actions/aiActions";
import type {ListedTask} from "@/app/api/tasks+api";
import {Button, XStack, YStack} from "tamagui";

interface DayViewBodyProps {
	isLoading: boolean;
	taskTimeInfos: TaskTimeInfo[] | null;
	setRefreshKey: (key: (prev: number) => number) => void;
    onOpen: () => void;
    isDayRestructured: boolean;
    setIsDayRestructured: (value: boolean) => void;
    setAiTasks: (tasks: ListedTask[]) => void;
}

export default function DayViewBody({
	isLoading,
	taskTimeInfos,
	setRefreshKey,
                                        onOpen,
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
		<YStack alignItems="center" gap="$2">
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

            <XStack>
                <Button onPress={onOpen}>
                    <PlusIcon/>
                </Button>
                <Button onPress={handleDayRestructure}>
                    <ListPlus/>
                </Button>
            </XStack>
		</YStack>
	);
}
