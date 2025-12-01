import {useNavigation} from "@react-navigation/native";
import {useQuery} from "@tanstack/react-query";
import {useEffect, useRef, useState} from "react";
import {getAnyTasksAction} from "@/actions/taskActions";
import type {ListedTask} from "@/app/api/tasks+api";
import DayViewHeader from "@/modules/dayView/components/DayViewHeader";
import {filterTasksByStartDate, sortTasksByStartDateTime,} from "@/utils/taskUtils";
import {YStack} from "tamagui";
import {Modalize} from "react-native-modalize";
import CreateTaskPopup from "@/modules/components/createTaskPopup/CreateTaskPopup";
import DayViewBody from "@/modules/dayView/components/DayViewBody";
import {AnyTask} from "@/lib/types";
import EditTaskPopup from "@/modules/components/editTaskPopup/EditTaskPopup";

export default function DayView() {
    // Initialize state variables
	const today = new Date();
	const [selectedDay, setSelectedDay] = useState<Date>(today);
    const [currEditingTask, setCurrEditingTask] = useState<AnyTask | null>(null);
	const [refreshKey, setRefreshKey] = useState<number>(0);
	const navigation = useNavigation();
    const createTaskModalizeRef = useRef<Modalize | null>(null);
    const editTaskModalizeRef = useRef<Modalize | null>(null);

    //Modal control logic
    const onCreateTaskPopupOpen = () => {
        createTaskModalizeRef.current?.open();
    };

    const onCreateTaskPopupClose = () => {
        createTaskModalizeRef.current?.close();
    }

    const onEditTaskPopupOpen = () => {
        editTaskModalizeRef.current?.open();
    };

    const onEditTaskPopupClose = () => {
        editTaskModalizeRef.current?.close();
    }



	// Fetch tasks and habits for the selected day
	let { data, isLoading } = useQuery({
		queryFn: async () => {
			const fetchedTasks: AnyTask[] = await getAnyTasksAction();
			const filteredTasks: AnyTask[] = filterTasksByStartDate(
				fetchedTasks,
				selectedDay,
			) as AnyTask[];

			return {
				listedTasks: sortTasksByStartDateTime(filteredTasks) as AnyTask[],
			};
		},
		queryKey: ["tasks", refreshKey, selectedDay],
	});

    //AI functionality
    //TODO: Restructure to take taskInfos instead of listedTasks
    const [isDayRestructured, setIsDayRestructured] = useState<boolean>(false);
    const [aiTasks, setAiTasks] = useState<ListedTask[]>([]);
    // let listedTasks: ListedTask[] | null = data ? data.listedTasks : null;
    // if (isDayRestructured) {
    //     listedTasks = aiTasks;
    // }

    const taskInfos: AnyTask[] | null = data ? data.listedTasks : null

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
                onEditTaskPopupOpen={onEditTaskPopupOpen}
                onCreateTaskPopupOpen={onCreateTaskPopupOpen}
                taskInfos={taskInfos}
                isDayRestructured={isDayRestructured}
                setIsDayRestructured={setIsDayRestructured}
                setAiTasks={setAiTasks}
                setCurrEditingTask={setCurrEditingTask}
			/>

            <EditTaskPopup
                currEditingTask={currEditingTask}
                setRefreshKey={setRefreshKey}
                onClose={onEditTaskPopupClose}
                modalizeRef={editTaskModalizeRef}

            />

            <CreateTaskPopup
                selectedDay={selectedDay}
                setRefreshKey={setRefreshKey}
                onClose={onCreateTaskPopupClose}
                modalizeRef={createTaskModalizeRef}
            />
        </YStack>
	);
}
