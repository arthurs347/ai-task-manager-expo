import openai from "@/lib/openai";
import {StatusCodes} from "http-status-codes";

export async function GET(request: Request) {
    const response = await openai.responses.create({
        model: "gpt-5-nano",
        input: "Write a short bedtime story about a unicorn.",
    });
    const responseText = response.output_text
    return new Response(JSON.stringify(responseText), { status: StatusCodes.OK });
}