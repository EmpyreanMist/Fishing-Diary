import { VStack } from '@/components/ui/vstack';
import { Input, InputField } from '@/components/ui/input';
import DateInput from './DateInput';

export default function TripForm({
  date,
  setDate,
  handleFocus,
}: {
  date: Date | null;
  setDate: (d: Date) => void;
  handleFocus: (field: string) => void;
}) {
  return (
    <VStack className="gap-4">
      <Input size="md">
        <InputField placeholder="Trip name..." onFocus={() => handleFocus('name')} />
      </Input>

      <Input size="md">
        <InputField placeholder="Notes..." onFocus={() => handleFocus('notes')} />
      </Input>

      <DateInput date={date} setDate={setDate} />

      <Input size="md">
        <InputField placeholder="Location..." onFocus={() => handleFocus('location')} />
      </Input>
    </VStack>
  );
}
