import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import DatePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";

interface CatchDateTimeModalsProps {
  value: Date;
  onChange: (date: Date) => void;
  showDate: boolean;
  showTime: boolean;
  setShowDate: (show: boolean) => void;
  setShowTime: (show: boolean) => void;
}

export default function CatchDateTimeModals({
  value,
  onChange,
  showDate,
  showTime,
  setShowDate,
  setShowTime,
}: CatchDateTimeModalsProps) {
  const hours = [...Array(24).keys()];
  const minutes = [...Array(60).keys()];

  const selectTime = (h: number, m: number) => {
    const d = new Date(value);
    d.setHours(h);
    d.setMinutes(m);
    onChange(d);
    setShowTime(false);
  };

  return (
    <>
      {showDate && (
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <DatePicker
              mode="single"
              date={dayjs(value)}
              locale="sv"
              onChange={(params) => {
                if (!params?.date) return;

                const d = params.date as Date;

                const newD = new Date(value);
                newD.setFullYear(d.getFullYear());
                newD.setMonth(d.getMonth());
                newD.setDate(d.getDate());
                onChange(newD);
                
                setShowDate(false);
                setShowTime(true);
              }}
            />
          </View>
        </View>
      )}

      {showTime && (
        <View style={styles.overlay}>
          <View style={styles.modalDark}>
            <Text style={styles.title}>Select Time</Text>

            <View style={styles.timeRow}>
              <FlatList
                data={hours}
                style={{ maxHeight: 180 }}
                keyExtractor={(i) => i.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => selectTime(item, value.getMinutes())}
                  >
                    <Text style={styles.timeItem}>{item}</Text>
                  </TouchableOpacity>
                )}
              />

              <FlatList
                data={minutes}
                style={{ maxHeight: 180 }}
                keyExtractor={(i) => i.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => selectTime(value.getHours(), item)}
                  >
                    <Text style={styles.timeItem}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowTime(false)}
            >
              <Text style={styles.closeText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modal: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    width: "85%",
    alignItems: "center",
  },
  modalDark: {
    backgroundColor: "#1E293B",
    padding: 16,
    borderRadius: 16,
    width: "85%",
    alignItems: "center",
  },
  closeButton: {
    marginTop: 16,
    paddingVertical: 12,
    backgroundColor: "#334155",
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  closeText: {
    color: "white",
    fontSize: 16,
  },
  title: {
    color: "white",
    fontSize: 18,
    marginBottom: 12,
  },
  timeRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  timeItem: {
    color: "white",
    paddingVertical: 8,
  },
});
