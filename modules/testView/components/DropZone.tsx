import type React from "react";
import { type LayoutChangeEvent, StyleSheet, View } from "react-native";

interface DropZoneProps {
	onLayout: (event: LayoutChangeEvent) => void;
	isHighlighted: boolean;
}

export const DropZone: React.FC<DropZoneProps> = ({
	onLayout,
	isHighlighted,
}) => (
	<View
		onLayout={onLayout}
		style={[
			styles.dropZone,
			{ backgroundColor: isHighlighted ? "#3B82F6" : "white" },
		]}
	/>
);

const styles = StyleSheet.create({
	dropZone: {
		width: 240,
		height: 110,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: "#e5e7eb",
		marginTop: 120,
	},
});
