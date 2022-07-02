import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppIcon from "../assets/icons/what1.png";
import { auth, db } from "../firebase";
import { Picker } from "@react-native-picker/picker";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function Registro({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [rol, setRol] = useState("Paciente");
  const deviceWidth = Math.round(Dimensions.get("window").width);

  const handleRegistro = () => {
    if (password == password2) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
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
        .catch((error) => {
          const mensaje = error.message;
          if (mensaje.includes("already in use"))
            alert("El email está siendo usado por otra cuenta");
          else if (mensaje.includes("badly formatted"))
            alert("El email está escrito incorrectamente");
          else if (mensaje.includes("should be at least"))
            alert("La contraseña debe tener más de 6 caracteres");
          else if (mensaje.includes("must be 6"))
            alert("La contraseña debe tener más de 6 caracteres");
          else alert(mensaje);
        });
    } else {
      alert("Las contraseñas no coinciden");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={{ width: "90%" }}>
        <Image
          source={AppIcon}
          style={{
            width: deviceWidth < 375 ? 100 : 150,
            height: deviceWidth < 375 ? 100 : 150,
            alignSelf: "center",
            top: deviceWidth < 375 ? 0 : -40,
          }}
        ></Image>
        <Text
          style={{
            textAlign: "center",
            fontSize: deviceWidth < 375 ? 30 : 40,
            fontWeight: "bold",
            color: "#000080",
            marginBottom: 10,
          }}
        >
          Regístrate
        </Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="darkgrey"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text.trim())}
        />
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="darkgrey"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          placeholder="Repite la contraseña"
          placeholderTextColor="darkgrey"
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
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Picker
              itemStyle={{ height: 60, borderRadius: 8 }}
              dropdownIconColor="white"
              selectedValue={rol}
              style={{
                width: 150,
                backgroundColor:
                  Platform.OS === "ios" ? "lightblue" : "#000080",
                color: "white",
                borderRadius: 8,
              }}
              onValueChange={(itemValue, itemIndex) => {
                setRol(itemValue);
              }}
            >
              <Picker.Item label="Doctor" value="Doctor" />
              <Picker.Item label="Paciente" value="Paciente" />
            </Picker>
            {Platform.OS === "ios" && (
              <FontAwesome5
                name="arrows-alt-v"
                size={30}
                color="black"
                style={{ marginLeft: 10 }}
              ></FontAwesome5>
            )}
          </View>
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
    paddingVertical: Math.round(Dimensions.get("window").width) < 375 ? 7 : 10,
    borderRadius: 10,
    marginVertical: 10,
    borderColor: "#000080",
    borderWidth: 1,
    color: "black",
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
