import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  FlatList,
  Pressable,
  Keyboard,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import GlobalStyles from "../components/GlobalStyles";
import HeaderTabs from "../components/HeaderTabs";
import BottomTabs from "../components/BottomTabs";
import { db } from "../firebase";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Divider } from "react-native-elements";

export default function ComprobarSintomas({ navigation }) {
  const [isState, setIsState] = useState([]);
  const [isSuggestion, setIsSuggestion] = useState([]);
  const [userSelected, setUserSelected] = useState(null);
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [sintomasOfUser, setSintomasOfUser] = useState(null);
  const [noSintomasParaFecha, setNoSintomasParaFecha] = useState(false);
  const [acceptDateButton, setAcceptDateButton] = useState(false);

  function onDateChange(event, selectedDate) {
    if (!selectedDate) return;
    const currentDate = selectedDate || date;
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setAcceptDateButton(true);
    setSelectedDate(fDate);
  }

  function acceptDate() {
    setAcceptDateButton(false);
    setDatePickerOpen(false);
    getSintomasOfUser(selectedDate);
  }

  function onDateChangeAndroid(event, selectedDate) {
    setDatePickerOpen(false);
    if (!selectedDate) return;
    const currentDate = selectedDate || date;
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setSelectedDate(fDate);
    getSintomasOfUser(fDate);
  }

  function handleUserSelected(item) {
    setUserSelected(item);
    setDatePickerOpen(true);
    setIsSuggestion([]);
    setInputValue("");
  }

  async function getAllUsers() {
    const usersDB = await db.collection("usuarios").get();
    const users = usersDB.docs.map((doc) => doc.data());
    const usersCorreos = users.map((user) => user.correo);
    setIsState(usersCorreos);
  }

  async function getSintomasOfUser(fechaSeleccionada) {
    const sintomasDB = await db.collection("s??ntomas").doc(userSelected).get();
    const sintomas = sintomasDB.data();

    if (sintomas && sintomas[fechaSeleccionada]) {
      setSintomasOfUser(sintomas[fechaSeleccionada].s??ntomas);
      setNoSintomasParaFecha(false);
    } else {
      setSintomasOfUser(null);
      setNoSintomasParaFecha(true);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  function searchText(text) {
    setInputValue(text);
    let matches = [];
    if (text) {
      matches = isState.filter((res) => {
        const regex = new RegExp(`${text.trim()}`, "i");
        return res?.match(regex);
      });
      setIsSuggestion(matches);
    } else {
      setIsSuggestion([]);
    }
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <>
        <SafeAreaView
          style={[
            GlobalStyles.AndroidSafeArea,
            GlobalStyles.SafeAreaBackground,
            { marginBottom: 57, marginTop: -30 },
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
            <View style={{ height: "100%" }}>
              <HeaderTabs titulo="Comprobar Sintomas" navigation={navigation} />
              <Divider
                width={1}
                style={{ marginHorizontal: 15, borderRadius: 100 }}
                color="#000080"
              />
              <ScrollView>
                <View>
                  <View style={styles.searchContainer}>
                    <TextInput
                      placeholder="Buscar paciente"
                      placeholderTextColor="darkgrey"
                      style={styles.searchInput}
                      onChangeText={(text) => searchText(text)}
                      value={inputValue}
                    />

                    <FlatList
                      keyExtractor={(item) => item}
                      style={{ width: "80%" }}
                      data={isSuggestion}
                      renderItem={({ item, index }) => (
                        <TouchableOpacity
                          key={index}
                          style={{
                            backgroundColor: "white",
                            padding: 12,
                            borderWidth: 0.2,
                            borderColor: "#000080",
                          }}
                          onPress={() => handleUserSelected(item)}
                        >
                          <Text> {item} </Text>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                  {datePickerOpen && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode={"date"}
                      is24Hour={true}
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      onChange={
                        Platform.OS === "ios"
                          ? onDateChange
                          : onDateChangeAndroid
                      }
                      textColor="black"
                    />
                  )}
                  {acceptDateButton && (
                    <TouchableOpacity
                      style={{
                        marginVertical: 25,
                        padding: 15,
                        backgroundColor: "#000080",
                        alignItems: "center",
                        alignSelf: "center",
                        width: 150,
                        borderRadius: 10,
                      }}
                      onPress={() => acceptDate()}
                    >
                      <Text
                        style={{
                          fontSize: 17,
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        Aceptar fecha
                      </Text>
                    </TouchableOpacity>
                  )}
                  {noSintomasParaFecha && (
                    <Text
                      style={{
                        color: "red",
                        textAlign: "center",
                        marginTop: 40,
                        fontSize: 18,
                        fontWeight: "bold",
                        marginHorizontal: 30,
                      }}
                    >
                      El paciente no hizo el diario de s??ntomas en la fecha
                      seleccionada.
                    </Text>
                  )}
                  {sintomasOfUser && (
                    <View>
                      <Text
                        style={{
                          textAlign: "center",
                          marginTop: 40,
                          fontSize: 18,
                          fontWeight: "bold",
                          marginHorizontal: 30,
                        }}
                      >
                        Los s??ntomas del paciente con correo {userSelected} para
                        el d??a {selectedDate} fueron:
                      </Text>

                      <SintomasEnTabla sintomas={sintomasOfUser} />
                    </View>
                  )}
                </View>
              </ScrollView>
            </View>
          </LinearGradient>
        </SafeAreaView>
        <BottomTabs navigation={navigation} />
      </>
    </TouchableWithoutFeedback>
  );
}

const SintomasEnTabla = ({ sintomas }) => {
  return (
    <View style={{ alignItems: "center", width: "100%" }}>
      <View>
        <Text style={styles.sintomasRow}>
          <Text style={styles.sintomasRowTitle}>{"\u2022"} Disnea:</Text>
          {"\n"}De d??a fue: {sintomas.disneaDia} {"\n"}De noche fue:{" "}
          {sintomas.disneaNoche}
        </Text>
        <Text style={styles.sintomasRow}>
          <Text style={styles.sintomasRowTitle}>
            {"\u2022"} Frecuencia card??aca:
          </Text>{" "}
          {"\n"}
          {sintomas.freqCardiaca} lpm
        </Text>
        <Text style={styles.sintomasRow}>
          <Text style={styles.sintomasRowTitle}>{"\u2022"} Saturaci??n:</Text>{" "}
          {"\n"}
          {sintomas.saturacion}%
        </Text>
        <Text style={styles.sintomasRow}>
          <Text style={styles.sintomasRowTitle}>{"\u2022"} Nivel de tos:</Text>{" "}
          {"\n"}Del 1 al 10 tuvo un: {sintomas.tos}
        </Text>
        <Text style={styles.sintomasRow}>
          <Text style={styles.sintomasRowTitle}>
            {"\u2022"} Salida de casa:
          </Text>{" "}
          {"\n"}??Ha salido de casa?: {sintomas.salidoCasa.value}
          {"\n"}Comentario: {sintomas.salidoCasa.comentario}
        </Text>
        <Text style={styles.sintomasRow}>
          <Text style={styles.sintomasRowTitle}>{"\u2022"} Espirometria:</Text>{" "}
          {"\n"}??Fue realizada? {sintomas.espirometria.selectedEspirometria}
          {"\n"}El comentario fue: {sintomas.espirometria.comentario} {"\n"}FEV:
          {sintomas.espirometria.fev}% FVC:{sintomas.espirometria.fvc}% {"\n"}No
          fue realizada por: {sintomas.espirometria.noRealizadaMotivo}
        </Text>
        <Text style={styles.sintomasRow}>
          <Text style={styles.sintomasRowTitle}>{"\u2022"} Caminata:</Text>{" "}
          {"\n"}La saturacion fue: {sintomas.caminata.saturacion}
          {"\n"} La frecuencia card??aca fue: {sintomas.caminata.freqCardiaca}
          {"\n"}La disnea fue: {sintomas.caminata.disnea}
          {"\n"}??Pudo caminar?: {sintomas.caminata.comentario}
        </Text>
        <Text style={styles.sintomasRow}>
          <Text style={styles.sintomasRowTitle}>
            {"\u2022"} Nivel de sue??o:
          </Text>{" "}
          {"\n"}Del 1 al 5 tuvo un nivel de sue??o de: {sintomas.dormido}
        </Text>
        <Text style={styles.sintomasRow}>
          <Text style={styles.sintomasRowTitle}>
            {"\u2022"} ??Hubo empeoramiento?:
          </Text>{" "}
          {"\n"}El paciente dice que: {sintomas.empeoramiento}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  sintomasRow: {
    marginVertical: 12,
    fontSize: 20,
    textAlign: "center",
  },
  sintomasRowTitle: { fontWeight: "bold", color: "#000080" },
  searchContainer: {
    alignItems: "center",
  },
  listStyle: {
    borderColor: "#000080",
    padding: 20,
    backgroundColor: "white",
  },
  searchInput: {
    borderColor: "#000080",
    borderWidth: 2,
    backgroundColor: "white",
    width: "80%",
    padding: 10,
    marginTop: 20,
  },
});
