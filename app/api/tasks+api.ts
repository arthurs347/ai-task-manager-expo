import {StatusCodes} from "http-status-codes";
import {AutomaticEntry, HabitEntry, ManualEntry, TaskEntry} from "@/actions/taskActions";
import {prisma} from "@/lib/prisma";
import {TaskType} from "@/prisma/generated/client/edge";
import {allTypesToListedTask} from "@/utils/taskUtils";
import {AnyTask} from "@/lib/types";

export type ListedTask = {
	id: string;
	title: string;
	description?: string;
	taskType: TaskType;
	start: Date;
	end: Date;
	estimatedDuration: number; // in minutes
	completed: boolean;
};

// creates a new task with given info
export async function POST(request: Request) {
	const taskEntry: TaskEntry & string = await request.json();

	let createdTask: TaskEntry;

	const title = taskEntry.title;
	const description = taskEntry.description;
	const start = taskEntry.start;
	const end = taskEntry.end;
	const estimatedDuration = taskEntry.estimatedDuration;
	const userId = taskEntry.userId;
	const taskType = taskEntry.taskType;

	switch (taskType) {
		case TaskType.MANUAL: {
			const manualEntry: ManualEntry = taskEntry as ManualEntry;
			const isRecurring = manualEntry.isRecurring;

			createdTask = await prisma.manualTask.create({
				data: {
					title,
					description,
					start,
					end,
					estimatedDuration,
					isRecurring,
					user: {
						connect: {
							id: userId,
						},
					},
				},
			});
			break;
		}
		case TaskType.AUTOMATIC:
			return new Response(
				JSON.stringify({ error: "Automatic task not supported" }),
				{
					status: StatusCodes.BAD_REQUEST,
				},
			);
		//TODO: Implement automatic task creation
		case TaskType.HABIT:
			createdTask = await prisma.habit.create({
				data: {
					title,
					description,
					start,
					end,
					estimatedDuration,
					user: {
						connect: {
							id: userId,
						},
					},
				},
			});
			break;
		default:
			return new Response(JSON.stringify({ error: "Invalid task type" }), {
				status: StatusCodes.BAD_REQUEST,
			});
	}

    return new Response(
        JSON.stringify(createdTask),
        {status: StatusCodes.CREATED,}
    );
}

export async function DELETE(request: Request) {
	const url = new URL(request.url);
	const taskId = url.searchParams.get("taskId");
	const taskType = url.searchParams.get("taskType");

	if (!taskId) {
		return new Response(JSON.stringify({ error: "Missing taskId" }), {
			status: StatusCodes.BAD_REQUEST,
		});
	}
	if (!taskType) {
		return new Response(JSON.stringify({ error: "Missing task type" }), {
			status: StatusCodes.BAD_REQUEST,
		});
	}
	switch (taskType) {
		case TaskType.MANUAL:
			await prisma.manualTask.delete({
				where: {
					id: taskId,
				},
			});
			break;
		case TaskType.HABIT:
			await prisma.habit.delete({
				where: {
					id: taskId,
				},
			});
			break;
		case TaskType.AUTOMATIC:
			await prisma.automaticTask.delete({
				where: {
					id: taskId,
				},
			});
			break;
		default:
			return new Response(JSON.stringify({ error: "Invalid task type" }), {
				status: StatusCodes.BAD_REQUEST,
			});
	}

	return new Response(JSON.stringify(taskId), { status: StatusCodes.OK });
}

export async function GET(request: Request) {
	// Get userId from query params
	const url = new URL(request.url);
	const userId = url.searchParams.get("userId");
	const taskType: TaskType | null = url.searchParams.get(
		"taskType",
	) as TaskType;
	let tasksRetrieved: ListedTask[] | AnyTask[] = [];

	if (!userId) {
		return new Response(JSON.stringify({ error: "Missing userId" }), {
			status: StatusCodes.BAD_REQUEST,
		});
	}

	if (!taskType) {
		return new Response(JSON.stringify({ error: "Missing taskType" }), {
			status: StatusCodes.BAD_REQUEST,
		});
	}

	switch (taskType) {
		case TaskType.HABIT: {
			const habits = await prisma.habit.findMany({
				where: {
					userId,
				},
			});

			tasksRetrieved = habits;
			break;
		}
		case TaskType.LISTED: {
			const [manualTasks, habits, automaticTasks] = await Promise.all([
				prisma.manualTask.findMany({
                    where: {
                        userId,
                    }
                }),
				prisma.habit.findMany({
                    where: {
                        userId,
                        currentlyUsed: false,
                    }
                }),
				prisma.automaticTask.findMany({
                    where: {
                        userId,
                    }
                }),
			]);

            tasksRetrieved = allTypesToListedTask(
				manualTasks,
				habits,
				automaticTasks,
			);

			break;
		}
        case TaskType.ANY: {
            const [manualTasks, habits, automaticTasks] = await Promise.all([
                prisma.manualTask.findMany({
                    where: {
                        userId,
                    }
                }),
                prisma.habit.findMany({
                    where: {
                        userId,
                        currentlyUsed: false,
                    }
                }),
                prisma.automaticTask.findMany({
                    where: {
                        userId,
                    }
                }),
            ]);

            tasksRetrieved = [...manualTasks, ...habits, ...automaticTasks];
            break;
        }
		default:
			throw new Error("Invalid task type");
	}

	return new Response(JSON.stringify(tasksRetrieved), {
		status: StatusCodes.OK,
	});
}

export async function PATCH(request: Request) {
	const url = new URL(request.url);
	const taskId = url.searchParams.get("taskId");
	const taskType = url.searchParams.get("taskType");

	if (!taskId) {
		return new Response(JSON.stringify({ error: "Missing taskId" }), {
			status: StatusCodes.BAD_REQUEST,
		});
	}

	if (!taskType) {
		return new Response(JSON.stringify({ error: "Missing task type" }), {
			status: StatusCodes.BAD_REQUEST,
		});
	}
    const taskUpdatedFields: Partial<ManualEntry> | Partial<AutomaticEntry> | Partial<HabitEntry> = await request.json();

	switch (taskType) {
		case TaskType.MANUAL:
			await prisma.manualTask.update({
				where: {
					id: taskId,
				},
				data: {
                    ...taskUpdatedFields
				},
			});
			break;
		case TaskType.HABIT:
            return new Response(JSON.stringify({ error: "Habit task type not implemented yet" }), {
                status: StatusCodes.BAD_REQUEST,
            });
		case TaskType.AUTOMATIC:
            return new Response(JSON.stringify({ error: "Automatic task type not implemented yet" }), {
                status: StatusCodes.BAD_REQUEST,
            });
		default:
			return new Response(JSON.stringify({ error: "Invalid task type" }), {
				status: StatusCodes.BAD_REQUEST,
			});
	}

	return new Response(JSON.stringify(taskId), { status: StatusCodes.OK });
}
