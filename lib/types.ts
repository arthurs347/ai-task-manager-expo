import { PriorityCategory, PriorityLevel } from "@/lib/enums";

export type Task = {
	id: string;
	title: string;
	description?: string;
	priorityLevel?: PriorityLevel;
	priorityScore?: number;
	priorityCategory?: PriorityCategory;
	startDateTime?: string;
	dueDateTime?: string;
	estimatedDuration?: string;
	isHardDeadline?: boolean;
	isRecurring?: boolean;
	completed?: boolean;
};
