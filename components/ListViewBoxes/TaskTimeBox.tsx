import TaskBox from "@/components/ListViewBoxes/TaskBox";
import TaskTimeHeader from "@/components/ListViewBoxes/TaskTimeHeader";
import {View} from "react-native";

interface TaskAndTimeBoxProps {
    taskId: string;
    taskName: string;
    taskStartTime: string;
    taskEndTime: string;
    taskDuration: string;
    taskComplete: boolean;
    setRefreshKey: (key: (prev: number) => any) => void;
}

export default function TaskTimeBox({taskId, taskName, taskStartTime, taskEndTime, taskDuration, taskComplete, setRefreshKey}: TaskAndTimeBoxProps) {
    return (
        <View className="items-start gap-y-2 mt-2\">
            <TaskTimeHeader
                taskStartTime={taskStartTime}
                taskEndTime={taskEndTime}
                taskDuration={taskDuration}
            />
            <TaskBox taskId={taskId} taskName={taskName} taskComplete={taskComplete} setRefreshKey={setRefreshKey}/>
        </View>
    );
}
