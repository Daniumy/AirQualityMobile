export const SET_CURRENT_GPS = "SET_CURRENT_GPS";
export const SET_DESTINY = "SET_DESTINY";
export const SET_REGION_ADDED = "SET_REGION_ADDED";

//ACTION ES EL TRIGGER DE LA UI, UN BOTÓN LLAMA A ACTION, y action se comunica con reducer
export const setRegionAdded = (value) => (dispatch) => {
  dispatch({
    type: SET_REGION_ADDED,
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
