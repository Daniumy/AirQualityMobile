import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { regionReducer, GPSReducer, DestinyReducer} from "./reducers";
//aqui se combinan los reducers aka estados
const rootReducer = combineReducers({regionReducer, GPSReducer, DestinyReducer  });

export const Store = createStore(rootReducer, applyMiddleware(thunk));

