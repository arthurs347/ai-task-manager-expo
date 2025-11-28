import {AutomaticTask, Habit, ManualTask} from "@/prisma/generated/client/edge";

export type AnyTask = ManualTask | AutomaticTask | Habit;