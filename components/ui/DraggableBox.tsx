import React, {useRef} from 'react';
import {Animated, PanResponder, StyleSheet} from 'react-native';

export default function DraggableBox() {
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [null, { dx: pan.x, dy: pan.y }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                // Optionally, snap back to start
                // Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
            },
        })
    ).current;

    return (
        <Animated.View
            style={[styles.box, { transform: pan.getTranslateTransform() }]}
            {...panResponder.panHandlers}
        />
    );
}

const styles = StyleSheet.create({
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'tomato',
        borderRadius: 8,
    },
});