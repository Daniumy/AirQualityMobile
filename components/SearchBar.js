import { View, Text} from "react-native";
import React, { useState } from "react";
import { GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function SearchBar(props) {
  return (
    <View style={{ marginTop: 15, flexDirection: "row" }}>
      <GooglePlacesAutocomplete
        onPress={(data, details = null) => {
          addDireccion(data.description);
        }}
        placeholder="Search"
        styles={{
          textInput: {
            backgroundColor: "#B0E0E6",
            borderRadius: 30,
            fontWeight: "bold",
            marginTop: 7,
          },
          textInputContainer: {
            backgroundColor: "#B0E0E6",
            borderRadius: 50,
            flexDirection: "row",
            alignItems: "center",
            marginRight: 10,
          },
        }}
        renderLeftButton={() => (
          <View style={{ marginLeft: 10 }}>
            <Ionicons name="location-sharp" size={24}></Ionicons>
          </View>
        )}
        renderRightButton={() => (
          <View
            style={{
              flexDirection: "row",
              marginRight: 10,
              backgroundColor: "white",
              padding: 9,
              borderRadius: 30,
              alignItems: "center",
            }}
          >
            <AntDesign
              name="clockcircle"
              size={11}
              style={{
                marginRight: 6,
              }}
            />
            <Text>Search</Text>
          </View>
        )}
      />
    </View>
  );
}
