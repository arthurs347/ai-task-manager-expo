import type {Habit} from "@/prisma/generated/prisma";
import {parseEstimatedDurationAsString} from "@/utils/dateUtils";
import {DraggableBox} from "@/components/DraggableBox";
import {LayoutRectangle, Text, View} from "react-native";

interface HabitItemProps {
    habits: Habit[]
    dropZoneLayouts: LayoutRectangle[];
    onHighlightChange?: (index: number | null) => void;
}

export default function HabitItems({ habits, dropZoneLayouts, onHighlightChange }: HabitItemProps) {
    return (
        habits.map(({id, title, estimatedDuration}: Habit) => {
            const durationParsed = parseEstimatedDurationAsString(estimatedDuration)

            return(
                <View key={id} style={{ flexDirection: 'row', marginBottom: 12 }}>
                    <DraggableBox
                        dropZoneLayouts={dropZoneLayouts}
                        onHighlightChange={onHighlightChange}
                    >
                        <Text style={{ color: '#222', fontWeight: 'bold', marginLeft: 16 }}>
                            {title}
                            {"    "}
                            {`(${durationParsed})`}
                        </Text>
                    </DraggableBox>
                </View>
        )})
    )
}