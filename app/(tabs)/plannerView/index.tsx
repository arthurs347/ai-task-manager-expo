import {ScrollView, View} from "react-native";
import DayHeader from "@/modules/plannerView/components/DayHeader";
import TaskList from "@/modules/plannerView/components/TaskList";
import TimeSlots from "@/modules/plannerView/components/TimeSlots";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sat"];
const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i + 7; // Start from 7:00 AM
    return `${hour}:00`;
});

const tasks = [
    { id: "1", title: "Meeting" },
    { id: "2", title: "Workout" },
    { id: "3", title: "Lunch" },
    { id: "4", title: "Design Review" },
];

const scheduledTasks = [
    { id: "5", title: "Do Laundry", day: "Mon", time: "9:00", duration: 1 }
];

export default function PlannerView() {
    // Only show one day (e.g., first day in days array)
    const day = days[0];
    // Filter scheduledTasks for this day only
    const dayScheduledTasks = scheduledTasks.filter(task => task.day === day);
    return (
        <View className="flex-1 bg-blue-50">
            <DayHeader days={[day]} />
            <View className="flex-row flex-1">
                <TaskList tasks={tasks} />
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TimeSlots days={[day]} timeSlots={timeSlots} scheduledTasks={dayScheduledTasks} />
                </ScrollView>
            </View>
        </View>
    );
}
