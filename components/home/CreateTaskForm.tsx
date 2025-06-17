import {createTaskAction} from "@/actions/taskActions";
import {Button, ButtonText} from "@/components/ui/button";
import {Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel,} from "@/components/ui/checkbox";
import {FormControl, FormControlLabelText,} from "@/components/ui/form-control";
import {HStack} from "@/components/ui/hstack";
import {Input, InputField} from "@/components/ui/input";
import {Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel,} from "@/components/ui/radio";
import {Textarea, TextareaInput} from "@/components/ui/textarea";
import {PriorityLevel} from "@/prisma/generated/prisma";
import DateTimePicker from '@react-native-community/datetimepicker';
import {CheckIcon, CircleIcon} from "lucide-react-native";
import React, {useMemo} from "react";
import {useForm} from "react-hook-form";
import {Platform} from "react-native";

export type TaskDataEntry = {
    title: string;
    description: string;
    dueDate: Date;
    estimatedDuration: Date;
    priority: PriorityLevel;
    recurring: boolean;
    hardDeadline: boolean;
}

interface CreateTaskPopupProps {
    setRefreshKey: (key: (prev: number) => any) => void;
}
export default function CreateTaskPopup({setRefreshKey}: CreateTaskPopupProps) {

    // Memoize defaultValues so it doesn't change on every render
    const defaultValues = useMemo(() => ({
        title: "",
        description: "",
        dueDate: new Date(),
        estimatedDuration: new Date(),
        priority: PriorityLevel.LOW,
        recurring: false,
        hardDeadline: false,
    }), []);

    // Remove useState for formData and use react-hook-form for state management
    const { handleSubmit, watch, setValue } = useForm({ defaultValues });

    async function handleCreateTask(formTaskData: TaskDataEntry) {
        setRefreshKey((prev) => prev + 1); // Increment refresh key to trigger re-fetching of tasks
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

            {Platform.OS === 'ios' || Platform.OS === 'android' ?
                <>
                    {/*Due Date*/}
                    <FormControlLabelText>Due Date</FormControlLabelText>
                    <DateTimePicker
                        value={watch('dueDate')}
                        mode="datetime"
                        display="default"
                        onChange={(_, dueDate) => dueDate && setValue('dueDate', dueDate)}
                    />

                    {/*Estimated Duration*/}
                    <FormControlLabelText>Estimated Duration</FormControlLabelText>
                    <DateTimePicker
                        value={watch('estimatedDuration')}
                        mode="time"
                        is24Hour={true} // Explicitly set 24-hour format
                        locale="en_GB" // Use a locale that defaults to 24-hour format
                        onChange={(_, estimatedDuration) => {
                            if (!estimatedDuration) return;
                            setValue('estimatedDuration', estimatedDuration);
                        }}
                    />
                </>: <></>
            }



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
        </FormControl>
    );
}