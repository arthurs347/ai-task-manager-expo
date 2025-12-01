import {TimeInput} from "@heroui/date-input";
import {DatePicker} from "@heroui/date-picker";
import {fromDate, Time} from "@internationalized/date";
import DateTimePicker from "@react-native-community/datetimepicker";
import {Check as CheckIcon} from "lucide-react-native";
import {useMemo} from "react";
import {Controller, useForm} from "react-hook-form";
import {Platform} from "react-native";
import {updateTaskAction} from "@/actions/taskActions";
import {PriorityLevel, TaskType} from "@/prisma/generated/client/edge";
import {convertMinutesToTime, timeToDate} from "@/utils/dateUtils";
import {Button, Checkbox, Form, Input, Label, RadioGroup, TextArea, XStack} from "tamagui";
import {AnyTask} from "@/lib/types";
import {TaskDataEntry} from "@/modules/components/createTaskPopup/CreateTaskForm";

interface EditTaskFormProps {
    currEditingTask: AnyTask;
    setRefreshKey: (key: (prev: number) => number) => void;
    onClose: () => void;
}

export default function EditTaskForm({
                                         currEditingTask,
                                         setRefreshKey,
                                         onClose,
                                        }: EditTaskFormProps) {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const taskTitle = currEditingTask.title
    const taskDescription = currEditingTask.description
    const taskEstimatedHoursAndMinutes = convertMinutesToTime(currEditingTask.estimatedDuration)
    const taskTaskType =  currEditingTask.taskType as TaskType
    const taskStart = new Date(currEditingTask.start)
    const taskEnd = new Date(currEditingTask.end)

    const taskStartZoned = fromDate(taskStart, userTimeZone)
    const taskEndZoned = fromDate(taskEnd, userTimeZone)

    //Set default values for the form
    const defaultValues: TaskDataEntry = useMemo(
        () => ({
            title: taskTitle,
            description: taskDescription,
            start: taskStartZoned,
            dueDate: taskEndZoned,
            estimatedHoursAndMinutes: taskEstimatedHoursAndMinutes,
            priority: PriorityLevel.LOW,
            recurring: false,
            hardDeadline: false,
            taskType: taskTaskType,
        }),
        [
            taskStart,
            userTimeZone,
        ],
    );

    // Remove useState for formData and use react-hook-form for state management
    const { control, handleSubmit, watch, setValue } = useForm<TaskDataEntry>({defaultValues});

    const taskType = watch("taskType");

    async function handleEditTask(updatedFields: TaskDataEntry) {
        const taskId = currEditingTask.id;
        const taskType = updatedFields.taskType;

        await updateTaskAction(taskId, taskType, updatedFields);

        await new Promise((resolve) => setTimeout(resolve, 300));
        setRefreshKey((prev) => prev + 1); // Increment refresh key to trigger re-fetching of tasks
        onClose(); // Close the popup after task is edited

    }

    return (
        <Form onSubmit={handleSubmit(handleEditTask)}>
            {/*Task Title*/}
            <Label>Title</Label>
            <Controller
                name="title"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Input
                        value={value}
                        onChangeText={onChange}
                        placeholder="Enter task name"
                    />
                )}
            />

            {/*Task Description*/}
            <Label>Description</Label>
            <Controller
                name="description"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <TextArea
                        value={value}
                        onChangeText={onChange}
                        placeholder="Enter description"
                    />
                )}
            />

            {Platform.OS === "ios" || Platform.OS === "android" ? (
                <>
                    {/*Mobile Start Date*/}
                    <Label>Start Date</Label>
                    <Controller
                        control={control}
                        name="start"
                        render={({ field: { onChange, value } }) => (
                            <DateTimePicker
                                value={value.toDate()}
                                onChange={(_, selectedDate) => {
                                    if (!selectedDate) return;
                                    onChange(fromDate(selectedDate, userTimeZone));
                                }}
                                display="default"
                                mode="datetime"
                            />
                        )}
                    />

                    {/*Mobile Estimated Duration*/}
                    <Label>Estimated Duration</Label>
                    <Controller
                        control={control}
                        name="estimatedHoursAndMinutes"
                        render={({ field: { onChange, value } }) => (
                            <DateTimePicker
                                value={timeToDate(value)}
                                onChange={(_, selectedDuration) => {
                                    if (!selectedDuration) return;
                                    const timeFromDate = new Time(selectedDuration.getHours(), selectedDuration.getMinutes());
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
                <XStack className="gap-2">
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
                </XStack>
            )}

            {/*Priority*/}
            {taskType === TaskType.AUTOMATIC && (
                <>
                    <Label>Priority</Label>
                    <RadioGroup
                        mt={"$-3"}
                        value={watch("priority")}
                        onValueChange={(priority) => setValue("priority", priority)}
                    >
                        <XStack gap="$2">
                            {Object.values(PriorityLevel).map((level) => (
                                <XStack key={level} alignItems="center" gap="$1.5">
                                    <RadioGroup.Item
                                        size="$5"
                                        key={`${level}-radio`}
                                        value={level}
                                    >
                                        <RadioGroup.Indicator/>
                                    </RadioGroup.Item>
                                    <Label>{level}</Label>
                                </XStack>
                            ))}
                        </XStack>
                    </RadioGroup>
                </>
            )}

            {/*Recurring*/}
            <XStack gap="$1.5" alignItems="center">
                <Checkbox
                    size="$5"
                    value={"recurring"}
                    checked={watch("recurring")}
                    onCheckedChange={(recurring: boolean) => setValue("recurring", recurring)}
                >
                    <Checkbox.Indicator>
                        <CheckIcon />
                    </Checkbox.Indicator>
                </Checkbox>
                <Label>Recurring?</Label>

            </XStack>

            {/*Hard Deadline*/}
            {taskType === TaskType.AUTOMATIC && (
                <XStack mt={"$-3"} columnGap="$1.5" alignItems="center">
                    <Checkbox
                        size="$5"
                        value={"hardDeadline"}
                        checked={watch("hardDeadline")}
                        onCheckedChange={(hardDeadline: boolean) => setValue("hardDeadline", hardDeadline)}
                    >
                        <Checkbox.Indicator>
                            <CheckIcon />
                        </Checkbox.Indicator>
                    </Checkbox>
                    <Label>Hard Deadline?</Label>
                </XStack>
            )}

            {/*Submission Button*/}
            <Form.Trigger asChild>
                <Button>
                    Save Changes
                </Button>
            </Form.Trigger>
        </Form>
    );
}
