import DraggableBox from "@/components/ui/DraggableBox";
import type { Habit } from "@/prisma/generated/prisma";

interface QuickAddItemProps {
	quickAddItem: Habit;
}
export default function QuickAddItem({ quickAddItem }: QuickAddItemProps) {
	return <DraggableBox />;
}
