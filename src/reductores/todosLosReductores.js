import { combineReducers } from "redux";

import reductorMuro from "./reductorMuro";
import reductorSesion from "./reductorSesion";

export default combineReducers({ reductorMuro, reductorSesion });