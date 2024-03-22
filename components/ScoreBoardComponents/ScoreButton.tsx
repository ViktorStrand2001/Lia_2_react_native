import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import React from "react"

interface ButtonProps {
  onPress: () => void
  text?: string
  buttonStyle?: string
}

const ScoreButton: React.FC<ButtonProps> = ({
  onPress,
  text,
  buttonStyle,
}) => {
  return (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={onPress}
      className={`bg-white w-16 h-10  rounded-3xl  ${buttonStyle}`}
    >
      <Text className=" font-bold italic text-xl ml "> {text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start", // Align items to the top of the container
    padding: 10,
  },
  gridItem: {
    width: "30%", // Adjust this percentage as needed for 3 items per row
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5, // Adjust vertical margin as needed
    marginHorizontal: 5, // Adjust horizontal margin as needed for spacing between items
  },
})
export default ScoreButton
