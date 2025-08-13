import { Pressable, Text, View } from "react-native";

interface ListViewDayHeaderProps {
	dayDate: Date;
	dayName: string;
	dayNum: number;
	selected: boolean;
	setSelectedDay: (selectedDay: Date) => void;
}

export default function ListViewDayHeader({
	dayDate,
	dayName,
	dayNum,
	selected,
	setSelectedDay,
}: ListViewDayHeaderProps) {
	return (
		<Pressable
			className="flex-1"
			onPress={() => {
				setSelectedDay(dayDate);
			}}
		>
			<View className="items-center" style={{ borderRadius: 20 }}>
				<Text className="font-bold">{dayName}</Text>
				<View
					style={{
						width: 40,
						height: 40,
						borderRadius: 20,
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: selected ? "#007AFF" : "#EEE",
						borderWidth: 1,
						borderColor: "#CCC",
					}}
				>
					<Text
						style={{ fontWeight: "bold", color: selected ? "#FFF" : "#333" }}
					>
						{dayNum}
					</Text>
				</View>
			</View>
		</Pressable>
	);
}
