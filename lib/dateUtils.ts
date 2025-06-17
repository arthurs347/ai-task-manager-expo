import {DATETIME_FORMAT, DURATION_FORMAT} from "@/lib/constants";
import {Task} from "@/prisma/generated/prisma";
import dayjs from "dayjs";

export function ISOToDateTimeFormat(dateTime: string) {
	return dayjs(dateTime).format(DATETIME_FORMAT);
}

export function ISOToDurationFormat(dateTime: string) {
	return dayjs(dateTime).format(DURATION_FORMAT);
}

export function parseEstimatedDuration(duration: Date): number {
	const hours = duration.getHours();
	const minutes = duration.getMinutes();
	return hours * 60 + minutes; // Convert to total minutes
}

export function sortTasksByStartDateTime(tasks: Task[]): Task[] {
	return [...tasks].sort((a, b) => {
		const aTime = a.start ? dayjs(a.start, DATETIME_FORMAT) : dayjs(0);
		const bTime = b.start ? dayjs(b.start, DATETIME_FORMAT) : dayjs(0);
		return aTime.valueOf() - bTime.valueOf();
	});
}

// Assuming estimatedDuration is in minutes
export function parseEstimatedDurationAsString(estimatedDuration: number): string {
	const days = Math.floor(estimatedDuration / (60 * 24));
	const hours = Math.floor((estimatedDuration % (60 * 24)) / 60);
	const minutes = estimatedDuration % 60;
	return `${days}:${hours}:${minutes}`;
}

export function parseStartEndTime(start: Date, end: Date){
	const startTimeParsed = dayjs(start).format(DATETIME_FORMAT);
	const endTimeParsed = dayjs(end).format(DATETIME_FORMAT);
	return { startTimeParsed, endTimeParsed };
}