import TaskTimeBox from "@/modules/components/taskTimeBoxes/TaskTimeBox";
import {YStack} from "tamagui";
import {AnyTask} from "@/lib/types";

interface TaskTimeBoxesProps {
	taskInfos: AnyTask[];
	setRefreshKey: (key: (prev: number) => number) => void;
}
export function TaskTimeBoxes({
                                  taskInfos,
	setRefreshKey,
}: TaskTimeBoxesProps) {
	return (
		<YStack>
			{taskInfos.map((taskInfo: AnyTask) => {
				return (
					<TaskTimeBox
						key={taskInfo.id}
                        taskInfo={taskInfo}
						setRefreshKey={setRefreshKey}
					/>
				);
			})}
		</YStack>
	);
}
