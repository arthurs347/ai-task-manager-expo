import {createTaskAction} from "@/actions/task";
import {Button, ButtonText} from "@/components/ui/button";
import {Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel,} from "@/components/ui/checkbox";
import {FormControl, FormControlLabelText,} from "@/components/ui/form-control";
import {HStack} from "@/components/ui/hstack";
import {Input, InputField} from "@/components/ui/input";
import {Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel,} from "@/components/ui/radio";
import {Textarea, TextareaInput} from "@/components/ui/textarea";
import {PriorityLevel} from "@/prisma/generated/prisma";
import {CheckIcon, CircleIcon} from "lucide-react-native";
import React, {useMemo} from "react";
import {useForm} from "react-hook-form";
import DateTimePicker from '@react-native-community/datetimepicker';

export type TaskDataEntry = {
	title: string;
	description: string;
	start: Date;
	end: Date;
	priority: PriorityLevel;
	recurring: boolean;
	hardDeadline: boolean;
}

export default function CreateTaskPopup() {

	// Memoize defaultValues so it doesn't change on every render
	const defaultValues = useMemo(() => ({
		title: "",
		description: "",
		start: new Date(),
		end: new Date(),
		priority: PriorityLevel.LOW,
		recurring: false,
		hardDeadline: false,
	}), []);

	// Remove useState for formData and use react-hook-form for state management
	const { handleSubmit, watch, setValue } = useForm({ defaultValues });

	async function handleCreateTask(formTaskData: TaskDataEntry) {
		await createTaskAction(formTaskData)

	}

	return (
		<FormControl>
			{/*Task Title*/}
			<FormControlLabelText>Title</FormControlLabelText>
			<Input>
                <InputField
                    value={watch('title')}
                    onChangeText={(title) => setValue('title', title)}
                    placeholder="Enter task name"
                />
            </Input>

			{/*Task Description*/}
			<FormControlLabelText>Description</FormControlLabelText>
			<Textarea id="description">
                <TextareaInput
                    value={watch('description')}
					onChangeText={(description) => setValue('description', description)}
                    placeholder="Enter description"
                />
            </Textarea>

			{/*Start Date*/}
			<FormControlLabelText>Start Date</FormControlLabelText>
			<DateTimePicker
				value={watch('start')}
				mode="datetime"
				display="default"
				onChange={(_, startDate) => startDate && setValue('start', startDate)}
			/>

			{/*End Date*/}
			<FormControlLabelText>End Date</FormControlLabelText>
			<DateTimePicker
				value={watch('end')}
				mode="datetime"
				display="default"
				onChange={(_, endDate) => endDate && setValue('end', endDate)}
			/>

			{/*Priority*/}
			<FormControlLabelText>Priority</FormControlLabelText>
			<RadioGroup
                value={watch('priority')}
				onChange={(priority) => setValue('priority', priority)}
            >
				<HStack
					className="gap-2"
				>
					{Object.values(PriorityLevel).map((level) => (
						<Radio key={level} size="md" value={level}>
							<RadioIndicator>
								<RadioIcon as={CircleIcon} />
							</RadioIndicator>
							<RadioLabel>{level}</RadioLabel>
						</Radio>
					))}
				</HStack>
			</RadioGroup>

			{/*Recurring*/}
			<HStack>
				<Checkbox
					value={"recurring"}
					size="md"
					isChecked={watch('recurring')}
					onChange={(recurring) => setValue('recurring', recurring)}
				>
					<CheckboxIndicator>
						<CheckboxIcon as={CheckIcon} />
					</CheckboxIndicator>
					<CheckboxLabel>Recurring?</CheckboxLabel>
				</Checkbox>
			</HStack>

			{/*Hard Deadline*/}
			<HStack>
				<Checkbox
					value={"hardDeadline"}
					size="md"
					isChecked={watch('hardDeadline')}
					onChange={(hardDeadline) => setValue('hardDeadline', hardDeadline)}
				>
					<CheckboxIndicator>
						<CheckboxIcon as={CheckIcon} />
					</CheckboxIndicator>
					<CheckboxLabel>Hard Deadline?</CheckboxLabel>
				</Checkbox>
			</HStack>

			{/*Submission Button*/}
			<Button onPress={handleSubmit(handleCreateTask)}>
				<ButtonText>Create Task</ButtonText>
			</Button>

			<Button onPress={handleSubmit(handleCreateTask)}>
				<ButtonText>Create User</ButtonText>
			</Button>
		</FormControl>
	);
}