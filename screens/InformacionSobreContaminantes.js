import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import GlobalStyles from "../components/GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";

export default function InformacionSobreContaminantes() {
  return (
    <>
      <SafeAreaView
        style={[
          GlobalStyles.AndroidSafeArea,
          GlobalStyles.SafeAreaBackground,
          { marginBottom: 57 },
        ]}
      >
        <LinearGradient
          colors={["#FFFFFF", "#D9E9EC"]}
          styles={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <HeaderTabs titulo="Configuración" navigation={navigation} />
          <Divider
            width={1}
            style={{ marginHorizontal: 15, borderRadius: 100 }}
            color="#000080"
          />
          <ScrollView style={{ height: "100%" }}>
            <View></View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
}
