import {
  SET_CURRENT_GPS,
  SET_DESTINY,
  SET_SYMPTOMS_ADDED,
  SET_SYMPTOMS_SENT
} from "./actions";
//reducer es el que actualiza el store, es como un controlador, y este actualiza el state.
//los estados se encuentran declarados aquí
const initialSymptoms = {
  symptomsAdded: false,
  symptomsSent: false,
}
const initialGPSState = {
  location: {
    latitude: 37.9922399,
    longitude: -1.1306544,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  },
};

const initialDestinyState = {
  destinyGlobalLocation: {
    direccion: null,
    latitude: null,
    longitude: null,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  },
};

function symptomsReducer(state = initialSymptoms, action) {
  switch (action.type) {
    case SET_SYMPTOMS_ADDED:
      return { ...state, symptomsAdded: action.payload };
    case SET_SYMPTOMS_SENT:
      return { ...state, symptomsSent: action.payload };
    default:
      return state;
  }
}

function GPSReducer(state = initialGPSState, action) {
  switch (action.type) {
    case SET_CURRENT_GPS:
      return {
        ...state,
        location: {
          ...action.payload,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
      };
    default:
      return state;
  }
}

function DestinyReducer(state = initialDestinyState, action) {
  switch (action.type) {
    case SET_DESTINY:
      return {
        ...state,
        destinyGlobalLocation: {
          ...action.payload,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
      };
    default:
      return state;
  }
}


export {
  symptomsReducer,
  GPSReducer,
  DestinyReducer,
};
