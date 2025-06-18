import TaskBox from "@/components/home/ListViewBoxes/TaskBox";
import TaskTimeHeader from "@/components/home/ListViewBoxes/TaskTimeHeader";
import {View} from "react-native";

interface TaskAndTimeBoxProps {
    taskId: string;
    taskName: string;
    taskStartTime: string;
    taskEndTime: string;
    taskDuration: string;
    taskComplete: boolean;
}

export default function TaskTimeBox({taskId, taskName, taskStartTime, taskEndTime, taskDuration, taskComplete}: TaskAndTimeBoxProps) {
    return (
        <View className="items-start gap-y-2 mt-2">
            <TaskTimeHeader
                taskStartTime={taskStartTime}
                taskEndTime={taskEndTime}
                taskDuration={taskDuration}
            />
            <TaskBox taskId={taskId} taskName={taskName} taskComplete={taskComplete}/>
        </View>
    );
}
