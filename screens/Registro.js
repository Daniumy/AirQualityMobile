import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppIcon from "../assets/icons/what1.png";
import { auth, db } from "../firebase";
import { Picker } from "@react-native-picker/picker";
import { setUserLoggedInAction } from "../redux/actions";
import { useDispatch } from "react-redux";

export default function Registro({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [rol, setRol] = useState("Paciente");
  const dispatch = useDispatch();

  const handleRegistro = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        dispatch(
          setUserLoggedInAction({
            userLogged: true,
          })
        );
        db.collection("usuarios")
          .doc(user.uid)
          .set({
            correo: user.email,
            rol: rol,
          })
          .then(() => {
            console.log("User added!");
          });
        navigation.navigate("Home");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={{ width: "90%" }}>
        <Image
          source={AppIcon}
          style={{
            width: 150,
            height: 150,
            alignSelf: "center",
            top: -50,
          }}
        ></Image>
        <Text
          style={{
            textAlign: "center",
            fontSize: 40,
            fontWeight: "bold",
            color: "#000080",
            marginBottom: 10,
          }}
        >
          Regístrate
        </Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Contraseña"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          placeholder="Repite la contraseña"
          style={styles.input}
          secureTextEntry
          value={password2}
          onChangeText={(text) => setPassword2(text)}
        />
        <View
          style={{
            width: "100%",
            height: 55,
            textAlign: "center",
            alignContent: "center",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <Text style={{ marginBottom: 10 }}>
            ¿Eres un paciente o un doctor?
          </Text>
          <Picker
            dropdownIconColor="white"
            selectedValue={rol}
            style={{
              width: 150,
              backgroundColor: "lightgrey",
              color: "#000080",
            }}
            onValueChange={(itemValue, itemIndex) => {
              setRol(itemValue);
            }}
          >
            <Picker.Item label="Doctor" value="Doctor" />
            <Picker.Item label="Paciente" value="Paciente" />
          </Picker>
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={handleRegistro}>
          <Text style={{ fontSize: 17, color: "#fff", fontWeight: "bold" }}>
            Crear cuenta
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerRow}>
        <Text
          style={{
            color: "black",
          }}
        >
          ¿Ya tienes una cuenta?
        </Text>
        <TouchableOpacity
          style={[styles.button, { padding: 3, backgroundColor: "white" }]}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={{ fontSize: 14, color: "#000080", fontWeight: "bold" }}>
            ¡Inicia sesión!
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  containerRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
    borderColor: "#000080",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#000080",
    padding: 10,
    elevation: 1,
    borderRadius: 10,
    borderColor: "#000080",
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
