import HabitItem from "@/modules/dayView/components/habitItems/HabitItem";
import type {Habit} from "@/prisma/generated/prisma";

interface HabitItemProps {
    habits: Habit[]
}

export default function HabitItems({ habits }: HabitItemProps) {
    return (
        habits.map(({id, title, estimatedDuration}: Habit) => (
            <HabitItem key={id} habitTitle={title} habitDuration={estimatedDuration} />
        ))
    )
}