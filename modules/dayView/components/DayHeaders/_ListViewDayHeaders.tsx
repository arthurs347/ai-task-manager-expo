import React, { useRef } from "react";
import {
	Dimensions,
	type NativeScrollEvent,
	type NativeSyntheticEvent,
	Platform,
	ScrollView,
} from "react-native";
import { HStack } from "@/components/ui/hstack";
import ListViewDayHeader from "@/modules/dayView/components/DayHeaders/ListViewDayHeader";
import { isSameDay } from "@/utils/dateUtils";

interface ListViewDayHeadersProps {
	selectedDay: Date;
	setSelectedDay: (selectedDay: Date) => void;
	handleGoToPreviousWeek: () => void;
	handleGoToNextWeek: () => void;
}
const isWeb = Platform.OS === "web";

const SCREEN_WIDTH = isWeb
	? Dimensions.get("window").width - 100
	: Dimensions.get("window").width;
const SCREEN_OFFSET = SCREEN_WIDTH / 3; // Offset to start in the middle of the week
const PREV_WEEK_OFFSET = SCREEN_WIDTH + SCREEN_OFFSET * 0.5; // Offset for previous week
const NEXT_WEEK_OFFSET = SCREEN_WIDTH + SCREEN_OFFSET * 1.5; // Offset for next week

export default function ListViewDayHeaders({
	selectedDay,
	setSelectedDay,
	handleGoToPreviousWeek,
	handleGoToNextWeek,
}: ListViewDayHeadersProps) {
	const today = new Date();
	const scrollRef = useRef<ScrollView>(null);

	function getCurrentWeekDays(baseDay: Date) {
		const currentDay = baseDay.getDay();
		const weekStart = new Date(baseDay);
		weekStart.setDate(baseDay.getDate() - currentDay);

		const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
		return daysOfWeek.map((dayName, idx) => {
			const date = new Date(weekStart);
			date.setDate(weekStart.getDate() + idx);
			return {
				dayDate: date,
				dayName,
				dayNum: date.getDate(),
				isToday: isSameDay(date, today),
				selected: isSameDay(date, selectedDay),
			};
		});
	}

	const currentWeekDays = getCurrentWeekDays(selectedDay);

	// Handle scroll end to snap to next/prev week
	const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
		const x = e.nativeEvent.contentOffset.x;
		if (x > NEXT_WEEK_OFFSET) {
			handleGoToNextWeek();
		} else if (x < PREV_WEEK_OFFSET) {
			handleGoToPreviousWeek();
		}
		console.log("Ended At:", x);
		console.log("Size:", SCREEN_WIDTH);
		console.log("Prev", PREV_WEEK_OFFSET);
		console.log("Next", NEXT_WEEK_OFFSET);

		// Reset scroll position
		scrollRef.current?.scrollTo({
			x: SCREEN_WIDTH + SCREEN_OFFSET,
			animated: false,
		});
	};

	return (
		<ScrollView
			ref={scrollRef}
			horizontal
			showsHorizontalScrollIndicator={false}
			style={{ width: "100%" }}
			onScrollEndDrag={handleScrollEnd} // Add this line
			contentContainerStyle={{ flexGrow: 1 }}
			contentOffset={{ x: SCREEN_WIDTH + SCREEN_OFFSET, y: 0 }} // Start at the middle
		>
			<HStack style={{ minWidth: SCREEN_WIDTH }}>
				{/* Previous week */}
				{currentWeekDays.map((day) => (
					<ListViewDayHeader
						key={"prev-" + day.dayName}
						dayDate={day.dayDate}
						dayName={day.dayName}
						dayNum={day.dayNum}
						selected={day.selected}
						setSelectedDay={setSelectedDay}
					/>
				))}
			</HStack>

			<HStack
				style={{
					minWidth: SCREEN_WIDTH,
					marginLeft: SCREEN_OFFSET,
					marginRight: SCREEN_OFFSET,
				}}
			>
				{/* Current week */}
				{currentWeekDays.map((day) => (
					<ListViewDayHeader
						key={"curr-" + day.dayName}
						dayDate={day.dayDate}
						dayName={day.dayName}
						dayNum={day.dayNum}
						selected={day.selected}
						setSelectedDay={setSelectedDay}
					/>
				))}
			</HStack>
			<HStack style={{ minWidth: SCREEN_WIDTH }}>
				{/* Next week */}
				{currentWeekDays.map((day) => (
					<ListViewDayHeader
						key={"next-" + day.dayName}
						dayDate={day.dayDate}
						dayName={day.dayName}
						dayNum={day.dayNum}
						selected={day.selected}
						setSelectedDay={setSelectedDay}
					/>
				))}
			</HStack>
		</ScrollView>
	);
}
