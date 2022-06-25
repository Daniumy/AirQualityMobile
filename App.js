import React from "react";
import RootNavigation from "./navigation";
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