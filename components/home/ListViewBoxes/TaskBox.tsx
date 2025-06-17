import {Card} from "@/components/ui/card";
import {Heading} from "@/components/ui/heading";
import {HStack} from "@/components/ui/hstack";
import {XIcon} from "lucide-react-native";
import {Button, ButtonIcon} from "../../ui/button";
import {deleteTaskAction} from "@/actions/taskActions";

interface TaskBoxProps {
    taskId: string;
    taskName: string;
}

export default function TaskBox({ taskId, taskName}: TaskBoxProps) {
    async function handleDeleteTask(){
        await deleteTaskAction(taskId);
   }
    return (
        <Card>
            <HStack className="gap-20">
                <Heading>{taskName}</Heading>
                <Button onPress={handleDeleteTask}>
                    <ButtonIcon as={XIcon}/>
                </Button>
            </HStack>
        </Card>
    );
}
