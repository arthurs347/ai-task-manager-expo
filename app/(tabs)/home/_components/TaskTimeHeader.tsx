import {Header} from "tamagui";

interface TaskTimeHeaderProps {
    taskStartTime: string;
    taskEndTime: string;
    taskDuration: string;
}
export function TaskTimeHeader({taskStartTime, taskEndTime, taskDuration}: TaskTimeHeaderProps) {
    return (
        <Header> </Header>
    )
}