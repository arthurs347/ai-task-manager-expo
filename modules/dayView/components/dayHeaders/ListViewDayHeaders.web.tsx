import {HStack} from "@/components/ui/hstack";
import ListViewDayHeader from "@/modules/dayView/components/dayHeaders/ListViewDayHeader";
import {isSameDay} from "@/utils/dateUtils";

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

    console.log("WEB")
    return (
        <HStack className="w-full">
            {currentWeekDays.map((day, idx) => (
                <ListViewDayHeader
                    key={`${keyPrefixes[idx]}-${day.dayName}`}
                    dayDate={day.dayDate}
                    dayName={day.dayName}
                    dayNum={day.dayNum}
                    selected={day.selected}
                    setSelectedDay={setSelectedDay}
                />
            ))}
        </HStack>
    );
}
