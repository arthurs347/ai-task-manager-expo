import {useNavigation} from "@react-navigation/native";
import {useQuery} from "@tanstack/react-query";
import {useEffect, useRef, useState} from "react";
import {getHabitsAction, getListedTasksAction} from "@/actions/taskActions";
import type {ListedTask} from "@/app/api/tasks+api";
import DayViewHeader from "@/modules/dayView/components/DayViewHeader";
import type {Habit} from "@/prisma/generated/client/edge";
import {filterTasksByStartDate, sortTasksByStartDateTime,} from "@/utils/taskUtils";
import type {TaskTimeInfo} from "@/modules/components/listViewBoxes/TaskTimeBox";
import {parseEstimatedDurationAsString, parseStartEndTime} from "@/utils/dateUtils";
import {YStack} from "tamagui";
import {Modalize} from "react-native-modalize";
import CreateTaskPopup from "@/modules/components/createTaskPopup/CreateTaskPopup";
import DayViewBody from "@/modules/dayView/components/DayViewBody";

export default function DayView() {
    function listedToTaskTimeInfos(listedTasks: ListedTask[]): TaskTimeInfo[] {
        const taskTimeInfos: TaskTimeInfo[] = [];
        listedTasks.forEach((listedTask: ListedTask) => {
            const { startTimeParsed, endTimeParsed } = parseStartEndTime(
                listedTask.start,
                listedTask.end,
            );
            const durationParsed =
                parseEstimatedDurationAsString(listedTask.estimatedDuration);

            const taskTimeInfo: TaskTimeInfo = {
                ...listedTask,
                start: startTimeParsed,
                end: endTimeParsed,
                duration: durationParsed,
            }

            taskTimeInfos.push(taskTimeInfo);
        })
        return taskTimeInfos;
    }

    // Initialize state variables
	const today = new Date();
	const [selectedDay, setSelectedDay] = useState<Date>(today);
	const [refreshKey, setRefreshKey] = useState<number>(0);
	const navigation = useNavigation();
    const modalizeRef = useRef<Modalize | null>(null);

    //Modal control logic
    const onOpen = () => {
        modalizeRef.current?.open();
    };

    const onClose = () => {
        modalizeRef.current?.close();
    }

	// Fetch tasks and habits for the selected day
	let { data, isLoading } = useQuery({
		queryFn: async () => {
			const fetchedTasks: ListedTask[] = await getListedTasksAction();
			const filteredTasks: ListedTask[] = filterTasksByStartDate(
				fetchedTasks,
				selectedDay,
			);
			const fetchedHabits: Habit[] = await getHabitsAction();

			return {
				listedTasks: sortTasksByStartDateTime(filteredTasks),
				habits: fetchedHabits,
			};
		},
		queryKey: ["tasks", refreshKey, selectedDay],
	});

    //AI functionality
    const [isDayRestructured, setIsDayRestructured] = useState<boolean>(false);
    const [aiTasks, setAiTasks] = useState<ListedTask[]>([]);
    let listedTasks: ListedTask[] | null = data ? data.listedTasks : null;
    if (isDayRestructured) {
        listedTasks = aiTasks;
    }
    const taskTimeInfos: TaskTimeInfo[] | null = listedTasks ? listedToTaskTimeInfos(listedTasks) : null

	// For when the tab is pressed, while on dayView reset the selected day to today
	useEffect(() => {
		// @ts-ignore
		return navigation.addListener("tabPress", () => {
			setSelectedDay(new Date());
		});
	}, [navigation]);

	return (
		<YStack height="max-content" alignItems="center" gap="$2">
			<DayViewHeader
				selectedDay={selectedDay}
				setSelectedDay={setSelectedDay}
			/>

            <DayViewBody
				isLoading={isLoading}
				setRefreshKey={setRefreshKey}
                onOpen={onOpen}
                taskTimeInfos={taskTimeInfos}
                isDayRestructured={isDayRestructured}
                setIsDayRestructured={setIsDayRestructured}
                setAiTasks={setAiTasks}
			/>

            <CreateTaskPopup
                selectedDay={selectedDay}
                setRefreshKey={setRefreshKey}
                onClose={onClose}
                modalizeRef={modalizeRef}
            />
        </YStack>
	);
}
