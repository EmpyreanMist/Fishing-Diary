import { ChevronDownIcon } from "@/components/ui/icon";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import { useState } from "react";
import { StyleSheet } from "react-native";

//TODO: DropDown needs to be fixed

export default function LureDropDown() {
  const [focused, setFocused] = useState<boolean | null>(false);
  return (
    <Select className="w-full">
      <SelectTrigger
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        // använder Tailwind-arbitrary color #5ACCF2 när focused
        className={`w-full rounded-lg border px-2 py-2 ${
          focused ? "border-[#5ACCF2]" : "border-slate-600"
        }`}
        variant="outline"
        size="lg"
      >
        <SelectInput placeholder="Select lure type" />
        <SelectIcon className="mr-3" as={ChevronDownIcon} />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          <SelectItem label="UX Research" value="ux" />
          <SelectItem label="Web Development" value="web" />
          <SelectItem
            label="Cross Platform Development Process"
            value="Cross Platform Development Process"
          />
          <SelectItem label="UI Designing" value="ui" isDisabled={true} />
          <SelectItem label="Backend Development" value="backend" />
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}

/* const getLabelFromValue = (value: string) => {
    return options.find((option) => option.value === value)?.label;
};

{<SelectTrigger>
    <Text>
        {getLabelFromValue(value)}
    </Text>
    <SelectIcon className="mr-3" as={ChevronDownIcon} />
</SelectTrigger>} */

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#475569", // grå
    borderRadius: 8,
  },
  inputFocused: {
    borderColor: "#5ACCF2",
  },
});
