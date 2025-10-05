import {PlusIcon} from "lucide-react-native";
import {Text} from "react-native";
import {ListViewBoxes} from "@/components/listViewBoxes/ListViewBoxes";
import {Button, ButtonIcon} from "@/components/ui/button";
import {VStack} from "@/components/ui/vstack";
import type {TaskTimeInfo} from "@/components/listViewBoxes/TaskTimeBox";

interface DayViewBodyProps {
	isLoading: boolean;
	taskTimeInfos: TaskTimeInfo[] | null;
	setRefreshKey: (key: (prev: number) => number) => void;
	setDisplayCreateTaskPopup: (value: boolean) => void;
}

export default function DayViewBody({
	isLoading,
	taskTimeInfos,
	setRefreshKey,
	setDisplayCreateTaskPopup,
}: DayViewBodyProps) {
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

			<Button onPress={() => setDisplayCreateTaskPopup(true)}>
				<ButtonIcon as={PlusIcon} />
			</Button>
		</VStack>
	);
}
