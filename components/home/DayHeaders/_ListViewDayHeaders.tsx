import ListViewDayHeader from "@/components/home/DayHeaders/ListViewDayHeader";
import {HStack} from "../../ui/hstack";
import {isSameDay} from "@/utils/dateUtils";

interface ListViewDayHeadersProps {
    selectedDay: Date;
    setSelectedDay: (selectedDay: Date) => void;
}
export default function ListViewDayHeaders({selectedDay, setSelectedDay}: ListViewDayHeadersProps) {
    const today = new Date();
    // Helper to get all days of the week based on selectedDay (Sunday to Saturday)
    function getCurrentWeekDays() {
        const currentDay = selectedDay.getDay(); // 0 (Sun) - 6 (Sat)
        const weekStart = new Date(selectedDay);
        weekStart.setDate(selectedDay.getDate() - currentDay); // Set to Sunday of selected week

        const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
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
    const currentWeekDays = getCurrentWeekDays();

    return (
        <HStack className="w-full">
            {currentWeekDays.map((day) => (
                <ListViewDayHeader
                    key={day.dayName}
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