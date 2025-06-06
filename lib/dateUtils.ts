import { DATETIME_FORMAT, DURATION_FORMAT } from "@/lib/constants";
import { Task } from "@/prisma/generated/prisma";
import dayjs from "dayjs";

export function ISOToDateTimeFormat(dateTime: string) {
	return dayjs(dateTime).format(DATETIME_FORMAT);
}

export function ISOToDurationFormat(dateTime: string) {
	return dayjs(dateTime).format(DURATION_FORMAT);
}

export function sortTasksByStartDateTime(tasks: Task[]): Task[] {
	return [...tasks].sort((a, b) => {
		const aTime = a.start ? dayjs(a.start, DATETIME_FORMAT) : dayjs(0);
		const bTime = b.start ? dayjs(b.start, DATETIME_FORMAT) : dayjs(0);
		return aTime.valueOf() - bTime.valueOf();
	});
}
