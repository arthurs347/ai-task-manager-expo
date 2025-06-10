import TaskBox from "@/components/home/TaskBox";
import TaskTimeHeader from "@/components/home/TaskTimeHeader";

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
            <TaskBox/>
        </>
    );
}
