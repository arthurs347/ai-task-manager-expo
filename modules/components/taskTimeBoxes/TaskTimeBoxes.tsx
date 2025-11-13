import TaskTimeBox, {type TaskTimeInfo} from "@/modules/components/taskTimeBoxes/TaskTimeBox";
import {YStack} from "tamagui";

interface ListViewBoxesProps {
	taskTimeInfos: TaskTimeInfo[];
	setRefreshKey: (key: (prev: number) => number) => void;
}
export function TaskTimeBoxes({
	taskTimeInfos,
	setRefreshKey,
}: ListViewBoxesProps) {
	return (
		<YStack>
			{taskTimeInfos.map((taskTimeInfo: TaskTimeInfo) => {
				return (
					<TaskTimeBox
						key={taskTimeInfo.id}
						taskTimeInfo={taskTimeInfo}
						setRefreshKey={setRefreshKey}
					/>
				);
			})}
		</YStack>
	);
}
