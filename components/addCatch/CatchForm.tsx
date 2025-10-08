import { Heading } from '@/components/ui/heading';
import { Icon } from '@/components/ui/icon';
import { Input, InputField } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import { CloseIcon, FormControl, View } from '@gluestack-ui/themed';

import { Box } from '@/components/ui/box';
import { Divider } from '@/components/ui/divider';

interface CatchBoolean {
  stmt: boolean;
}
export default function CatchForm({ stmt }: CatchBoolean) {
  if (!stmt) return null;

  return (
    <View className="bg-black/40 absolute top-[8%] left-[5%] right-[5%] z-50 rounded-lg border border-outline-200 h-[95%] w-[90%]">
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
      <FormControl className="pl-5 rounded-lg w-full h-[100%] w-[100]">
        <Heading className="" size="lg">
          Add New Catch
        </Heading>
        <Input
          style={{ width: '80%' }}
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField placeholder="Enter Text here..." />
        </Input>
        <Heading className="" size="lg">
          Add New Catch
        </Heading>
        <Input
          style={{ width: '80%' }}
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField placeholder="Enter Text here..." />
        </Input>
        <Heading className="" size="lg">
          Add New Catch
        </Heading>
        <Input
          style={{ width: '80%' }}
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField placeholder="Enter Text here..." />
        </Input>
        <Heading className="" size="lg">
          Add New Catch
        </Heading>
        <Input
          style={{ width: '80%' }}
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField placeholder="Enter Text here..." />
        </Input>
      </FormControl>
    </View>
  );
}
