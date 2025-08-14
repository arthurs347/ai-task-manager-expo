import {useAuth} from "@clerk/clerk-expo";
import {useNavigation} from "@react-navigation/native";
import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {getHabitsAction, getListedTasksAction} from "@/actions/taskActions";
import {HStack} from "@/components/ui/hstack";
import {filterTasksByStartDate, sortTasksByStartDateTime} from "@/utils/taskUtils";
import type {Habit} from "@/prisma/generated/prisma";
import type {ListedTask} from "@/app/api/tasks+api";
import {ScrollView, Text} from "react-native";
import HabitItems from "@/modules/dayView/components/habitItems/HabitItems";
import DayViewHeader from "@/modules/dayView/components/DayViewHeader";
import TimeSlots from "@/modules/plannerView/components/TimeSlots";

export default function PlannerView() {
    const today = new Date();

    const [selectedDay, setSelectedDay] = useState<Date>(today);
    const [refreshKey, setRefreshKey] = useState<number>(0);
    const [displayCreateTaskPopup, setDisplayCreateTaskPopup] = useState(false);
    const [displayQuickAddPopup, setDisplayQuickAddPopup] = useState(false);

    const { isLoaded } = useAuth();
    const navigation = useNavigation();

    const { data, isLoading } = useQuery({
        queryFn: async () => {
            const fetchedTasks: ListedTask[] = await getListedTasksAction();
            const filteredTasks: ListedTask[] = filterTasksByStartDate(fetchedTasks, selectedDay);
            const fetchedHabits: Habit[] = await getHabitsAction();

            return {
                listedTasks: sortTasksByStartDateTime(filteredTasks),
                habits: fetchedHabits
            };
        },
        queryKey: ["tasks", refreshKey, selectedDay],
    })

    const listedTasks = data ? data.listedTasks : null;
    const habits = data ? data.habits : null;

    // For when the tab is pressed, while on dayView reset the selected day to today
    useEffect(() => {
        // @ts-ignore
        return navigation.addListener("tabPress", () => {
            setSelectedDay(new Date());
        });
    }, [navigation]);

    if (!isLoaded) return; // Wait until Clerk is loaded

    return (
        <ScrollView>
            <DayViewHeader selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

            <HStack className="justify-between p-2">
                {isLoading ? (
                    <Text>Loading Habits...</Text>
                ) : habits && habits.length > 0 ? (
                    <HabitItems habits={habits} />
                ) : (
                    <Text className="text-2xl">Create Your First Habit!</Text>
                )
                }
                <TimeSlots/>
            </HStack>
        </ScrollView>
    );
}
