import "./Muro.css"
import React, { Component } from "react";
import {connect} from "react-redux";
import Publicacion from "./Publicacion";
import _ from "lodash";

// Componente que muestra las publicaciones almacenadas (nuevo estado)
// en el redux store.
class ListaPublicaciones extends Component 
{
	state = 
	{
		seleccionDePrivacidad: "publico",
		opcionPublicos: "seleccionada",
		opcionAmigos: ""
	};

	renderizarPublicacionesFiltradas = (publicacionesDeAutor, idAutor) => 
	{
		const { muro, sesion } = this.props;
		const idUsuario = sesion.uid;
		const { seleccionDePrivacidad } = this.state;

		let publicacionesFiltradas = [];

		Object.keys(publicacionesDeAutor).forEach(function(idPublicacion)
		{
			const publicacion = publicacionesDeAutor[idPublicacion];

			if (_.isEqual(publicacion.privacidad, seleccionDePrivacidad))
			{
				publicacionesFiltradas.push
				(
					<Publicacion
						key={idPublicacion}
						idUsuario={idUsuario}
						idAutor={idAutor}
						idPublicacion={idPublicacion}
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
		this.mostrarPublicaciones();
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
		this.mostrarPublicaciones();
	};

	mostrarPublicaciones = () =>
	{
		const { muro, sesion } = this.props;
		const idUsuario = sesion.uid;

		const componentesTodasLasPublicaciones = _.map(muro, (publicacionesDeAutor, idAutor) =>
		{
			return this.renderizarPublicacionesFiltradas(publicacionesDeAutor, idAutor);
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
				<div className="muro">
					<span
						className={"link opcion-privacidad " + this.state.opcionPublicos}
						onClick={this.manejarSeleccionPublicos}>publicos</span>
					<span 
						className={"link opcion-privacidad " + this.state.opcionAmigos} 
						onClick={this.manejarSeleccionAmigos}>amigos</span>
				</div>
				{ this.mostrarPublicaciones() }
			</div>
		);
	}
}

// Convierte el estado almacenado en el redux store a props del
// componente ListaPublicaciones (mírese llamada a connect abajo:
// esa llamada hace que cada vez que el estado del redux store
// es actualizado, la función mapStateToProps es llamada).
const mapStateToProps = nuevoEstado => {
	const objNuevoPropiedadMuro = nuevoEstado.nuevoEstadoMuro;
	const objNuevoPropiedadSesion = nuevoEstado.nuevoEstadoSesion;
	return { muro: objNuevoPropiedadMuro, sesion: objNuevoPropiedadSesion };
};

// Conectar redux con react:
// (1) Recibir el nuevo estado que está en el store de redux y 
//     almacenarlos en el props del componente ListaPublicaciones.
// (2) Importar los creadores de acciones que serán usadas en el 
//     componente ListaPublicaciones y almacenarlos en su props.
export default connect(mapStateToProps, { /* acciones */ })(ListaPublicaciones);