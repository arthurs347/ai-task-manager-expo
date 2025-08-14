import React, {useCallback} from "react";
import {LayoutRectangle, StyleSheet} from "react-native";
import Animated, {runOnJS, useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";
import {Gesture, GestureDetector} from "react-native-gesture-handler";

const BOX_LEFT = 20;
const BOX_TOP = 20;
const BOX_SIZE = 80;

interface DraggableBoxProps {
  dropZoneLayouts: LayoutRectangle[];
  onHighlightChange?: (index: number | null) => void;
}

export const DraggableTestBox: React.FC<DraggableBoxProps> = ({
  dropZoneLayouts,
  onHighlightChange,
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

      const boxCenterX = BOX_LEFT + boxTranslateX.value + BOX_SIZE / 2;
      const boxCenterY = BOX_TOP + boxTranslateY.value + BOX_SIZE / 2;

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
          { left: BOX_LEFT, top: BOX_TOP, width: BOX_SIZE, height: BOX_SIZE },
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
