import { combineReducers } from "redux";

import { nuevoEstadoMuro } from "./reductorMuro";
import { nuevoEstadoSesion } from "./reductorSesion";
import { nuevoEstadoError } from "./reductorError";
import { nuevoEstadoAmigos } from "./reductorAmigos";

export default combineReducers({ nuevoEstadoMuro, nuevoEstadoSesion, nuevoEstadoError, nuevoEstadoAmigos });