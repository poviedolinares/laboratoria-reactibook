import React, { Component } from "react";
import {connect} from "react-redux";
import NuevaPublicacion from "./NuevaPublicacion";
import ListaPublicaciones from "./ListaPublicaciones";
import Publicacion from "./Publicacion";
import { accionCargaPublicaciones, accionTerminarSesion } from "../acciones/creadoresAcciones";

// Componente principal que contiene componentes: 
// Nueva Publicación y Lista de Publicaciones
class Muro extends Component 
{
	// REACT ejecuta automáticamente (una sola vez) esta llamada 
	// después del componente Muro ser montado. En este orden:
	//
	// 1. componentWillMount
	// 2. render
	// 3. componentDidMount
	componentDidMount()
	{
		// Si la sesión es null (es decir, el usuario
		// ha terminado sesion), redireccionar 
		// al componente InicioSesion.
		if (!this.props.sesion) 
		{
			this.props.history.push("/");
		}

		// Continuar a realizar la carga de publicaciones
		// si el if encima determina que el usuario
		// ha ingresado a la sesión.
		this.props.accionCargaPublicaciones();
	}

	// REACT ejecuta esta llamada automáticamente cada vez que el 
	// el state local o los PROPS del componente Muro son actualizados. 
	//
	// Esta es ejecutada después de Render:
	// 1. componentWillUpdate
	// 2. render
	// 3. componentDidUpdate.
	componentDidUpdate(propsAnteriores, estadoLocalAnterior)
	{
		// Si la sesión es null (es decir, el usuario
		// ha terminado sesion), redireccionar 
		// al componente InicioSesion.
		if (!this.props.sesion) 
		{
			this.props.history.push("/");
		}
	}

	manejarTerminarSesion = () =>
	{
		this.props.accionTerminarSesion();
	};

	render()
	{
		return (
			<div>
				<NuevaPublicacion />
				<ListaPublicaciones />
				<div className="muro piedepagina">
					<span
						className="link"
						onClick={this.manejarTerminarSesion}>Cerrar sesión
					</span>
				</div>
			</div>
		);
	}
}

// Convierte el ESTADO almacenado en el REDUX store a PROPS del
// componente Muro (mírese llamada a connect abajo:
// esa llamada hace que cada vez que el ESTADO del REDUX store
// es actualizado, la función mapStateToProps es llamada).
const mapStateToProps = nuevoEstado => {
	const objNuevaPropiedadSesion = nuevoEstado.nuevoEstadoSesion; 
	return { sesion: objNuevaPropiedadSesion };
};

// Esta línear tiene dos partes.
//
// Parte A. Conectar REDUX con REACT:
// (1) Recibir el nuevo ESTADO que está en el store de REDUX y 
//     almacenarlos en el PROPS del componente Muro.
// (2) Importar los creadores de acciones que serán usadas en el 
//     componente Muro y almacenarlos en su PROPS.
// 
// Parte B. Exportar (export default) Muro para poder ser
// usado en el componente Reactibook.
export default connect(mapStateToProps, { accionCargaPublicaciones, accionTerminarSesion })(Muro);