import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import GlobalStyles from "../components/GlobalStyles";
import { LightenDarkenColor } from "lighten-darken-color";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Location from "expo-location";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { COLORS, SIZES, AQI_LEVEL, AQI_LEVEL_ELEMENT } from "../constants";
import {
  aqiLevel,
  aqiColor,
  aqiFace,
  aqiLevelO3,
  aqiLevelCO,
  aqiLevelNO2,
  aqiLevelPM10,
  aqiLevelSO2,
  aqiColorCO,
  aqiColorNO2,
  aqiColorO3,
  aqiColorPM10,
  aqiColorSO2,
  maxAqi,
  calculateAqi,
  aqiToConcentration,
  ppbToMicrogram,
} from "../utils/aqiCalculator";
import { REACT_APP_WEATHER_API, REACT_APP_AIRQ_API } from "@env";
import { isInsideArea1, isInsideArea2 } from "../utils/optimalRouteFunctions";

const deviceWidth = Math.round(Dimensions.get("window").width);
const WEATHER_API_KEY = REACT_APP_WEATHER_API;
const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?";
const AIRQ_API_KEY = REACT_APP_AIRQ_API;
const BASE_AIRQ_URL = "https://api.waqi.info/feed/geo";

export default function AirCard({ region, withExtra, removeCard }) {
  const [extraActivo, setExtraActivo] = useState(false);
  const [currentAqiData, setCurrentAqiData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);

  async function fetchData(weatherUrl, airqUrl) {
    try {
      //Respuestas de los servidores
      const response = await fetch(airqUrl);
      const result = await response.json();
      if (response.ok) {
        setCurrentAqiData(result);
      } else {
        setErrorMessage(result.message);
      }

      const response2 = await fetch(weatherUrl);

      const result2 = await response2.json();
      if (response2.ok) {
        setCurrentWeather(result2);
      } else {
        setErrorMessage(result2.message);
      }
    } catch (error) {
      alert(
        "Lo sentimos, ha ocurrido un error. Vuelva a intentarlo más tarde."
      );
      console.log(error);
    }
  }
  
  useEffect(() => {
    const airqUrl = `${BASE_AIRQ_URL}:${region.latitude};${region.longitude}/?token=${AIRQ_API_KEY}`;
    const weatherUrl = `${BASE_WEATHER_URL}lat=${region.latitude}&lon=${region.longitude}&units=metric&appid=${WEATHER_API_KEY}`;
    fetchData(weatherUrl, airqUrl);
  }, []);


  function getHigherAqiFromPartialIndexes(partialIndexes) {
    let higherAqi = 0;
    partialIndexes.forEach((index) => {
      if (index > higherAqi) {
        higherAqi = index;
      }
    });
    return higherAqi;
  }
  if (
    currentAqiData != null &&
    currentWeather != null &&
    typeof currentAqiData.data.iaqi !== "undefined"
  ) {
    var ubicacion = {
      latitude: region.latitude,
      longitude: region.longitude,
    };
    const weatherIcon = currentWeather.weather[0].icon;
    const weatherTemp = Math.round(currentWeather.main.temp);
    const weatherIconUrl =
      "http://openweathermap.org/img/w/" + weatherIcon + ".png";

    let lat = region.latitude;
    let lng = region.longitude;
    let pm10 = currentAqiData.data.iaqi.pm10;
    let no2 = currentAqiData.data.iaqi.no2;
    let o3 = currentAqiData.data.iaqi.o3;
    let so2 = currentAqiData.data.iaqi.so2;
    let co = currentAqiData.data.iaqi.co;

    let highestAqi = maxAqi(currentAqiData.data.iaqi);
    let globalAqi;
    let partialAqis = [];
    let coIsShownInMg = false;
    if (isInsideArea2(region.latitude, region.longitude)) {
      globalAqi = calculateAqi(
        lat,
        lng,
        highestAqi.maxValue,
        highestAqi.pollutant
      );
      pm10 !== undefined
        ? partialAqis.push(calculateAqi(lat, lng, pm10.v, "pm10"))
        : partialAqis.push(undefined);
      so2 !== undefined
        ? partialAqis.push(calculateAqi(lat, lng, so2.v, "so2"))
        : partialAqis.push(undefined);
      co !== undefined
        ? partialAqis.push(calculateAqi(lat, lng, co.v, "co"))
        : partialAqis.push(undefined);
      no2 !== undefined
        ? partialAqis.push(calculateAqi(lat, lng, no2.v, "no2"))
        : partialAqis.push(undefined);
      o3 !== undefined
        ? partialAqis.push(calculateAqi(lat, lng, o3.v, "o3"))
        : partialAqis.push(undefined);
      partialAqis[0] = Math.round(aqiToConcentration(partialAqis[0], "pm10"));
      partialAqis[1] = Math.round(
        ppbToMicrogram(aqiToConcentration(partialAqis[1], "so2"), "so2")
      );
      partialAqis[2] = Math.round(
        ppbToMicrogram(aqiToConcentration(partialAqis[2], "co"), "co")
      );
      partialAqis[3] = Math.round(
        ppbToMicrogram(aqiToConcentration(partialAqis[3], "no2"), "no2")
      );
      partialAqis[4] = Math.round(
        ppbToMicrogram(aqiToConcentration(partialAqis[4], "o3"), "o3")
      );
    } else {
      coIsShownInMg = true;
      pm10 !== undefined
        ? partialAqis.push(pm10.v)
        : partialAqis.push(undefined);
      so2 !== undefined
        ? partialAqis.push(so2.v * 0.286)
        : partialAqis.push(undefined);
      co !== undefined
        ? partialAqis.push(co.v * 0.001 * 10)
        : partialAqis.push(undefined);
      no2 !== undefined
        ? partialAqis.push(no2.v * 0.5)
        : partialAqis.push(undefined);
      o3 !== undefined
        ? partialAqis.push(o3.v * 0.556)
        : partialAqis.push(undefined);
      globalAqi = getHigherAqiFromPartialIndexes(partialAqis);
    }
    return (
      <>
        <View
          style={[
            GlobalStyles.AirCardContainer,
            { height: region.direccion.length >= 61 ? 330 : 320 },
          ]}
        >
          <TopCard
            aqi={globalAqi != undefined ? Math.round(globalAqi) : "?"}
            weatherTemp={weatherTemp}
            weatherIconURL={weatherIconUrl}
          />
          <Direccion address={region.direccion} />
          <BottomCard elementos={partialAqis} coInMg={coIsShownInMg} />
        </View>
        {withExtra && (
          <ExtraBottom
            extraActivo={extraActivo}
            setExtraActivo={setExtraActivo}
            removeCard={removeCard}
            region={region}
          />
        )}
      </>
    );
  } else {
    return (
      <View style={GlobalStyles.AirCardGPSContainer}>
        <Text> {errorMessage}</Text>
      </View>
    );
  }
}
function ExtraBottom({ extraActivo, setExtraActivo, removeCard, region, id }) {
  if (!extraActivo)
    return (
      <TouchableOpacity
        style={{
          elevation: 10,
          backgroundColor: "white",
          width: "50%",
          alignSelf: "center",
          alignItems: "center",
          borderBottomRightRadius: 100,
          borderBottomLeftRadius: 100,
        }}
        onPress={() => setExtraActivo(true)}
      >
        <FontAwesome5 name="angle-down" size={30} color="black"></FontAwesome5>
      </TouchableOpacity>
    );
  else
    return (
      <View
        style={{
          display: "flex",
          elevation: 10,
          backgroundColor: "white",
          width: deviceWidth - 100,
          borderBottomRightRadius: 50,
          borderBottomLeftRadius: 50,
          height: 80,
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => removeCard(region.direccion)}
          style={{
            backgroundColor: "red",
            padding: 8,
            borderRadius: 10,
            width: "60%",
            top: 3,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: deviceWidth < 375 ? 13 : 16,
            }}
          >
            Eliminar localización
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ paddingVertical: 0, paddingHorizontal: 8, bottom: 0 }}
          onPress={() => setExtraActivo(false)}
        >
          <FontAwesome5 name="angle-up" size={40} color="black"></FontAwesome5>
        </TouchableOpacity>
      </View>
    );
}

