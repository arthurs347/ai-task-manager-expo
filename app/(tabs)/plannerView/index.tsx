import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { type LayoutRectangle, ScrollView, Text } from "react-native";
import { getHabitsAction, getListedTasksAction } from "@/actions/taskActions";
import type { ListedTask } from "@/app/api/tasks+api";
import { HStack } from "@/components/ui/hstack";
import DayViewHeader from "@/modules/dayView/components/DayViewHeader";
import HabitItems from "@/modules/dayView/components/habitItems/HabitItems";
import TimeSlots from "@/modules/plannerView/components/TimeSlots";
import type { Habit } from "@/prisma/generated/prisma";
import {
	filterTasksByStartDate,
	sortTasksByStartDateTime,
} from "@/utils/taskUtils";

export default function PlannerView() {
	// Initialize state variables

	const today = new Date();
	const [selectedDay, setSelectedDay] = useState<Date>(today);
	const [refreshKey] = useState<number>(0);

	const navigation = useNavigation();

	// Gesture handling logic
	const [dropZoneLayouts, setDropZoneLayouts] = useState<LayoutRectangle[]>([]);
	const [highlightedDropZoneIndex, setHighlightedDropZoneIndex] = useState<
		number | null
	>(null);

	// Handler to update a specific dropzone layout by index
	const handleSlotLayout = (index: number, layout: LayoutRectangle) => {
		setDropZoneLayouts((prev) => {
			const next = [...prev];
			next[index] = layout;
			return next;
		});
	};

	// Fetch tasks and habits for the selected day
	const { data, isLoading } = useQuery({
		queryFn: async () => {
			const fetchedTasks: ListedTask[] = await getListedTasksAction();
			const filteredTasks: ListedTask[] = filterTasksByStartDate(
				fetchedTasks,
				selectedDay,
			);
			const fetchedHabits: Habit[] = await getHabitsAction();

			return {
				listedTasks: sortTasksByStartDateTime(filteredTasks),
				habits: fetchedHabits,
			};
		},
		queryKey: ["tasks", refreshKey, selectedDay],
	});
	const habits = data ? data.habits : null;

	// For when the tab is pressed, while on dayView reset the selected day to today
	useEffect(() => {
		// @ts-ignore
		return navigation.addListener("tabPress", () => {
			setSelectedDay(new Date());
		});
	}, [navigation]);

	return (
		// TODO: Fix x-offset of dragging onto time slots
		<ScrollView>
			<DayViewHeader
				selectedDay={selectedDay}
				setSelectedDay={setSelectedDay}
			/>

			<HStack className="justify-between p-2">
				{isLoading ? (
					<Text>Loading Habits...</Text>
				) : habits && habits.length > 0 ? (
					<HabitItems
						habits={habits}
						dropZoneLayouts={dropZoneLayouts}
						onHighlightChange={setHighlightedDropZoneIndex}
					/>
				) : (
					<Text className="text-2xl">Create Your First Habit!</Text>
				)}
				<TimeSlots
					highlightedDropZoneIndex={highlightedDropZoneIndex}
					onSlotLayout={handleSlotLayout}
				/>
			</HStack>
		</ScrollView>
	);
}
