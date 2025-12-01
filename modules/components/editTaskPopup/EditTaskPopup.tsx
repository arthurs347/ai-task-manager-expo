import EditTaskForm from "./EditTaskForm";
import {View} from "react-native";
import {Button, Header, Separator, Text, YStack} from "tamagui";
import {Modalize} from "react-native-modalize";
import type React from "react";
import {AnyTask} from "@/lib/types";

interface EditTaskPopupProps {
    currEditingTask: AnyTask | null;
    onClose: () => void;
    setRefreshKey: (key: (prev: number) => number) => void;
    modalizeRef: React.RefObject<Modalize | null>;
}

export default function EditTaskPopup({
                                          currEditingTask,
                                            onClose,
                                            setRefreshKey,
                                            modalizeRef
                                        }: EditTaskPopupProps) {
    if (!currEditingTask) return null;

    return (
        <>
            {/*//TODO: Fix, temp fix: currently h-full view prevents Modal from having white background*/}
            <View className="h-full"/>

            <Modalize
                modalHeight={850}
                ref={modalizeRef}
                HeaderComponent={
                    <Header>
                        <Text fontSize="$9" pl="$2" mt="$1">Edit Task</Text>
                    </Header>
                }
            >
                <View
                    className="rounded-2xl bg-white"
                    style={{ backgroundColor: "#ffffff" }} // force opaque white
                >
                    <YStack px="$2" gap="$1.5">

                        <Separator my={7} />

                        <EditTaskForm
                            currEditingTask={currEditingTask}
                            setRefreshKey={setRefreshKey}
                            onClose={onClose}
                        />

                        <Button
                            onPress={onClose}
                            className="flex-1"
                        >
                            Close
                        </Button>
                    </YStack>

                </View>
            </Modalize>
        </>
    );
}
