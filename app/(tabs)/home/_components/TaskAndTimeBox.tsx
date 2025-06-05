import {TaskTimeHeader} from "@/app/(tabs)/home/_components/TaskTimeHeader";
import {TaskBox} from "@/app/(tabs)/home/_components/TaskBox";

interface TaskAndTimeBoxProps {
    taskStartTime: string;
    taskEndTime: string;
    taskDuration: string;
}

export function TaskAndTimeBox({taskStartTime, taskEndTime, taskDuration}: TaskAndTimeBoxProps) {
    return (
        <>
        <TaskTimeHeader
            taskStartTime={taskStartTime}
            taskEndTime={taskEndTime}
            taskDuration={taskDuration}
        />
        <TaskBox/>
        </>
    )
}