import type { LayoutChangeEvent } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { VStack } from "@/components/ui/vstack";

interface TimeSlotsProps {
	onSlotLayout: (
		index: number,
		layout: LayoutChangeEvent["nativeEvent"]["layout"],
	) => void;
	highlightedDropZoneIndex: number | null;
}

export default function TimeSlots({
	onSlotLayout,
	highlightedDropZoneIndex,
}: TimeSlotsProps) {
	return (
		<VStack>
			{Array.from({ length: 24 }, (_, hour) => (
				<View
					// biome-ignore lint/suspicious/noArrayIndexKey: string will always be unique in this context
					key={`time-slot-${hour}`}
					onLayout={(event) => onSlotLayout(hour, event.nativeEvent.layout)}
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
		</VStack>
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
