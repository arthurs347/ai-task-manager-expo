import {Habit} from "@/prisma/generated/prisma";
import DraggableBox from "@/components/ui/DraggableBox";

interface QuickAddItemProps {
    quickAddItem: Habit;
}
export default function QuickAddItem({quickAddItem}: QuickAddItemProps) {
    return (
        <DraggableBox/>
    )
}