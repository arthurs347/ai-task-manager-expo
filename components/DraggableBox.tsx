import {StyleSheet} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import {Card} from "@/components/ui/card";

interface DraggableBoxProps {
    children: React.ReactNode;
}

export const DraggableBox: React.FC<DraggableBoxProps> = ({children}: DraggableBoxProps) => {
    const isPressed = useSharedValue(false);
    const offset = useSharedValue({ x: 0, y: 0 });

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: offset.value.x },
                { translateY: offset.value.y },
                { scale: withSpring(isPressed.value ? 1.2 : 1) },
            ],
        };
    });

    const start = useSharedValue({ x: 0, y: 0 });
    const gesture = Gesture.Pan()
        .onBegin(() => {
            isPressed.value = true;
        })
        .onUpdate((e) => {
            offset.value = {
                x: e.translationX + start.value.x,
                y: e.translationY + start.value.y,
            };
        })
        .onEnd(() => {
            start.value = {
                x: offset.value.x,
                y: offset.value.y,
            };
            isPressed.value = false;
        })

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View
                style={[styles.box, animatedStyles]}
            >
                <Card className="h-full">
                    {children}
                </Card>
            </Animated.View>
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    box: {
        height: 60,
        width: 150,
        borderRadius: 8,
        borderWidth: 2,
        zIndex: 100, // ensures it's on top
    },
});