import {Button, ButtonText} from "@/components/ui/button";
import {Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel,} from "@/components/ui/checkbox";
import {FormControl, FormControlLabelText,} from "@/components/ui/form-control";
import {HStack} from "@/components/ui/hstack";
import {Input, InputField} from "@/components/ui/input";
import {Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel,} from "@/components/ui/radio";
import {Textarea, TextareaInput} from "@/components/ui/textarea";
import {PriorityLevel} from "@/prisma/generated/prisma/index";
import {CheckIcon, CircleIcon} from "lucide-react-native";
import React, {useMemo} from "react";
import {Controller, useForm} from "react-hook-form";
import {Platform} from "react-native";
import {TimeInput} from "@heroui/date-input";
import {DatePicker} from "@heroui/date-picker";
import {Time, ZonedDateTime} from "@internationalized/date";
import {Switch} from "@/components/ui/switch";
import {createTaskAction} from "@/actions/taskActions";
import {toZonedTime} from 'date-fns-tz';
import {addTimeToDate} from "@/utils/dateUtils";


export type TaskDataEntry = {
    title: string;
    description: string;
    start: ZonedDateTime
    dueDate: ZonedDateTime;
    estimatedHoursAndMinutes: Time;
    priority: PriorityLevel;
    recurring: boolean;
    hardDeadline: boolean;
    automatic: boolean;
}

interface CreateTaskPopupProps {
    selectedDay: Date
    setRefreshKey: (key: (prev: number) => any) => void;
    setDisplayCreateTaskPopup: (displayPopup: boolean) => void;
}

export default function CreateTaskPopup({selectedDay, setRefreshKey, setDisplayCreateTaskPopup}: CreateTaskPopupProps) {
    // Memoize defaultValues so it doesn't change on every render
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const defaultEstimatedHoursAndMinutes = new Time(0, 30)
    const selectedDayPlusDefaultEstimated = addTimeToDate(selectedDay, defaultEstimatedHoursAndMinutes);

    const defaultValues: TaskDataEntry = useMemo(() => ({
        title: "",
        description: "",
        start: toZonedTime(selectedDay, userTimeZone),
        dueDate: toZonedTime(selectedDayPlusDefaultEstimated, userTimeZone),
        estimatedHoursAndMinutes: defaultEstimatedHoursAndMinutes,
        priority: PriorityLevel.LOW,
        recurring: false,
        hardDeadline: false,
        automatic: false,
    }), []);

    // Remove useState for formData and use react-hook-form for state management
    const {
        control,
        handleSubmit,
        watch,
        setValue,
    } = useForm<TaskDataEntry>({ defaultValues })

    const automatic = watch('automatic');

    async function handleCreateTask(formTaskData: TaskDataEntry) {
        console.log(formTaskData);
        await createTaskAction(formTaskData)
        setRefreshKey((prev) => prev + 1); // Increment refresh key to trigger re-fetching of tasks
        setDisplayCreateTaskPopup(false); // Close the popup after task creation
    }

    return (

        <FormControl className="gap-2">
            <HStack className="gap-2">
                <FormControlLabelText>Automatic Task?:</FormControlLabelText>
                <Controller
                    name="automatic"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Switch
                            size="md"
                            value={value}
                            onToggle={() => onChange(!value)}
                        />
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

            {Platform.OS === 'ios' || Platform.OS === 'android' ?
                <>
                    {/*/!*Mobile Due Date*!/*/}
                    {/*<FormControlLabelText>Due Date</FormControlLabelText>*/}
                    {/*<DateTimePicker*/}
                    {/*    value={watch('dueDate')}*/}
                    {/*    mode="datetime"*/}
                    {/*    display="default"*/}
                    {/*    onChange={(_, dueDate) => dueDate && setValue('dueDate', dueDate)}*/}
                    {/*/>*/}

                    {/*/!*Mobile Estimated Duration*!/*/}
                    {/*<FormControlLabelText>Estimated Duration</FormControlLabelText>*/}
                    {/*<DateTimePicker*/}
                    {/*    value={watch('estimatedDuration')}*/}
                    {/*    mode="time"*/}
                    {/*    is24Hour={true} // Explicitly set 24-hour format*/}
                    {/*    locale="en_GB" // Use a locale that defaults to 24-hour format*/}
                    {/*    onChange={(_, estimatedDuration) => {*/}
                    {/*        if (!estimatedDuration) return;*/}
                    {/*        setValue('estimatedDuration', estimatedDuration);*/}
                    {/*    }}*/}
                    {/*/>*/}
                </> :
                    <HStack className="gap-2">
                    {/*Web Start Date*/}
                        {!automatic && (
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
                        {automatic && (
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

            }


            {/*Priority*/}
            {automatic && (
                <>
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
                </>
            )}

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
            {automatic && (
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
            )}

            {/*Submission Button*/}
            <Button onPress={handleSubmit(handleCreateTask)}>
                <ButtonText>Create Task</ButtonText>
            </Button>
        </FormControl>
    );
}