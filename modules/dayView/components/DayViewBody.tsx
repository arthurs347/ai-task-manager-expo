import {type LayoutChangeEvent, LayoutRectangle, Text} from "react-native";
import {ListViewBoxes} from "@/components/ListViewBoxes/ListViewBoxes";
import {HStack} from "@/components/ui/hstack";
import {Button, ButtonIcon} from "@/components/ui/button";
import {PlusIcon} from "lucide-react-native";
import type {ListedTask} from "@/app/api/tasks+api";
import {VStack} from "@/components/ui/vstack";
import HabitItems from "@/modules/dayView/components/habitItems/HabitItems";
import type {Habit} from "@/prisma/generated/prisma";
import React from "react";

export type GestureHandlingInfo = {
    onLayout: (event: LayoutChangeEvent) => void;
    dropZoneLayouts: LayoutRectangle[];
    highlightedDropZoneIndex: number | null;
    onHighlightChange: (index: number | null) => void;
}

interface DayViewBodyProps {
    isLoading: boolean;
    listedTasks: ListedTask[] | null; // Replace with your actual data type
    habits: Habit[] | null
    setRefreshKey: (key: (prev: number) => number) => void;
    setDisplayCreateTaskPopup: (value: boolean) => void;
}
export default function DayViewBody({isLoading, listedTasks, habits, setRefreshKey, setDisplayCreateTaskPopup, gestureHandlingInfo}: DayViewBodyProps) {
    return (
        <HStack>
            {isLoading ? (
                    <Text>Loading Habits...</Text>
                ) : habits && habits.length > 0 ? (
                    <HabitItems habits={habits} />
                ) : (
                    <Text className="text-2xl">Create Your First Habit!</Text>
                )
            }

            <VStack className="flex-1 items-center">
                {isLoading ? (
                        <Text>Loading Tasks...</Text>
                    ) : listedTasks && listedTasks.length > 0 ? (
                        <ListViewBoxes listedTasks={listedTasks} setRefreshKey={setRefreshKey} />
                    ) : (
                        <Text className="text-2xl">Create Your First Task!</Text>
                    )
                }

                <HStack>
                    {/*<Button*/}
                    {/*    onPress={() => setDisplayQuickAddPopup(true)}*/}
                    {/*>*/}
                    {/*    <ButtonIcon as={CloudLightning}/>*/}
                    {/*</Button>*/}
                    <Button onPress={() => setDisplayCreateTaskPopup(true)}>
                        <ButtonIcon as={PlusIcon} />
                    </Button>
                </HStack>

            </VStack>
        </HStack>
    )
}