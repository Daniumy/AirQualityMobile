import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderTabs from "../components/HeaderTabs";
import GlobalStyles from "../components/GlobalStyles";
import SearchBar from "../components/SearchBar";
import AirCard from "../components/AirCard";
import AirCardGPS from "../components/AirCardGPS";
import BottomTabs from "../components/BottomTabs";
import { Divider } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { db, auth } from "../firebase";
import { useIsFocused } from "@react-navigation/native";
import firebase from "firebase";

export default function Home({ navigation }) {
  const [regions, setRegions] = useState([]);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [modalError, setModalError] = useState(false);

  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      actualizarRegionesBBDD();
    }
  }, [isFocused]);

  async function actualizarRegionesBBDD() {
    const regionesDB = await db
      .collection("localizaciones")
      .doc(auth.currentUser.email)
      .get();
    const regiones = regionesDB.data();
    regiones ? setRegions(Object.values(regiones)) : null;
    setIsLoading(false);
  }

  function removeCard(value) {
    db.collection("localizaciones")
      .doc(auth.currentUser.email)
      .update({
        [value]: firebase.firestore.FieldValue.delete(),
      });
    setRegions((regions) =>
      regions.filter((region) => region.localizacion.direccion !== value)
    );
  }
  if (isLoading) {
    return null;
  } else
    return (
      <>
        <SafeAreaView
          style={[GlobalStyles.AndroidSafeArea, { marginBottom: 57,}]}
        >
          <LinearGradient
            colors={["#FFFFFF", "#D9E9EC"]}
            styles={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <HeaderTabs
              titulo="Localizaciones favoritas"
              navigation={navigation}
            />
            <Divider
              width={1}
              style={{ marginHorizontal: 15, borderRadius: 100 }}
              color="#000080"
            />

            <ScrollView
              contentContainerStyle={{
                alignItems: "center",
                paddingBottom: regions.length >= 1 ? 200 : 444,
              }}
            >
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalError}
                onRequestClose={() => {
                  setModalError(false);
                }}
              >
                <View style={styles.centeredView}>
                  <View
                    style={{
                      backgroundColor: "white",
                      height: "22%",
                      width: "80%",
                      justifyContent: "center",
                      borderRadius: 10,
                    }}
                  >
                    <Text style={{ marginHorizontal: 10, textAlign: "center" }}>
                      Si activas la ubicación podremos automáticamente
                      proporcionar el AQI del aire en tu localización.
                    </Text>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => setModalError(false)}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 15,
                          fontWeight: "bold",
                        }}
                      >
                        Ok
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <AirCardGPS setModalError={setModalError} />
              {regions &&
                regions
                  .sort((a, b) => (a.id > b.id ? 1 : -1))
                  .map((region, index) => (
                    <AirCard
                      region={region.localizacion}
                      key={index}
                      withExtra={true}
                      removeCard={removeCard}
                    />
                  ))}
              <TouchableOpacity
                style={{
                  padding: 10,
                  paddingBottom: 10,
                  marginTop: 20,
                  borderRadius: 20,
                  elevation: 10,
                  backgroundColor: "white",
                }}
                onPress={() => navigation.navigate("Mapa")}
              >
                <FontAwesome5 name="search-plus" size={40} />
              </TouchableOpacity>
            </ScrollView>
          </LinearGradient>
        </SafeAreaView>
        <BottomTabs navigation={navigation} />
      </>
    );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#000080",
    padding: 10,
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    elevation: 10,
  },
});
