import {changeTaskCompletionStatusAction, deleteTaskAction} from "@/actions/taskActions";
import {Card} from "@/components/ui/card";
import {Heading} from "@/components/ui/heading";
import {HStack} from "@/components/ui/hstack";
import {CircleIcon, XIcon} from "lucide-react-native";
import {Button, ButtonIcon} from "@/components/ui/button";
import {TaskType} from "@/components/CreateTaskPopup/CreateTaskForm";

interface TaskBoxProps {
    taskId: string;
    taskName: string;
    taskType: TaskType;
    taskCompleted: boolean;
    setRefreshKey: (key: (prev: number) => any) => void;
}

export default function TaskBox({ taskId, taskName, taskType, taskCompleted, setRefreshKey}: TaskBoxProps) {
    async function handleDeleteTask(){
        await deleteTaskAction(taskId, taskType);
        setRefreshKey((prev) => prev + 1); // Increment refresh key to trigger re-fetching of tasks
   }
   async function handleChangeTaskCompletionStatus() {
        await changeTaskCompletionStatusAction(taskId, taskCompleted, taskType)
        setRefreshKey((prev) => prev + 1); // Increment refresh key to trigger re-fetching of tasks
   }

    return (
        <Card className="w-full">
            <HStack className="gap-2 flex justify-between">
                <Heading className={`${taskCompleted ? "line-through" : ""}`}>{taskName}</Heading>
                <HStack className="gap-2">
                    <Button onPress={handleChangeTaskCompletionStatus}>
                        <ButtonIcon as={CircleIcon}/>
                    </Button>
                    <Button onPress={handleDeleteTask}>
                        <ButtonIcon as={XIcon}/>
                    </Button>
                </HStack>
            </HStack>
        </Card>
    );
}
