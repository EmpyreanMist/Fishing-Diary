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
import { useState } from 'react';

interface CatchBoolean {
  stmt: boolean;
}
export default function CatchForm({ stmt }: CatchBoolean) {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  if (!stmt) return null;

  return (
    <View
      className="absolute top-[8%] left-[5%] right-[5%] z-50 h-full border border-outline-200 rounded-lg"
      style={styles.screen}
    >
      <VStack space="$md" reversed={false}>
        <Box className="w-full h-10 pt-5 pr-5 items-end flex-end'">
          <Icon as={CloseIcon} size="xl" />
        </Box>
        <Box className="px-5 w-[80%]">
          <Heading size="lg">Add New Catch</Heading>
          <Divider className='my-2' style={styles.divider}/>
          <Heading size="sm">Record your latest fishing trip</Heading>
        </Box>
      </VStack>
      <FormControl className="px-5 py-4 rounded-lg w-full">
        <Heading className="pb-2" size="lg">
          Species
        </Heading>
        <SpeciesDropDown />
        <HStack className="w-full py-4" space="4xl" reversed={false}>
          <Box className="flex-1">
            <Heading className="pb-2" size="lg">
              Weight (kg)
            </Heading>
            <Input style={[styles.input, focusedField === 'weight' && styles.inputFocused]}>
              <InputField
                placeholder="Enter weight..."
                onFocus={() => setFocusedField('weight')}
                onBlur={() => setFocusedField(null)}
              />
            </Input>
          </Box>
          <Box className="w-1/2">
            <Heading className="pb-2" size="md">
              Length (cm)
            </Heading>
            <Input style={[styles.input, focusedField === 'length' && styles.inputFocused]}>
              <InputField
                placeholder="Enter length here..."
                onFocus={() => setFocusedField('length')}
                onBlur={() => setFocusedField(null)}
              />
            </Input>
          </Box>
        </HStack>
        <Heading className="py-2" size="md">
          Location
        </Heading>
        <Input style={[styles.input, focusedField === 'location' && styles.inputFocused]}>
          <InputField
            onFocus={() => setFocusedField('location')}
            onBlur={() => setFocusedField('null')}
            placeholder="Where did you catch it?"
          />
        </Input>
        <Heading className="pt-4 pb-2" size="md">Lure Used</Heading>
        <LureDropDown />
        <Heading className="pt-4">Notes</Heading>
        <Textarea
          size="md"
          style={[styles.input, focusedField === 'notes' && styles.inputFocused]}
          className="w-full"
        >
          <TextareaInput
            onFocus={() => setFocusedField('notes')}
            onBlur={() => setFocusedField('null')}
            placeholder="Your text goes here..."
          />
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
          <HStack className="w-full py-4" space="lg">
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
  input: {
    borderWidth: 1,
    borderColor: '#475569', // grå
    borderRadius: 8,
  },
  inputFocused: {
    borderColor: '#5ACCF2',
  },
  divider: {
    backgroundColor: '#5ACCF2',
  },
});
