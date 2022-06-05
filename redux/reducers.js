import {
  SET_CURRENT_GPS,
  SET_DESTINY,
  SET_REGION_ADDED
} from "./actions";
//reducer es el que actualiza el store, es como un controlador, y este actualiza el state.
//los estados se encuentran declarados aquí
const initialRegionAdded = {
  regionAdded: false,
}
const initialGPSState = {
  location: {
    latitude: 37.9922399,
    longitude: -1.1306544,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
    default: true,
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

function regionReducer(state = initialRegionAdded, action) {
  switch (action.type) {
    case SET_REGION_ADDED:
      return { ...state, regionAdded: action.payload };
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
          default: false,
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
  regionReducer,
  GPSReducer,
  DestinyReducer,
};
