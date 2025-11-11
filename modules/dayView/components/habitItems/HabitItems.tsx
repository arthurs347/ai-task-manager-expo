import {Text, View} from "react-native";
import DraggableBox from "@/modules/plannerView/components/DraggableBox";
import type {Habit} from "@/prisma/generated/client/edge";
import {parseEstimatedDurationAsString} from "@/utils/dateUtils";
import type {RefObject} from "react";
import type Animated from "react-native-reanimated";

interface HabitItemProps {
    habits: Habit[];
    setHighlightedDropZoneIndex: (index: number | null) => void;
    habitRefs: RefObject<(Animated.View | null)[]>;
    timeSlotRefs: RefObject<(View | null)[]>;
}

export default function HabitItems({
                                       habits, setHighlightedDropZoneIndex, habitRefs, timeSlotRefs}: HabitItemProps) {

    return habits.map(({ id, title, estimatedDuration }: Habit, index) => {
        const durationParsed = parseEstimatedDurationAsString(estimatedDuration);
        // habitRefs.current[0]?.measureInWindow((x, y, width, height) => {
        //     console.log("habit item measureInWindow index-", index, x, y, width, height);
        // });
        return (
            <View key={id} style={{ flexDirection: "row" }}>
                <DraggableBox
                    setHighlightedDropZoneIndex={setHighlightedDropZoneIndex}
                    ref={(e: Animated.View | null) => {habitRefs.current[index] = e;}}
                    timeSlotRefs={timeSlotRefs}
                    habitRefs={habitRefs}
                    index={index}
                >
                    <Text style={{ color: "#222", fontWeight: "bold", marginLeft: 16 }}>
                        {title}
                        {"    "}
                        {`(${durationParsed})`}
                    </Text>
                </DraggableBox>
            </View>
        );
    });
}
