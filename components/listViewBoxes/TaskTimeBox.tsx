import {Text, View} from "react-native";
import type {TaskType} from "@/prisma/generated/prisma/";
import {Card} from "@/components/ui/card";
import {HStack} from "@/components/ui/hstack";
import {Heading} from "@/components/ui/heading";
import {Button, ButtonIcon} from "@/components/ui/button";
import {CircleIcon, XIcon} from "lucide-react-native";
import {changeTaskCompletionStatusAction, deleteTaskAction} from "@/actions/taskActions";

export type TaskTimeInfo = {
    id: string;
    title: string;
    start: string;
    end: string;
    duration: string;
    completed: boolean;
    taskType: TaskType;
}

interface TaskTimeBoxProps {
    taskTimeInfo: TaskTimeInfo;
	setRefreshKey: (key: (prev: number) => number) => void;
}

export default function TaskTimeBox({ taskTimeInfo, setRefreshKey }: TaskTimeBoxProps) {
    const {id, title, start, end, duration, completed, taskType} = taskTimeInfo;
    async function handleDeleteTask() {
        await deleteTaskAction(id, taskType);
        setRefreshKey((prev) => prev + 1); // Increment refresh key to trigger re-fetching of tasks
    }
    async function handleChangeTaskCompletionStatus() {
        await changeTaskCompletionStatusAction(id, completed, taskType);
        setRefreshKey((prev) => prev + 1); // Increment refresh key to trigger re-fetching of tasks
    }

	return (
		<View className="items-start gap-y-2 mt-2\">
            {/*Box Header*/}
            <Text className="text-lg text-gray-600">
                {`${start} - ${end} : ${duration}`}
            </Text>

            {/*Box Body*/}
            <Card className="w-full">
                <HStack className="gap-2 flex justify-between">
                    <Heading className={`${completed ? "line-through" : ""}`}>
                        {title}
                    </Heading>
                    <HStack className="gap-2">
                        <Button onPress={handleChangeTaskCompletionStatus}>
                            <ButtonIcon as={CircleIcon} />
                        </Button>
                        <Button onPress={handleDeleteTask}>
                            <ButtonIcon as={XIcon} />
                        </Button>
                    </HStack>
                </HStack>
            </Card>
		</View>
	);
}
