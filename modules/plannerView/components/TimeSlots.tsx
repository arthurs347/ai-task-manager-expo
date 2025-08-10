import {Text, View} from "react-native";

interface ScheduledTask {
  id: string;
  title: string;
  day: string;
  time: string;
  duration: number;
}

interface TimeSlotsProps {
  days: string[];
  timeSlots: string[];
  scheduledTasks: ScheduledTask[];
}

export default function TimeSlots({ days, timeSlots, scheduledTasks }: TimeSlotsProps) {
  const getTaskForTimeSlot = (day: string, time: string) => {
    return scheduledTasks.find(task => task.day === day && task.time === time);
  };

  return (
    <View className="flex-row">
      {days.map((day, dayIndex) => (
        <View key={`${day}-${dayIndex}`} className="w-80 bg-white rounded-3xl mx-2 my-4 shadow-lg">
          {/* Day header */}
          <View className="p-6 border-b border-gray-100">
            <Text className="text-2xl font-bold text-gray-800 text-center">
              {day === "Mon" ? "Monday" : day === "Tue" ? "Tuesday" : day === "Wed" ? "Wednesday" :
               day === "Thu" ? "Thursday" : day === "Fri" ? "Friday" : day === "Sat" ? "Saturday" :
               day === "Sun" ? "Sunday" : day}
            </Text>
          </View>

          {/* Time slots */}
          <View className="p-4">
            {timeSlots.slice(0, 12).map((time, timeIndex) => {
              const task = getTaskForTimeSlot(day === "Mon" ? "Mon" : day, time);
              const displayTime = time.includes(":") ? time : `${time}:00`;

              return (
                <View key={`${day}-${time}`} className="flex-row items-center mb-4">
                  <Text className="text-gray-600 text-lg w-16">{displayTime}</Text>
                  <View className="flex-1 ml-4">
                    {task ? (
                      <View className="bg-blue-500 rounded-2xl px-6 py-3 shadow-md">
                        <Text className="text-white text-lg font-medium">{task.title}</Text>
                      </View>
                    ) : (
                      <View className="h-12" />
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
}
