import { Button, ButtonText } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
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
            <ButtonText className="text-white text-sm">＋ Add Catch</ButtonText>
          </Button>
          <Button className="bg-blue-600 rounded-lg px-6 py-3 flex-1 ml-2">
            <ButtonText className="text-white text-sm">+ Add Trip</ButtonText>
          </Button>
        </View>
      </View>
    </View>
  );
}
