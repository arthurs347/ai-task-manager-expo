import {PlusIcon} from "lucide-react-native";
import {Text} from "react-native";
import type {ListedTask} from "@/app/api/tasks+api";
import {ListViewBoxes} from "@/components/listViewBoxes/ListViewBoxes";
import {Button, ButtonIcon} from "@/components/ui/button";
import {VStack} from "@/components/ui/vstack";

interface DayViewBodyProps {
	isLoading: boolean;
	listedTasks: ListedTask[] | null; // Replace with your actual data type
	setRefreshKey: (key: (prev: number) => number) => void;
	setDisplayCreateTaskPopup: (value: boolean) => void;
}

export default function DayViewBody({
	isLoading,
	listedTasks,
	setRefreshKey,
	setDisplayCreateTaskPopup,
}: DayViewBodyProps) {
	return (
		<VStack className="flex-1 items-center">
			{/*Loading State*/}
			{isLoading && <Text>Loading Tasks...</Text>}

			{/*Loaded State*/}
			{!isLoading && listedTasks && listedTasks.length > 0 && (
				<ListViewBoxes
					listedTasks={listedTasks}
					setRefreshKey={setRefreshKey}
				/>
			)}
			{!isLoading && listedTasks && listedTasks.length === 0 && (
				<Text className="text-2xl">Create Your First Task!</Text>
			)}

			<Button onPress={() => setDisplayCreateTaskPopup(true)}>
				<ButtonIcon as={PlusIcon} />
			</Button>
		</VStack>
	);
}
