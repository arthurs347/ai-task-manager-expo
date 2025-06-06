import { prisma } from "@/lib/prisma";
import { PriorityCategory, Task } from "@/prisma/generated/prisma";

// gets all tasks with given userId
export async function GET(request: Request) {
	//TODO: Replace with actual userId extraction logic
	const { searchParams } = new URL(request.url);
	const userId = searchParams.get("userId");
	if (!userId) {
		return new Response(JSON.stringify({ error: "Missing userId" }), {
			status: 400,
		});
	}
	try {
		const tasks = await prisma.task.findMany({
			where: { userId },
		});
		return new Response(JSON.stringify(tasks), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: "Failed to fetch tasks" }), {
			status: 500,
		});
	}
}

// creates a new task with given info
export async function POST(request: Request) {
	try {
		const {
			title,
			description,
			priorityLevel,
			startCalculated,
			endCalculated,
			dueDateTime,
			estimatedDuration,
			isHardDeadline,
			isRecurring,
		}: Task = await request.json();

		//TODO: Replace with actual userId extraction logic
		const userId = "e";

		if (!userId) {
			return new Response(JSON.stringify({ error: "Missing userId" }), {
				status: 400,
			});
		}

		const createdTask = await prisma.task.create({
			data: {
				title,
				description,
				priorityLevel,
				priorityScore: 500, // TODO: REPLACE WITH ACTUAL LOGIC
				priorityCategory: PriorityCategory.MED, // TODO: REPLACE WITH ACTUAL LOGIC
				startCalculated,
				endCalculated,
				dueDateTime,
				estimatedDuration,
				isHardDeadline,
				isRecurring,
				user: {
					connect: {
						id: userId,
					},
				},
			},
		});
		console.log("API worked");
		return new Response(JSON.stringify(createdTask), { status: 201 });
	} catch (error) {
		return new Response(JSON.stringify({ error: "Failed to create task" }), {
			status: 500,
		});
	}
}
