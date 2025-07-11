import {Task} from "@/prisma/generated/prisma";
import DraggableBox from "@/components/ui/DraggableBox";

interface QuickAddItemProps {
    quickAddItem: Task
}
export default function QuickAddItem({quickAddItem}: QuickAddItemProps) {
    return (
        <DraggableBox/>
    )
}