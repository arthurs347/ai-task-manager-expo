import {authenticateUser} from "@/actions/authActions";
import {TaskDataEntry, TaskType} from "@/components/CreateTaskPopup/CreateTaskForm";
import {addTimeToDate, convertDurationTimeToMinutes} from "@/utils/dateUtils";
import {AutomaticTask, Habit, ManualTask} from "@/prisma/generated/prisma/edge";
import {Time} from "@internationalized/date";
import axios from "axios";
import {ListedTask} from "@/app/api/tasks+api";

export type ManualEntry = Omit<ManualTask, 'id' | 'completed'>;
export type AutomaticEntry = Omit<AutomaticTask, 'id' | 'completed' | 'priorityCategory' | 'priorityScore' | 'priorityLevel' | 'dueDateTime' | 'isHardDeadline'>;
export type HabitEntry = Omit<Habit, 'id' | 'completed' | 'currentlyUsed'>;

export async function createTaskAction(task: TaskDataEntry){
    const userId = authenticateUser().id;
    const taskType = task.taskType;

    let taskToCreateData: ManualTask | AutomaticTask | HabitEntry;

    const title = task.title;
    const description = task.description;
    const startParsedDate: Date = task.start.toDate();
    const estimatedDurationTime: Time = task.estimatedHoursAndMinutes;
    const parsedEstimatedDurationMinutes: number = convertDurationTimeToMinutes(task.estimatedHoursAndMinutes);
    const calculatedEnd: Date = addTimeToDate(startParsedDate, estimatedDurationTime); // Convert minutes to milliseconds

    switch (taskType) {
        case TaskType.MANUAL:
            const manualTaskToCreateData: ManualEntry = {
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
    axios.post(`/api/tasks?taskType=${encodeURIComponent(taskType)}`, JSON.stringify(taskToCreateData!))
        .then((response) => {
            return response.data as ManualTask | AutomaticTask | HabitEntry;
        })
        .catch((reason) => {
            throw new Error(`Failed to create task: ${reason}`);
        })
}

export async function deleteTaskAction(taskId: string, taskType: TaskType): Promise<string> {
    authenticateUser();
    return axios.delete(`/api/tasks?taskId=${encodeURIComponent(taskId)}&taskType=${encodeURIComponent(taskType)}`)
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

    return axios.get(`/api/tasks?userId=${encodeURIComponent(userId)}`)
        .then(res => {
            return res.data as ListedTask[];
        })
        .catch(() => {
            throw new Error("Failed to fetch tasks");
        });
}

export async function changeTaskCompletionStatusAction(taskId: string, taskCompleted: boolean, taskType: TaskType): Promise<boolean> {
    authenticateUser();

    return axios.patch(`/api/tasks?taskId=${encodeURIComponent(taskId)}&taskCompleted=${encodeURIComponent(taskCompleted)}&taskType=${encodeURIComponent(taskType)}`)
        .then(res => {
            return res.data as boolean
        }).catch((reason) => {
            throw new Error("Failed to change task completion status:" + reason);
        });
}