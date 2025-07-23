import {TaskDataEntry} from "@/components/home/CreateTaskPopup/CreateTaskForm";
import {PriorityCategory} from "@/prisma/generated/prisma/index";
import {isSameDay} from "@/utils/dateUtils";

export function calculateTaskStartAndEnd(task: TaskDataEntry) {
    //TODO: REPLACE WITH ACTUAL LOGIC
    return [new Date(), new Date()];
}
export function calculateTaskPriorityScore(task: TaskDataEntry) {
    //TODO: REPLACE WITH ACTUAL LOGIC
    return 500;
}
export function calculateTaskPriorityCategory(priorityScore: number) {
    //TODO: REPLACE WITH ACTUAL LOGIC
    return PriorityCategory.HIGH
}
export function calculateTaskDueDateRange() {
    //TODO: REPLACE WITH ACTUAL LOGIC

}
export function calculateTaskDueDate() {
    //TODO: REPLACE WITH ACTUAL LOGIC

}

export function filterTasksByStartDate(tasks: TaskDataEntry[], selectedDay: Date) {
    return tasks.filter(task => {
        return isSameDay(task.start, selectedDay);
    });
}