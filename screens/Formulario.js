import React, { useEffect, useState } from "react";
import GlobalStyles from "../components/GlobalStyles";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Divider } from "react-native-elements";
import BottomTabs from "../components/BottomTabs";
import HeaderTabs from "../components/HeaderTabs";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import { auth, db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setSymptomsAdded, setSymptomsSent } from "../redux/actions";
import { useIsFocused } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function Formulario({ navigation }) {
  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const fecha = date + "/" + month + "/" + year;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { symptomsAdded, symptomsSent } = useSelector(
    (state) => state.symptomsReducer
  );

  function handleSymptomsSent(value) {
    dispatch(setSymptomsSent(value));
  }

  const espirometriaInitial = {
    selectedEspirometria: "Si",
    comentario: null,
    fvc: null,
    fev: null,
    noRealizadaMotivo: null,
  };

  const caminataInitial = {
    saturacion: null,
    freqCardiaca: null,
    disnea: "0",
    comentario: null,
  };

  const salidoCasaInitial = {
    value: "Si",
    comentario: null,
  };

  const [currentDate, setCurrentDate] = useState(fecha);
  const [tos, setTos] = useState("0");
  const [empeoramiento, setEmpeoramiento] = useState("Si");
  const [disneaDia, setDisneaDia] = useState("0");
  const [disneaNoche, setDisneaNoche] = useState("0");
  const [espirometria, setEspirometria] = useState(espirometriaInitial);
  const [dormido, setDormido] = useState("1");
  const [saturacion, setSaturacion] = useState(null);
  const [freqCardiaca, setFreqCardiaca] = useState(null);
  const [caminata, setCaminata] = useState(caminataInitial);
  const [salidoCasa, setSalidoCasa] = useState(salidoCasaInitial);
  const [haySintomasEnviados, setHaySintomasEnviados] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activo, setActivo] = useState(false);

  const [intentoDeEnvioDeS??ntomas, setIntentoDeEnvioDeS??ntomas] =
    useState(false);
  const regExp = /[a-z]/i;

  function handleEnviarSintomas() {
    setIntentoDeEnvioDeS??ntomas(true);
    if (!checkIfCamposIncorrectos()) {
      addSymptomsToBBDD();
      handleSymptomsSent(true);
    }
  }
  async function recuperarSintomasYaEnviados() {
    let sintomas;
    const sintomasDB = await db
      .collection("s??ntomas")
      .doc(auth.currentUser.email)
      .get()
      .then((data) => {
        sintomas = data.data();
        setIsLoading(false);
      });

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var fecha = date + "/" + month + "/" + year;
    let sintomasExisten = sintomas[fecha] ? sintomas[fecha]?.s??ntomas : false;
    if (sintomasExisten) {
      setEspirometria(sintomasExisten.espirometria);
      setDisneaNoche(sintomasExisten.disneaNoche);
      setDisneaDia(sintomasExisten.disneaDia);
      setSaturacion(sintomasExisten.saturacion);
      setFreqCardiaca(sintomasExisten.freqCardiaca);
      setDormido(sintomasExisten.dormido);
      setCaminata(sintomasExisten.caminata);
      setSalidoCasa(sintomasExisten.salidoCasa);
      setTos(sintomasExisten.tos);
      setEmpeoramiento(sintomasExisten.empeoramiento);
      setHaySintomasEnviados(true);
    } else {
      setHaySintomasEnviados(false);
    }
  }
  async function addSymptomsToBBDD() {
    dispatch(
      setSymptomsAdded({
        symptomsAdded: !symptomsAdded,
      })
    );

    const usuarioDB = await db
      .collection("s??ntomas")
      .doc(auth.currentUser.email)
      .set(
        {
          [currentDate]: {
            s??ntomas: {
              disneaDia: disneaDia,
              disneaNoche: disneaNoche,
              espirometria: espirometria,
              dormido: dormido,
              saturacion: saturacion,
              freqCardiaca: freqCardiaca,
              caminata: caminata,
              salidoCasa: salidoCasa,
              tos: tos,
              empeoramiento: empeoramiento,
            },
          },
        },
        { merge: true }
      );
  }
  function checkIfCamposIncorrectos() {
    if (
      (!espirometria.comentario && espirometria.selectedEspirometria == "Si") ||
      (!espirometria.fvc && espirometria.selectedEspirometria == "Si") ||
      (!espirometria.fev && espirometria.selectedEspirometria == "Si") ||
      (regExp.test(espirometria.fev) && espirometria.fev !== "" && espirometria.selectedEspirometria == "Si") ||
      (regExp.test(espirometria.fvc) && espirometria.fvc !== "" && espirometria.selectedEspirometria == "Si") ||
      (!espirometria.noRealizadaMotivo &&
        espirometria.selectedEspirometria == "No")
    ) {
      return true;
    } else if (
      !saturacion ||
      regExp.test(saturacion) ||
      regExp.test(freqCardiaca) ||
      !freqCardiaca ||
      !caminata.saturacion ||
      regExp.test(caminata.saturacion) ||
      regExp.test(caminata.freqCardiaca) ||
      !caminata.freqCardiaca ||
      (!salidoCasa.comentario && salidoCasa.value == "Si")
    ) {
      return true;
    }
  }

  useEffect(() => {
    // setIsLoading(true);
    if (isFocused) {
      var date = new Date().getDate();
      if (date != currentDate.split("/")[0]) {
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var fecha = date + "/" + month + "/" + year;
        setCurrentDate(fecha);
        handleSymptomsSent(false);
      }
      recuperarSintomasYaEnviados();
      if (haySintomasEnviados) {
        handleSymptomsSent(true);
      } else {
        handleSymptomsSent(false);
      }
    }
  }, [isFocused]);

  useEffect(() => {
    handleSymptomsSent(haySintomasEnviados);
  }, [haySintomasEnviados]);

  if (isLoading) {
    return null;
  } else {
    if (!symptomsSent) {
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
              colors={["#FFFFFF", "#E9F1F2"]}
              styles={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <HeaderTabs titulo="Diario de s??ntomas" navigation={navigation} />
              <Divider
                width={1}
                style={{ marginHorizontal: 15, borderRadius: 100 }}
                color="#000080"
              />
              <ScrollView contentContainerStyle={styles.container}>
                <View
                  style={{
                    marginHorizontal: 15,
                    backgroundColor: "transparent",
                  }}
                >
                  <Disnea
                    momento="ma??ana"
                    disnea={disneaDia}
                    setDisnea={setDisneaDia}
                  />
                  <Divider width={2} marginTop={20} color="#000080" />
                  <View style={styles.dropdownContainer}>
                    <Text style={{}}>??Ha realizado la espirometr??a?: </Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Picker
                        dropdownIconColor="white"
                        selectedValue={espirometria.selectedEspirometria}
                        style={{
                          width: 87,
                          backgroundColor:
                            Platform.OS === "ios" ? "lightblue" : "#000080",
                          color: "white",
                          borderRadius: 8,
                        }}
                        itemStyle={{ height: 50 }}
                        onValueChange={(itemValue, itemIndex) =>
                          setEspirometria({
                            ...espirometria,
                            selectedEspirometria: itemValue,
                          })
                        }
                      >
                        <Picker.Item label="Si" value="Si" />
                        <Picker.Item label="No" value="No" />
                      </Picker>
                      {Platform.OS === "ios" && (
                        <FontAwesome5
                          name="arrows-alt-v"
                          size={20}
                          color="black"
                          style={{ marginLeft: 5, marginRight: -5 }}
                        ></FontAwesome5>
                      )}
                    </View>
                  </View>
                  <TextInput
                    placeholder="Comentarios"
                    placeholderTextColor="darkgrey"
                    style={{
                      borderWidth: 2,
                      borderColor: "#000080",
                      margin: 20,
                      paddingLeft: 10,
                    }}
                    onChangeText={(text) => {
                      setEspirometria({
                        ...espirometria,
                        comentario: text,
                      });
                    }}
                    multiline={true}
                    value={espirometria.comentario}
                  />
                  {espirometria.comentario == null &&
                    intentoDeEnvioDeS??ntomas &&
                    espirometria.selectedEspirometria == "Si" && (
                      <Text
                        style={{
                          color: "red",
                          textAlign: "center",
                          marginTop: -20,
                          fontSize: 16,
                        }}
                      >
                        {" "}
                        El comentario no debe de estar vac??o{" "}
                      </Text>
                    )}
                  <View style={[styles.dropdownContainer, { marginTop: -20 }]}>
                    <View style={styles.dropdownContainer}>
                      <Text>FVC(%):</Text>
                      <TextInput
                        placeholder="50"
                        placeholderTextColor="darkgrey"
                        onChangeText={(text) => {
                          setEspirometria({
                            ...espirometria,
                            fvc: text,
                          });
                        }}
                        style={{
                          borderWidth: 2,
                          borderColor: "#000080",
                          margin: 20,
                          paddingLeft: 10,
                          paddingRight: 20,
                        }}
                        value={espirometria.fvc}
                      />
                    </View>
                    <View style={styles.dropdownContainer}>
                      <Text>FEV1(%):</Text>
                      <TextInput
                        placeholder="50"
                        placeholderTextColor="darkgrey"
                        onChangeText={(text) => {
                          setEspirometria({
                            ...espirometria,
                            fev: text,
                          });
                        }}
                        style={{
                          borderWidth: 2,
                          borderColor: "#000080",
                          margin: 20,
                          paddingLeft: 10,
                          paddingRight: 20,
                        }}
                        value={espirometria.fev}
                      />
                    </View>
                  </View>
                  {(espirometria.fev == null || espirometria.fvc == null) &&
                    intentoDeEnvioDeS??ntomas &&
                    espirometria.selectedEspirometria == "Si" && (
                      <Text
                        style={{
                          color: "red",
                          textAlign: "center",
                          marginTop: -20,
                          fontSize: 16,
                        }}
                      >
                        Rellena ambos campos
                      </Text>
                    )}
                  {(regExp.test(espirometria.fev) ||
                    regExp.test(espirometria.fvc)) &&
                    intentoDeEnvioDeS??ntomas && (
                      <Text
                        style={{
                          color: "red",
                          textAlign: "center",
                          fontSize: 16,
                        }}
                      >
                        No se aceptan letras en estos campos
                      </Text>
                    )}
                  <TextInput
                    placeholder="En caso de no realizarla indicar el motivo"
                    placeholderTextColor="darkgrey"
                    onChangeText={(text) => {
                      setEspirometria({
                        ...espirometria,
                        noRealizadaMotivo: text,
                      });
                    }}
                    style={{
                      borderWidth: 2,
                      borderColor: "#000080",
                      margin: 20,
                      paddingLeft: 10,
                    }}
                    multiline={true}
                    value={espirometria.noRealizadaMotivo}
                  />
                  {espirometria.noRealizadaMotivo == null &&
                    intentoDeEnvioDeS??ntomas &&
                    espirometria.selectedEspirometria == "No" && (
                      <Text
                        style={{
                          color: "red",
                          textAlign: "center",
                          marginTop: -20,
                          fontSize: 16,
                        }}
                      >
                        {" "}
                        El campo no debe de estar vac??o{" "}
                      </Text>
                    )}
                  <Dormido dormido={dormido} setDormido={setDormido} />
                  <Divider width={2} marginTop={20} color="#000080" />
                  <Saturacion
                    saturacion={saturacion}
                    setSaturacion={setSaturacion}
                  />
                  {!saturacion && intentoDeEnvioDeS??ntomas && (
                    <Text
                      style={{
                        color: "red",
                        textAlign: "right",
                        marginTop: -20,
                        fontSize: 16,
                        marginBottom: 15,
                      }}
                    >
                      Rellena el campo
                    </Text>
                  )}
                  {regExp.test(saturacion) && intentoDeEnvioDeS??ntomas && (
                    <Text
                      style={{
                        color: "red",
                        textAlign: "right",
                        marginTop: -20,
                        fontSize: 16,
                        marginBottom: 5,
                      }}
                    >
                      El campo no puede contener letras
                    </Text>
                  )}
                  <Divider width={2} marginTop={5} color="#000080" />
                  <FreqCardiaca
                    freqCardiaca={freqCardiaca}
                    setFreqCardiaca={setFreqCardiaca}
                  />
                  {freqCardiaca == null && intentoDeEnvioDeS??ntomas && (
                    <Text
                      style={{
                        color: "red",
                        textAlign: "right",
                        marginTop: -20,
                        fontSize: 16,
                        marginBottom: 15,
                      }}
                    >
                      Rellena el campo
                    </Text>
                  )}
                  {regExp.test(freqCardiaca) && intentoDeEnvioDeS??ntomas && (
                    <Text
                      style={{
                        color: "red",
                        textAlign: "right",
                        marginTop: -20,
                        fontSize: 16,
                        marginBottom: 5,
                      }}
                    >
                      El campo no puede contener letras
                    </Text>
                  )}
                  <Divider width={2} marginTop={5} color="#000080" />
                  <Caminata
                    caminata={caminata}
                    setCaminata={setCaminata}
                    intentoDeEnvioDeS??ntomas={intentoDeEnvioDeS??ntomas}
                    regExp={regExp}
                  />
                  <Divider width={2} marginTop={5} color="#000080" />
                  <Disnea
                    momento="noche"
                    disnea={disneaNoche}
                    setDisnea={setDisneaNoche}
                  />
                  <Divider width={2} marginTop={20} color="#000080" />
                  <SalidoCasa salido={salidoCasa} setSalido={setSalidoCasa} />
                  {!salidoCasa.comentario &&
                    salidoCasa.value == "Si" &&
                    intentoDeEnvioDeS??ntomas && (
                      <Text
                        style={{
                          color: "red",
                          textAlign: "right",
                          fontSize: 16,
                        }}
                      >
                        Rellena el campo
                      </Text>
                    )}
                  <Divider width={2} marginTop={20} color="#000080" />
                  <Empeoramiento
                    empeoramiento={empeoramiento}
                    setEmpeoramiento={setEmpeoramiento}
                  />
                  <Divider width={2} marginTop={20} color="#000080" />
                  <Tos tos={tos} setTos={setTos} />
                </View>

                <TouchableOpacity
                  style={{
                    marginVertical: 25,
                    padding: 15,
                    backgroundColor: "#000080",
                    alignItems: "center",
                    alignSelf: "center",
                    width: "50%",
                    borderRadius: 10,
                  }}
                  onPress={() => handleEnviarSintomas()}
                >
                  <Text
                    style={{ fontSize: 17, color: "white", fontWeight: "bold" }}
                  >
                    Enviar s??ntomas
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </LinearGradient>
          </SafeAreaView>
          <BottomTabs navigation={navigation} />
        </>
      );
    } else {
      return (
        <SafeAreaView
          style={[
            GlobalStyles.AndroidSafeArea,
            GlobalStyles.SafeAreaBackground,
            { backgroundColor: "white" },
          ]}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#000080",
              width: "15%",
              borderRadius: 10,
              alignItems: "center",
              marginTop: 10,
              marginLeft: 10,
              paddingVertical: 3,
            }}
            onPress={() => navigation.navigate("Home")}
          >
            <AntDesign name="back" size={40} color="white"></AntDesign>
          </TouchableOpacity>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              top: "35%",
            }}
          >
            <Text
              style={{
                fontSize:
                  Math.round(Dimensions.get("window").width) < 375 ? 21 : 22,
              }}
            >
              ??Ya has enviado los s??ntomas de hoy!
            </Text>
            <Text style={{ fontSize: 22 }}>{currentDate}</Text>
            <Text style={{ fontSize: 22 }}>??Deseas hacerlo de nuevo?</Text>
            <View>
              <TouchableOpacity
                style={{
                  marginVertical: 15,
                  paddingHorizontal: 35,
                  paddingVertical: 18,
                  backgroundColor: "#000080",
                  alignItems: "center",
                  borderRadius: 10,
                }}
                onPress={() => {
                  handleSymptomsSent(false);
                  recuperarSintomasYaEnviados();
                }}
              >
                <Text
                  style={{ fontSize: 17, color: "white", fontWeight: "bold" }}
                >
                  Hacerlo de nuevo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      );
    }
  }
}
const Tos = ({ tos, setTos }) => (
  <View style={styles.dropdownContainer}>
    <Text style={{ marginHorizontal: 0 }}>
      Punt??e de 0 (nada) a {"\n"}10 (tos persistente insoportable) {"\n"}c??mo
      fue la tos de hoy:{" "}
    </Text>
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Picker
        itemStyle={{ height: 50 }}
        dropdownIconColor="white"
        selectedValue={tos}
        style={{
          width: 85,
          backgroundColor: Platform.OS === "ios" ? "lightblue" : "#000080",
          color: "white",
          borderRadius: 8,
        }}
        onValueChange={(itemValue, itemIndex) => setTos(itemValue)}
      >
        <Picker.Item label="0" value="0" />
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        <Picker.Item label="6" value="6" />
        <Picker.Item label="7" value="7" />
        <Picker.Item label="8" value="8" />
        <Picker.Item label="9" value="9" />
        <Picker.Item label="10" value="10" />
      </Picker>
      {Platform.OS === "ios" && (
        <FontAwesome5
          name="arrows-alt-v"
          size={20}
          color="black"
          style={{ marginLeft: 5, marginRight: -5 }}
        ></FontAwesome5>
      )}
    </View>
  </View>
);
const Empeoramiento = ({ empeoramiento, setEmpeoramiento }) => (
  <View style={styles.dropdownContainer}>
    <Text style={{}}>
      ??Ha habido a lo largo del d??a una{"\n"}situaci??n que le haya producido{" "}
      {"\n"}un empeoramiento cl??nico?:{" "}
    </Text>
    <View
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Picker
        itemStyle={{ height: 50 }}
        dropdownIconColor="white"
        selectedValue={empeoramiento}
        style={{
          width: 87,
          backgroundColor: Platform.OS === "ios" ? "lightblue" : "#000080",
          color: "white",
          borderRadius: 8,
        }}
        onValueChange={(itemValue, itemIndex) => setEmpeoramiento(itemValue)}
      >
        <Picker.Item label="Si" value="Si" />
        <Picker.Item label="No" value="No" />
      </Picker>
      {Platform.OS === "ios" && (
        <FontAwesome5
          name="arrows-alt-v"
          size={20}
          color="black"
          style={{ marginLeft: 5, marginRight: -5 }}
        ></FontAwesome5>
      )}
    </View>
  </View>
);
const SalidoCasa = ({ salido, setSalido }) => (
  <View>
    <View style={styles.dropdownContainer}>
      <Text>??Ha salido de casa?: </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Picker
          itemStyle={{ height: 50 }}
          dropdownIconColor="white"
          selectedValue={salido.value}
          style={{
            borderRadius: 8,
            width: 87,
            backgroundColor: Platform.OS === "ios" ? "lightblue" : "#000080",
            color: "white",
          }}
          onValueChange={(itemValue, itemIndex) =>
            setSalido({
              ...salido,
              value: itemValue,
            })
          }
        >
          <Picker.Item label="Si" value="Si" />
          <Picker.Item label="No" value="No" />
        </Picker>
        {Platform.OS === "ios" && (
          <FontAwesome5
            name="arrows-alt-v"
            size={20}
            color="black"
            style={{ marginLeft: 5, marginRight: -5 }}
          ></FontAwesome5>
        )}
      </View>
    </View>
    <View style={styles.dropdownContainer}>
      <Text style={{ marginVertical: 10 }}>
        En caso de haber salido, indica {"\n"}la distancia recorrida y {"\n"}
        tiempo dedicado a caminar:
      </Text>
      <TextInput
        placeholder={"He recorrido \n1 KM en\n30 minutos"}
        placeholderTextColor="darkgrey"
        style={{
          borderWidth: 2,
          borderColor: "#000080",
          marginTop: 0,
          marginBottom: 10,
          marginLeft: 20,
          marginRight: 0,
          paddingLeft: 4,
          paddingTop: 15,
          paddingBottom: 4,
          maxWidth: 85,
        }}
        onChangeText={(text) => {
          setSalido({
            ...salido,
            comentario: text,
          });
        }}
        value={salido.comentario}
        multiline={true}
        textAlignVertical={"top"}
      />
    </View>
  </View>
);
const Disnea = ({ momento, disnea, setDisnea }) => {
  return (
    <View style={styles.dropdownContainer}>
      <Text style={{}}>Grado de disnea por la {momento}: </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Picker
          itemStyle={{ height: 50 }}
          dropdownIconColor="white"
          selectedValue={disnea}
          style={{
            borderRadius: 8,
            width: 85,
            backgroundColor: Platform.OS === "ios" ? "lightblue" : "#000080",
            color: "white",
          }}
          onValueChange={(itemValue, itemIndex) => setDisnea(itemValue)}
        >
          <Picker.Item label="0" value="0" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
          <Picker.Item label="7" value="7" />
          <Picker.Item label="9" value="8" />
          <Picker.Item label="8" value="9" />
          <Picker.Item label="10" value="10" />
        </Picker>
        {Platform.OS === "ios" && (
          <FontAwesome5
            name="arrows-alt-v"
            size={20}
            color="black"
            style={{ marginLeft: 5, marginRight: -5 }}
          ></FontAwesome5>
        )}
      </View>
    </View>
  );
};
const Caminata = ({
  caminata,
  setCaminata,
  intentoDeEnvioDeS??ntomas,
  regExp,
}) => (
  <View>
    <Text style={{ marginHorizontal: 0 }}>
      Camine unos 30 metros llevando el pulsiox??metro, si usa ox??geno debe
      llevarlo como se le halla indicado, tras caminarlos apunte los siguientes
      datos:
    </Text>
    <View style={[styles.dropdownContainer]}>
      <Text>Saturaci??n: </Text>
      <View style={styles.flexRowCenter}>
        <TextInput
          placeholder="10"
          placeholderTextColor="darkgrey"
          style={{
            borderWidth: 2,
            borderColor: "#000080",
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 2,
            marginRight: 8,
            paddingLeft: 10,
          }}
          onChangeText={(text) => {
            setCaminata({
              ...caminata,
              saturacion: text,
            });
          }}
          value={caminata.saturacion}
          maxLength={3}
        />
        <Text style={{ fontSize: 20 }}>%.</Text>
      </View>
    </View>
    {caminata.saturacion == null && intentoDeEnvioDeS??ntomas && (
      <Text
        style={{
          color: "red",
          textAlign: "right",
          marginTop: -10,
          fontSize: 16,
          marginBottom: 15,
        }}
      >
        Rellena el campo
      </Text>
    )}
    {regExp.test(caminata.saturacion) && intentoDeEnvioDeS??ntomas && (
      <Text
        style={{
          color: "red",
          textAlign: "right",
          marginTop: -12,
          fontSize: 16,
          marginBottom: 5,
        }}
      >
        El campo no puede contener letras
      </Text>
    )}
    <View style={[styles.dropdownContainer]}>
      <Text>Frecuencia card??aca: </Text>
      <View style={styles.flexRowCenter}>
        <TextInput
          placeholder="80"
          placeholderTextColor="darkgrey"
          style={{
            borderWidth: 2,
            borderColor: "#000080",
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 2,
            marginRight: 5,
            paddingLeft: 10,
          }}
          onChangeText={(text) => {
            setCaminata({
              ...caminata,
              freqCardiaca: text,
            });
          }}
          value={caminata.freqCardiaca}
          maxLength={3}
        />
        <Text>lpm</Text>
      </View>
    </View>
    {caminata.freqCardiaca == null && intentoDeEnvioDeS??ntomas && (
      <Text
        style={{
          color: "red",
          textAlign: "right",
          marginTop: -10,
          fontSize: 16,
          marginBottom: 15,
        }}
      >
        Rellena el campo
      </Text>
    )}
    {regExp.test(caminata.freqCardiaca) && intentoDeEnvioDeS??ntomas && (
      <Text
        style={{
          color: "red",
          textAlign: "right",
          marginTop: -12,
          fontSize: 16,
          marginBottom: 5,
        }}
      >
        El campo no puede contener letras
      </Text>
    )}
    <View style={[styles.dropdownContainer]}>
      <Text>Disnea (escala de BORG): </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Picker
          itemStyle={{ height: 50 }}
          dropdownIconColor="white"
          selectedValue={caminata.disnea}
          style={{
            borderRadius: 8,
            width: 85,
            backgroundColor: Platform.OS === "ios" ? "lightblue" : "#000080",
            color: "white",
          }}
          onValueChange={(itemValue, itemIndex) =>
            setCaminata({
              ...caminata,
              disnea: itemValue,
            })
          }
        >
          <Picker.Item label="0" value="0" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
          <Picker.Item label="7" value="7" />
          <Picker.Item label="9" value="8" />
          <Picker.Item label="8" value="9" />
          <Picker.Item label="10" value="10" />
        </Picker>
        {Platform.OS === "ios" && (
          <FontAwesome5
            name="arrows-alt-v"
            size={20}
            color="black"
            style={{ marginLeft: 5, marginRight: -5 }}
          ></FontAwesome5>
        )}
      </View>
    </View>
    <View style={[styles.dropdownContainer, { marginTop: 10 }]}>
      <Text style={{ marginLeft: 0 }}>
        En el caso de no poder {"\n"}caminar o hacer 30 metros{"\n"}indicalo en
        este comentario:{" "}
      </Text>

      <TextInput
        placeholder="Comentario"
        placeholderTextColor="darkgrey"
        style={{
          borderWidth: 2,
          borderColor: "#000080",
          marginTop: 10,
          marginBottom: 10,
          marginLeft: 8,
          paddingLeft: 4,
          paddingRight: 5,
          paddingTop: 10,
          paddingBottom: 8,
          maxWidth: 85,
        }}
        onChangeText={(text) => {
          setCaminata({
            ...caminata,
            comentario: text,
          });
        }}
        value={caminata.comentario}
        multiline={true}
        textAlignVertical="top"
      />
    </View>
  </View>
);
const FreqCardiaca = ({ freqCardiaca, setFreqCardiaca }) => (
  <View style={styles.dropdownContainer}>
    <Text style={{}}>Indica la frecuencia card??aca: </Text>
    <View style={styles.flexRowCenter}>
      <TextInput
        placeholder="80"
        placeholderTextColor="darkgrey"
        style={{
          borderWidth: 2,
          borderColor: "#000080",
          marginTop: 20,
          marginBottom: 20,
          marginLeft: 2,
          marginRight: 5,
          paddingLeft: 10,
        }}
        onChangeText={(text) => {
          setFreqCardiaca(text);
        }}
        value={freqCardiaca}
        maxLength={3}
      />
      <Text style={{}}>lpm</Text>
    </View>
  </View>
);
const Saturacion = ({ saturacion, setSaturacion }) => (
  <View style={styles.dropdownContainer}>
    <Text style={{}}>??Que saturaci??n tienes hoy?: </Text>
    <View style={styles.flexRowCenter}>
      <TextInput
        placeholder="10"
        placeholderTextColor="darkgrey"
        style={{
          borderWidth: 2,
          borderColor: "#000080",
          marginTop: 20,
          marginBottom: 20,
          marginLeft: 2,
          marginRight: 8,
          paddingLeft: 10,
        }}
        onChangeText={(text) => {
          setSaturacion(text);
        }}
        value={saturacion}
        maxLength={3}
      />
      <Text style={{ fontSize: 20 }}>%.</Text>
    </View>
  </View>
);
const Dormido = ({ dormido, setDormido }) => (
  <>
    <Divider width={2} marginTop={20} color="#000080" />
    <View style={styles.dropdownContainer}>
      <Text style={{}}>Que tal has dormido del 1 al 5: </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Picker
          itemStyle={{ height: 50 }}
          dropdownIconColor="white"
          selectedValue={dormido}
          style={{
            borderRadius: 8,
            width: 85,
            backgroundColor: Platform.OS === "ios" ? "lightblue" : "#000080",
            color: "white",
          }}
          onValueChange={(itemValue, itemIndex) => setDormido(itemValue)}
        >
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
        </Picker>
        {Platform.OS === "ios" && (
          <FontAwesome5
            name="arrows-alt-v"
            size={20}
            color="black"
            style={{ marginLeft: 5, marginRight: -5 }}
          ></FontAwesome5>
        )}
      </View>
    </View>
  </>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "transparent",
    paddingBottom: 109,
    //justifyContent: 'center',
  },
  flexRowCenter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  dropdownContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "transparent",
  },
});
