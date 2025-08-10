import {Platform, Text} from "react-native";
import {MONTH_NAMES_FULL, WEEK_IN_MS} from "@/lib/constants";
import {HStack} from "@/components/ui/hstack";
import {Button, ButtonIcon} from "@/components/ui/button";
import {ArrowLeft, ArrowRight} from "lucide-react-native";
import ListViewDayHeaders from "@/modules/dayView/components/dayHeaders/_ListViewDayHeaders";

interface DayViewHeaderProps {
    selectedDay: Date;
    setSelectedDay: (selectedDay: Date) => void;
}

export default function DayViewHeader({selectedDay, setSelectedDay}: DayViewHeaderProps) {
    function handleGoToPreviousWeek() {
        setSelectedDay(new Date(selectedDay.getTime() - WEEK_IN_MS));
    }

    function handleGoToNextWeek() {
        setSelectedDay(new Date(selectedDay.getTime() + WEEK_IN_MS));
    }

    const isWeb = Platform.OS === "web";
    return (
        <>
            <Text className="text-2xl">
                {MONTH_NAMES_FULL[selectedDay.getMonth()] +
                    " " +
                    selectedDay.getFullYear()}
            </Text>
            <HStack className="w-full">
                {isWeb && (
                    <Button onPress={() => handleGoToPreviousWeek()}>
                        <ButtonIcon as={ArrowLeft} />
                    </Button>
                )}
                <ListViewDayHeaders
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                    handleGoToPreviousWeek={handleGoToPreviousWeek}
                    handleGoToNextWeek={handleGoToNextWeek}
                />
                {isWeb && (
                    <Button onPress={() => handleGoToNextWeek()}>
                        <ButtonIcon as={ArrowRight} />
                    </Button>
                )}
            </HStack>
        </>
    )
}