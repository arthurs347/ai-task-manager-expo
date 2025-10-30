import OpenAI from "openai";
import {StatusCodes} from "http-status-codes";
import {getListedTasksByIds} from "@/actions/taskActions";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function GET(request: Request) {
  const url = new URL(request.url);
  const taskIdsParam = url.searchParams.get("taskIds") || "";
  const userId = url.searchParams.get("userId");
  const taskIds = taskIdsParam ? taskIdsParam.split(",").map(s => s.trim()).filter(Boolean) : [];

  const tasks = await getListedTasksByIds(taskIds, userId);
  console.log("TASKS TO SEND TO OPENAI", tasks);
  const prompt = [
    "Organize the following tasks so they remain on the same calendar day but are scheduled between 08:00 and 22:00." +
    "Preserve each task's duration." +
    "Return only the tasks in JSON format the tasks exactly how it was entered but with different start and end datetimes for each task." +
    "Assume that we should only have tasks from 8AM to 10PM." +
    "When scheduling tasks, only use start times that are exact 30-minute intervals (e.g., 9:00, 9:30, 10:00, etc.). Do not use times like 9:07 or 10:12. Round any proposed time to the nearest 30-minute block." +
    "To adjust for PST time zone, ensure that all task times are shifted +6 hours from their original times." +
    "EX: 8AM maps to 5PM" +
    "If some tasks overlap to the next day after shifting, that is ok.",
    `Tasks JSON:\n${JSON.stringify(tasks)}`,
  ].join("\n\n");

  const response = await openai.responses.create({
    model: "gpt-5-nano",
    input: prompt,
  });

  const text = (response as any).output_text ?? (Array.isArray((response as any).output) ? (response as any).output.map((o: any) => o.content ?? o.text ?? "").join("\n") : JSON.stringify(response));
  console.log("OPEN RESPONSE", text);
  return new Response(text, { status: StatusCodes.OK, headers: { "Content-Type": "text/plain" } });
}