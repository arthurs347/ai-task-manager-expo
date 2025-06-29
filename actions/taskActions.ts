import {authenticateUser} from "@/actions/authActions";
import {TaskDataEntry} from "@/components/home/CreateTaskPopup/CreateTaskForm";
import {addTimeToDate, convertDurationTimeToMinutes} from "@/utils/dateUtils";
import {Task} from "@/prisma/generated/prisma";
import {Time} from "@internationalized/date";

export type ManualTask = Omit<Task, 'id' | 'completed' | 'priorityCategory' | 'priorityScore' | 'priorityLevel' | 'dueDateTime' | 'isHardDeadline'>
export async function createTaskAction(task: TaskDataEntry){
    const userId = authenticateUser()!.id;

    if (task.automatic) {
        //TODO: Handle automatic task creation logic

    } else {
        const startParsedDate: Date = task.start.toDate();
        const estimatedDurationTime: Time = task.estimatedHoursAndMinutes;
        const parsedEstimatedDuration: number = convertDurationTimeToMinutes(task.estimatedHoursAndMinutes);
        const calculatedEnd = addTimeToDate(startParsedDate, estimatedDurationTime); // Convert minutes to milliseconds

        const taskToCreateData: ManualTask = {
            title: task.title,
            description: task.description,
            start: startParsedDate,
            end: calculatedEnd,
            estimatedDuration: parsedEstimatedDuration,
            isRecurring: task.recurring,
            userId,
        }

        await fetch("api/tasks", {
            method: "POST",
            body: JSON.stringify(taskToCreateData) ,
        });
    }
    // let startParsed: Date = task.start.toDate();
    // let dueDateParsed: Date = task.dueDate.toDate();
    //
    // let taskStart: Date = task.start;
    //
    // const parsedDueDate: Date = task.dueDate;
    // const parsedEstimatedDuration: number = convertDurationTimeToMinutes(task.estimatedHoursAndMinutes)
    // const taskPriorityScore: number = calculateTaskPriorityScore(task);
    // const calculatedPriorityCategory: PriorityCategory = calculateTaskPriorityCategory(taskPriorityScore)
    //
    // const taskToCreateData: Omit<Task, 'id' | 'completed'> = {
    //     title: task.title,
    //     description: task.description,
    //     start: calculatedStart,
    //     end: calculatedEnd,
    //     dueDateTime: parsedDueDate,
    //     estimatedDuration: parsedEstimatedDuration,
    //     isRecurring: task.recurring,
    //     isHardDeadline: task.hardDeadline,
    //     priorityLevel: task.priority,
    //     priorityScore: taskPriorityScore,
    //     priorityCategory: calculatedPriorityCategory,
    //     userId,
    // }
    //
    // await fetch("api/tasks", {
    //     method: "POST",
    //     body: JSON.stringify(taskToCreateData) ,
    // });
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