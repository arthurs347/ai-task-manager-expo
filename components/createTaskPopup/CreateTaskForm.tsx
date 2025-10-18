import {TimeInput} from "@heroui/date-input";
import {DatePicker} from "@heroui/date-picker";
import {fromDate, Time, type ZonedDateTime} from "@internationalized/date";
import DateTimePicker from "@react-native-community/datetimepicker";
import {Check as CheckIcon, Circle as CircleIcon} from "lucide-react-native";
import {useMemo} from "react";
import {Controller, useForm} from "react-hook-form";
import {Platform} from "react-native";
import {createTaskAction} from "@/actions/taskActions";
import {Button, ButtonText} from "@/components/ui/button";
import {Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel,} from "@/components/ui/checkbox";
import {FormControl, FormControlLabelText,} from "@/components/ui/form-control";
import {HStack} from "@/components/ui/hstack";
import {Input, InputField} from "@/components/ui/input";
import {Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel,} from "@/components/ui/radio";
import {Textarea, TextareaInput} from "@/components/ui/textarea";
import {PriorityLevel, TaskType} from "@/prisma/generated/prisma";
import {addTimeToDate, timeToDate} from "@/utils/dateUtils";

export type TaskDataEntry = {
	title: string;
	description: string;
	start: ZonedDateTime;
	dueDate: ZonedDateTime;
	estimatedHoursAndMinutes: Time;
	priority: PriorityLevel;
	recurring: boolean;
	hardDeadline: boolean;
	taskType: TaskType;
};

interface CreateTaskPopupProps {
	selectedDay: Date;
	setRefreshKey: (key: (prev: number) => number) => void;
	setDisplayCreateTaskPopup: (displayPopup: boolean) => void;
}

