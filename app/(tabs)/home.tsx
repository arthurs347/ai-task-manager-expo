import {SignOutButton} from "@/components/auth/SignOutButton";
import CreateTaskPopup from "@/components/home/CreateTaskPopup";
import {HStack} from "@/components/ui/hstack";
import {ISOToDateTimeFormat, sortTasksByStartDateTime} from "@/lib/dateUtils";
import {PriorityCategory, PriorityLevel, Task,} from "@/prisma/generated/prisma";
import {testTasks} from "@/test/testTasks";
import dayjs from "dayjs";
import {Text} from "react-native";

export default function Home() {
    //TODO: Replace with actual task to add
    const taskToAdd: Task = {
        id: "1",
        title: "Sample Task",
        description: "This is a sample task description.",
        priorityLevel: PriorityLevel.MED,
        startCalculated: dayjs().toISOString(),
        endCalculated: dayjs().add(1, "hour").toISOString(),
        dueDateTime: dayjs().add(2, "days").toISOString(),
        estimatedDuration: "01:05:30", // Format: DD:HH:mm
        isHardDeadline: false,
        isRecurring: false,
        userId: "user123",
        priorityScore: 0,
        priorityCategory: PriorityCategory.MED,
        completed: false,
    };

    async function handleCreateTask() {
        await fetch("api/task", {
            method: "POST",
            body: JSON.stringify(taskToAdd),
        });
    }

    console.log(ISOToDateTimeFormat(dayjs().toISOString()));
    const sortedTasks = sortTasksByStartDateTime(testTasks);
    return (
        <HStack
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <SignOutButton/>
            <CreateTaskPopup/>
            {sortedTasks.map((task, index) => (
                <Text key={index}>{task.title}</Text>
            ))}
            {/*<TaskAndTimeBox />*/}
        </HStack>
    );
}
