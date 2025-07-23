import {getTasksAction} from "@/actions/taskActions";
import CreateTaskPopup from "@/components/CreateTaskPopup/_CreateTaskPopup";
import ListViewDayHeaders from "@/components/DayHeaders/_ListViewDayHeaders";
import {_ListViewBoxes} from "@/components/ListViewBoxes/_ListViewBoxes";
import {Button, ButtonIcon} from "@/components/ui/button";
import {VStack} from "@/components/ui/vstack";
import {MONTH_NAMES_FULL, OFFLINE_DEV_MODE} from "@/lib/constants";
import {testTasks} from "@/test/testTasks";
import {ArrowLeft, ArrowRight, PlusIcon} from "lucide-react-native";
import {useEffect, useState} from "react";
import {useAuth} from "@clerk/clerk-expo";
import {HStack} from "@/components/ui/hstack";
import {Text} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {filterTasksByStartDate, sortTasksByStartDateTime} from "@/utils/taskUtils";
import {useQuery} from "@tanstack/react-query";

export default function DayView() {
    const today = new Date();

    const [selectedDay, setSelectedDay] = useState<Date>(today);
    const [refreshKey, setRefreshKey] = useState<number>(0);

    const [displayCreateTaskPopup, setDisplayCreateTaskPopup] = useState(false);
    const [displayQuickAddPopup, setDisplayQuickAddPopup] = useState(false);

    const {isLoaded} = useAuth()
    const navigation = useNavigation();

    const { data, isLoading } = useQuery({
        queryFn: async () => {
            if (OFFLINE_DEV_MODE) {
                const filteredTasks = filterTasksByStartDate(testTasks, selectedDay)
                return sortTasksByStartDateTime(filteredTasks)
            } else {
                const fetchedTasks = await getTasksAction()
                const filteredTasks = filterTasksByStartDate(fetchedTasks, selectedDay)
                return sortTasksByStartDateTime(filteredTasks);
            }
        },
        queryKey: ['tasks', refreshKey, selectedDay],
    })
    // For when the tab is pressed, while on dayView reset the selected day to today
    useEffect(() => {
        // @ts-ignore
        return navigation.addListener('tabPress', () => {
            setSelectedDay(new Date());
        });
    }, [navigation]);

    if (!isLoaded) return; // Wait until Clerk is loaded



    return (
            <VStack className="flex-1 items-center">
                <Text className="text-2xl">{MONTH_NAMES_FULL[selectedDay.getMonth()] + " " + selectedDay.getFullYear()}</Text>
                <HStack className="w-full">
                    <Button onPress={()=> setSelectedDay(new Date(selectedDay.getTime() - 7 * 24 * 60 * 60 * 1000))}>
                        <ButtonIcon as={ArrowLeft}/>
                    </Button>
                    <ListViewDayHeaders selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>
                    <Button onPress={()=> {
                        setSelectedDay(new Date(selectedDay.getTime() + 7 * 24 * 60 * 60 * 1000))
                        console.log(selectedDay)
                    }}>
                        <ButtonIcon as={ArrowRight}/>
                    </Button>
                </HStack>

                {isLoading ? (
                    <Text>Loading...</Text>) :
                    <_ListViewBoxes tasks={data!} setRefreshKey={setRefreshKey}/>
                }
                <HStack>
                    {/*<Button*/}
                    {/*    onPress={() => setDisplayQuickAddPopup(true)}*/}
                    {/*>*/}
                    {/*    <ButtonIcon as={CloudLightning}/>*/}
                    {/*</Button>*/}
                    <Button
                        onPress={() => setDisplayCreateTaskPopup(true)}
                    >
                        <ButtonIcon as={PlusIcon}/>
                    </Button>
                </HStack>


                <CreateTaskPopup selectedDay={selectedDay} setRefreshKey={setRefreshKey} displayCreateTaskPopup={displayCreateTaskPopup} setDisplayCreateTaskPopup={setDisplayCreateTaskPopup}/>
            </VStack>
    );
}