import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { symptomsReducer, GPSReducer, DestinyReducer} from "./reducers";
//aqui se combinan los reducers aka estados
const rootReducer = combineReducers({symptomsReducer, GPSReducer, DestinyReducer  });

export const Store = createStore(rootReducer, applyMiddleware(thunk));

