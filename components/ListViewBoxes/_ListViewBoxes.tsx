import { View } from "react-native";
import type { ListedTask } from "@/app/api/tasks+api";
import TaskTimeBox from "@/components/ListViewBoxes/TaskTimeBox";
import { VStack } from "@/components/ui/vstack";
import {
	parseEstimatedDurationAsString,
	parseStartEndTime,
} from "@/utils/dateUtils";

interface ListViewBoxesProps {
	listedTasks: ListedTask[];
	setRefreshKey: (key: (prev: number) => any) => void;
}
export function _ListViewBoxes({
	listedTasks,
	setRefreshKey,
}: ListViewBoxesProps) {
	return (
		<VStack>
			{listedTasks.map((listedTask: ListedTask) => {
				const {
					id,
					title,
					taskType,
					start,
					end,
					estimatedDuration,
					completed,
				} = listedTask;
				const { startTimeParsed, endTimeParsed } = parseStartEndTime(
					start,
					end,
				);
				const taskDurationParsed =
					parseEstimatedDurationAsString(estimatedDuration);

				return (
					<>
						<TaskTimeBox
							key={id}
							taskId={id}
							taskName={title}
							taskType={taskType}
							taskStartTime={startTimeParsed}
							taskEndTime={endTimeParsed}
							taskDuration={taskDurationParsed}
							taskCompleted={completed}
							setRefreshKey={setRefreshKey}
						/>
						<View
							key={id + "divider"}
							className="h-8 w-full border hover:bg-blue-500"
						/>
					</>
				);
			})}
		</VStack>
	);
}
