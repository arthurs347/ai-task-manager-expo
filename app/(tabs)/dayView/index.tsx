import {useNavigation} from "@react-navigation/native";
import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {getHabitsAction, getListedTasksAction} from "@/actions/taskActions";
import CreateTaskPopup from "@/components/CreateTaskPopup/_CreateTaskPopup";
import {VStack} from "@/components/ui/vstack";
import {filterTasksByStartDate, sortTasksByStartDateTime} from "@/utils/taskUtils";
import DayViewHeader from "@/modules/dayView/components/DayViewHeader";
import DayViewBody from "@/modules/dayView/components/DayViewBody";
import type {Habit} from "@/prisma/generated/prisma";
import type {ListedTask} from "@/app/api/tasks+api";

export default function DayView() {
    // Initialize state variables
	const today = new Date();
	const [selectedDay, setSelectedDay] = useState<Date>(today);
	const [refreshKey, setRefreshKey] = useState<number>(0);
	const [displayCreateTaskPopup, setDisplayCreateTaskPopup] = useState(false);
	const [displayQuickAddPopup, setDisplayQuickAddPopup] = useState(false);
    const navigation = useNavigation();


    // Fetch tasks and habits for the selected day
	const { data, isLoading } = useQuery({
		queryFn: async () => {
            const fetchedTasks: ListedTask[] = await getListedTasksAction();
            const filteredTasks: ListedTask[] = filterTasksByStartDate(fetchedTasks, selectedDay);
            const fetchedHabits: Habit[] = await getHabitsAction();

            return {
                listedTasks: sortTasksByStartDateTime(filteredTasks),
                habits: fetchedHabits
            };
		},
		queryKey: ["tasks", refreshKey, selectedDay],
	})
    const listedTasks = data ? data.listedTasks : null;
    const habits = data ? data.habits : null;
    
	// For when the tab is pressed, while on dayView reset the selected day to today
	useEffect(() => {
		// @ts-ignore
		return navigation.addListener("tabPress", () => {
			setSelectedDay(new Date());
		});
	}, [navigation]);

	return (
			<VStack className="flex-1 items-center">
				<DayViewHeader selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

				<DayViewBody isLoading={isLoading} setRefreshKey={setRefreshKey} setDisplayCreateTaskPopup={setDisplayCreateTaskPopup} listedTasks={listedTasks} habits={habits}></DayViewBody>

                <CreateTaskPopup
					selectedDay={selectedDay}
					setRefreshKey={setRefreshKey}
					displayCreateTaskPopup={displayCreateTaskPopup}
					setDisplayCreateTaskPopup={setDisplayCreateTaskPopup}
				/>
			</VStack>
	);
}
