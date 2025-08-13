import {Text} from "react-native";
import {parseEstimatedDurationAsString} from "@/utils/dateUtils";
import {Box} from "@/components/ui/box";

interface HabitItemProps {
    habitTitle: string
    habitDuration: number // Assuming duration is in minutes
}

export default function HabitItem({ habitTitle, habitDuration }: HabitItemProps) {
    const durationParsed = parseEstimatedDurationAsString(habitDuration)

    return (
        <Box>
            <Text>
                {habitTitle}
                {"    "}
                {`(${durationParsed})`}
            </Text>
        </Box>
    )
}