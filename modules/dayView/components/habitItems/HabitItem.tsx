import {Text} from "react-native";
import {parseEstimatedDurationAsString} from "@/utils/dateUtils";
import {DraggableBox} from "@/components/DraggableBox";

interface HabitItemProps {
    habitTitle: string
    habitDuration: number // Assuming duration is in minutes
}

export default function HabitItem({ habitTitle, habitDuration }: HabitItemProps) {
    const durationParsed = parseEstimatedDurationAsString(habitDuration)

    return (
        <DraggableBox>
            <Text>
                {habitTitle}
                {"    "}
                {`(${durationParsed})`}
            </Text>
        </DraggableBox>
    )
}