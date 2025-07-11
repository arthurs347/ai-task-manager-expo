import {Text} from "react-native";

interface TaskTimeHeaderProps {
    taskStartTime: string;
    taskEndTime: string;
    taskDuration: string;
}

export default function TaskTimeHeader({ taskStartTime, taskEndTime, taskDuration }: TaskTimeHeaderProps) {
    return(
        <Text className="text-lg text-gray-600">
            {taskStartTime + " - " + taskEndTime + " : " + taskDuration}
        </Text>
    )
}
