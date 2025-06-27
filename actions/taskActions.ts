import {authenticateUser} from "@/actions/authActions";
import {TaskDataEntry} from "@/components/home/CreateTaskForm";
import {parseEstimatedDuration} from "@/utils/dateUtils";
import {PriorityCategory, Task} from "@/prisma/generated/prisma";

function calculateTaskStartAndEnd(task: TaskDataEntry) {
    //TODO: REPLACE WITH ACTUAL LOGIC
    return [new Date(), new Date()];
}
function calculateTaskPriorityScore(task: TaskDataEntry) {
    //TODO: REPLACE WITH ACTUAL LOGIC
    return 500;
}
function calculateTaskPriorityCategory(priorityScore: number) {
    //TODO: REPLACE WITH ACTUAL LOGIC
    return PriorityCategory.HIGH
}
function calculateTaskDueDateRange() {
    //TODO: REPLACE WITH ACTUAL LOGIC

}
function calculateTaskDueDate() {
    //TODO: REPLACE WITH ACTUAL LOGIC

}

export async function createTaskAction(task: TaskDataEntry){
    const userId = authenticateUser()!.id

    const parsedDueDate: Date = task.dueDate;
    const parsedEstimatedDuration: number = parseEstimatedDuration(task.estimatedDuration)
    const taskPriorityScore: number = calculateTaskPriorityScore(task);
    const calculatedPriorityCategory: PriorityCategory = calculateTaskPriorityCategory(taskPriorityScore)
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

export async function deleteTaskAction(taskId: string) {
    authenticateUser();

    const response = await fetch(`/api/tasks?taskId=${encodeURIComponent(taskId)}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete task");
    }

    return response.json();
}

export async function getTasksAction() {
    const user = authenticateUser();
    const userId = user?.id;
    if (!userId) throw new Error("User not authenticated");

    const response = await fetch(`/api/tasks?userId=${encodeURIComponent(userId)}`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }

    return response.json();
}

export async function changeTaskCompletionStatusAction(taskId: string, taskCompleted: boolean) {
    authenticateUser();

    const response = await fetch(`/api/tasks?taskId=${encodeURIComponent(taskId)}&taskCompleted=${encodeURIComponent(taskCompleted)}`, {
        method: "PATCH",
    });

    if (!response.ok) {
        throw new Error("Failed to change Task Completion Status");
    }
    return response.json();
}