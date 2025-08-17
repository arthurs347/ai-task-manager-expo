import {HStack} from "@/components/ui/hstack";
import ListViewDayHeader from "@/modules/dayView/components/dayHeaders/ListViewDayHeader";
import {isSameDay} from "@/utils/dateUtils";
import PagerView from "react-native-pager-view";

interface ListViewDayHeadersProps {
	selectedDay: Date;
	setSelectedDay: (selectedDay: Date) => void;
	handleGoToPreviousWeek: () => void;
	handleGoToNextWeek: () => void;
}

export default function ListViewDayHeaders({
	selectedDay,
	setSelectedDay,
    handleGoToPreviousWeek,
    handleGoToNextWeek,
}: ListViewDayHeadersProps) {
    const keyPrefixes = ["prev", "curr", "next"];
	const today = new Date();
    // Calculate previous and next week base days RELATIVE to selectedDay
    const prevWeekBaseDay = new Date(selectedDay);
    prevWeekBaseDay.setDate(selectedDay.getDate() - 7);
    const nextWeekBaseDay = new Date(selectedDay);
    nextWeekBaseDay.setDate(selectedDay.getDate() + 7);

    function getFullWeekDays(baseDay: Date) {
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

	const currentWeekDays = getFullWeekDays(selectedDay);
    const prevWeekDays = getFullWeekDays(prevWeekBaseDay);
    const nextWeekDays = getFullWeekDays(nextWeekBaseDay);

    const allWeekDays = [prevWeekDays, currentWeekDays, nextWeekDays];

	return (
        <PagerView
            key={selectedDay.getTime()}
            style={{ width: "100%", height: 65}}
            initialPage={1}
            onPageSelected={e => {
                const pageIndex = e.nativeEvent.position;
                if (pageIndex === 0) {
                    handleGoToPreviousWeek();
                } else if (pageIndex === 2) {
                    handleGoToNextWeek();
                }
            }}
        >
            {Array.from({length: 3}, (_, i) => (
                <HStack key={`${keyPrefixes[i]}-header`}>
                    {allWeekDays[i].map((day) => (
                        <ListViewDayHeader
                            key={`${keyPrefixes[i]}-${day.dayName}`}
                            dayDate={day.dayDate}
                            dayName={day.dayName}
                            dayNum={day.dayNum}
                            selected={day.selected}
                            setSelectedDay={setSelectedDay}
                        />
                    ))}
                </HStack>
            ))}
        </PagerView>
	);
}
