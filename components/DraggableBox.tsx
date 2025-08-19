import React, {type RefObject, useCallback, useEffect} from "react";
import {type LayoutRectangle, StyleSheet, type View} from "react-native";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import Animated, {runOnJS, useAnimatedStyle, useSharedValue, withSpring,} from "react-native-reanimated";

type MeasureLayout = {
    x: number;
    y: number;
    width: number;
    height: number;
}

const BOX_LEFT = 0;
const BOX_TOP = 0;
const BOX_SIZE = 80;

interface DraggableBoxProps {
	children?: React.ReactNode;
    setHighlightedDropZoneIndex: (index: number | null) => void;
    timeSlotRefs: RefObject<(View | null)[]>;
    habitRefs: RefObject<(Animated.View | null)[]>;
    ref: (e: Animated.View | null) => void;
    index: number;
}

const DraggableBox: React.FC<DraggableBoxProps> = (({children, setHighlightedDropZoneIndex, ref, habitRefs, timeSlotRefs, index}) => {
    const [timeSlotLayouts, setTimeSlotLayouts] = React.useState<MeasureLayout[]>([]);
    const [habitLayouts, setHabitLayouts] = React.useState<MeasureLayout[]>([]);
    const [draggableBoxLayout, setDraggableBoxLayout] = React.useState<MeasureLayout | null>(null);

    function getDraggableBoxLayout() {
        const ref: Animated.View | null = habitRefs.current[index];
        ref?.measureInWindow((x, y, width, height) => {
            setDraggableBoxLayout({ x, y, width, height });
        });
    }
    function getTimeSlotRefLayouts() {
        timeSlotRefs.current.map((timeSlotRef) => {
            timeSlotRef?.measureInWindow((x, y, width, height) => {
                setTimeSlotLayouts((prev) => [
                    ...prev,
                    { x, y, width, height },
                ]);
            })
        })
    }
    function getHabitRefLayouts(){
        habitRefs.current.map((habitRef) => {
            habitRef?.measureInWindow((x, y, width, height) => {
                setHabitLayouts((prev) => [
                    ...prev,
                    { x, y, width, height },
                ]);
            })
        })
    }

    useEffect(() => {
        getDraggableBoxLayout();
        getTimeSlotRefLayouts();
        getHabitRefLayouts();
        // Add dependencies as needed
    }, [ habitRefs, timeSlotRefs, index ]);

    const boxTranslateX = useSharedValue(0);
	const boxTranslateY = useSharedValue(0);
	const [isDragging, setIsDragging] = React.useState(false);

	const isBoxInsideTimeSlot = useCallback(
		(pointX: number, pointY: number, rect: LayoutRectangle) => {
			"worklet";
            return (
				pointX >= rect.x &&
				pointX <= rect.x + rect.width &&
				pointY >= rect.y &&
				pointY <= rect.y + rect.height
			);
		},
		[],
	);
    function findHighlightedTimeSlotIndex() {
        "worklet";
        // Adjust for container x offset
        const offsetX = draggableBoxLayout ? draggableBoxLayout.x : 0;
        const offsetY = draggableBoxLayout ? draggableBoxLayout.y : 0;

        const boxCenterX = BOX_LEFT + offsetX + boxTranslateX.value + BOX_SIZE / 2;
        const boxCenterY = BOX_TOP + offsetY + boxTranslateY.value + BOX_SIZE / 2;

        let foundIndex: number | null = null
        timeSlotLayouts.forEach((timeSlotLayout, index) => {
            const boxInsideTimeSlot = isBoxInsideTimeSlot(boxCenterX, boxCenterY, timeSlotLayout)
            if (boxInsideTimeSlot) {
                foundIndex = index
            }
        })
        console.log("Box center (X, Y):", boxCenterX, boxCenterY)
        return foundIndex
    }

	const panGesture = Gesture.Pan()
		.onBegin(() => {
			runOnJS(setIsDragging)(true);
		})
		.onChange((event) => {
			boxTranslateX.value += event.changeX;
			boxTranslateY.value += event.changeY;

            const foundIndex: number | null = findHighlightedTimeSlotIndex()

			runOnJS(setHighlightedDropZoneIndex)(foundIndex);
		})
		.onEnd(() => {
			boxTranslateX.value = withSpring(0);
			boxTranslateY.value = withSpring(0);
			runOnJS(setIsDragging)(false);
            runOnJS(setHighlightedDropZoneIndex)(null);
		});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: boxTranslateX.value },
				{ translateY: boxTranslateY.value },
			],
			position: isDragging ? "absolute" : "relative",
			...(isDragging ? { left: BOX_LEFT, top: BOX_TOP, zIndex: 10 } : {}),
		};
	});

	return (
		<GestureDetector gesture={panGesture}>
			<Animated.View
                ref={ref}
				style={[
					styles.box,
					{ width: BOX_SIZE, height: BOX_SIZE },
					animatedStyle,
				]}
                onLayout={() => {
                    // const ref: Animated.View | null = habitRefs.current[index];
                    // ref?.measureInWindow((x, y, width, height) => {
                    //     console.log(`habitBox-${index}`, x, y, width, height);
                    // })
                }}
			>
				{children}
			</Animated.View>
		</GestureDetector>
	);
});

const styles = StyleSheet.create({
	box: {
		borderRadius: 12,
		backgroundColor: "#f59e42",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 4,
	},
});

export default DraggableBox;
