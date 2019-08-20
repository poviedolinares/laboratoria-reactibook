import "./Muro.css"
import React, { Component } from "react";
import {connect} from "react-redux";
import Publicacion from "./Publicacion";
import _ from "lodash";

// Componente que muestra las publicaciones almacenadas (nuevo estado)
// en el REDUX store.
class ListaPublicaciones extends Component 
{
	state = 
	{
		seleccionDePrivacidad: "publico",
		opcionPublicos: "seleccionada",
		opcionAmigos: ""
	};

	renderizarPublicacionesFiltradas = (listaPublicacionesDeAutor, idAutor) => 
	{
		const idUsuario = this.props.sesion.uid;
		const { seleccionDePrivacidad } = this.state;

		let publicacionesFiltradas = [];

		Object.keys(listaPublicacionesDeAutor).forEach(function(idPublicacion)
		{
			// Obtener el texto de la publicacion y la privacidad asociada
			// con el id de la publicación.
			const publicacion = listaPublicacionesDeAutor[idPublicacion];

			// Comparar si la privacidad de la publicación es igual a la privacidad seleccionada
			// por el usuario ó si el autor de la publicación es el usuario (es decir,
			// siempre muestra las publicaciones propias independientemente de la privacidad
			// seleccionada por el usuario)
			if (_.isEqual(publicacion.privacidad, seleccionDePrivacidad) ||
				_.isEqual(idUsuario, idAutor))
			{
				publicacionesFiltradas.push
				(
					<Publicacion
						key={idPublicacion}
						idUsuario={idUsuario}
						idAutor={idAutor}
						idPublicacion={idPublicacion}
						emailAutor={publicacion.email}
						privacidad={publicacion.privacidad}
						texto={publicacion.texto} />
				);
			}
		});

	  	return publicacionesFiltradas;
	};

	manejarSeleccionPublicos = evento =>
	{
		this.setState
		(
			{
				seleccionDePrivacidad: "publico",
				opcionPublicos: "seleccionada",
				opcionAmigos: ""
			}
		);
	};

	manejarSeleccionAmigos = evento =>
	{
		this.setState
		(
			{
				seleccionDePrivacidad: "amigos",
				opcionPublicos: "",
				opcionAmigos: "seleccionada"
			}
		);
	};

	mostrarPublicaciones = () =>
	{
		// Bucle que recorre la lista de publicaciones BD por usuario y crea un objeto
		// componente Publicación para cada elemento en la lista de publicaciones BD.
		const componentesTodasLasPublicaciones = _.map(this.props.muro, (listaPublicacionesDeAutor, idAutor) =>
		{
			return this.renderizarPublicacionesFiltradas(listaPublicacionesDeAutor, idAutor);
		});

		return (
			<div className="muro">
				{componentesTodasLasPublicaciones}
			</div>
		);
	};

	render()
	{
		return (
			<div>
				{/* Renderiza enlaces publicos y amigos */}
				<div className="muro">
					{/* renderiza el link públicos y lo envuelve con un marco si fue seleccionado */}
					<span
						className={"link opcion-privacidad " + this.state.opcionPublicos}
						onClick={this.manejarSeleccionPublicos}>publicos</span>
					{/* renderiza el link amigos y lo envuelve con un marco si fue seleccionado */}
					<span 
						className={"link opcion-privacidad " + this.state.opcionAmigos} 
						onClick={this.manejarSeleccionAmigos}>amigos</span>
				</div>

				{/* Renderiza la lista de publicaciones */}
				{ this.mostrarPublicaciones() }
			</div>
		);
	}
}

// Convierte el ESTADO almacenado en el REDUX store a PROPS del
// componente ListaPublicaciones (mírese llamada a connect abajo:
// esa llamada hace que cada vez que el ESTADO del REDUX store
// es actualizado, la función mapStateToProps es llamada).
const mapStateToProps = nuevoEstado => {
	const objNuevoPropiedadMuro = nuevoEstado.nuevoEstadoMuro;
	const objNuevoPropiedadSesion = nuevoEstado.nuevoEstadoSesion;
	const objNuevaPropiedadAmigos = nuevoEstado.nuevoEstadoAmigos; 
	return { muro: objNuevoPropiedadMuro, sesion: objNuevoPropiedadSesion, amigos: objNuevaPropiedadAmigos };
};

// Esta línear tiene dos partes.
//
// Parte A. Conectar REDUX con REACT:
// (1) Recibir el nuevo ESTADO que está en el store de REDUX y 
//     almacenarlos en el PROPS del componente ListaPublicaciones.
// (2) En este caso, no estamos importando action creators al PROPS.
// 
// Parte B. Exportar (export default) ListaPublicaciones para poder ser
// usado en el componente Muro.
export default connect(mapStateToProps, { /* acciones */ })(ListaPublicaciones);