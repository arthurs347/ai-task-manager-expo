import TaskTimeBox, {type TaskTimeInfo} from "@/modules/components/listViewBoxes/TaskTimeBox";
import {YStack} from "tamagui";

interface ListViewBoxesProps {
	taskTimeInfos: TaskTimeInfo[];
	setRefreshKey: (key: (prev: number) => number) => void;
}
export function ListViewBoxes({
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
