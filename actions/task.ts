import {authenticateUser} from "@/actions/auth";
import {TaskDataEntry} from "@/components/home/CreateTaskPopup";
import {PriorityCategory} from "@/prisma/generated/prisma";

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

    const taskPriorityScore = calculateTaskPriorityScore(task);
    const calculatedPriorityCategory = calculateTaskPriorityCategory(taskPriorityScore)

    const taskData = {
        title: task.title,
        description: task.description,
        start: task.start,
        end: task.end,
        recurring: task.recurring,
        hardDeadline: task.hardDeadline,
        priorityLevel: task.priority,
        priorityScore: taskPriorityScore,
        priorityCategory: calculatedPriorityCategory,
        userId,
    }
    await fetch("api/tasks", {
        method: "POST",
        body: JSON.stringify(taskData) ,
    });
}