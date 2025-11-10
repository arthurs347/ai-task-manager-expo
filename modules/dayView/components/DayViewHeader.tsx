import {ArrowLeft, ArrowRight} from "lucide-react-native";
import {Platform, Text} from "react-native";
import {MONTH_NAMES_FULL} from "@/lib/constants";
import ListViewDayHeaders from "@/modules/dayView/components/dayHeaders/ListViewDayHeaders";
import {Button, XStack} from "tamagui";

interface DayViewHeaderProps {
	selectedDay: Date;
	setSelectedDay: (selectedDay: Date) => void;
}

export default function DayViewHeader({
	selectedDay,
	setSelectedDay,
}: DayViewHeaderProps) {
	function handleGoToPreviousWeek() {
		const prevWeekDayFromToday = new Date(selectedDay);
		prevWeekDayFromToday.setDate(selectedDay.getDate() - 7);
		setSelectedDay(prevWeekDayFromToday);
	}

	function handleGoToNextWeek() {
		const nextWeekFromToday = new Date(selectedDay);
		nextWeekFromToday.setDate(selectedDay.getDate() + 7);
		setSelectedDay(nextWeekFromToday);
	}

	const isWeb = Platform.OS === "web";
	return (
		<>
			<Text className="text-2xl">
				{MONTH_NAMES_FULL[selectedDay.getMonth()] +
					" " +
					selectedDay.getFullYear()}
			</Text>
			<XStack className="w-full">
				{isWeb && (
					<Button onPress={() => handleGoToPreviousWeek()}>
						<ArrowLeft/>
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
						<ArrowRight/>
					</Button>
				)}
			</XStack>
		</>
	);
}
