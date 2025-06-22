import {Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader} from "@/components/ui/drawer";
import {Text} from "react-native";
import {Button, ButtonText} from "@/components/ui/button";
import CreateTaskForm from "./CreateTaskForm";

interface CreateTaskPopupProps {
    displayCreateTaskPopup: boolean;
    setDisplayCreateTaskPopup: (displayPopup: boolean) => void;
    setRefreshKey: (key: (prev: number) => any) => void;
}

export default function CreateTaskPopup({displayCreateTaskPopup, setDisplayCreateTaskPopup, setRefreshKey}: CreateTaskPopupProps) {
    return (
        <Drawer
            size="md"
            anchor="bottom"
            isOpen={displayCreateTaskPopup}
            onClose={() => setDisplayCreateTaskPopup(false)}
        >
            <DrawerContent
                className="rounded-2xl"
            >
                <DrawerHeader
                    className="border-b-2"
                >
                    <Text className="text-2xl">New Task</Text>
                    <DrawerCloseButton></DrawerCloseButton>
                </DrawerHeader>

                <DrawerBody>
                    <CreateTaskForm
                        setRefreshKey={setRefreshKey}
                        setDisplayCreateTaskPopup={setDisplayCreateTaskPopup}
                    />
                </DrawerBody>
                <DrawerFooter>
                    <Button
                        onPress={() => {
                            setDisplayCreateTaskPopup(false)
                        }}
                        className="flex-1"
                    >
                        <ButtonText>Close</ButtonText>
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}