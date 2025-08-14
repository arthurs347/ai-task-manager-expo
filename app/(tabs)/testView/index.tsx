import React, {JSX, useCallback, useState} from "react";
import {LayoutRectangle, StyleSheet, View} from "react-native";
import {Gesture, GestureHandlerRootView} from "react-native-gesture-handler";
import {runOnJS, useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";
import {DropZone} from "../../../modules/testView/components/DropZone";
import {DraggableTestBox} from "../../../modules/testView/components/DraggableTestBox";

export default function TestView(): JSX.Element {
    const isPressed = useSharedValue(false);

    const [dropZoneLayout, setDropZoneLayout] = useState<LayoutRectangle | null>(null);
    const [isBoxHovering, setIsBoxHovering] = useState(false);

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

    const panGesture = Gesture.Pan()
        .onChange((event) => {
            boxTranslateX.value += event.changeX;
            boxTranslateY.value += event.changeY;

            const boxCenterX = BOX_START_X + boxTranslateX.value + BOX_SIZE / 2;
            const boxCenterY = BOX_START_Y + boxTranslateY.value + BOX_SIZE / 2;

            if (dropZoneLayout) {
                const isInside = isPointInsideRectangle(boxCenterX, boxCenterY, dropZoneLayout);
                runOnJS(setIsBoxHovering)(isInside);
            }
        })
        .onEnd(() => {
            boxTranslateX.value = withSpring(0);
            boxTranslateY.value = withSpring(0);
            runOnJS(setIsBoxHovering)(false);
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
                {/*Dropzone*/}
                <DropZone
                    onLayout={(event) => setDropZoneLayout(event.nativeEvent.layout)}
                    isHighlighted={isBoxHovering}
                />
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