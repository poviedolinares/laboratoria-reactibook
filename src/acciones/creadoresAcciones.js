import { punteroPublicacionesBD, punteroAutenticacionBD } from "../config/firebase";
import { OBJ_ACCION_PUBLICACION, OBJ_ACCION_CARGA_PUBLICACIONES } from "./tiposAcciones";

// Creador de acción (action creator) para nueva publicación.
export const accionPublicar = (texto, privacidad, idUsuario) => async dispatch => {
	punteroPublicacionesBD
		.child(idUsuario)
		.push()
		.set({texto: texto, privacidad: privacidad});
};