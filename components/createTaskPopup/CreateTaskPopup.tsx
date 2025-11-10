import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
} from "@/components/ui/drawer";
import CreateTaskForm from "./CreateTaskForm";
import {Text} from "react-native";
import {Button} from "tamagui";

interface CreateTaskPopupProps {
	selectedDay: Date;
	displayCreateTaskPopup: boolean;
	setDisplayCreateTaskPopup: (displayPopup: boolean) => void;
	setRefreshKey: (key: (prev: number) => number) => void;
}

export default function CreateTaskPopup({
	selectedDay,
	displayCreateTaskPopup,
	setDisplayCreateTaskPopup,
	setRefreshKey,
}: CreateTaskPopupProps) {
	return (
		<Drawer
            size="lg"
            anchor="bottom"
			isOpen={displayCreateTaskPopup}
			onClose={() => setDisplayCreateTaskPopup(false)}

        >
            <DrawerContent
                className="rounded-2xl bg-white"
                style={{ backgroundColor: "#ffffff" }} // force opaque white
            >
				<DrawerHeader className="border-b-2">
					<Text className="text-2xl">New Task</Text>
					<DrawerCloseButton></DrawerCloseButton>
				</DrawerHeader>

				<DrawerBody>
					<CreateTaskForm
						selectedDay={selectedDay}
						setRefreshKey={setRefreshKey}
						setDisplayCreateTaskPopup={setDisplayCreateTaskPopup}
					/>
				</DrawerBody>
				<DrawerFooter>
					<Button
						onPress={() => {
							setDisplayCreateTaskPopup(false);
						}}
						className="flex-1"
					>
						Close
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
