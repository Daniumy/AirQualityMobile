import React from "react";
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RootNavigation from "./navigation";
import Home from "./screens/Home";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { Store } from "./redux/store";

export default function App() {
  return (
    <Provider store={Store}>
      <RootNavigation />
    </Provider>
  );
}