import {VStack} from "@/components/ui/vstack";
import {Task} from "@/prisma/generated/prisma/index";
import QuickAddItem from "@/components/QuickAddItem/QuickAddItem";

interface QuickAddListProps {
    quickAddItems: Task[]
}

export default function QuickAddList({quickAddItems}: QuickAddListProps) {

    return (
        <VStack>
            {quickAddItems.map((quickAddItem) => <QuickAddItem quickAddItem={quickAddItem} key={quickAddItem.id}/>)}
        </VStack>
    )
}