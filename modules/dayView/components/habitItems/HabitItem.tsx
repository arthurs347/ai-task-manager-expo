import DraggableBox from "@/components/DraggableBox";
import type {Habit} from "@/prisma/generated/prisma";

interface HabitItemProps {
    habit: Habit
}

export default function HabitItem({ habit }: HabitItemProps) {
    return <DraggableBox />;
}