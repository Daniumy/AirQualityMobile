export const SET_CURRENT_GPS = "SET_CURRENT_GPS";
export const SET_DESTINY = "SET_DESTINY";
export const SET_SYMPTOMS_ADDED = "SET_SYMPTOMS_ADDED";
export const SET_SYMPTOMS_SENT = "SET_SYMPTOMS_SENT";

//ACTION ES EL TRIGGER DE LA UI, UN BOTÓN LLAMA A ACTION, y action se comunica con reducer
export const setSymptomsAdded = (value) => (dispatch) => {
  dispatch({
    type: SET_SYMPTOMS_ADDED,
    payload: value,
  });
};

export const setSymptomsSent = (value) => (dispatch) => {
  dispatch({
    type: SET_SYMPTOMS_SENT,
    payload: value,
  });
};


export const setCurrentGPS = (location) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_GPS,
    payload: location,
  });
};

export const setDestinyAction = (value) => (dispatch) => {
  dispatch({
    type: SET_DESTINY,
    payload: value,
  });
};
