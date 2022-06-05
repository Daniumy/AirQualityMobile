import { StyleSheet, Platform, StatusBar, Dimensions } from "react-native";
import { BackgroundImage } from "react-native-elements/dist/config";

const deviceWidth = Math.round(Dimensions.get("window").width);
const airCardRadius = 10;

export default StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 5 : 0
  },
  SafeAreaBackground: {
   flex: 1,
  },
  AirCardContainer: {
    width: deviceWidth - 25,
    backgroundColor: "#fff",
    height: 292,
    borderRadius: airCardRadius,
    marginTop: 30,
    marginBottom: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation:10,
    display: "flex",
    flexDirection: "column",
  },
  AirCardGPSContainer: {
    width: deviceWidth - 25,
    backgroundColor: "#fff",
    height: 100,
    borderRadius: airCardRadius,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation:10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6c5ce7",
    alignItems: "center",
    //justifyContent: 'center',
  },
});