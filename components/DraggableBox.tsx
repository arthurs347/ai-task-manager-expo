import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import {Gesture, GestureDetector} from "react-native-gesture-handler";

export default function DraggableBox() {
    const isPressed = useSharedValue(false);
    const offset = useSharedValue({ x: 0, y: 0 });

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: offset.value.x },
                { translateY: offset.value.y },
                { scale: withSpring(isPressed.value ? 1.2 : 1) },
            ],
            backgroundColor: 'blue',
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
            />
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    box: {
        width: 100,
        height: 100,
        borderRadius: 8,
        zIndex: 100, // ensures it's on top
    },
});