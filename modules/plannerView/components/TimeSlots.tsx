import {Text, View} from "react-native";
import {VStack} from "@/components/ui/vstack";

export default function TimeSlots() {
    return (
        <VStack>
            {Array.from({ length: 24 }, (_, hour) => (
                <View key={hour} style={{flex: 1, borderWidth: 1, paddingHorizontal: 100, paddingVertical: 15, borderRadius: 10}}>
                    <Text className="text-center text-lg font-medium text-gray-700">
                        {hour % 12 === 0 ? 12 : hour % 12} {hour < 12 ? 'AM' : 'PM'}
                    </Text>
                </View>
            ))}
        </VStack>
    );
}