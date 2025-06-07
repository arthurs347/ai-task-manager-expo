import { PriorityLevel } from "@/prisma/generated/prisma";
import {
	Button,
	Checkbox,
	Form,
	Input,
	Label,
	RadioGroup,
	XStack,
} from "tamagui";

export function CreateTaskPopup() {
	function handleCreateTask() {
		alert("Create Task");
	}
	return (
		<Form onSubmit={handleCreateTask}>
			<Label>Task Name</Label>
			<Input />

			<Label>Task Description</Label>
			<Input />

			<RadioGroup>
				<XStack>
					<RadioGroup.Item value={PriorityLevel.LOW}>
						<RadioGroup.Indicator></RadioGroup.Indicator>
					</RadioGroup.Item>
					<RadioGroup.Item value={PriorityLevel.MED}>
						<RadioGroup.Indicator></RadioGroup.Indicator>
					</RadioGroup.Item>
					<RadioGroup.Item value={PriorityLevel.HIGH}>
						<RadioGroup.Indicator></RadioGroup.Indicator>
					</RadioGroup.Item>
					<RadioGroup.Item value={PriorityLevel.CRIT}>
						<RadioGroup.Indicator></RadioGroup.Indicator>
					</RadioGroup.Item>
				</XStack>
			</RadioGroup>

			<XStack>
				<Checkbox>
					<Checkbox.Indicator></Checkbox.Indicator>
				</Checkbox>
				<Label>Recurring?</Label>
			</XStack>

			<XStack>
				<Checkbox>
					<Checkbox.Indicator></Checkbox.Indicator>
				</Checkbox>
				<Label>Hard Deadline?</Label>
			</XStack>

			<Form.Trigger>
				<Button>Create Task</Button>
			</Form.Trigger>
		</Form>
	);
}
