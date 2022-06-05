import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { icons } from "../constants";
import { Divider } from "react-native-elements";
export default function BottomTabs({ navigation }) {
  return (
      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          paddingVertical: 2,
          backgroundColor: "white",
          borderTopColor: "#000080",
          borderTopWidth: 1,
        }}
      >
        <TouchableOpacity
          style={{ paddingHorizontal: 10, paddingVertical: 3 }}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={icons.airquality}
            resizeMode="contain"
            style={{
              width: 35,
              height: 35,
              tintColor: "#000080",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ paddingHorizontal: 12, paddingVertical: 10 }}
          onPress={() => navigation.navigate("Mapa")}
        >
          <Ionicons
            name="earth"
            size={30}
            color="#000080"
            // color={focused ? "red" : "gray"}
          ></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ paddingHorizontal: 12, paddingVertical: 10 }}
          onPress={() => navigation.navigate("Formulario")}
        >
          <AntDesign name="form" size={30} color="#000080"></AntDesign>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ paddingHorizontal: 12, paddingVertical: 10 }}
          onPress={() => navigation.navigate("Notificaciones")}
        >
          <Feather
            name="alert-triangle"
            size={30}
            color="#000080"
            //color={focused ? "red" : "gray"}
          ></Feather>
        </TouchableOpacity>
      </View>
  );
}