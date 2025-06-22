import TaskTimeBox from "@/components/home/ListViewBoxes/TaskTimeBox";
import {VStack} from "@/components/ui/vstack";
import {parseEstimatedDurationAsString, parseStartEndTime} from "@/lib/dateUtils";
import {Task} from "@/prisma/generated/prisma";

interface ListViewBoxesProps {
    tasks: Task[]
    setRefreshKey: (key: (prev: number) => any) => void;

}
export function ListViewBoxes({tasks, setRefreshKey}: ListViewBoxesProps) {
    return (
        <VStack>
            {tasks.map(({id, title, start, end, estimatedDuration, completed}) => {
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
                        taskComplete={completed}
                        setRefreshKey={setRefreshKey}
                    />
                );
            })}
        </VStack>
    );
}