import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';

export type SubmitStatus =
  | { type: 'idle' }
  | { type: 'submitting' }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string };

export default function SubmitBanner({status}: {status: SubmitStatus}) {
  if (status.type === 'idle') return null;

  if (status.type === 'submitting') {
    return (
      <Card size="lg" variant="filled" className="m-3">
        <Heading size="md" className="mb-1">
          Saving…
        </Heading>
        <Text size="sm">Submitting your trip.</Text>
      </Card>
    );
  }

  const ok = status.type === 'success';

  return (
    <Card size="lg" variant="filled" className={`m-3  ${ok ? 'border border-emerald-600' : 'border border-red-600'}`}>
      <Heading size="md" className="mx-auto">
        {ok ? 'Success' : 'Error'}
      </Heading>
      <Text size="sm" className="mx-auto">{status.message}</Text>
    </Card>
  );
}
