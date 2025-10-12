import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Input, InputField } from '@/components/ui/input';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { VStack } from '@/components/ui/vstack';
import { CloseIcon, FormControl, View } from '@gluestack-ui/themed';

import { Box } from '@/components/ui/box';
import { Divider } from '@/components/ui/divider';
import { Camera, MapPinPlus } from 'lucide-react-native';
import { Button, ButtonIcon, ButtonText } from '../ui/button';
import LureDropDown from './LureDropDown';
import SpeciesDropDown from './SpeciesDropDown';
import ActionButton from '../ui/ActionButton';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface CatchBoolean {
  stmt: boolean;
}
export default function CatchForm({ stmt }: CatchBoolean) {
  if (!stmt) return null;

  return (
    <View
      className="absolute top-[8%] left-[5%] right-[5%] z-50 h-full border border-outline-200 rounded-lg"
      style={styles.screen}
    >
      <VStack space="$md" reversed={false}>
        <Box className="w-[100%] h-10 pt-5 pr-5 items-end flex-end'">
          <Icon as={CloseIcon} size="xl" color="white" className="text-typography-500" />
        </Box>
        <Box className="pb-5 pl-5 w-[80%]">
          <Heading size="2xl">Add New Catch</Heading>
          <Divider />
          <Heading size="lg">Record your latest fishing trip</Heading>
        </Box>
      </VStack>
      <FormControl className="px-5 pb-10 rounded-lg w-full">
        <Heading className="" size="lg">
          Species
        </Heading>
        <SpeciesDropDown />
        <HStack className="w-full py-5" space="4xl" reversed={false}>
          <Box className="flex-1">
            <Heading className="" size="lg">
              Weight (kg)
            </Heading>
            <Input variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false}>
              <InputField placeholder="Enter Text here..." />
            </Input>
          </Box>
          <Box className="w-1/2">
            <Heading className="" size="lg">
              Length (cm)
            </Heading>
            <Input variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false}>
              <InputField placeholder="Enter Text here..." />
            </Input>
          </Box>
        </HStack>
        <Heading className="py-4" size="lg">
          Location
        </Heading>
        <Input className="w-full" variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false}>
          <InputField placeholder="Where did you catch it?" />
        </Input>
        <Heading className="py-4">Lure Used</Heading>
        <LureDropDown />
        <Heading className="py-4">Notes</Heading>
        <Textarea size="md" isReadOnly={false} isInvalid={false} isDisabled={false} className="w-full">
          <TextareaInput placeholder="Your text goes here..." />
        </Textarea>
        <VStack>
          <HStack className="w-full py-4" space="lg">
            {/* Left icon button */}
            <Button className="w-1/2 flex-1" variant="outline" style={styles.button}>
              <ButtonIcon as={Camera} size="sm" color="white" />
              <ButtonText>Add Photo</ButtonText>
            </Button>
            <Button style={styles.button} className="w-1/2" variant="outline" action="primary">
              <ButtonIcon as={MapPinPlus} size="sm" color="white" />
              <ButtonText>Gps Location</ButtonText>
            </Button>
          </HStack>
          <HStack className="w-full mb-2" space="lg">
            <Box className="w-1/2 flex-1">
              <ActionButton label="Cancel" color="black" size="md" />
            </Box>
            <Box className="w-1/2">
              <ActionButton label="Save catch" color="blue" size="md" />
            </Box>
          </HStack>
        </VStack>
      </FormControl>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0A121A',
  },
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
