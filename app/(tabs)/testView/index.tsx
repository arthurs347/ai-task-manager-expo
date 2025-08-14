import React, {JSX, useCallback, useState} from "react";
import {LayoutRectangle, StyleSheet, View} from "react-native";
import {Gesture, GestureHandlerRootView} from "react-native-gesture-handler";
import {runOnJS, useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";
import {DropZone} from "../../../modules/testView/components/DropZone";
import {DraggableTestBox} from "../../../modules/testView/components/DraggableTestBox";

export default function TestView(): JSX.Element {
    const isPressed = useSharedValue(false);

    // Multiple dropzones
    const dropZones = [0, 1, 2];
    const [dropZoneLayouts, setDropZoneLayouts] = useState<LayoutRectangle[]>([]);
    const [highlightedDropZoneIndex, setHighlightedDropZoneIndex] = useState<number | null>(null);

    const boxTranslateX = useSharedValue(0);
    const boxTranslateY = useSharedValue(0);

    const BOX_START_X = 20;
    const BOX_START_Y = 20;
    const BOX_SIZE = 80;

    const isPointInsideRectangle = useCallback((pointX: number, pointY: number, rect: LayoutRectangle) => {
        'worklet';
        return (
            pointX >= rect.x &&
            pointX <= rect.x + rect.width &&
            pointY >= rect.y &&
            pointY <= rect.y + rect.height
        );
    }, []);

    // Helper to update a specific dropzone layout by index
    const handleDropZoneLayout = (index: number, layout: LayoutRectangle) => {
        setDropZoneLayouts(prev => {
            const next = [...prev];
            next[index] = layout;
            return next;
        });
    };

    const panGesture = Gesture.Pan()
        .onChange((event) => {
            boxTranslateX.value += event.changeX;
            boxTranslateY.value += event.changeY;

            const boxCenterX = BOX_START_X + boxTranslateX.value + BOX_SIZE / 2;
            const boxCenterY = BOX_START_Y + boxTranslateY.value + BOX_SIZE / 2;

            let foundIndex: number | null = null;
            for (let i = 0; i < dropZoneLayouts.length; i++) {
                const layout = dropZoneLayouts[i];
                if (layout && isPointInsideRectangle(boxCenterX, boxCenterY, layout)) {
                    foundIndex = i;
                    break;
                }
            }
            runOnJS(setHighlightedDropZoneIndex)(foundIndex);
        })
        .onEnd(() => {
            boxTranslateX.value = withSpring(0);
            boxTranslateY.value = withSpring(0);
            runOnJS(setHighlightedDropZoneIndex)(null);
        });

    const animatedBoxStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: boxTranslateX.value },
            { translateY: boxTranslateY.value }
        ],
    }));

    return (
        <GestureHandlerRootView style={styles.root}>
            <View style={styles.container}>
                {/* Multiple Dropzones */}
                {dropZones.map((_, i) => (
                    <DropZone
                        key={i}
                        onLayout={event => handleDropZoneLayout(i, event.nativeEvent.layout)}
                        isHighlighted={highlightedDropZoneIndex === i}
                    />
                ))}
                {/*Draggable*/}
                <DraggableTestBox
                    gesture={panGesture}
                    animatedStyle={animatedBoxStyle}
                    left={BOX_START_X}
                    top={BOX_START_Y}
                />
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: "#111827" },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
});