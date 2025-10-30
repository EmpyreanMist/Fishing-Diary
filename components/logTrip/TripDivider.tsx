import { Divider } from '@/components/ui/divider';
import { StyleSheet } from 'react-native';

export default function TripDivider() {
  return <Divider className="my-0.5" style={styles.divider} />;
}

const styles = StyleSheet.create({
  divider: {
    backgroundColor: '#5ACCF2',
  },
});