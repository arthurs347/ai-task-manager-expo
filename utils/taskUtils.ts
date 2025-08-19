/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: Need to complete AI implementations*/
import dayjs from "dayjs";
import type {ListedTask} from "@/app/api/tasks+api";
import type {TaskDataEntry} from "@/components/createTaskPopup/CreateTaskForm";
import {DATETIME_FORMAT} from "@/lib/constants";
import {type AutomaticTask, type Habit, type ManualTask, PriorityCategory, TaskType,} from "@/prisma/generated/prisma";
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
	return PriorityCategory.HIGH;
}
export function calculateTaskDueDateRange() {
	//TODO: REPLACE WITH ACTUAL LOGIC
}
export function calculateTaskDueDate() {
	//TODO: REPLACE WITH ACTUAL LOGIC
}

export function filterTasksByStartDate(tasks: ListedTask[], selectedDay: Date) {
	return tasks.filter((task: ListedTask) => {
		return isSameDay(task.start, selectedDay);
	});
}

export function sortTasksByStartDateTime(tasks: ListedTask[]): ListedTask[] {
	return [...tasks].sort((a, b) => {
		const aTime = a.start ? dayjs(a.start, DATETIME_FORMAT) : dayjs(0);
		const bTime = b.start ? dayjs(b.start, DATETIME_FORMAT) : dayjs(0);
		return aTime.valueOf() - bTime.valueOf();
	});
}

export function manualTaskToListedTask(manualTask: ManualTask): ListedTask {
	return {
		id: manualTask.id,
		title: manualTask.title,
		description: manualTask.description ?? undefined,
		taskType: TaskType.MANUAL,
		start: manualTask.start,
		end: manualTask.end,
		estimatedDuration: manualTask.estimatedDuration,
		completed: manualTask.completed,
	};
}

export function automaticTaskToListedTask(
	automaticTask: AutomaticTask,
): ListedTask {
	return {
		id: automaticTask.id,
		title: automaticTask.title,
		description: automaticTask.description ?? undefined,
		taskType: TaskType.AUTOMATIC,
		start: automaticTask.start,
		end: automaticTask.end,
		estimatedDuration: automaticTask.estimatedDuration,
		completed: automaticTask.completed,
	};
}

export function habitToListedTask(habit: Habit): ListedTask {
	return {
		id: habit.id,
		title: habit.title,
		description: habit.description ?? undefined,
		taskType: TaskType.HABIT,
		start: habit.start,
		end: habit.end,
		estimatedDuration: habit.estimatedDuration,
		completed: habit.completed,
	};
}

export function allTypesToListedTask(
	manualTasks: ManualTask[],
	habits: Habit[],
	automaticTasks: AutomaticTask[],
): ListedTask[] {
	const manualToListed = manualTasks.map(manualTaskToListedTask);
	const habitToListed = habits.map(habitToListedTask);
	const automaticToListed = automaticTasks.map(automaticTaskToListedTask);

	return [...manualToListed, ...habitToListed, ...automaticToListed];
}

export function toListedTask(
	task: ManualTask | AutomaticTask | Habit,
): ListedTask {
	switch (task.taskType) {
		case TaskType.MANUAL:
			return manualTaskToListedTask(task as ManualTask);
		case TaskType.AUTOMATIC:
			return automaticTaskToListedTask(task as AutomaticTask);
		case TaskType.HABIT:
			return habitToListedTask(task as Habit);
		default:
			throw new Error("Invalid task type");
	}
}

export function toListedTasks(
	tasks: (ManualTask | AutomaticTask | Habit)[],
): ListedTask[] {
	return tasks.map(toListedTask);
}
