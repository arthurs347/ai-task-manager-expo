import {DATETIME_FORMAT, DURATION_FORMAT} from "@/lib/constants";
import {Task} from "@/prisma/generated/prisma";
import dayjs from "dayjs";
import {TimeValue} from "@react-types/datepicker";
import {Time, ZonedDateTime} from "@internationalized/date";

export function ISOToDateTimeFormat(dateTime: string) {
	return dayjs(dateTime).format(DATETIME_FORMAT);
}

export function ISOToDurationFormat(dateTime: string) {
	return dayjs(dateTime).format(DURATION_FORMAT);
}

export function convertDurationTimeToMinutes(duration: TimeValue): number {
	const hours = duration.hour;
	const minutes = duration.minute;
	return hours * 60 + minutes; // Convert to total minutes
}

export function convertDurationDateToMinutes(duration: Date): number {
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
	const hours = Math.floor((estimatedDuration % (60 * 24)) / 60);
	const minutes = estimatedDuration % 60;

	let parsedString = ""
	if (hours > 0) {
		parsedString += `${hours}h `;
	}
	if (minutes > 0) {
		parsedString += `${minutes}m`;
	}
	return parsedString;
}



export function parseStartEndTime(start: Date, end: Date){
	const startTimeParsed = dayjs(start).format(DATETIME_FORMAT);
	const endTimeParsed = dayjs(end).format(DATETIME_FORMAT);
	return { startTimeParsed, endTimeParsed };
}

export function isSameDay(date1: Date, date2: Date): boolean {
	return dayjs(date1).isSame(dayjs(date2), 'day');
}


export function addTimeToDate(date: Date, time: Time): Date {
	const timeMs = (time.hour * 60 * 60 * 1000) +
		(time.minute * 60 * 1000) +
		(time.second * 1000) +
		(time.millisecond || 0);
	return new Date(date.getTime() + timeMs);
}

export function toZonedTime(date: Date, timeZone: string): ZonedDateTime {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const offset = date.getTimezoneOffset() * 60 * 1000; // Convert to milliseconds
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();
	const millisecond = date.getMilliseconds();

	return new ZonedDateTime(year, month, day, timeZone, offset, hour, minute, second, millisecond);
}
export function fromZonedTime(zonedDateTime: ZonedDateTime): Date {
	const { year, month, day, hour, minute, second, millisecond } = zonedDateTime;
	return new Date(Date.UTC(year, month - 1, day, hour, minute, second, millisecond));
}