import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  Dimensions,
  Image
} from "react-native";
import React, { useEffect, useState } from "react";
import GlobalStyles from "../components/GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { Divider } from "react-native-elements";
import HeaderTabs from "../components/HeaderTabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import BottomTabs from "../components/BottomTabs";
import { auth } from "../firebase";
import { db } from "../firebase";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer"]);
export default function Configuracion({ navigation }) {
  const [modalInfoVisible, setModalInfoVisible] = useState(false);
  const [doctorUser, setDoctorUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const deviceWidth = Math.round(Dimensions.get("window").width);
  
  console.log(auth);
  const handleCerrarSesion = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const handleComprobarSíntomas = () => {
    navigation.navigate("ComprobarSintomas");
  };

  useEffect(() => {
    isUserADoctor();
  }, []);
  
  async function isUserADoctor() {
    const usuarioDB = await db
      .collection("usuarios")
      .doc(auth.currentUser.uid)
      .get();

    if (usuarioDB.data().rol !== "Doctor") {
      setDoctorUser(false);
      setIsLoading(false);
    } else {
      setDoctorUser(true);
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return null;
  }
  else
  return (
    <>
      <SafeAreaView
        style={[
          GlobalStyles.AndroidSafeArea,
          GlobalStyles.SafeAreaBackground,
          { marginBottom: 57 },
        ]}
      >
        {modalInfoVisible && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalInfoVisible}
            onRequestClose={() => {
              setModalInfoVisible(false);
            }}
          >
            <View style={styles.centeredView}>
              <View
                style={{
                  backgroundColor: "white",
                  height: "50%",
                  width: "85%",
                }}
              >
                <Text style={{ margin: 15, textAlign: "center" }}>
                  <Text style={{ fontSize: 15 }}>
                    AireLocal es una aplicación creada por Daniel Maestre Yepes
                    siendo esta su proyecto de TFG del año 2021/2022.{"\n"}
                    <Text style={{ fontWeight: "bold" }}>
                      Los objetivos de la aplicación son:
                    </Text>
                    {"\n"}
                    {"\n"}
                  </Text>
                  {"\u2022"} Proporcionar a los usuarios información sobre los
                  niveles de contaminación del aire, permitiéndoles{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    guardar sitios como favoritos
                  </Text>{" "}
                  para no tener que buscarlos siempre.
                  {"\n"}
                  {"\n"}
                  {"\u2022"} Crear{" "}
                  <Text style={{ fontWeight: "bold" }}>rutas óptimas</Text> con
                  concentraciones bajas de contaminación{"\n"}
                  {"\n"}
                  {"\u2022"} Proporcionar un{" "}
                  <Text style={{ fontWeight: "bold" }}>diario de síntomas</Text>{" "}
                  para que el paciente rellene los datos y se le proporcione
                  consejos y/o alertas respecto a su información.
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setModalInfoVisible(false)}
                >
                  <Text
                    style={{ color: "white", fontSize: 15, fontWeight: "bold" }}
                  >
                    Ok
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
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
            <View>
              <Text style={{ textAlign: "center", marginVertical: 8 }}>
                Cuenta con la que estás conectado/a: {auth.currentUser?.email}
              </Text>
              <ConfigField
                text="Acerca de AireLocal"
                icon="users"
                accionOnPress={() => setModalInfoVisible(true)}
              />
              <ConfigField
                text="Cerrar sesión"
                icon="sign-out"
                accionOnPress={handleCerrarSesion}
              />
              {doctorUser && (
                <ConfigField
                  text="Comprobar síntomas pacientes"
                  icon="sign-out"
                  accionOnPress={handleComprobarSíntomas}
                />
              )}
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
      <BottomTabs navigation={navigation} />
    </>
  );
}

const ConfigField = ({ icon, text, onPress, accionOnPress }) => {
  return (
    <TouchableOpacity
      style={styles.AlertContainer}
      onPress={() => {
        accionOnPress();
      }}
    >
      <FontAwesome
        name={icon}
        size={Math.round(Dimensions.get("window").width) < 375 ? 28 :40}
        color="#000080"
        style={{ textAlignVertical: "center", marginHorizontal: 10 }}
      ></FontAwesome>
      <Text
        style={{
          textAlignVertical: "center",
          fontSize: 30,
          fontWeight: "bold",
          marginHorizontal: 6,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  AlertContainer: {
    backgroundColor: "white",
    height: 100,
    width: Math.round(Dimensions.get("window").width) - 30,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    borderColor: "#000080",
    borderWidth: 2,
  },
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
