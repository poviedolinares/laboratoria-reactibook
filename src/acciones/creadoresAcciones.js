import { punteroPublicacionesBD, punteroAutenticacionBD } from "../config/firebase";
import { OBJ_ACCION_CARGA_PUBLICACIONES } from "./tiposAcciones";

// Creador de acción (action creator) para nueva publicación.
export const accionPublicar = (texto, privacidad, idUsuario) => async dispatch =>
{
	punteroPublicacionesBD
		.child(idUsuario)
		.push()
		.set({texto: texto, privacidad: privacidad});

	// TODO: Usar then y catch, y crear una accion para manejo de errores.
};

// Creador de acción (action creator) para cargar todas las publicaciones.
export const accionCargaPublicaciones = () => async dispatch =>
{
	punteroPublicacionesBD
		.on("value", objRptaCargaPublicaciones =>
			{
				const arbolDePublicaciones = objRptaCargaPublicaciones.val();
				const objAccionCargaPublicaciones =
					{
						type: OBJ_ACCION_CARGA_PUBLICACIONES,
						publicaciones: arbolDePublicaciones						
					}
				dispatch(objAccionCargaPublicaciones);
			});

	// TODO: Usar then y catch, y crear una accion para manejo de errores.
}