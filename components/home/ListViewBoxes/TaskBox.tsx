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
}

export default function TaskBox({ taskId, taskName, taskComplete}: TaskBoxProps) {
    async function handleDeleteTask(){
        await deleteTaskAction(taskId);
   }
   async function handleChangeTaskCompletionStatus() {
       await changeTaskCompletionStatusAction(taskId, taskComplete)
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
