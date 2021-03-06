import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import GlobalStyles from "../components/GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { Divider } from "react-native-elements";
import HeaderTabs from "../components/HeaderTabs";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
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

  const handleCerrarSesion = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const handleObtenerInformacion = () => {
    navigation.navigate("Informacion");
  }

  const handleComprobarS√≠ntomas = () => {
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
                      AireLocal es una aplicaci√≥n creada por Daniel Maestre
                      Yepes siendo esta su proyecto de TFG del a√Īo 2021/2022.
                      {"\n"}
                      <Text style={{ fontWeight: "bold" }}>
                        Los objetivos de la aplicaci√≥n son:
                      </Text>
                      {"\n"}
                      {"\n"}
                    </Text>
                    {"\u2022"} Proporcionar a los usuarios informaci√≥n sobre los
                    niveles de contaminaci√≥n del aire, permiti√©ndoles{" "}
                    <Text style={{ fontWeight: "bold" }}>
                      guardar sitios como favoritos
                    </Text>{" "}
                    para no tener que buscarlos siempre.
                    {"\n"}
                    {"\n"}
                    {"\u2022"} Crear{" "}
                    <Text style={{ fontWeight: "bold" }}>rutas √≥ptimas</Text>{" "}
                    con concentraciones bajas de contaminaci√≥n{"\n"}
                    {"\n"}
                    {"\u2022"} Proporcionar un{" "}
                    <Text style={{ fontWeight: "bold" }}>
                      diario de s√≠ntomas
                    </Text>{" "}
                    para que el paciente rellene los datos y se le proporcione
                    consejos y/o alertas respecto a su informaci√≥n.
                  </Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => setModalInfoVisible(false)}
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
          )}
          <LinearGradient
            colors={["#FFFFFF", "#D9E9EC"]}
            styles={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <HeaderTabs titulo="Configuraci√≥n" navigation={navigation} />
            <Divider
              width={1}
              style={{ marginHorizontal: 15, borderRadius: 100 }}
              color="#000080"
            />
            <ScrollView style={{ height: "100%" }}>
              <View>
                <Text style={{ textAlign: "center", marginVertical: 8 }}>
                  Cuenta con la que est√°s conectado/a: {auth.currentUser?.email}
                </Text>
                <ConfigField
                  text="Acerca de AireLocal"
                  icon="users"
                  size={26}
                  heightProp={100}
                  accionOnPress={() => setModalInfoVisible(true)}
                />
                <ConfigField
                  text="Cerrar sesi√≥n"
                  icon="sign-out-alt"
                  size={26}
                  heightProp={100}
                  accionOnPress={handleCerrarSesion}
                />
                <ConfigField
                  text="Obtener informaci√≥n sobre los contaminantes"
                  size={24}
                  icon="info-circle"
                  heightProp={100}
                  accionOnPress={handleObtenerInformacion}
                />
                {doctorUser && (
                  <ConfigField
                    text="Comprobar s√≠ntomas pacientes"
                    icon="user-md"
                    size={26}
                    heightProp={100}
                    accionOnPress={handleComprobarS√≠ntomas}
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

const ConfigField = ({ icon, text, onPress, accionOnPress, size, heightProp }) => {
  return (
    <TouchableOpacity
      style={[styles.AlertContainer, { height: heightProp }]}
      onPress={() => {
        accionOnPress();
      }}
    >
      <FontAwesome5
        name={icon}
        size={Math.round(Dimensions.get("window").width) < 375 ? 28 : 40}
        color="#000080"
        style={{ textAlignVertical: "center", marginHorizontal: 10 }}
      ></FontAwesome5>
      <Text
        style={{
          textAlignVertical: "center",
          fontSize: size,
          fontWeight: "bold",
          marginLeft: 8,
          marginRight: 60,
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
    textAlign:"center",
    alignItems:"center",
    textAlignVertical: "center"
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
