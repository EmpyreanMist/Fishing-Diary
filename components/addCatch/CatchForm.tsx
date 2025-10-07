import { Center } from '@/components/ui/center';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { FormControl } from '@gluestack-ui/themed';

import { Box } from '@/components/ui/box';
import { Divider } from '@/components/ui/divider';

interface CatchBoolean {
  stmt: boolean;
}
export default function CatchForm({ stmt }: CatchBoolean) {
  if (!stmt) return null;

  return (
    <Center className="absolute top-[10%] left-[5%] right-[5%] z-50 rounded-lg border border-outline-200 bg-primary-200 h-[95%] w-[90%]">
      <FormControl className="pl-5 rounded-lg w-full h-[100%]">
        <Box className="pt-5 pb-5  w-[80%]">
          <Heading className="textAlign" size="2xl">
            Add New Catch
          </Heading>
          <Divider className="my-0.5" />
          <Heading size="lg"> Record your latest fishing trip </Heading>
        </Box>
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
    </Center>
  );
}
