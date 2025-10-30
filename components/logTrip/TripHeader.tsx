import { Ionicons } from '@expo/vector-icons';
import { Divider } from '@/components/ui/divider';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

export default function TripHeader() {
  return (
    <LinearGradient
      colors={['#0f172a', '#1e293b', '#0f172a']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.headerContainer}
    >
      <View style={styles.headerContent}>
        <View style={styles.rowHeaderContent}>
          <Ionicons name="add" size={26} color="#F5F5F5" />
          <Text style={styles.headerTitle}>New Fishing Trip</Text>
        </View>
        <Divider className="my-0.5" style={styles.divider} />
        <Text className='pt-2' style={styles.headerSubtitle}>Plan and log your fishing trips</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 140,
    paddingLeft: 5,
    borderBottomColor: 'rgba(255,255,255,0.1)',
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
    fontSize: 24,
    marginLeft: 8,
  },
  headerSubtitle: {
    color: '#F5F5F5',
    opacity: 0.9,
    fontSize: 18,
    paddingHorizontal: 20,
    marginTop: 4,
  },
  divider: {
    backgroundColor: '#5ACCF2',
  },
});
