import { VStack } from "@/components/ui/vstack";
import QuickAddItem from "@/modules/dayView/components/QuickAddItem/QuickAddItem";
import type { Habit } from "@/prisma/generated/prisma/edge";

interface QuickAddListProps {
	quickAddItems: Habit[];
}

export default function QuickAddList({ quickAddItems }: QuickAddListProps) {
	return (
		<VStack>
			{quickAddItems.map((quickAddItem) => (
				<QuickAddItem quickAddItem={quickAddItem} key={quickAddItem.id} />
			))}
		</VStack>
	);
}
