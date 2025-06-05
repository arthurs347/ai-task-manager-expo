import { DATETIME_FORMAT, DURATION_FORMAT } from "@/lib/constants";
import { Task } from "@/lib/types";
import dayjs from "dayjs";

export function ISOToDateTimeFormat(dateTime: string) {
	return dayjs(dateTime).format(DATETIME_FORMAT);
}

export function ISOToDurationFormat(dateTime: string) {
	return dayjs(dateTime).format(DURATION_FORMAT);
}

export function sortTasksByStartDateTime(tasks: Task[]): Task[] {
	return [...tasks].sort((a, b) => {
		const aTime = a.startDateTime
			? dayjs(a.startDateTime, DATETIME_FORMAT)
			: dayjs(0);
		const bTime = b.startDateTime
			? dayjs(b.startDateTime, DATETIME_FORMAT)
			: dayjs(0);
		return aTime.valueOf() - bTime.valueOf();
	});
}
