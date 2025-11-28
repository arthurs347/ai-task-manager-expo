import TaskTimeBox from "@/modules/components/taskTimeBoxes/TaskTimeBox";
import {YStack} from "tamagui";
import {AnyTask} from "@/lib/types";

interface TaskTimeBoxesProps {
	taskInfos: AnyTask[];
	setRefreshKey: (key: (prev: number) => number) => void;
    onEditTaskPopupOpen: () => void;
    setCurrEditingTask: (taskInfo: AnyTask) => void;
}
export function TaskTimeBoxes({
                                  taskInfos,
	setRefreshKey,
                                  onEditTaskPopupOpen, setCurrEditingTask
}: TaskTimeBoxesProps) {
	return (
		<YStack>
			{taskInfos.map((taskInfo: AnyTask) => {
				return (
					<TaskTimeBox
						key={taskInfo.id}
                        taskInfo={taskInfo}
						setRefreshKey={setRefreshKey}
                        onEditTaskPopupOpen={onEditTaskPopupOpen}
                        setCurrEditingTask={setCurrEditingTask}
					/>
				);
			})}
		</YStack>
	);
}
