import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
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

            <View style={styles.wheelContainer}>
              {/* HOURS */}
              <View style={styles.wheel}>
                <Text style={styles.wheelLabel}>Hour</Text>

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  snapToInterval={36}
                  decelerationRate="fast"
                  contentContainerStyle={{ paddingVertical: 40 }}
                  style={styles.wheelScroll}
                >
                  {hours.map((hour) => {
                    const selected = hour === value.getHours();
                    return (
                      <TouchableOpacity
                        key={hour}
                        onPress={() => {
                          const d = new Date(value);
                          d.setHours(hour);
                          onChange(d);
                        }}
                        style={[
                          styles.wheelItem,
                          selected && styles.wheelItemSelected,
                        ]}
                      >
                        <Text
                          style={[
                            styles.wheelText,
                            selected && styles.wheelTextSelected,
                          ]}
                        >
                          {hour.toString().padStart(2, "0")}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>

              {/* MINUTES */}
              <View style={styles.wheel}>
                <Text style={styles.wheelLabel}>Minute</Text>

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  snapToInterval={36}
                  decelerationRate="fast"
                  contentContainerStyle={{ paddingVertical: 40 }}
                  style={styles.wheelScroll}
                >
                  {minutes.map((min) => {
                    const selected = min === value.getMinutes();
                    return (
                      <TouchableOpacity
                        key={min}
                        onPress={() => {
                          const d = new Date(value);
                          d.setMinutes(min);
                          onChange(d);
                        }}
                        style={[
                          styles.wheelItem,
                          selected && styles.wheelItemSelected,
                        ]}
                      >
                        <Text
                          style={[
                            styles.wheelText,
                            selected && styles.wheelTextSelected,
                          ]}
                        >
                          {min.toString().padStart(2, "0")}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </View>

            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => setShowTime(false)}
            >
              <Text style={styles.doneText}>Done</Text>
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
  timeButton: {
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },

  timeButtonSelected: {
    backgroundColor: "#475569",
  },

  timeItemSelected: {
    color: "#5ACCF2",
    fontWeight: "600",
  },

  doneButton: {
    marginTop: 16,
    paddingVertical: 12,
    backgroundColor: "#5ACCF2",
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },

  doneText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },

  timeHeader: {
    color: "white",
    fontSize: 16,
    marginBottom: 6,
  },
  wheelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
  },

  wheel: {
    width: "45%",
    alignItems: "center",
  },

  wheelScroll: {
    height: 180, 
  },

  wheelLabel: {
    color: "white",
    fontSize: 16,
    marginBottom: 8,
  },

  wheelItem: {
    height: 36, 
    justifyContent: "center",
    alignItems: "center",
  },

  wheelItemSelected: {
    backgroundColor: "#475569",
    borderRadius: 8,
  },

  wheelText: {
    color: "white",
    fontSize: 16,
  },

  wheelTextSelected: {
    color: "#5ACCF2",
    fontWeight: "600",
  },
});
