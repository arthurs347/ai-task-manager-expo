import {JSX, useState} from "react";
import {type LayoutRectangle, StyleSheet, View} from "react-native";
import {DropZone} from "@/modules/testView/components/DropZone";
import {DraggableTestBox} from "@/modules/testView/components/DraggableTestBox";

export default function TestView(): JSX.Element {
    // Multiple dropzones
    const dropZones = [0, 1, 2];
    const [dropZoneLayouts, setDropZoneLayouts] = useState<LayoutRectangle[]>([]);
    const [highlightedDropZoneIndex, setHighlightedDropZoneIndex] = useState<number | null>(null);

    // Helper to update a specific dropzone layout by index
    const handleDropZoneLayout = (index: number, layout: LayoutRectangle) => {
        setDropZoneLayouts(prev => {
            const next = [...prev];
            next[index] = layout;
            return next;
        });
    };

    return (
        <View style={styles.root}>
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
                    dropZoneLayouts={dropZoneLayouts}
                    onHighlightChange={setHighlightedDropZoneIndex}
                />
            </View>
        </View>
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