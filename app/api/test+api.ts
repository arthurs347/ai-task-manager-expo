import { StatusCodes } from "http-status-codes";

export async function GET(req: Request) {
	return new Response(`TEST API${req}`, { status: StatusCodes.OK });
}
