import {authenticateUser} from "@/actions/auth";
import {TaskDataEntry} from "@/components/home/CreateTaskPopup";
import {PriorityCategory, Task} from "@/prisma/generated/prisma";
import {ISOToDateTimeFormat, parseEstimatedDuration} from "@/lib/dateUtils";

function calculateTaskStartAndEnd(task: TaskDataEntry) {
    //TODO: REPLACE WITH ACTUAL LOGIC
    return [ISOToDateTimeFormat(new Date().toISOString())
        , ISOToDateTimeFormat(new Date().toISOString())];
}
function calculateTaskPriorityScore(task: TaskDataEntry) {
    //TODO: REPLACE WITH ACTUAL LOGIC
    return 500;
}
function calculateTaskPriorityCategory(priorityScore: number) {
    //TODO: REPLACE WITH ACTUAL LOGIC
    return PriorityCategory.HIGH
}

export async function createTaskAction(task: TaskDataEntry){
    const userId = authenticateUser().id

    const parsedDueDate = ISOToDateTimeFormat(task.dueDate.toISOString());
    const parsedEstimatedDuration = parseEstimatedDuration(task.estimatedDuration)
    const taskPriorityScore = calculateTaskPriorityScore(task);
    const calculatedPriorityCategory = calculateTaskPriorityCategory(taskPriorityScore)
    const [calculatedStart, calculatedEnd] = calculateTaskStartAndEnd(task);

    const taskToCreateData: Omit<Task, 'id' | 'completed'> = {
        title: task.title,
        description: task.description,
        start: calculatedStart,
        end: calculatedEnd,
        dueDateTime: parsedDueDate,
        estimatedDuration: parsedEstimatedDuration,
        isRecurring: task.recurring,
        isHardDeadline: task.hardDeadline,
        priorityLevel: task.priority,
        priorityScore: taskPriorityScore,
        priorityCategory: calculatedPriorityCategory,
        userId,
    }

    await fetch("api/tasks", {
        method: "POST",
        body: JSON.stringify(taskToCreateData) ,
    });
}