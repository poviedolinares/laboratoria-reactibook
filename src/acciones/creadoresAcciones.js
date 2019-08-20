import { punteroPublicacionesBD, punteroAmigosBD, punteroAutenticacionFirebase } from "../config/firebase";
import * as tiposAcciones from "./tiposAcciones";

// --------- SECCION DE ACTION CREATORS PARA PUBLICACIONES -------------

// Creador de acción (action creator) para nueva publicación.
// No crea una acción en sí (en caso de éxito), sino llama a firebase para almacenar
// una publicación nueva en la base de datos. 
// Nota: accionCargaPublicaciones es el action creator que creará
// asincronamente la acción para mandar la lista de publicaciones
// actualizada a los reducers/store.
export const accionPublicar = (texto, privacidad, idUsuario, emailUsuario) => async dispatch =>
{
	punteroPublicacionesBD
		.child(idUsuario)
		.push()
		.set({texto: texto, privacidad: privacidad, email: emailUsuario})
		.then (resultado => {
			// 'Exito'. No necesitamos hacer nada pues accionCargaPublicaciones
			// se encargará de crear la acción que recupera el árbol de
			// publicaciones almacenado en la base datos y actualiza el 
			// estado del muro.
		})
		.catch (error => {
			dispatch(
			{
				type: tiposAcciones.OBJ_ACCION_ERROR,
				codigoError: error.code
			});
		});	
};

// Creador de acción (action creator) para cargar todas las publicaciones.
// Este action creator eschuca permanentemente a cambios en la
// base de dato y dispara una acción para actualizar el store (a través de
// los reducers).
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
// No crea una acción en sí (en caso de éxito), sino llama a firebase para eliminar
// la publicación de la base de datos. 
// Nota: accionCargaPublicaciones es el action creator que creará
// asincronamente la acción para mandar la lista de publicaciones
// actualizada a los reducers/store.
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
			dispatch(
			{
				type: tiposAcciones.OBJ_ACCION_ERROR,
				codigoError: error.code
			});
		});	
};

// Creador de acción (action creator) para editar publicación.
// No crea una acción en sí (en caso de éxito), sino llama a firebase para actualizar
// la publicación en la base de datos. 
// Nota: accionCargaPublicaciones es el action creator que creará
// asincronamente la acción para mandar la lista de publicaciones
// actualizada a los reducers/store.
export const accionEditarPublicacion = (idPublicacion, texto, privacidad, idUsuario, emailUsuario) => async dispatch =>
{
	punteroPublicacionesBD
		.child(idUsuario)
		.child(idPublicacion)
		.set({texto: texto, privacidad: privacidad, email: emailUsuario})
		.then (resultado => {
			// 'Exito'. No necesitamos hacer nada pues accionCargaPublicaciones
			// se encargará de crear la acción que recupera el árbol de
			// publicaciones almacenado en la base datos y actualiza el 
			// estado del muro.
		})
		.catch (error => {
			dispatch(
			{
				type: tiposAcciones.OBJ_ACCION_ERROR,
				codigoError: error.code
			});
		});	
};

// --------- SECCION DE ACTION CREATORS PARA USUARIOS --------------

// Creador de acción (action creator) para iniciar sesión.
// Solo dispara una acción en caso de error (para poder actualizar
// el store y los componentes para mostrar el mensaje de error). Pero
// no dispara acción en caso de éxito. 
// Nota: accionCargaUsuario es el action creator que creará
// asincronamente la acción para mandar el estado de sesión
// actualizado (usuario inició o terminó sesión) a los reducers/store.
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
// Solo dispara una acción en caso de error (para poder actualizar
// el store y los componentes para mostrar el mensaje de error). Pero
// no dispara acción en caso de éxito. 
// Nota: accionCargaUsuario es el action creator que creará
// asincronamente la acción para mandar el estado de sesión
// actualizado (usuario fue creado y se inició sesión) a los reducers/store.
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
			dispatch(
			{
				type: tiposAcciones.OBJ_ACCION_ERROR,
				codigoError: error.code
			});
		});	
};

// Creador de acción (action creator) para terminar sesión.
// Solo dispara una acción en caso de error (para poder actualizar
// el store y los componentes para mostrar el mensaje de error). Pero
// no dispara acción en caso de éxito. 
// Nota: accionCargaUsuario es el action creator que creará
// asincronamente la acción para mandar el estado de sesión
// actualizado (usuario terminó sesión) a los reducers/store.
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
			dispatch(
			{
				type: tiposAcciones.OBJ_ACCION_ERROR,
				codigoError: error.code
			});
		});	
};

// Creador de acción (action creator) para cargar el usuario que inició sesión.
// Este action creator eschuca permanentemente a cambios en el estado de sesión
// en firebase y dispara una acción para actualizar el store (a través de
// los reducers) para indicar si la sesión está en estado activo o inactivo.
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
					usuario: null /* el usuario terminó sesión o aún no la inició */
				});
			}
		});
};

// --------- SECCION DE ACTION CREATORS PARA AMIGOS --------------

// Creador de acción (action creator) para obtener los amigos del usuario de la base de datos.
// Este action creator eschuca permanentemente a cambios en la
// base de datos (específicamente en el nodo amigos) y dispara una acción para actualizar
// el store (a través de los reducers): la nueva lista de amigos.
export const accionCargaAmigos = idUsuario => async dispatch =>
{
	punteroAmigosBD
		.child(idUsuario)
		.on("value", objRptaCargaAmigos =>
			{
				const arbolDeAmigos = objRptaCargaAmigos.val();
				const objAccionCargaAmigos =
					{
						type: tiposAcciones.OBJ_ACCION_CARGA_AMIGOS,
						amigos: arbolDeAmigos						
					}
				dispatch(objAccionCargaAmigos);
			});
};