export default function CreateTaskPopup({
	selectedDay,
	setRefreshKey,
	setDisplayCreateTaskPopup,
}: CreateTaskPopupProps) {
	// Memoize defaultValues so it doesn't change on every render
	const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const defaultEstimatedHoursAndMinutes = new Time(0, 30);
	const selectedDayPlusDefaultEstimated = addTimeToDate(
		selectedDay,
		defaultEstimatedHoursAndMinutes,
	);

	const defaultValues: TaskDataEntry = useMemo(
		() => ({
			title: "",
			description: "",
			start: fromDate(selectedDay, userTimeZone),
			dueDate: fromDate(selectedDayPlusDefaultEstimated, userTimeZone),
			estimatedHoursAndMinutes: defaultEstimatedHoursAndMinutes,
			priority: PriorityLevel.LOW,
			recurring: false,
			hardDeadline: false,
			taskType: TaskType.MANUAL,
		}),
		[
			defaultEstimatedHoursAndMinutes,
			selectedDay,
			selectedDayPlusDefaultEstimated,
			userTimeZone,
		],
	);

	// Remove useState for formData and use react-hook-form for state management
	const { control, handleSubmit, watch, setValue } = useForm<TaskDataEntry>({
		defaultValues,
	});

	const taskType = watch("taskType");

	async function handleCreateTask(formTaskData: TaskDataEntry) {
		await createTaskAction(formTaskData);
		await new Promise((resolve) => setTimeout(resolve, 200));
		setRefreshKey((prev) => prev + 1); // Increment refresh key to trigger re-fetching of tasks
		setDisplayCreateTaskPopup(false); // Close the popup after task creation
	}

	return (
		<FormControl className="gap-2">
			<HStack className="gap-2 w-full pr-2">
				<Controller
					name="taskType"
					control={control}
					render={({ field: { onChange } }) => (
						<Button
							size="lg"
							onPress={() => onChange(TaskType.MANUAL)}
							className="w-1/2"
							variant={taskType === TaskType.MANUAL ? "solid" : "outline"}
						>
							<ButtonText>Manual</ButtonText>
						</Button>
					)}
				/>
				<Controller
					name="taskType"
					control={control}
					render={({ field: { onChange } }) => (
						<Button
							size="lg"
							onPress={() => onChange(TaskType.HABIT)}
							className="w-1/2"
							variant={taskType === TaskType.HABIT ? "solid" : "outline"}
						>
							<ButtonText>Habit</ButtonText>
						</Button>
					)}
				/>
				<Controller
					name="taskType"
					control={control}
					render={({ field: { onChange } }) => (
						<Button
							size="lg"
							onPress={() => onChange(TaskType.AUTOMATIC)}
							className="w-1/3"
							variant={taskType === TaskType.AUTOMATIC ? "solid" : "outline"}
						>
							<ButtonText>Automatic</ButtonText>
						</Button>
					)}
				/>
			</HStack>
			{/*Task Title*/}
			<FormControlLabelText>Title</FormControlLabelText>
			<Controller
				name="title"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Input>
						<InputField
							value={value}
							onChangeText={onChange}
							placeholder="Enter task name"
						/>
					</Input>
				)}
			/>

			{/*Task Description*/}
			<FormControlLabelText>Description</FormControlLabelText>
			<Controller
				name="description"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Textarea>
						<TextareaInput
							value={value}
							onChangeText={onChange}
							placeholder="Enter description"
						/>
					</Textarea>
				)}
			/>

			{Platform.OS === "ios" || Platform.OS === "android" ? (
				<>
					{/*Mobile Start Date*/}
					<FormControlLabelText>Start Date</FormControlLabelText>
					<Controller
						control={control}
						name="start"
						render={({ field: { onChange, value } }) => (
							<DateTimePicker
								value={value.toDate()}
								onChange={() => {
									onChange(fromDate(value.toDate(), userTimeZone));
								}}
								display="default"
								mode="datetime"
							/>
						)}
					/>

					{/*/!*Mobile Estimated Duration*!/*/}
					<FormControlLabelText>Estimated Duration</FormControlLabelText>
					<Controller
						control={control}
						name="estimatedHoursAndMinutes"
						render={({ field: { onChange, value } }) => (
							<DateTimePicker
								value={timeToDate(value)}
								onChange={() => {
									const timeFromDate = new Time(value.hour, value.minute);
									onChange(timeFromDate);
								}}
								locale={"en-GB"}
								mode="time"
								is24Hour={true} // Explicitly set 24-hour format
							/>
						)}
					/>
				</>
			) : (
				<HStack className="gap-2">
					{/*Web Start Date*/}
					{(taskType === TaskType.MANUAL || taskType === TaskType.HABIT) && (
						<Controller
							control={control}
							name="start"
							render={({ field: { onChange, value } }) => (
								<DatePicker
									hideTimeZone
									showMonthAndYearPickers
									value={value}
									label="Start Date"
									variant="bordered"
									onChange={onChange}
								/>
							)}
						/>
					)}

					{/*Web Due Date*/}
					{taskType === TaskType.AUTOMATIC && (
						<Controller
							control={control}
							name="dueDate"
							render={({ field: { onChange, value } }) => (
								<DatePicker
									hideTimeZone
									showMonthAndYearPickers
									value={value}
									label="Due Date"
									variant="bordered"
									onChange={onChange}
								/>
							)}
						/>
					)}

					{/*Web Estimated Duration*/}
					<Controller
						control={control}
						name="estimatedHoursAndMinutes"
						render={({ field: { onChange, value } }) => (
							<TimeInput
								isRequired
								value={value}
								onChange={onChange}
								name="estimatedHoursAndMinutes"
								label="Estimated Duration (hrs:mins)"
								hourCycle={24}
							/>
						)}
					/>
				</HStack>
			)}

			{/*Priority*/}
			{taskType === TaskType.AUTOMATIC && (
				<>
					<FormControlLabelText>Priority</FormControlLabelText>
					<RadioGroup
						value={watch("priority")}
						onChange={(priority) => setValue("priority", priority)}
					>
						<HStack className="gap-2">
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
				</>
			)}

			{/*Recurring*/}
			<HStack>
				<Checkbox
					value={"recurring"}
					size="md"
					isChecked={watch("recurring")}
					onChange={(recurring) => setValue("recurring", recurring)}
				>
					<CheckboxIndicator>
						<CheckboxIcon as={CheckIcon} />
					</CheckboxIndicator>
					<CheckboxLabel>Recurring?</CheckboxLabel>
				</Checkbox>
			</HStack>

			{/*Hard Deadline*/}
			{taskType === TaskType.AUTOMATIC && (
				<HStack>
					<Checkbox
						value={"hardDeadline"}
						size="md"
						isChecked={watch("hardDeadline")}
						onChange={(hardDeadline) => setValue("hardDeadline", hardDeadline)}
					>
						<CheckboxIndicator>
							<CheckboxIcon as={CheckIcon} />
						</CheckboxIndicator>
						<CheckboxLabel>Hard Deadline?</CheckboxLabel>
					</Checkbox>
				</HStack>
			)}

			{/*Submission Button*/}
			<Button onPress={handleSubmit(handleCreateTask)}>
				<ButtonText>Create Task</ButtonText>
			</Button>
		</FormControl>
	);
}
