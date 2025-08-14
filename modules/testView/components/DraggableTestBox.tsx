import React, {useCallback} from "react";
import {LayoutRectangle, StyleSheet} from "react-native";
import Animated, {runOnJS, useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";
import {Gesture, GestureDetector} from "react-native-gesture-handler";

interface DraggableBoxProps {
  dropZoneLayouts: LayoutRectangle[];
  onHighlightChange?: (index: number | null) => void;
  onDrop?: (index: number | null) => void;
  left?: number;
  top?: number;
  boxSize?: number;
}

export const DraggableTestBox: React.FC<DraggableBoxProps> = ({
  dropZoneLayouts,
  onHighlightChange,
  onDrop,
  left = 20,
  top = 20,
  boxSize = 80,
}) => {
  const boxTranslateX = useSharedValue(0);
  const boxTranslateY = useSharedValue(0);

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

      const boxCenterX = left + boxTranslateX.value + boxSize / 2;
      const boxCenterY = top + boxTranslateY.value + boxSize / 2;

      let foundIndex: number | null = null;
      for (let i = 0; i < dropZoneLayouts.length; i++) {
        const layout = dropZoneLayouts[i];
        if (layout && isPointInsideRectangle(boxCenterX, boxCenterY, layout)) {
          foundIndex = i;
          break;
        }
      }
      if (onHighlightChange) runOnJS(onHighlightChange)(foundIndex);
    })
    .onEnd(() => {
      boxTranslateX.value = withSpring(0);
      boxTranslateY.value = withSpring(0);
      if (onHighlightChange) runOnJS(onHighlightChange)(null);
      if (onDrop) runOnJS(onDrop)(null); // You can pass the last hovered index if you want
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: boxTranslateX.value },
      { translateY: boxTranslateY.value }
    ],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          styles.box,
          { left, top, width: boxSize, height: boxSize },
          animatedStyle
        ]}
      />
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  box: {
    position: "absolute",
    borderRadius: 12,
    backgroundColor: "#f59e42",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});
