import openai from "@/lib/openai";
import {StatusCodes} from "http-status-codes";
import {getListedTasksByDateAction} from "@/actions/taskActions";
import {ListedTask} from "@/app/api/tasks+api";

export async function GET(request: Request) {
    const url = new URL(request.url);

    const userId = url.searchParams.get("userId");
    const dateISO = url.searchParams.get("date");

    if (!userId || !dateISO) {
        return new Response(
            JSON.stringify({ error: "Missing userId or date parameter" }),
            { status: StatusCodes.BAD_REQUEST }
        );
    }

    const date = new Date(dateISO);

    const tasksToSort: ListedTask[] = await getListedTasksByDateAction(date)

    const response = await openai.responses.create({
        model: "gpt-5-nano",
        input: "Write a short bedtime story about a unicorn.",
    });

    const responseText = response.output_text

    return new Response(
        JSON.stringify(responseText),
        { status: StatusCodes.OK }
    );
}