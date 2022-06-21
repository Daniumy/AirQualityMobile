import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppIcon from "../assets/icons/what1.png";
import { LinearGradient } from "expo-linear-gradient";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

export default function Login({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginButtonPressed, setLoginButtonPressed] = React.useState(false);
  const deviceWidth = Math.round(Dimensions.get("window").width);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      if (auth.currentUser) {
        return;
      }
      // Prevent default behavior of leaving the screen
      e.preventDefault();
    });
  }, [navigation]);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        setLoginButtonPressed(!loginButtonPressed);
      })
      .catch((error) => alert(error.message));
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
          Inicia sesión
        </Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Contraseña"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={{ fontSize: 17, color: "#fff", fontWeight: "bold" }}>
            Iniciar sesión
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerRow}>
        <Text
          style={{
            color: "black",
          }}
        >
          ¿No tienes una cuenta?
        </Text>
        <TouchableOpacity
          style={[styles.button, { padding: 3, backgroundColor: "white" }]}
          onPress={() => {
            navigation.navigate("Registro");
          }}
        >
          <Text style={{ fontSize: 14, color: "#000080", fontWeight: "bold" }}>
            ¡Regístrate!
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
