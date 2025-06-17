import {prisma} from "@/lib/prisma";
import {Task} from "@/prisma/generated/prisma";

// creates a new task with given info
export async function POST(request: Request) {
		const {
			title,
			description,
			start,
			end,
			dueDateTime,
			estimatedDuration,
			isHardDeadline,
			isRecurring,
			priorityLevel,
			priorityScore,
			priorityCategory,
			userId,
		}: Task & string = await request.json();

		const createdTask = await prisma.task.create({
			data: {
				title,
				description,
				start,
				end,
				dueDateTime,
				estimatedDuration,
				isHardDeadline,
				isRecurring,
				priorityLevel,
				priorityScore,
				priorityCategory,
				user: {
					connect: {
						id: userId!,
					},
				},
			},
		});

		return new Response(JSON.stringify(createdTask), { status: 201 });
}

export async function DELETE(request: Request) {
	const url = new URL(request.url);
	const taskId = url.searchParams.get("taskId");

	console.log(`taskId=${taskId}`);
	await prisma.task.delete({
		where: {
			id: taskId!,
		}
	})

	return new Response(JSON.stringify(taskId), { status: 200 });
}

export async function GET(request: Request) {
    // Get userId from query params
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
        return new Response(JSON.stringify({ error: "Missing userId" }), { status: 400 });
    }

    const tasks = await prisma.task.findMany({
        where: {
            userId: userId,
        }
    });

    return new Response(JSON.stringify(tasks), { status: 200, });
}
