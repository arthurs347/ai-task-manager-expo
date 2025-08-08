import {Text} from "react-native";
import {Button, ButtonText} from "@/components/ui/button";
import {VStack} from "@/components/ui/vstack";
import {Habit} from "@/prisma/generated/prisma/edge";
import QuickAddList from "@/modules/dayView/components/QuickAddPopup/QuickAddList";

interface QuickAddPopupProps {
    quickAddItems: Habit[];
    displayQuickAddPopup: boolean;
    setDisplayQuickAddPopup: (displayPopup: boolean) => void;
}

export default function QuickAddPopup({ quickAddItems, displayQuickAddPopup, setDisplayQuickAddPopup} : QuickAddPopupProps) {
    return (
        <VStack>
            <Text className="text-2xl border-b-2">Quick Add</Text>
            <QuickAddList quickAddItems={quickAddItems}/>
            <Button
                onPress={() => {
                    setDisplayQuickAddPopup(false)
                }}
            >
                <ButtonText>Close</ButtonText>
            </Button>
        </VStack>
    )
}