const TopCard = ({ aqi, weatherTemp, weatherIconURL }) => (
  <>
    <View
      style={{
        width: "100%",
        backgroundColor: aqiColor(aqi),
        height: "20%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
    >
      <View
        style={{
          borderTopLeftRadius: 10,
          width: "30%",
          height: "100%",
          backgroundColor: LightenDarkenColor(aqiColor(aqi), -20),
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white" }}>{weatherTemp}ºC</Text>
        <Image
          source={{ uri: weatherIconURL }}
          resizeMode="contain"
          style={{
            width: 40,
            height: 40,
          }}
        />
      </View>
      <View
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          left: "30%",
          width: "70%",
          backgroundColor: aqiColor(aqi),
          height: "100%",
          borderTopRightRadius: 10,
          paddingLeft: 7,
        }}
      >
        <FontAwesome5
          name={aqiFace(aqi)}
          size={40}
          color="black"
        ></FontAwesome5>
        <Text
          style={{
            fontSize: aqiLevel(aqi) == AQI_LEVEL.unhealthy_sensgrp ? 15 : 18,
          }}
        >
          {aqiLevel(aqi)}
        </Text>
        <Text
          style={{
            fontSize: 22,
            marginLeft: 8,
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          {aqi}
          {"\n"}
          <Text style={{ fontSize: 14 }}>AQI</Text>
        </Text>
      </View>
    </View>
  </>
);

const Direccion = ({ address }) => (
  <>
    <Text
      style={{
        paddingTop: "4%",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: address.length >= 45 ? 12 : 14,
      }}
    >
      {address}
    </Text>
  </>
);

const BottomCard = ({ elementos, coInMg }) => {
  let elementoPM10 = <></>;
  let elementoSO2 = <></>;
  let elementoCO = <></>;
  let elementoNO2 = <></>;
  let elementoO3 = <></>;

  elementoPM10 = (
    <View
      style={{
        backgroundColor: aqiColorPM10(elementos[0]),
        height: "85%",
        width: "18%",
        marginTop: 7,
        borderRadius: 10,
        marginHorizontal: 3,
        marginLeft: 6,
        justifyContent: "center", //Centered horizontally
      }}
    >
      <Text style={styles.textoContaminantes}>
        <Text style={{ fontWeight: "bold" }}>PM10</Text> {"\n"}
        {"\n"}{" "}
        <Text
          style={{
            fontSize:
              aqiLevelPM10(elementos[0]) == AQI_LEVEL_ELEMENT.unhealthy_sensgrp
                ? 11
                : 14,
          }}
        >
          {aqiLevelPM10(elementos[0])}
        </Text>{" "}
        {aqiLevelPM10(elementos[0]) != AQI_LEVEL.unknown
          ? "\n\n" + Math.round(elementos[0]) + "\n"
          : ""}
        {aqiLevelPM10(elementos[0]) != AQI_LEVEL.unknown ? "μg/m³" : ""}
      </Text>
    </View>
  );

  elementoSO2 = (
    <View
      style={{
        backgroundColor: aqiColorSO2(elementos[1]),
        height: "85%",
        width: "18%",
        marginTop: 7,
        borderRadius: 10,
        marginHorizontal: 3,
        justifyContent: "center", //Centered horizontally
      }}
    >
      <Text style={styles.textoContaminantes}>
        <Text style={{ fontWeight: "bold" }}>SO2</Text> {"\n"}
        {"\n"}{" "}
        <Text
          style={{
            fontSize:
              aqiLevelSO2(elementos[1]) == AQI_LEVEL_ELEMENT.unhealthy_sensgrp
                ? 11
                : 14,
          }}
        >
          {aqiLevelSO2(elementos[1])}
        </Text>{" "}
        {aqiLevelSO2(elementos[1]) != AQI_LEVEL.unknown
          ? "\n\n" + Math.round(elementos[1]) + "\n"
          : ""}
        {aqiLevelSO2(elementos[1]) != AQI_LEVEL.unknown ? "μg/m³" : ""}
      </Text>
    </View>
  );

  elementoCO = (
    <View
      style={{
        backgroundColor: aqiColorCO(elementos[2]),
        height: "85%",
        width: "18%",
        marginTop: 7,
        borderRadius: 10,
        marginHorizontal: 3,
        justifyContent: "center", //Centered22
      }}
    >
      <Text style={styles.textoContaminantes}>
        <Text style={{ fontWeight: "bold" }}>CO</Text> {"\n"}
        {"\n"}{" "}
        <Text
          style={{
            fontSize:
              aqiLevelCO(elementos[2]) == AQI_LEVEL_ELEMENT.unhealthy_sensgrp
                ? 11
                : 14,
          }}
        >
          {aqiLevelCO(elementos[2])}
        </Text>{" "}
        {aqiLevelCO(elementos[2]) != AQI_LEVEL.unknown
          ? "\n\n" + Math.round(elementos[2]) + "\n"
          : ""}
        {aqiLevelCO(elementos[2]) == AQI_LEVEL.unknown
          ? ""
          : coInMg
          ? "mg/m³"
          : "μg/m³"}
      </Text>
    </View>
  );

  elementoNO2 = (
    <View
      style={{
        backgroundColor: aqiColorNO2(elementos[3]),
        height: "85%",
        width: "18%",
        marginTop: 7,
        borderRadius: 10,
        marginHorizontal: 3,
        justifyContent: "center", //Centered horizontally
      }}
    >
      <Text style={styles.textoContaminantes}>
        <Text style={{ fontWeight: "bold" }}>NO2</Text> {"\n"}
        {"\n"}{" "}
        <Text
          style={{
            fontSize:
              aqiLevelNO2(elementos[3]) == AQI_LEVEL_ELEMENT.unhealthy_sensgrp
                ? 11
                : 14,
          }}
        >
          {aqiLevelNO2(elementos[3])}
        </Text>{" "}
        {aqiLevelNO2(elementos[3]) != AQI_LEVEL.unknown
          ? "\n\n" + Math.round(elementos[3]) + "\n"
          : ""}
        {aqiLevelNO2(elementos[3]) != AQI_LEVEL.unknown ? "μg/m³" : ""}
      </Text>
    </View>
  );

  elementoO3 = (
    <View
      style={{
        backgroundColor: aqiColorO3(elementos[4]),
        height: "85%",
        width: "18%",
        marginTop: 7,
        borderRadius: 10,
        marginHorizontal: 3,
        justifyContent: "center", //Centered horizontally
      }}
    >
      <Text style={styles.textoContaminantes}>
        <Text style={{ fontWeight: "bold" }}>O3</Text> {"\n"}
        {"\n"}{" "}
        <Text
          style={{
            fontSize:
              aqiLevelO3(elementos[4]) == AQI_LEVEL_ELEMENT.unhealthy_sensgrp
                ? 11
                : 14,
          }}
        >
          {aqiLevelO3(elementos[4])}
        </Text>{" "}
        {aqiLevelO3(elementos[4]) != AQI_LEVEL.unknown
          ? "\n\n" + Math.round(elementos[4]) + "\n"
          : ""}
        {aqiLevelO3(elementos[4]) != AQI_LEVEL.unknown ? "μg/m³" : ""}
      </Text>
    </View>
  );

  return (
    <>
      <View style={styles.bottomCard}>
        {elementoPM10}
        {elementoO3}
        {elementoNO2}
        {elementoSO2}
        {elementoCO}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  topCard: {
    width: "100%",
    backgroundColor: "#ffd700",
    height: "20%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bottomCard: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 3,
  },
  topCardRight: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    left: "30%",
    width: "70%",
    backgroundColor: aqiColor(),
    height: "100%",
    borderTopRightRadius: 10,
    paddingLeft: 7,
  },
  textoContaminantes: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
