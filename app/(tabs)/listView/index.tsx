import {useAuth} from "@clerk/clerk-expo";
import {useQuery} from "@tanstack/react-query";
import {useFocusEffect} from "expo-router";
import {Plus as PlusIcon} from "lucide-react-native";
import {useCallback, useState} from "react";
import {Text} from "react-native";
import {getListedTasksAction} from "@/actions/taskActions";
import CreateTaskPopup from "@/components/createTaskPopup/CreateTaskPopup";
import {ListViewBoxes} from "@/components/listViewBoxes/ListViewBoxes";
import {Button, ButtonIcon} from "@/components/ui/button";
import {VStack} from "@/components/ui/vstack";
import {OFFLINE_DEV_MODE} from "@/lib/constants";
import {testTasks} from "@/test/testTasks";
import {toListedTasks} from "@/utils/taskUtils";

export default function ListView() {
	const [refreshKey, setRefreshKey] = useState(0);
	const [displayCreateTaskPopup, setDisplayCreateTaskPopup] = useState(false);

	const { isLoaded } = useAuth();
	const { data, isLoading } = useQuery({
		queryFn: () =>
			OFFLINE_DEV_MODE ? toListedTasks(testTasks) : getListedTasksAction(),
		queryKey: ["tasks", refreshKey],
	});

	useFocusEffect(
		useCallback(() => {
			if (isLoaded) {
				setRefreshKey((prev) => prev + 1);
			}
		}, [isLoaded]),
	);
	if (!isLoaded) return;

	return (
		<VStack className="flex-1 items-center">
			{isLoading ? (
				<Text className="text-2xl">Loading...</Text>
			) : data && data.length > 0 ? (
				<ListViewBoxes listedTasks={data} setRefreshKey={setRefreshKey} />
			) : (
				<Text className="text-2xl">Create Your First Task!</Text>
			)}
			<Button onPress={() => setDisplayCreateTaskPopup(true)}>
				<ButtonIcon as={PlusIcon} />
			</Button>

			<CreateTaskPopup
				selectedDay={new Date()}
				setRefreshKey={setRefreshKey}
				displayCreateTaskPopup={displayCreateTaskPopup}
				setDisplayCreateTaskPopup={setDisplayCreateTaskPopup}
			/>
		</VStack>
	);
}
