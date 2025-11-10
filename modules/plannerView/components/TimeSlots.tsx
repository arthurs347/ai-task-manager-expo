import {StyleSheet, Text, View} from "react-native";
import {RefObject} from "react";
import {YStack} from "tamagui";

interface TimeSlotsProps {
	highlightedDropZoneIndex: number | null;
    timeSlotRefs: RefObject<(View | null)[]>;
}

export default function TimeSlots({
	highlightedDropZoneIndex,
    timeSlotRefs,

}: TimeSlotsProps) {

    return (
		<YStack>
			{Array.from({ length: 24 }, (_, hour) => (
				<View
					// biome-ignore lint/suspicious/noArrayIndexKey: string will always be unique in this context
                    key={`time-slot-${hour}`}
                    ref={(e: View | null) => { timeSlotRefs.current[hour] = e; }}
                    onLayout={() => {
                        // const ref: View | null = timeSlotRefs.current[hour];
                        // ref?.measureInWindow((x, y, width, height) => {
                        //     console.log(`timeSlot-${hour}`, x, y, width, height);
                        // })
                    }}
					style={[
						styles.timeSlot,
						{
							backgroundColor:
								highlightedDropZoneIndex === hour ? "#3B82F6" : "white",
						},
					]}
				>
					<Text className="text-center text-lg font-medium text-gray-700">
						{hour % 12 === 0 ? 12 : hour % 12} {hour < 12 ? "AM" : "PM"}
					</Text>
				</View>
			))}
        </YStack>
	);
}

const styles = StyleSheet.create({
	timeSlot: {
		flex: 1,
		borderWidth: 1,
		paddingHorizontal: 100,
		paddingVertical: 15,
		borderRadius: 10,
	},
});
