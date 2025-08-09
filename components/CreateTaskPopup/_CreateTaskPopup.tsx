import { Text } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
} from "@/components/ui/drawer";
import CreateTaskForm from "./CreateTaskForm";

interface CreateTaskPopupProps {
	selectedDay: Date;
	displayCreateTaskPopup: boolean;
	setDisplayCreateTaskPopup: (displayPopup: boolean) => void;
	setRefreshKey: (key: (prev: number) => any) => void;
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
			<DrawerContent className="rounded-2xl">
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
						<ButtonText>Close</ButtonText>
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
