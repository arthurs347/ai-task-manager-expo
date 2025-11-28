import {ListPlus, PlusIcon} from "lucide-react-native";
import {Text} from "react-native";
import {TaskTimeBoxes} from "@/modules/components/taskTimeBoxes/TaskTimeBoxes";
import {getRestructuredDailyTasksByIds} from "@/actions/aiActions";
import type {ListedTask} from "@/app/api/tasks+api";
import {Button, XStack, YStack} from "tamagui";
import {AnyTask} from "@/lib/types";

interface DayViewBodyProps {
	isLoading: boolean;
	taskInfos: AnyTask[] | null;
	setRefreshKey: (key: (prev: number) => number) => void;
    onOpen: () => void;
    isDayRestructured: boolean;
    setIsDayRestructured: (value: boolean) => void;
    setAiTasks: (tasks: ListedTask[]) => void;
}

export default function DayViewBody({
	isLoading,
                                        taskInfos,
	setRefreshKey,
                                        onOpen,
                                        isDayRestructured,
    setIsDayRestructured,
    setAiTasks
}: DayViewBodyProps) {
    async function handleDayRestructure() {
        const taskIds = taskInfos?.map(info => info.id) || []
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
			{!isLoading && taskInfos && taskInfos.length > 0 && (
				<TaskTimeBoxes
					taskInfos={taskInfos}
					setRefreshKey={setRefreshKey}
				/>
			)}
			{!isLoading && taskInfos && taskInfos.length === 0 && (
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
