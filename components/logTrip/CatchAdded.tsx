import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Trash } from 'lucide-react-native';
import { Pressable } from '../ui/pressable';
import { HStack } from '../ui/hstack';
interface catchAddedProps {
  id: number;
  species: string;
  weight: number;
}

interface CatchAddedProps {
  catchData: catchAddedProps;
  onDelete?: (id: number) => void;
}

export default function CatchAdded({ catchData, onDelete }: CatchAddedProps) {
  console.log('Catch data received:', catchData);
  return (
    <Card size="md" variant="outline" className="m-3">
        <HStack style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Text size="sm">
          {catchData.species} - {catchData.weight} kg
        </Text>
        <Pressable onPress={() => onDelete?.(catchData.id)}>
          <Trash size={20} color="#FF0000" />
        </Pressable>
      </HStack>
    </Card>
  );
}
