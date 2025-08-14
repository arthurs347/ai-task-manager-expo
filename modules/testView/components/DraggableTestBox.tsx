import React from "react";
import {StyleSheet} from "react-native";
import Animated from "react-native-reanimated";
import {GestureDetector} from "react-native-gesture-handler";

interface DraggableBoxProps {
  gesture: any;
  animatedStyle: any;
  left: number;
  top: number;
}

export const DraggableTestBox: React.FC<DraggableBoxProps> = ({ gesture, animatedStyle, left, top }) => (
  <GestureDetector gesture={gesture}>
    <Animated.View
      style={[
        styles.box,
        { left, top },
        animatedStyle
      ]}
    />
  </GestureDetector>
);

const styles = StyleSheet.create({
  box: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#f59e42",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});

