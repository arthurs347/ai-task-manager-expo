import {Drawer, DrawerBackdrop, DrawerBody, DrawerContent, DrawerHeader,} from "@/components/ui/drawer";
import {Heading} from "../ui/heading";
import {VStack} from "../ui/vstack";

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
			isOpen={displayCreateTaskPopup}
			onClose={() => setDisplayCreateTaskPopup(false)}

        >
            <DrawerBackdrop />
            <DrawerContent className="px-4 py-3 w-[270px] md:w-[300px]">
                <DrawerHeader>
                    <Heading size="md">FILTERS</Heading>
                </DrawerHeader>
                <DrawerBody className="gap-4 mt-0 mb-0">
                    <VStack className="pl-2 py-3">
                    </VStack>
                </DrawerBody>
            </DrawerContent>
            {/*<DrawerBackdrop />*/}
            {/*<DrawerContent className="rounded-2xl">*/}
			{/*	<DrawerHeader className="border-b-2">*/}
			{/*		<Text className="text-2xl">New Task</Text>*/}
			{/*		<DrawerCloseButton></DrawerCloseButton>*/}
			{/*	</DrawerHeader>*/}

			{/*	<DrawerBody>*/}
			{/*		<CreateTaskForm*/}
			{/*			selectedDay={selectedDay}*/}
			{/*			setRefreshKey={setRefreshKey}*/}
			{/*			setDisplayCreateTaskPopup={setDisplayCreateTaskPopup}*/}
			{/*		/>*/}
			{/*	</DrawerBody>*/}
			{/*	<DrawerFooter>*/}
			{/*		<Button*/}
			{/*			onPress={() => {*/}
			{/*				setDisplayCreateTaskPopup(false);*/}
			{/*			}}*/}
			{/*			className="flex-1"*/}
			{/*		>*/}
			{/*			<ButtonText>Close</ButtonText>*/}
			{/*		</Button>*/}
			{/*	</DrawerFooter>*/}
			{/*</DrawerContent>*/}
		</Drawer>
	);
}
