import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import CustomCalendar from "../CustomCalendar";
import ActionButton from "../ui/ActionButton";
import { Ionicons } from "@expo/vector-icons";

const normalizeLocal = (date: Date) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  );
};

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

  const localValue = normalizeLocal(value);

  return (
    <>
      {/* DATE PICKER */}
      {showDate && (
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <TouchableOpacity
              style={styles.closeIconButton}
              onPress={() => setShowDate(false)}
            >
              <Ionicons name="close" size={20} color="white" />
            </TouchableOpacity>

            <CustomCalendar
              value={value}
              onSelect={(date) => {
                onChange(date);
                setShowDate(false);
                setTimeout(() => setShowTime(true), 200);
              }}
            />
          </View>
        </View>
      )}

      {/* TIME PICKER */}
      {showTime && (
        <View style={styles.overlay}>
          <View style={styles.modalDark}>
            <TouchableOpacity
              style={styles.closeIconButton}
              onPress={() => setShowTime(false)}
            >
              <Ionicons name="close" size={20} color="white" />
            </TouchableOpacity>

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
                    const selected = hour === localValue.getHours();
                    return (
                      <TouchableOpacity
                        key={hour}
                        onPress={() => {
                          const d = normalizeLocal(value);
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
                    const selected = min === localValue.getMinutes();
                    return (
                      <TouchableOpacity
                        key={min}
                        onPress={() => {
                          const d = normalizeLocal(value);
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
            <ActionButton
              label="Done"
              color="blue"
              size="lg"
              icon="checkmark"
              width="100%"
              onPress={() => setShowTime(false)}
            />
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
  padding: 20,
  paddingTop: 30,        
  borderRadius: 16,
  width: "85%",
  backgroundColor: "#1E293B",  
  alignItems: "center",
  position: "relative",  
},

modalDark: {
  padding: 20,
  paddingTop: 30,       
  borderRadius: 16,
  width: "85%",
  backgroundColor: "#1E293B",
  alignItems: "center",
  position: "relative",
},

  title: {
    color: "white",
    fontSize: 18,
    marginBottom: 12,
  },

  wheelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
  },

  wheel: {
    flex: 1,
    alignItems: "center",
  },

  wheelScroll: {
    height: 180,
    width: "100%",
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

  closeIconButton: {
  position: "absolute",
  top: 10,
  right: 10,
  padding: 6,
  borderRadius: 20,
  backgroundColor: "transparent",
  zIndex: 999,
},
});
