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
