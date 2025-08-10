import {Text, View} from "react-native";

interface DayHeaderProps {
  days: string[];
}

export default function DayHeader({ days }: DayHeaderProps) {
  return (
    <View className="flex-row bg-gray-100 py-4">
      <View className="w-20" />
      {days.map((day, index) => (
        <View key={`${day}-${index}`} className="flex-1 px-4">
          <Text className="text-center text-lg font-medium text-gray-700">{day}</Text>
        </View>
      ))}
    </View>
  );
}
