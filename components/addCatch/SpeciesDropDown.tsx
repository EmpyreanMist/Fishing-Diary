import { ChevronDownIcon } from '@/components/ui/icon';
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
} from '@/components/ui/select';

//TODO: This needs to be adjusted with configurations in RootLayout

export default function SpeciesDropDown() {
  return (
    <Select className="w-full">
      <SelectTrigger variant="outline" size="lg">
        <SelectInput placeholder="Select fish Species" />
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
          <SelectItem label="Cross Platform Development Process" value="Cross Platform Development Process" />
          <SelectItem label="UI Designing" value="ui" isDisabled={true} />
          <SelectItem label="Backend Development" value="backend" />
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}
