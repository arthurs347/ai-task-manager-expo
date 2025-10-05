import TaskTimeBox, {type TaskTimeInfo} from "@/components/listViewBoxes/TaskTimeBox";
import {VStack} from "@/components/ui/vstack";

interface ListViewBoxesProps {
	taskTimeInfos: TaskTimeInfo[];
	setRefreshKey: (key: (prev: number) => number) => void;
}
export function ListViewBoxes({
	taskTimeInfos,
	setRefreshKey,
}: ListViewBoxesProps) {
	return (
		<VStack>
			{taskTimeInfos.map((taskTimeInfo: TaskTimeInfo) => {
				return (
					<TaskTimeBox
						key={taskTimeInfo.id}
						taskTimeInfo={taskTimeInfo}
						setRefreshKey={setRefreshKey}
					/>
				);
			})}
		</VStack>
	);
}
