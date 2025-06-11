import {Button, ButtonText} from "@/components/ui/button";
import {Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel,} from "@/components/ui/checkbox";
import {FormControl, FormControlLabelText,} from "@/components/ui/form-control";
import {HStack} from "@/components/ui/hstack";
import {Input} from "@/components/ui/input";
import {Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel,} from "@/components/ui/radio";
import {Textarea} from "@/components/ui/textarea";
import {PriorityLevel} from "@/prisma/generated/prisma";
import {CheckIcon, CircleIcon} from "lucide-react-native";
import React, {useRef} from "react";

export default function CreateTaskPopup() {
    const formRef = useRef<HTMLFormElement>(null);

    function handleCreateTask(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!formRef.current) return;
        const data = new FormData(formRef.current);
        const task = {
            name: data.get("name") as string,
            description: data.get("description") as string,
            priority: data.get("priority") as PriorityLevel,
            recurring: data.get("recurring") === "yes",
            hardDeadline: data.get("hardDeadline") === "yes",
        };
        console.log("Task:", task);
        // TODO: send to backend or mutate state
    }

    return (
        <FormControl>
            <FormControlLabelText>Task Name</FormControlLabelText>
            <Input id="name"/>

            <FormControlLabelText>Task Description</FormControlLabelText>
            <Textarea id="description"/>

            <FormControlLabelText>Priority</FormControlLabelText>
            <RadioGroup>
                <HStack>
                    {Object.values(PriorityLevel).map((level) => (
                        <Radio key={level} size="md" value={level}>
                            <RadioIndicator>
                                <RadioIcon as={CircleIcon}/>
                            </RadioIndicator>
                            <RadioLabel>{level}</RadioLabel>
                        </Radio>
                    ))}
                </HStack>
            </RadioGroup>

            <HStack>
                <Checkbox size="md" value={"recurring"}>
                    <CheckboxIndicator>
                        <CheckboxIcon as={CheckIcon}/>
                    </CheckboxIndicator>
                    <CheckboxLabel>Recurring?</CheckboxLabel>
                </Checkbox>
            </HStack>

            <HStack>
                <Checkbox size="md" value={"hardDeadline"}>
                    <CheckboxIndicator>
                        <CheckboxIcon as={CheckIcon}/>
                    </CheckboxIndicator>
                    <CheckboxLabel>Hard Deadline?</CheckboxLabel>
                </Checkbox>
            </HStack>

            <Button>
                <ButtonText>Create Task</ButtonText>
            </Button>
        </FormControl>
    );
}
