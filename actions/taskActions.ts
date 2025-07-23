import {authenticateUser} from "@/actions/authActions";
import {TaskDataEntry} from "@/components/CreateTaskPopup/CreateTaskForm";
import {addTimeToDate, convertDurationTimeToMinutes} from "@/utils/dateUtils";
import {Task} from "@/prisma/generated/prisma/edge";
import {Time} from "@internationalized/date";
import axios from "axios";

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

        axios.post('/api/tasks', JSON.stringify(taskToCreateData))
            .then((response) => {
                return response.data as Task
            })
            .catch((err) => {
                throw new Error("Failed to create task");
            })
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

    return axios.delete(`/api/tasks?taskId=${encodeURIComponent(taskId)}`)
        .then(res => {
            return res.data as string
        })
        .catch(err => {
            throw new Error("Failed to delete task");
        })
}

export async function getTasksAction() {
    const user = authenticateUser();
    const userId = user?.id;
    if (!userId) throw new Error("User not authenticated");

    return axios.get(`/api/tasks?userId=${encodeURIComponent(userId)}`)
        .then(res => {
            return res.data as Task[]
        })
        .catch(err => {
            throw new Error("Failed to fetch tasks");
        });
}

export async function changeTaskCompletionStatusAction(taskId: string, taskCompleted: boolean) {
    authenticateUser();

    return axios.patch(`/api/tasks?taskId=${encodeURIComponent(taskId)}&taskCompleted=${encodeURIComponent(taskCompleted)}`)
        .then(res => {
            return res.data as boolean
        }).catch(err => {
            throw new Error("Failed to change task completion status");
        });
}