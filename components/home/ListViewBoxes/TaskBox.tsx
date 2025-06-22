import {changeTaskCompletionStatusAction, deleteTaskAction} from "@/actions/taskActions";
import {Card} from "@/components/ui/card";
import {Heading} from "@/components/ui/heading";
import {HStack} from "@/components/ui/hstack";
import {CircleIcon, XIcon} from "lucide-react-native";
import {Button, ButtonIcon} from "../../ui/button";

interface TaskBoxProps {
    taskId: string;
    taskName: string;
    taskComplete: boolean;
    setRefreshKey: (key: (prev: number) => any) => void;
}

export default function TaskBox({ taskId, taskName, taskComplete, setRefreshKey}: TaskBoxProps) {
    async function handleDeleteTask(){
        await deleteTaskAction(taskId);
        setRefreshKey((prev) => prev + 1); // Increment refresh key to trigger re-fetching of tasks
   }
   async function handleChangeTaskCompletionStatus() {
       await changeTaskCompletionStatusAction(taskId, taskComplete)
       setRefreshKey((prev) => prev + 1); // Increment refresh key to trigger re-fetching of tasks
   }

    return (
        <Card>
            <HStack className="gap-2">
                <Heading className={`${taskComplete ? "line-through" : ""}`}>{taskName}</Heading>
                <Button onPress={handleChangeTaskCompletionStatus}>
                    <ButtonIcon as={CircleIcon}/>
                </Button>
                <Button onPress={handleDeleteTask}>
                    <ButtonIcon as={XIcon}/>
                </Button>
            </HStack>
        </Card>
    );
}
