import ListViewDayHeader from "@/components/home/DayHeaders/ListViewDayHeader";
import {HStack} from "../../ui/hstack";

interface ListViewDayHeadersProps {
    dayIndex: number;
    setDayIndex: (index: number) => void;
}
export default function ListViewDayHeaders({dayIndex, setDayIndex}: ListViewDayHeadersProps) {
    const today = new Date();
    // Helper to get all days of the current week (Sunday to Saturday)
    function getCurrentWeekDays() {
        const currentDay = today.getDay(); // 0 (Sun) - 6 (Sat)
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - currentDay); // Set to Sunday

        const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
        return daysOfWeek.map((dayName, idx) => {
            const date = new Date(weekStart);
            date.setDate(weekStart.getDate() + idx);
            return {
                dayName,
                dayNum: date.getDate(),
                isToday:
                    date.getDate() === today.getDate() &&
                    date.getMonth() === today.getMonth() &&
                    date.getFullYear() === today.getFullYear(),
                selected: date.getDay() === dayIndex,
            };
        });
    }
    const currentWeekDays = getCurrentWeekDays();

    return (
        <HStack className="w-full">
            {currentWeekDays.map((day, index) => (
                <ListViewDayHeader
                    key={day.dayName}
                    dayName={day.dayName}
                    dayNum={day.dayNum}
                    selected={day.selected}
                    dayIndex={index}
                    setDayIndex={setDayIndex}
                />
            ))}
        </HStack>
    );
}