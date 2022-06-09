import {
  Modal,
  View,
  Text,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useState } from "react";
import GlobalStyles from "../components/GlobalStyles";
import BottomTabs from "../components/BottomTabs";
import "react-native-gesture-handler";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import AirCard from "../components/AirCard";
import { auth, db } from "../firebase";
import { REACT_APP_MAPVIEW_API } from "@env";

export default function Mapa({ navigation }) {
  const { location } = useSelector((state) => state.GPSReducer);
  console.log(REACT_APP_MAPVIEW_API +"\n\n\n\n\n\n\n\n\n\n\n\n");
  const defaultLocation = {
    latitude: 37.9922399,
    longitude: -1.1306544,
    latitudeDelta: 1,
    longitudeDelta: 1,
  }

  const [regionAdded, setRegionAdded] = useState(false);

  const [regions, setRegions] = useState([]);

  const [localRegion, setLocalRegion] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  });


  async function getRegionesBBDD() {
    const regionesDB = await db
      .collection("localizaciones")
      .doc(auth.currentUser.email)
      .get();
    const regiones = regionesDB.data();
    if (regiones) {
      setRegions(Object.values(regiones));
    }
  }

  useEffect(() => {
    getRegionesBBDD();
  }, [regionAdded]);

  function getRegionsHighestID() {
    let highestID = 0;
    regions.forEach((region) => {
      if (region.id > highestID) {
        highestID = region.id;
      }
    });
    return highestID;
  }
  function añadirFavorito(regionLocal) {
    let repetido = false;
    let direccion = regionLocal.direccion;
    let aux = direccion.split(".");
    let direccionModificada = aux.join("");
    regions.map((region, index) => {
      if (region.localizacion.direccion === direccionModificada)
        repetido = true;
    });
    if (!repetido) {
      let nuevaRegion = {
        direccion: direccionModificada,
        latitude: regionLocal.latitude,
        longitude: regionLocal.longitude,
      };
      setRegions((regions) => [...regions, nuevaRegion]);
      actualizarRegionesBBDD(nuevaRegion);
    }
    setModalVisible(!modalVisible);
  }

  function actualizarRegionesBBDD(nuevaRegion) {
    const usuarioDB = db
      .collection("localizaciones")
      .doc(auth.currentUser.email)
      .set(
        {
          [nuevaRegion.direccion]: {
            localizacion: nuevaRegion,
            id: getRegionsHighestID() + 1,
          },
        },
        { merge: true }
      )
      .then(() => setRegionAdded(!regionAdded));
  }

  const [modalVisible, setModalVisible] = useState(false);
  console.log(localRegion);
  return (
    <SafeAreaView
      style={[
        GlobalStyles.AndroidSafeArea,
        GlobalStyles.SafeAreaBackground,
        modalVisible ? { opacity: 0.3 } : {},
      ]}
    >
      {!modalVisible && (
        <GooglePlacesAutocomplete
          placeholder="Busca un lugar"
          fetchDetails={true}
          GooglePlacesSearchQuery={{
            rankby: "distance",
          }}
          onPress={(data, details = null) => {
            setLocalRegion({
              direccion: data.description,
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
            setModalVisible(true);
          }}
          query={{
            key: REACT_APP_MAPVIEW_API,
            language: "es",
            location: `${localRegion.latitude}, ${localRegion.longitude}`, //esto hace que devuelva sitios cercanos a esta localizacion, que querremos que sea la nuestra.
          }}
          renderLeftButton={() => (
            <View style={{ marginLeft: 10 }}>
              <Ionicons name="location-sharp" size={24} />
            </View>
          )}
          styles={{
            container: {
              flex: 0,
              position: "absolute",
              width: "80%",
              elevation: 2,
              marginTop: 70,
              alignSelf: "center",
              zIndex: 1,
            },
            listView: { position: "relative", backgroundColor: "white" },

            textInput: {
              backgroundColor: "white",
              borderRadius: 20,
              fontWeight: "700",
              marginTop: 7,
            },
            textInputContainer: {
              backgroundColor: "white",
              borderRadius: 20,
              flexDirection: "row",
              alignItems: "center",
              marginRight: 10,
            },
          }}
        />
      )}
      {modalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <AirCard region={localRegion} withExtra={false} />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() => añadirFavorito(localRegion)}
              >
                <Text
                  style={{ color: "white", fontSize: 15, fontWeight: "bold" }}
                >
                  Añadir a favoritos
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text
                  style={{ color: "white", fontSize: 15, fontWeight: "bold" }}
                >
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      <View style={styles.container}>
        <MapView
          initialRegion={location?.latitude ? location : defaultLocation}
          provider="google"
          style={styles.map}
          region={localRegion?.latitude ? localRegion : defaultLocation}
        >
          <Marker
            coordinate={{
              latitude: localRegion?.latitude ? localRegion.latitude : defaultLocation.latitude,
              longitude: localRegion?.longitude ? localRegion.longitude : defaultLocation.longitude,
            }}
          ></Marker>
        </MapView>
      </View>
      {!modalVisible && (
        <TouchableOpacity
          style={{
            color: "#000080",
            backgroundColor: "#000080",
            padding: 10,
            position: "absolute",
            top: "85%",
            alignSelf: "center",
            elevation: 1,
            borderRadius: 10,
          }}
          onPress={() => navigation.navigate("MapaRuta")}
        >
          <Text style={{ fontSize: 17, color: "white", fontWeight: "bold" }}>
            Calcular ruta óptima
          </Text>
        </TouchableOpacity>
      )}
      <BottomTabs navigation={navigation} />
    </SafeAreaView>
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
    marginTop: 3,
    marginHorizontal: 20,
    borderRadius: 8,
    elevation: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
