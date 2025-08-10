import HabitItem from "@/modules/dayView/components/habitItems/HabitItem";
import type {Habit} from "@/prisma/generated/prisma";

interface HabitItemProps {
    habits: Habit[]
}

export default function HabitItems({ habits }: HabitItemProps) {
    return (
        habits.map((habit) => (
            <HabitItem key={habit.id} habit={habit} />
        ))
    )
}