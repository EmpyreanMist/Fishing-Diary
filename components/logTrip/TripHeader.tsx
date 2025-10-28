import { Ionicons } from '@expo/vector-icons';
import { Divider } from '@/components/ui/divider';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

export default function TripHeader() {
  return (
    <LinearGradient colors={['#0072FF', '#00C6FF']} start={[0, 0]} end={[1, 1]} style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.rowHeaderContent}>
          <Ionicons name="add" size={26} color="#F5F5F5" />
          <Text style={styles.headerTitle}>New Fishing Trip</Text>
        </View>
        <Divider className="my-0.5" />
        <Text style={styles.headerSubtitle}>Plan and log your fishing trips</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 140,
  },
  headerContent: {
    display: 'flex',
    width: '80%',  
    flexDirection: 'column',
    justifyContent: 'center',
  },
  rowHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '50%',
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: '#F5F5F5',
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft: 8,
  },
  headerSubtitle: {
    color: '#F5F5F5',
    opacity: 0.9,
    fontSize: 18,
    paddingHorizontal: 20,
    marginTop: 4,
  },
});
