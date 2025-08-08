import {VStack} from "@/components/ui/vstack";
import {Habit} from "@/prisma/generated/prisma/edge";
import QuickAddItem from "@/modules/dayView/components/QuickAddItem/QuickAddItem";

interface QuickAddListProps {
    quickAddItems: Habit[]
}

export default function QuickAddList({quickAddItems}: QuickAddListProps) {

    return (
        <VStack>
            {quickAddItems.map((quickAddItem) => <QuickAddItem quickAddItem={quickAddItem} key={quickAddItem.id}/>)}
        </VStack>
    )
}