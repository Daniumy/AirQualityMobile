import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React from "react";
import GlobalStyles from "../components/GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import HeaderTabs from "../components/HeaderTabs";
import { Divider } from "react-native-elements";
import BottomTabs from "../components/BottomTabs";

export default function InformacionSobreContaminantes({ navigation }) {
  return (
    <>
      <SafeAreaView
        style={[
          GlobalStyles.AndroidSafeArea,
          GlobalStyles.SafeAreaBackground,
          { marginBottom: 140 },
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
          <HeaderTabs titulo="Información" navigation={navigation} />
          <Divider
            width={1}
            style={{ marginHorizontal: 15, borderRadius: 100 }}
            color="#000080"
          />
          <ScrollView style={{ height: "100%" }}>
            <View>
              <Text style={styles.pregunta}>¿Qúe es el AQI?</Text>
              <Text style={styles.respuesta}>
                El Índice de Calidad del Aire, Air Quality Index (AQI) en
                inglés, es un índice utilizado por diversas agencias
                gubernamentales para cuantificar y comunicar al público la
                calidad del aire. Indica el grado de pureza o contaminación
                atmosférica y los efectos para la salud humana asociados con
                dicha contaminación. Este valor facilitará el entendimiento del
                nivel de calidad del aire al usuario.
              </Text>
              <Text style={styles.pregunta}>¿Qúe es el PM10?</Text>
              <Text style={styles.respuesta}>
                Son partículas en suspensión, sólidas o líquidas, más gruesas
                que las PM2,5. Se pueden definir como partículas de polvo,
                cenizas, hollín, partículas metálicas, cemento o polen. Una
                exposición prolongada a estas partículas puede provocar efectos
                nocivos en el sistema respiratorio aunque son menos nocivas que
                las PM2,5 ya que al ser más grandes no penetran los alvéolos
                pulmonares
              </Text>
              <Text style={styles.pregunta}>¿Qúe es el O3?</Text>
              <Text style={styles.respuesta}>
                Gas incoloro formado por 3 moléculas de oxígeno, y hay dos tipos
                ozono troposférico o estratosférico. El que troposférico se
                encuentra en el aire que respiramos y es muy perjudicial ya que
                provoca deterioro respiratorio y pulmonar, envejecimiento,
                irritación de los ojos, nariz, garganta… En los últimos años ha
                aumentado la preocupación sobre este contaminante principalmente
                debido a su dificultar para predecir las concentraciones debido
                a su carácter de contaminante secundario
              </Text>
              <Text style={styles.pregunta}>¿Qúe es el NO2?</Text>
              <Text style={styles.respuesta}>
                Gas tóxico e irritante causado por la oxidación del NO en la
                atmósfera, este gas es también un potenciador del material
                particulado sobre todo de las partículas finas PM2,5. Una
                exposición continuada puede causar disminución de capacidad
                pulmonar, bronquitis aguda, asma etc. Incluso existen estudios
                que indican que causa un incremento en la mortalidad aunque no
                está suficientemente demostrado que sea solamente debido a
                exposición a NO2
              </Text>
              <Text style={styles.pregunta}>¿Qúe es el SO2?</Text>
              <Text style={styles.respuesta}>
                Gas incoloro de olor penetrante y doble densidad a la del aire.
                La exposición a sulfatos y a ácidos derivados del SO2 provocan
                riesgos para la salud ya que pasan directos al sistema
                circulatorio de las personas por medio de las vías
                respiratorias. La contaminación de este elemento causa
                dificultad para respirar.
              </Text>
              <Text style={styles.pregunta}>¿Qúe es el CO?</Text>
              <Text style={styles.respuesta}>
                Gas inoloro e incoloro, conocido como asesino silencioso y es
                producido por la combustión de combustibles fósiles como la
                madera, petróleo, gas, o carbón. Producido por errores en
                conductos de humos o apartados de gas. Aquellas personas con
                problemas respiratorios son más susceptibles a sufrir efectos
                perjudiciales.
              </Text>
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
      <BottomTabs navigation={navigation} />
    </>
  );
}

const styles = StyleSheet.create({
  pregunta: {
    fontSize: 25,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
    color: "#000080",
    marginHorizontal: 10,
  },
  respuesta: {
    fontSize: 20,
    textAlign: "center",
    marginHorizontal: 8,
    marginVertical: 5,
    marginBottom: 15,
  },
});
