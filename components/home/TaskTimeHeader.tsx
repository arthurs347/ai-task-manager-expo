import { Header } from "tamagui";

interface TaskTimeHeaderProps {
	taskStartTime: string;
	taskEndTime: string;
	taskDuration: string;
}
export default function TaskTimeHeader({
	taskStartTime,
	taskEndTime,
	taskDuration,
}: TaskTimeHeaderProps) {
	return <Header> </Header>;
}
