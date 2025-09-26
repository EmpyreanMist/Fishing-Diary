import { Button, ButtonText } from "@/components/ui/button";
import { Grid, GridItem } from "@/components/ui/grid";

import { Image } from "@/components/ui/image";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <>
      <View className="relative w-full h-80">
        <Image
          className="absolute w-full h-full"
          resizeMode="cover"
          source={require("@/assets/images/fishing.jpg")}
          alt="Fishing"
        />

        <View className="absolute w-full h-full bg-black/40" />

        <View className="absolute bottom-6 left-4 right-4">
          <Text className="text-white text-3xl font-bold">Fishing Diary</Text>
          <Text className="text-white/80 text-base mb-4">
            Your digital angler's log
          </Text>

          <View className="flex-row justify-between">
            <Button className="bg-sky-400 rounded-lg px-6 py-3 flex-1 mr-2">
              <ButtonText className="text-white text-sm">
                ＋ Add Catch
              </ButtonText>
            </Button>
            <Button className="bg-blue-600 rounded-lg px-6 py-3 flex-1 ml-2">
              <ButtonText className="text-white text-sm">+ Add Trip</ButtonText>
            </Button>
          </View>
        </View>
      </View>

      <View className="items-center justify-center p-4">
        <Grid
          className="gap-y-4 gap-x-4"
          _extra={{
            className: "grid-cols-2",
          }}
        >
          <GridItem
            className="bg-background-50 p-4 rounded-md text-center"
            _extra={{
              className: "col-span-1",
            }}
          >
            <Ionicons
              name="fish-outline"
              size={28}
              color="#38bdf8"
              className="text-center"
            />
            <Text className="text-lg text-white text-center">47</Text>
            <Text className="text-md text-white text-center">
              Total Catches
            </Text>
            <Text className="text-sm text-gray-500 text-center">
              This season
            </Text>
          </GridItem>

          <GridItem
            className="bg-background-50 p-4 rounded-md text-center"
            _extra={{
              className: "col-span-1",
            }}
          >
            <Ionicons
              name="calendar-outline"
              size={28}
              color="#38bdf8"
              className="text-center"
            />

            <Text className="text-lg text-white text-center">82</Text>
            <Text className="text-md text-white text-center">Recent Trips</Text>
            <Text className="text-sm text-gray-500 text-center">
              Last 30 days
            </Text>
          </GridItem>

          <GridItem
            className="bg-background-50 p-4 rounded-md text-center"
            _extra={{
              className: "col-span-1",
            }}
          >
            <Ionicons
              name="trending-up-outline"
              size={28}
              color="#38bdf8"
              className="text-center"
            />

            <Text className="text-lg text-white text-center">Pike</Text>
            <Text className="text-md text-white text-center">
              Favorite Species
            </Text>
            <Text className="text-sm text-gray-500 text-center">
              Most caught
            </Text>
          </GridItem>

          <GridItem
            className="bg-background-50 p-4 rounded-md text-center"
            _extra={{
              className: "col-span-1",
            }}
          >
            <Ionicons
              name="bar-chart-outline"
              size={28}
              color="#38bdf8"
              className="text-center"
            />

            <Text className="text-lg text-white text-center">June</Text>
            <Text className="text-md text-white text-center">Best Month</Text>
            <Text className="text-md text-gray-500 text-center">
              Peak Season
            </Text>
          </GridItem>
        </Grid>
      </View>
    </>
  );
}
