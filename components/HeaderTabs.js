import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function HeaderTabs({ titulo, fecha, navigation }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "transparent",
        marginVertical: 20,
        alignItems: "center",
        marginLeft: 10,
        elevation: 10,
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image
          source={icons.icon2}
          style={{
            width: 45,
            height: 45,
          }}
        ></Image>
      </TouchableOpacity>

      <View
        style={{ backgroundColor: "#000080", padding: 6, borderRadius: 10 }}
      >
        <Text style={{ fontSize: 21, fontWeight: "bold", color: "white" }}>
          {titulo}
        </Text>
        {typeof fecha !== "undefined" && (
          <Text
            style={{
              fontSize: 21,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
            }}
          >
            {fecha}
          </Text>
        )}
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Configuracion")}>
        <Ionicons name="settings" size={35} color="#000080" style={{marginRight: 10}}/>
      </TouchableOpacity>
    </View>
  );
}

