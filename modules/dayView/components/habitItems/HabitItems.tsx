import type {Habit} from "@/prisma/generated/prisma";
import {parseEstimatedDurationAsString} from "@/utils/dateUtils";
import {DraggableBox} from "@/components/DraggableBox";
import {Text} from "react-native";

interface HabitItemProps {
    habits: Habit[]
}

export default function HabitItems({ habits }: HabitItemProps) {
    return (
        habits.map(({id, title, estimatedDuration}: Habit) => {
            const durationParsed = parseEstimatedDurationAsString(estimatedDuration)

            return(
                <DraggableBox key={id}>
                    <Text>
                        {title}
                        {"    "}
                        {`(${durationParsed})`}
                    </Text>
                </DraggableBox>
        )})
    )
}