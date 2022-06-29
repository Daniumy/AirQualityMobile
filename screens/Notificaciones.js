import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import GlobalStyles from "../components/GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { Divider } from "react-native-elements";
import HeaderTabs from "../components/HeaderTabs";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import {
  colorDisnea,
  colorEspirometria,
  colorSaturacion,
  colorFreqCardiaca,
  colorNivelSueño,
  isDisneaDangerous,
  isEspirometriaDangerous,
  isSaturacionDangerous,
  isFreqCardiacaDangerous,
  isNivelSueñoDangerous,
  isDisneaSensgrp,
  isEspirometriaSensgrp,
  isSaturacionSensgrp,
  isFreqCardiacaSensgrp,
  isNivelSueñoSensgrp,
} from "../utils/formularioCalculator";
import { useSelector } from "react-redux";
import {
  aqiLevelCO,
  aqiLevelNO2,
  aqiLevelPM10,
  aqiLevelO3,
  aqiLevelSO2,
} from "../utils/aqiCalculator";

import { LightenDarkenColor } from "lighten-darken-color";
import BottomTabs from "../components/BottomTabs";
import { auth, db } from "../firebase";
import { AQI_LEVEL, AQI_LEVEL_ELEMENT } from "../constants";

export default function Notificaciones({ navigation }) {
  const deviceWidth = Math.round(Dimensions.get("window").width);
  const [currentDate, setCurrentDate] = useState(null);
  const [disneaDia, setDisneaDia] = useState(null);
  const [disneaNoche, setDisneaNoche] = useState(null);
  const [espirometria, setEspirometria] = useState(null);
  const [saturacion, setSaturacion] = useState(null);
  const [freqCardiaca, setFreqCardiaca] = useState(null);
  const [dormido, setDormido] = useState(null);
  const [haySintomas, setHaySintomas] = useState(false);
  const [hayConcentraciones, setHayConcentraciones] = useState(false);
  const [sintomas, setSintomas] = useState(null);
  const [concentraciones, setConcentraciones] = useState(null);
  const [concentracionAndOneSymptom, setConcentracionAndOneSymptom] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const { location } = useSelector((state) => state.GPSReducer);
  const { symptomsAdded } = useSelector((state) => state.symptomsReducer);

  function getHigherEspirometria(espirometria) {
    if (!espirometria.fev || !espirometria.fvc) return null;
    return Math.max(espirometria.fev, espirometria.fvc);
  }

  useEffect(() => {
    getSintomas();
  }, [symptomsAdded]);

  async function getSintomas() {
    const sintomasDB = await db
      .collection("síntomas")
      .doc(auth.currentUser.email)
      .get();
    const sintomas = sintomasDB.data();
    setSintomas(sintomas);
  }

  async function getConcentraciones() {
    const concentracionesDB = await db
      .collection("concentraciones")
      .doc(auth.currentUser.email)
      .get();
    const concentraciones = concentracionesDB.data();
    setConcentraciones(concentraciones);
    concentraciones
      ? setHayConcentraciones(true)
      : setHayConcentraciones(false);
    setIsLoading2(false);
  }

  useEffect(() => {
    getConcentraciones();
  }, [location]);

  useEffect(() => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var fecha = date + "/" + month + "/" + year;
    let sintomasExisten = sintomas ? sintomas[fecha]?.síntomas : false;
    if (sintomasExisten) {
      setDisneaDia(sintomasExisten.disneaDia);
      setDisneaNoche(sintomasExisten.disneaNoche);
      setEspirometria(sintomasExisten.espirometria);
      setSaturacion(sintomasExisten.saturacion);
      setFreqCardiaca(sintomasExisten.freqCardiaca);
      setDormido(sintomasExisten.dormido);
      setHaySintomas(true);
      setIsLoading(false);
    } else {
      setHaySintomas(false);
      setIsLoading(false);
    }
  }, [sintomas]);

  useEffect(() => {
    if (concentraciones) {
      if (
        (isDisneaSensgrp(getHigherDisnea()) ||
          isEspirometriaSensgrp(espirometria) ||
          isSaturacionSensgrp(saturacion) ||
          isFreqCardiacaSensgrp(freqCardiaca) ||
          isNivelSueñoSensgrp(dormido)) &&
        TwoUnhealthyConcentrations()
      ) {
        setConcentracionAndOneSymptom(true);
      }
    }
  }, [concentraciones]);
  function TwoUnhealthyConcentrations() {
    let amount = 0;

    let pm10 = concentraciones?.concentracion[0];
    let so2 = concentraciones?.concentracion[1];
    let co = concentraciones?.concentracion[2];
    let no2 = concentraciones?.concentracion[3];
    let o3 = concentraciones?.concentracion[4];

    if (concentraciones) {
      aqiLevelCO(co) == AQI_LEVEL.unhealthy ? amount++ : null;
      aqiLevelNO2(no2) == AQI_LEVEL.unhealthy ? amount++ : null;
      aqiLevelPM10(pm10) == AQI_LEVEL.unhealthy ? amount++ : null;
      aqiLevelO3(o3) == AQI_LEVEL.unhealthy ? amount++ : null;
      aqiLevelSO2(so2) == AQI_LEVEL.unhealthy ? amount++ : null;
    }

    return amount >= 2;
  }

  function getHigherDisnea() {
    return Math.max(disneaDia, disneaNoche);
  }

  function ThreeSymptomsUnhealthySensgrp() {
    let amount = 0;

    isDisneaSensgrp(getHigherDisnea()) ? amount++ : null;
    isEspirometriaSensgrp(espirometria) ? amount++ : null;
    isSaturacionSensgrp(saturacion) ? amount++ : null;
    isFreqCardiacaSensgrp(freqCardiaca) ? amount++ : null;
    isNivelSueñoSensgrp(dormido) ? amount++ : null;

    return amount >= 3;
  }

  function ThreeConcentrationsUnhealthy() {
    let concentraciones = CertainLevelConcentration(
      AQI_LEVEL_ELEMENT.unhealthy_sensgrp
    );
    return concentraciones.length >= 3;
  }
  function CertainLevelConcentration(level) {
    let pm10 = concentraciones?.concentracion[0];
    let so2 = concentraciones?.concentracion[1];
    let co = concentraciones?.concentracion[2];
    let no2 = concentraciones?.concentracion[3];
    let o3 = concentraciones?.concentracion[4];

    let unhealthyConcentrations = [];

    if (concentraciones) {
      if (aqiLevelCO(co) == level) unhealthyConcentrations.push("co");
      if (aqiLevelNO2(no2) == level) unhealthyConcentrations.push("no2");
      if (aqiLevelPM10(pm10) == level) unhealthyConcentrations.push("pm10");
      if (aqiLevelO3(o3) == level) unhealthyConcentrations.push("o3");
      if (aqiLevelSO2(so2) == level) unhealthyConcentrations.push("so2");
    }

    return unhealthyConcentrations;
  }

  function comprobarIfUnaAlerta() {
    if (
      haySintomas &&
      hayConcentraciones &&
      !isFreqCardiacaDangerous(freqCardiaca) &&
      !isNivelSueñoDangerous(dormido) &&
      !isSaturacionDangerous(saturacion) &&
      !isEspirometriaDangerous(espirometria) &&
      !isDisneaDangerous(getHigherDisnea()) &&
      !concentracionAndOneSymptom &&
      !ThreeSymptomsUnhealthySensgrp() &&
      !CertainLevelConcentration(AQI_LEVEL.hazardous).length > 0 &&
      !ThreeConcentrationsUnhealthy() &&
      !CertainLevelConcentration(AQI_LEVEL.unhealthy).length > 0
    )
      return true;
    else return false;
  }

  if (isLoading || isLoading2) {
    return null;
  } else
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
            <HeaderTabs titulo="Alertas" navigation={navigation} />
            <Divider
              width={1}
              style={{ marginHorizontal: 15, borderRadius: 100 }}
              color="#000080"
            />
            <ScrollView style={{ height: "100%" }}>
              {comprobarIfUnaAlerta() && (
                <View
                  style={[
                    styles.AlertContainer,
                    {
                      height: 90,
                      backgroundColor: LightenDarkenColor("#90ee90", 40),
                      textAlign: "center",
                      textAlignVertical: "center",
                    },
                  ]}
                >
                  <Entypo
                    name="thumbs-up"
                    size={40}
                    color="black"
                    style={{
                      textAlignVertical: "center",
                      marginHorizontal: 10,
                      alignSelf: "center",
                    }}
                  ></Entypo>
                  <Text
                    style={{
                      fontSize: 35,
                      textAlign: "center",
                      textAlignVertical: "center",
                      marginLeft: 17,
                    }}
                  >
                    ¡No hay alertas!
                  </Text>
                </View>
              )}
              {!haySintomas && (
                <Alerta
                  fontSize={deviceWidth < 375 ? 13 : 15}
                  titleText={"Si rellenas el diario de síntomas de hoy"}
                  suggestionText={"Daremos alertas sobre ello"}
                  background="#e75480"
                  height={90}
                />
              )}
              {!hayConcentraciones && (
                <Alerta
                  fontSize={15}
                  titleText={"Si activas el GPS"}
                  suggestionText={`Daremos alertas según la contaminación del aire`}
                  background="#e75480"
                  height={100}
                />
              )}
              {CertainLevelConcentration(AQI_LEVEL.unhealthy).length > 0 && (
                <Alerta
                  fontSize={deviceWidth < 375 ? 13 : 15}
                  titleText={`Por las concentraciones de ${CertainLevelConcentration(
                    AQI_LEVEL.unhealthy
                  ).join(", ")}`}
                  suggestionText={
                    "No salgas sin mascarilla \n\u2022 Cierra ventana \n\u2022 No hagas ejercicio"
                  }
                  background="#DE2F24"
                  height={130}
                />
              )}
              {ThreeConcentrationsUnhealthy() && (
                <Alerta
                  fontSize={deviceWidth < 375 ? 13 : 15}
                  titleText={
                    deviceWidth < 375
                      ? "Por una combinación deficiente \nde concentraciones:"
                      : `Por una combinación deficiente de concentraciones:`
                  }
                  suggestionText={
                    "No salgas sin mascarilla \n\u2022 Cierra ventana \n\u2022 No hagas ejercicio"
                  }
                  background="#DE2F24"
                  height={145}
                />
              )}
              {CertainLevelConcentration(AQI_LEVEL.hazardous).length > 0 && (
                <Alerta
                  fontSize={15}
                  titleText={`Por las concentraciones de ${CertainLevelConcentration(
                    AQI_LEVEL.hazardous
                  ).join(", ")}`}
                  suggestionText={"No salgas de casa \n\u2022 Cierra ventana"}
                  background="#8b0000"
                  height={100}
                />
              )}

              {haySintomas && sintomas && (
                <View style={{ paddingBottom: 100 }}>
                  {ThreeSymptomsUnhealthySensgrp() && (
                    <Alerta
                      fontSize={15}
                      titleText={"Debido a varios síntomas deficientes"}
                      suggestionText={"¡Asiste a consulta!"}
                      background="#DE2F24"
                      height={90}
                    />
                  )}
                  {concentracionAndOneSymptom && (
                    <Alerta
                      fontSize={15}
                      titleText={"Debido a síntomas y concentraciones"}
                      suggestionText={"¡Asiste a consulta!"}
                      background="#DE2F24"
                      height={90}
                    />
                  )}
                  {isDisneaDangerous(getHigherDisnea()) && (
                    <Alerta
                      fontSize={15}
                      titleText={"Debido a su disnea se le recomienda:"}
                      suggestionText={"No salir de casa"}
                      background={colorDisnea(getHigherDisnea())}
                      height={90}
                    />
                  )}
                  {isEspirometriaDangerous(espirometria) && (
                    <Alerta
                      fontSize={15}
                      titleText={"Debido a su espirometria se\n le recomienda:"}
                      suggestionText={"No salir de casa"}
                      background={colorEspirometria(
                        getHigherEspirometria(espirometria)
                      )}
                      height={90}
                    />
                  )}
                  {isSaturacionDangerous(saturacion) && (
                    <Alerta
                      fontSize={15}
                      titleText={"Debido a su saturación se le recomienda:"}
                      suggestionText={"No salir de casa"}
                      background={colorSaturacion(saturacion)}
                      height={90}
                    />
                  )}
                  {isFreqCardiacaDangerous(freqCardiaca) && (
                    <Alerta
                      fontSize={14}
                      titleText={
                        "Por su frecuencia cardíaca \nse le recomienda:"
                      }
                      suggestionText={"No salir de casa"}
                      background={colorFreqCardiaca(freqCardiaca)}
                      height={90}
                    />
                  )}
                  {isNivelSueñoDangerous(dormido) && (
                    <Alerta
                      fontSize={15}
                      titleText={"Debido a su grado sueño se le\n recomienda:"}
                      suggestionText={"No salir de casa"}
                      background={colorNivelSueño(dormido)}
                      height={90}
                    />
                  )}
                </View>
              )}
            </ScrollView>
          </LinearGradient>
        </SafeAreaView>
        <BottomTabs navigation={navigation} />
      </>
    );
}

const Alerta = ({
  titleText,
  suggestionText,
  background,
  fontSize,
  height,
}) => {
  return (
    <View
      style={[
        styles.AlertContainer,
        { height: height, backgroundColor: LightenDarkenColor(background, 40) },
      ]}
    >
      <AntDesign
        name="warning"
        size={40}
        color="white"
        style={{
          textAlignVertical: "center",
          marginHorizontal: 10,
          alignSelf: "center",
        }}
      ></AntDesign>
      <View>
        <Text
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 1,
            marginTop: 10,
            fontSize: fontSize,
            marginRight: 90,
          }}
        >
          {titleText}
        </Text>
        <Text
          style={{
            marginTop: 5,
            marginLeft: 10,
            fontWeight: "bold",
            fontSize: fontSize + 5,
          }}
        >
          {"\u2022"} {suggestionText}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  AlertContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
  },
});
