import { punteroPublicacionesBD, punteroAmigosBD, punteroAutenticacionFirebase } from "../config/firebase";
import * as tiposAcciones from "./tiposAcciones";

// --------- SECCION DE ACTION CREATORS PARA PUBLICACIONES -------------

// Creador de acción (action creator) para nueva publicación.
export const accionPublicar = (texto, privacidad, idUsuario) => async dispatch =>
{
	punteroPublicacionesBD
		.child(idUsuario)
		.push()
		.set({texto: texto, privacidad: privacidad})
		.then (resultado => {
			// 'Exito'. No necesitamos hacer nada pues accionCargaPublicaciones
			// se encargará de crear la acción que recupera el árbol de
			// publicaciones almacenado en la base datos y actualiza el 
			// estado del muro.
		})
		.catch (error => {
			// TODO: objeto accionManejoError
			console.log(error);
		});	
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
						type: tiposAcciones.OBJ_ACCION_CARGA_PUBLICACIONES,
						publicaciones: arbolDePublicaciones						
					}
				dispatch(objAccionCargaPublicaciones);
			});
};

// Creador de acción (action creator) para eliminar publicación.
export const accionEliminarPublicacion = (idUsuario, idPublicacion) => async dispatch =>
{
	punteroPublicacionesBD
		.child(idUsuario)
		.child(idPublicacion)
		.remove()
		.then (resultado => {
			// 'Exito'. No necesitamos hacer nada pues accionCargaPublicaciones
			// se encargará de crear la acción que recupera el árbol de
			// publicaciones almacenado en la base datos y actualiza el 
			// estado del muro.
		})
		.catch (error => {
			// TODO: objeto accionManejoError
			console.log(error);
		});	
};

// Creador de acción (action creator) para editar publicación.
export const accionEditarPublicacion = (idPublicacion, texto, privacidad, idUsuario) => async dispatch =>
{
	console.log({idPublicacion, texto, privacidad, idUsuario});
	punteroPublicacionesBD
		.child(idUsuario)
		.child(idPublicacion)
		.set({texto: texto, privacidad: privacidad})
		.then (resultado => {
			console.log("exito");
			// 'Exito'. No necesitamos hacer nada pues accionCargaPublicaciones
			// se encargará de crear la acción que recupera el árbol de
			// publicaciones almacenado en la base datos y actualiza el 
			// estado del muro.
		})
		.catch (error => {
			// TODO: objeto accionManejoError
			console.log(error);
		});	
};

// --------- SECCION DE ACTION CREATORS PARA USUARIOS --------------

// Creador de acción (action creator) para iniciar sesión.
export const accionIniciarSesion = (email, password) => dispatch =>
{
	punteroAutenticacionFirebase
		.signInWithEmailAndPassword(email, password)
		.then (resultado => {
			// Éxito. No necesitamos hacer nada pues accionCargaUsuario
			// se encarga de crear la acción que recupera el usuario
			// autenticado y actualiza el estado de la sesion.
		})
		.catch (error => {
			dispatch(
			{
				type: tiposAcciones.OBJ_ACCION_ERROR,
				codigoError: error.code
			});
		});
};


// Creador de acción (action creator) para crear usuario.
export const accionCrearUsuario = (email, password) => dispatch =>
{
	punteroAutenticacionFirebase
		.createUserWithEmailAndPassword(email, password)
		.then (resultado => {
			// Éxito. No necesitamos hacer nada pues accionCargaUsuario
			// se encarga de crear la acción que recupera el usuario
			// autenticado y actualiza el estado de la sesion.
		})
		.catch (error => {
			// TODO: objeto accionManejoError
			console.log(error);
		});	
};

// Creador de acción (action creator) para terminar sesión.
export const accionTerminarSesion = () => dispatch =>
{
	punteroAutenticacionFirebase
		.signOut()
		.then (resultado => {
			// Éxito. No necesitamos hacer nada pues accionCargaUsuario
			// se encarga de crear la acción que recupera el usuario
			// autenticado y actualiza el estado de la sesion.
		})
		.catch (error => {
			// TODO: objeto accionManejoError
			console.log(error);
		});	
};

// Creador de acción (action creator) para cargar el usuario que inició sesión.
export const accionCargaUsuario = () => dispatch =>
{
	punteroAutenticacionFirebase
		.onAuthStateChanged(objRptaObtieneUsuario =>
		{
			if (objRptaObtieneUsuario)
			{
				dispatch(
				{
					type: tiposAcciones.OBJ_ACCION_CARGA_USUARIO,
					usuario: objRptaObtieneUsuario   /* la respuesta de firebase
													    es el usuario en sí */
				});
			}
			else
			{
				dispatch(
				{
					type: tiposAcciones.OBJ_ACCION_CARGA_USUARIO,
					usuario: null
				});
			}
		});
};


// Creador de acción (action creator) para cargar los amigos.
export const accionCargaAmigos = idUsuario => async dispatch =>
{
	punteroAmigosBD
		.child(idUsuario)
		.on("value", objRptaCargaAmigos =>
			{
				const arbolDeAmigos = objRptaCargaAmigos.val();
			console.log(arbolDeAmigos);

				const objAccionCargaAmigos =
					{
						type: tiposAcciones.OBJ_ACCION_CARGA_AMIGOS,
						amigos: arbolDeAmigos						
					}
				dispatch(objAccionCargaAmigos);
			});
};
