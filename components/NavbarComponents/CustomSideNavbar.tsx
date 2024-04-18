import { Gamepad2Icon, TrophyIcon, UsersRoundIcon } from "lucide-react-native"
import { View, TouchableOpacity, Text } from "react-native"
import Logo from "../Logo"
import { StackNavigationProp } from "@react-navigation/stack"

interface CustomSideNavbarProps {
  navigation: StackNavigationProp<any> // Replace 'any' with your stack navigator's param list
}

const CustomSideNavbar: React.FC<CustomSideNavbarProps> = (props) => {
  return (
    <View className="w-[50%] h-full absolute  bg-bgBlue opacity-90 z-50">
      <View className="flex items-center mt-10">
        <Logo CSize="text-4xl" TextSize="text-3xl" />
      </View>
      <View className="flex items-start w-full mt-8 ml-6 space-y-3">
        <TouchableOpacity
          className="flex flex-row items-center justify-center space-x-2"
          onPress={() => {
            console.log("Button pressed"),
              console.log("Props.navigation: ", props.navigation),
              props.navigation && props.navigation.navigate("Scoreboard")
          }}
        >
          <TrophyIcon size={40} className="text-black" />
          <Text className="text-black flex justify-center items-center text-lg">
            Scoreboard
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-row items-center justify-center space-x-2"
          onPress={() => props.navigation.navigate("GameType")}
        >
          <Gamepad2Icon size={40} className="text-black" />
          <Text className="text-black flex justify-center items-center text-lg">
            Game Type
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-row items-center justify-center space-x-2"
          onPress={() => props.navigation.navigate("SetPlayer")}
        >
          <UsersRoundIcon size={40} className="text-black" />
          <Text className="text-black flex justify-center items-center text-lg">
            Players
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CustomSideNavbar
