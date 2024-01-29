import { StyleSheet } from "react-native";

export default StyleSheet.create({
  itemLabel: {
    lineHeight: 20,
    width: 150,
    position: "absolute",
    zIndex: 7,
    transform: [{ rotate: "0deg" }],
  },

  activityIndicator: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
});
