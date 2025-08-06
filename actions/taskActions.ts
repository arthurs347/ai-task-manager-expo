import {authenticateUser} from "@/actions/authActions";
import {TaskDataEntry} from "@/components/CreateTaskPopup/CreateTaskForm";
import {addTimeToDate, convertDurationTimeToMinutes} from "@/utils/dateUtils";
import {AutomaticTask, Habit, ManualTask, TaskType} from "@/prisma/generated/prisma/edge";
import {Time} from "@internationalized/date";
import axios from "axios";
import {ListedTask} from "@/app/api/tasks+api";
import {generateAPIUrl} from "@/utils/apiUtils";

export type ManualEntry = Omit<ManualTask, 'id' | 'completed'>;
export type AutomaticEntry = Omit<AutomaticTask, 'id' | 'completed' | 'priorityCategory' | 'priorityScore' | 'priorityLevel' | 'dueDateTime' | 'isHardDeadline'>;
export type HabitEntry = Omit<Habit, 'id' | 'completed' | 'currentlyUsed'>;
export type TaskEntry = ManualEntry | AutomaticEntry | HabitEntry;

export async function createTaskAction(task: TaskDataEntry){
    const userId: string = authenticateUser().id;
    const taskType: TaskType = task.taskType;

    let taskToCreateData: TaskEntry;

    const title = task.title;
    const description = task.description;
    const startParsedDate: Date = task.start.toDate();
    const estimatedDurationTime: Time = task.estimatedHoursAndMinutes;
    const parsedEstimatedDurationMinutes: number = convertDurationTimeToMinutes(task.estimatedHoursAndMinutes);
    const calculatedEnd: Date = addTimeToDate(startParsedDate, estimatedDurationTime); // Convert minutes to milliseconds

    switch (taskType) {
        case TaskType.MANUAL:
            const manualTaskToCreateData: ManualEntry = {
                taskType: taskType,
                title: title,
                description: description,
                start: startParsedDate,
                end: calculatedEnd,
                estimatedDuration: parsedEstimatedDurationMinutes,
                isRecurring: task.recurring,
                userId,
            }
            taskToCreateData = manualTaskToCreateData;
            break;
        case TaskType.AUTOMATIC:
            //TODO: Implement automatic task creation
            throw new Error("Automatic task creation is not implemented yet");
        case TaskType.HABIT:
            const habitToCreateData: HabitEntry = {
                taskType: taskType,
                title: title,
                description: description,
                start: startParsedDate,
                end: calculatedEnd,
                estimatedDuration: parsedEstimatedDurationMinutes,
                userId,
            }
            taskToCreateData = habitToCreateData;
            break;
        default:
            throw new Error("Invalid task type");
    }
    console.log("API ROUTE", generateAPIUrl("api/tasks"))
    axios.post(generateAPIUrl("/api/tasks"), JSON.stringify(taskToCreateData!))
        .then((response) => {
            return response.data as TaskEntry;
        })
        .catch((reason) => {
            throw new Error(`Failed to create task: ${reason}`);
        })
}

export async function deleteTaskAction(taskId: string, taskType: TaskType): Promise<string> {
    authenticateUser();
    return axios.delete(generateAPIUrl(`/api/tasks?taskId=${encodeURIComponent(taskId)}&taskType=${encodeURIComponent(taskType)}`))
        .then(res => {
            return res.data as string
        })
        .catch(() => {
            throw new Error("Failed to delete task");
        })
}

export async function getListedTasksAction(): Promise<ListedTask[]> {
    const user = authenticateUser();
    const userId = user.id;

    return axios.get(generateAPIUrl(`/api/tasks?userId=${encodeURIComponent(userId)}`))
        .then(res => {
            return res.data as ListedTask[];
        })
        .catch(() => {
            throw new Error("Failed to fetch tasks");
        });
}

export async function changeTaskCompletionStatusAction(taskId: string, taskCompleted: boolean, taskType: TaskType): Promise<boolean> {
    authenticateUser();

    return axios.patch(generateAPIUrl(`/api/tasks?taskId=${encodeURIComponent(taskId)}&taskCompleted=${encodeURIComponent(taskCompleted)}&taskType=${encodeURIComponent(taskType)}`))
        .then(res => {
            return res.data as boolean
        }).catch((reason) => {
            throw new Error("Failed to change task completion status:" + reason);
        });
}