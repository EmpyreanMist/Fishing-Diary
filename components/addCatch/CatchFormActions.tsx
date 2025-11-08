import { HStack } from '@/components/ui/hstack';
import { Box } from '@/components/ui/box';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Camera, MapPinPlus } from 'lucide-react-native';
import ActionButton from '../ui/ActionButton';
import { StyleSheet } from 'react-native';
import { VStack } from '@gluestack-ui/themed';

interface CatchFormActionsProps {
  onClose: () => void;
}

export default function CatchFormActions({ onClose }: CatchFormActionsProps) {
  return (
    <VStack className="my-5">
      <HStack className="w-full py-4" space="lg">
        <Button className="w-1/2 flex-1" variant="outline" style={styles.button}>
          <ButtonIcon as={Camera} size="sm" color="white" />
          <ButtonText>Add Photo</ButtonText>
        </Button>

        <Button style={styles.button} className="w-1/2" variant="outline" action="primary">
          <ButtonIcon as={MapPinPlus} size="sm" color="white" />
          <ButtonText>GPS Location</ButtonText>
        </Button>
      </HStack>

      <HStack className="w-full py-4" space="lg">
        <Box className="w-1/2 flex-1">
          <ActionButton label="Cancel" color="black" size="md" onPress={onClose} />
        </Box>
        <Box className="w-1/2">
          <ActionButton label="Save catch" color="blue" size="md" />
        </Box>
      </HStack>
    </VStack>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1A1A1A',
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});
