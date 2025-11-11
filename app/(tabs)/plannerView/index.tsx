import {useNavigation} from "@react-navigation/native";
import {useQuery} from "@tanstack/react-query";
import React, {useEffect, useRef, useState} from "react";
import {ScrollView, Text, View} from "react-native";
import {getHabitsAction, getListedTasksAction} from "@/actions/taskActions";
import type {ListedTask} from "@/app/api/tasks+api";
import DayViewHeader from "@/modules/dayView/components/DayViewHeader";
import HabitItems from "@/modules/dayView/components/habitItems/HabitItems";
import TimeSlots from "@/modules/plannerView/components/TimeSlots";
import type {Habit} from "@/prisma/generated/client/edge";
import {filterTasksByStartDate, sortTasksByStartDateTime,} from "@/utils/taskUtils";
import type Animated from "react-native-reanimated";
import {XStack} from "tamagui";

export default function PlannerView() {
	// Initialize state variables
	const today = new Date();
	const [selectedDay, setSelectedDay] = useState<Date>(today);
	const [refreshKey] = useState<number>(0);

	const navigation = useNavigation();

	// Gesture handling logic
    const habitRefs = useRef<(Animated.View | null)[]>([]);
    const timeSlotRefs = useRef<(View | null)[]>([]);

	const [highlightedDropZoneIndex, setHighlightedDropZoneIndex] = useState<
		number | null
	>(null);


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
		<ScrollView>
			<DayViewHeader
				selectedDay={selectedDay}
				setSelectedDay={setSelectedDay}
			/>

			<XStack justify="space-between" p="$2">
                {isLoading && (<Text>Loading Habits...</Text>)}
                {!isLoading && habits?.length === 0 && (<Text className="text-large">Create Your First Habit!</Text>)}
                {!isLoading && habits && habits.length > 0 && (
                    <HabitItems
                    habits={habits}
                    setHighlightedDropZoneIndex={setHighlightedDropZoneIndex}
                    habitRefs={habitRefs}
                    timeSlotRefs={timeSlotRefs}
                    />
                )}

				<TimeSlots
					highlightedDropZoneIndex={highlightedDropZoneIndex}
                    timeSlotRefs={timeSlotRefs}
				/>
			</XStack>
		</ScrollView>
	);
}
