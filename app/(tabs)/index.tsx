import { TaskAndTimeBox } from "@/app/(tabs)/home/_components/TaskAndTimeBox";
import { ISOToDateTimeFormat, sortTasksByStartDateTime } from "@/lib/dateUtils";
import { testTasks } from "@/test/testTasks";
import dayjs from "dayjs";
import { View } from "react-native";
import { YStack } from "tamagui";

export default function Index() {
	console.log(ISOToDateTimeFormat(dayjs().toISOString()));
	const sortedTasks = sortTasksByStartDateTime(testTasks);

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<YStack>
				{sortedTasks.map((task) => JSON.parse(task))}
				<TaskAndTimeBox />
			</YStack>
		</View>
	);
}
