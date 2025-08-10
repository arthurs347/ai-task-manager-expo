import {useAuth} from "@clerk/clerk-expo";
import {useNavigation} from "@react-navigation/native";
import {useQuery} from "@tanstack/react-query";
import {ArrowLeft, ArrowRight, PlusIcon} from "lucide-react-native";
import {useEffect, useState} from "react";
import {Platform, Text} from "react-native";
import {getListedTasksAction} from "@/actions/taskActions";
import CreateTaskPopup from "@/components/CreateTaskPopup/_CreateTaskPopup";
import {_ListViewBoxes} from "@/components/ListViewBoxes/_ListViewBoxes";
import {Button, ButtonIcon} from "@/components/ui/button";
import {HStack} from "@/components/ui/hstack";
import {VStack} from "@/components/ui/vstack";
import {MONTH_NAMES_FULL, OFFLINE_DEV_MODE, WEEK_IN_MS,} from "@/lib/constants";
import ListViewDayHeaders from "@/modules/dayView/components/dayHeaders/_ListViewDayHeaders";
import {testTasks} from "@/test/testTasks";
import {filterTasksByStartDate, sortTasksByStartDateTime, toListedTasks,} from "@/utils/taskUtils";

export default function DayView() {
	const isWeb = Platform.OS === "web";

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
	function handleGoToPreviousWeek() {
		setSelectedDay(new Date(selectedDay.getTime() - WEEK_IN_MS));
	}

	function handleGoToNextWeek() {
		setSelectedDay(new Date(selectedDay.getTime() + WEEK_IN_MS));
	}

	return (
		<HStack>
			{/*<DraggableBox/>*/}
			<VStack className="flex-1 items-center">
				<Text className="text-2xl">
					{MONTH_NAMES_FULL[selectedDay.getMonth()] +
						" " +
						selectedDay.getFullYear()}
				</Text>
				<HStack className="w-full">
					{isWeb && (
						<Button onPress={() => handleGoToPreviousWeek()}>
							<ButtonIcon as={ArrowLeft} />
						</Button>
					)}
					<ListViewDayHeaders
						selectedDay={selectedDay}
						setSelectedDay={setSelectedDay}
						handleGoToPreviousWeek={handleGoToPreviousWeek}
						handleGoToNextWeek={handleGoToNextWeek}
					/>
					{isWeb && (
						<Button onPress={() => handleGoToNextWeek()}>
							<ButtonIcon as={ArrowRight} />
						</Button>
					)}
				</HStack>

				{isLoading ? (
					<Text>Loading...</Text>
				) : data && data.length > 0 ? (
					<_ListViewBoxes listedTasks={data!} setRefreshKey={setRefreshKey} />
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
