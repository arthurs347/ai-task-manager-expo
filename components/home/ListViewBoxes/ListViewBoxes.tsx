import TaskTimeBox from "@/components/home/ListViewBoxes/TaskTimeBox";
import {parseEstimatedDurationAsString, parseStartEndTime} from "@/lib/dateUtils";
import {Task} from "@/prisma/generated/prisma";

interface ListViewBoxesProps {
    tasks: Task[]
}
export function ListViewBoxes({tasks}: ListViewBoxesProps) {
    return (
        <>
            {tasks.map(({id, title, start, end, estimatedDuration}) => {
                const {startTimeParsed, endTimeParsed} = parseStartEndTime(start, end);
                const taskDurationParsed = parseEstimatedDurationAsString(estimatedDuration);

                return (
                    <TaskTimeBox
                        key={id}
                        taskId={id}
                        taskName={title}
                        taskStartTime={startTimeParsed}
                        taskEndTime={endTimeParsed}
                        taskDuration={taskDurationParsed}
                    />
                );
            })}
        </>
    );
}