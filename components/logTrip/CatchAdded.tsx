import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Trash } from 'lucide-react-native';
import { Pressable } from '../ui/pressable';
import { HStack } from '../ui/hstack';
import { CatchDraft } from '../common/types';

interface CatchAddedProps {
  catchData: CatchDraft;
  onDelete?: (id: string) => void;
}

export default function CatchAdded({ catchData, onDelete }: CatchAddedProps) {
  
  return (
    <Card size="md" variant="outline" className="m-3">
      <HStack style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Text size="sm">
          {catchData.speciesId} - {catchData.lengthCm} cm - {catchData.weightKg} kg
        </Text>
        <Pressable onPress={() => onDelete?.(catchData.speciesId)}>
          <Trash size={20} color="#FF0000" />
        </Pressable>
      </HStack>
    </Card>
  );
}
