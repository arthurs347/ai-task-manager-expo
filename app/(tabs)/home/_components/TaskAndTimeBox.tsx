import TaskBox from "@/app/(tabs)/home/_components/TaskBox";
import TaskTimeHeader from "@/app/(tabs)/home/_components/TaskTimeHeader";

interface TaskAndTimeBoxProps {
	taskStartTime: string;
	taskEndTime: string;
	taskDuration: string;
}

export default function TaskAndTimeBox({
	taskStartTime,
	taskEndTime,
	taskDuration,
}: TaskAndTimeBoxProps) {
	return (
		<>
			<TaskTimeHeader
				taskStartTime={taskStartTime}
				taskEndTime={taskEndTime}
				taskDuration={taskDuration}
			/>
			<TaskBox />
		</>
	);
}
