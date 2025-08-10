import {useAuth} from "@clerk/clerk-expo";
import {useNavigation} from "@react-navigation/native";
import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {getListedTasksAction} from "@/actions/taskActions";
import CreateTaskPopup from "@/components/CreateTaskPopup/_CreateTaskPopup";
import {HStack} from "@/components/ui/hstack";
import {VStack} from "@/components/ui/vstack";
import {OFFLINE_DEV_MODE} from "@/lib/constants";
import {testTasks} from "@/test/testTasks";
import {filterTasksByStartDate, sortTasksByStartDateTime, toListedTasks} from "@/utils/taskUtils";
import DayViewHeader from "@/modules/dayView/components/DayViewHeader";
import DayViewBody from "@/modules/dayView/components/DayViewBody";

export default function DayView() {
	const today = new Date();

	const [selectedDay, setSelectedDay] = useState<Date>(today);
	const [refreshKey, setRefreshKey] = useState<number>(0);
	const [displayCreateTaskPopup, setDisplayCreateTaskPopup] = useState(false);
	const [displayQuickAddPopup, setDisplayQuickAddPopup] = useState(false);

	const { isLoaded } = useAuth();
	const navigation = useNavigation();

	const { data, isLoading } = useQuery({
		queryFn: async () => {
			if (OFFLINE_DEV_MODE) {
				const filteredTasks = filterTasksByStartDate(
					toListedTasks(testTasks),
					selectedDay,
				);
				return sortTasksByStartDateTime(filteredTasks);
			} else {
				const fetchedTasks = await getListedTasksAction();
				const filteredTasks = filterTasksByStartDate(fetchedTasks, selectedDay);
				return sortTasksByStartDateTime(filteredTasks);
			}
		},
		queryKey: ["tasks", refreshKey, selectedDay],
	});
	// For when the tab is pressed, while on dayView reset the selected day to today
	useEffect(() => {
		// @ts-ignore
		return navigation.addListener("tabPress", () => {
			setSelectedDay(new Date());
		});
	}, [navigation]);

	if (!isLoaded) return; // Wait until Clerk is loaded

	return (
		<HStack>
			{/*<DraggableBox/>*/}
			<VStack className="flex-1 items-center">
				<DayViewHeader selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

				<DayViewBody isLoading={isLoading} setRefreshKey={setRefreshKey} setDisplayCreateTaskPopup={setDisplayCreateTaskPopup} listedTasks={data!}></DayViewBody>

                <CreateTaskPopup
					selectedDay={selectedDay}
					setRefreshKey={setRefreshKey}
					displayCreateTaskPopup={displayCreateTaskPopup}
					setDisplayCreateTaskPopup={setDisplayCreateTaskPopup}
				/>
			</VStack>
		</HStack>
	);
}
