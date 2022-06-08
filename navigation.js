import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import Home from "./screens/Home";
import Mapa from "./screens/Mapa";
import Formulario from "./screens/Formulario";
import "react-native-gesture-handler";
import MapaRuta from "./screens/MapaRuta";
import Notificaciones from "./screens/Notificaciones";
import Configuracion from "./screens/Configuracion";
import Login from "./screens/Login";
import Registro from "./screens/Registro";
import ComprobarSintomas from "./screens/ComprobarSintomas";
import { auth } from "./firebase";
import { icons } from "./constants";

export default function RootNavigation() {
  const Stack = createStackNavigator();

  const screenOptions = {
    headerShown: false,
  };
  const [initialRoute, setInitialRoute] = useState("Login");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setInitialRoute("Home");
        setIsLoading(false);
      } else {
        setInitialRoute("Login");
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  if (isLoading) {
    return null;
  }
  else
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={screenOptions}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="ComprobarSintomas" component={ComprobarSintomas} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Mapa" component={Mapa} />
        <Stack.Screen name="Formulario" component={Formulario} />
        <Stack.Screen name="Ajustes1" component={Formulario} />
        <Stack.Screen name="MapaRuta" component={MapaRuta} />
        <Stack.Screen name="Notificaciones" component={Notificaciones} />
        <Stack.Screen name="Configuracion" component={Configuracion} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
