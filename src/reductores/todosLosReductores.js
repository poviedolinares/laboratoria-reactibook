import { combineReducers } from "redux";

import { nuevoEstadoMuro } from "./reductorMuro";
import { nuevoEstadoSesion } from "./reductorSesion";

export default combineReducers({ nuevoEstadoMuro, nuevoEstadoSesion });