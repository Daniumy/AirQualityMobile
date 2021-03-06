import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MapView, {
  Callout,
  Marker,
  MarkerAnimated,
  Polygon,
} from "react-native-maps";
import React, { useEffect, useState } from "react";
import GlobalStyles from "../components/GlobalStyles";
import BottomTabs from "../components/BottomTabs";
import "react-native-gesture-handler";
import { Divider } from "react-native-elements";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import { setRegion } from "../redux/actions";
import * as Location from "expo-location";
import {
  renderRouteLimit,
  isInsideArea1,
  calculateRoute,
} from "../utils/optimalRouteFunctions";
import MapViewDirections from "react-native-maps-directions";
import { REACT_APP_MAPVIEW_API } from "@env";

export default function MapaRuta({ navigation }) {
  const { location } = useSelector((state) => state.GPSReducer);

  const dispatch = useDispatch();

  const defaultDestinyLocation = {
    latitude: 37.984047,
    longitude: -1.128575,
  };

  const defaultLocation = {
    latitude: 37.9922399,
    longitude: -1.1306544,
    latitudeDelta: 0.04,
    longitudeDelta: 0.04,
  };

  const [localRegion, setLocalRegion] = useState({
    direccion: location.direccion,
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [currentRoute, setCurrentRoute] = useState(null);
  const [initialPoint, setInitialPoint] = useState(null);
  const [finalPoint, setFinalPoint] = useState(null);
  const [destinyGlobalLocation, setDestinyGlobalLocation] = useState({
    direccion: null,
    latitude: 37.984047,
    longitude: -1.128575,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  });
  function getOptimalRoute(origin, destination, isGPSLocationInsideArea1) {
    if (!isGPSLocationInsideArea1) {
      const waypoints = calculateRoute(defaultLocation, destination);
      setInitialPoint(defaultLocation);
      setFinalPoint(destination);
      setCurrentRoute(waypoints);
    }
    else {
      const waypoints = calculateRoute(origin, destination);
      setInitialPoint(origin);
      setFinalPoint(destination);
      setCurrentRoute(waypoints);
    }
  }

  function renderOptimalRoute() {
    if (currentRoute == null) {
      return null;
    }
    return (
      <MapViewDirections
        origin={initialPoint}
        destination={finalPoint}
        apikey={REACT_APP_MAPVIEW_API}
        strokeWidth={4}
        strokeColor={"darkblue"}
        optimizeWaypoints={true}
        waypoints={currentRoute}
        mode={"WALKING"}
        resetOnChange={false}
        splitWaypoints={true}
      />
    );
  }

  let isGPSLocationInsideArea1 = isInsideArea1(
    localRegion.latitude,
    localRegion.longitude
  );

  return (
    <SafeAreaView
      style={[GlobalStyles.AndroidSafeArea, GlobalStyles.SafeAreaBackground]}
    >
      <GooglePlacesAutocomplete
        placeholder="Busca un destino"
        textInputProps={{
          placeholderTextColor: "darkgrey",
       }}
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: "distance",
        }}
        onPress={(data, details = null) => {
          if (
            isInsideArea1(
              details.geometry.location.lat,
              details.geometry.location.lng
            )
          ) {
            setDestinyGlobalLocation({
              direccion: data.description,
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
          } else {
            alert(
              "??El destino seleccionado est?? fuera del ??rea disponible! \nSeleccione uno que se encuentre dentro del ??rea"
            );
          }
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

      <MapView
        initialRegion={
          !localRegion.latitude
            ? defaultLocation
            : isGPSLocationInsideArea1
            ? localRegion
            : defaultLocation
        }
        provider="google"
        style={styles.map}
        region={
          !localRegion.latitude
            ? defaultLocation
            : isGPSLocationInsideArea1
            ? localRegion
            : defaultLocation
        }
      >
        {renderOptimalRoute()}
        <Marker
          coordinate={{
            latitude: !localRegion.latitude
              ? defaultLocation.latitude
              : isGPSLocationInsideArea1
              ? localRegion.latitude
              : defaultLocation.latitude,
            longitude: !localRegion.longitude
              ? defaultLocation.longitude
              : isGPSLocationInsideArea1
              ? localRegion.longitude
              : defaultLocation.longitude,
          }}
          title="Origen"
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag start", e.nativeEvent.coordinate);
          }}
          onDragEnd={(e) => {
            if (
              !isInsideArea1(
                e.nativeEvent.coordinate.latitude,
                e.nativeEvent.coordinate.longitude
              )
            ) {
              setLocalRegion({
                ...localRegion,
                latitude: 37.9922399,
                longitude: -1.1306544,
              });
              alert("??Parece que te has salido del ??rea disponible!");
            } else {
              setLocalRegion({
                ...localRegion,
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              });
              setCurrentRoute(null);
            }
          }}
        ></Marker>

        <Marker
          coordinate={{
            latitude: destinyGlobalLocation.latitude,
            longitude: destinyGlobalLocation.longitude,
          }}
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag start", e.nativeEvent.coordinate);
          }}
          onDragEnd={(e) => {
            if (
              !isInsideArea1(
                e.nativeEvent.coordinate.latitude,
                e.nativeEvent.coordinate.longitude
              )
            ) {
              setDestinyGlobalLocation({
                ...destinyGlobalLocation,
                latitude: defaultDestinyLocation.latitude,
                longitude: defaultDestinyLocation.longitude,
              });
              alert("??Parece que te has salido del ??rea disponible!");
            } else {
              setDestinyGlobalLocation({
                ...destinyGlobalLocation,
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              });
              setCurrentRoute(null);
            }
          }}
          pinColor={"blue"}
          title="Destino"
        ></Marker>

        {renderRouteLimit()}
      </MapView>

      <TouchableOpacity
        style={{
          color: "#000080",
          backgroundColor: "#000080",
          padding: 10,
          position: "absolute",
          top: "81%",
          alignSelf: "center",
          elevation: 1,
          borderRadius: 10,
        }}
        onPress={() =>
          getOptimalRoute(
            localRegion,
            destinyGlobalLocation,
            isGPSLocationInsideArea1
          )
        }
      >
        <Text style={{ fontSize: 17, color: "white", fontWeight: "bold" }}>
          Calcular ruta ??ptima
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          color: "#000080",
          backgroundColor: "#000080",
          padding: 10,
          position: "absolute",
          top: "88%",
          alignSelf: "center",
          elevation: 1,
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate("Mapa")}
      >
        <Text style={{ fontSize: 17, color: "white", fontWeight: "bold" }}>
          Volver al mapa normal
        </Text>
      </TouchableOpacity>
      <BottomTabs navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "#fff",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 60,
  },
});
