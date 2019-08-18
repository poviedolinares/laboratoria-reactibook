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
	// Se ejecuta automáticamente (una vez) 
	// después del componente ser montado.
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
		// si el check encima determina que el usuario
		// no ha terminado sesión.
		const { accionCargaPublicaciones } = this.props;
		accionCargaPublicaciones();
	}

	// Se ejecuta automáticamente cada vez que el 
	// componente (incluyendo los props) es actualizado.
	componentDidUpdate(propsAnteriores, estadoAnterior)
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
		const { accionTerminarSesion } = this.props;
		accionTerminarSesion();
	};

	render()
	{
		return (
			<div>
				<NuevaPublicacion />
				<ListaPublicaciones />
				<span className="link" onClick={this.manejarTerminarSesion}>Cerrar sesión</span>
			</div>
		);
	}
}

// Convierte el estado almacenado en el redux store a props del
// componente Muro (mírese llamada a connect abajo:
// esa llamada hace que cada vez que el estado del redux store
// es actualizado, la función mapStateToProps es llamada).
const mapStateToProps = nuevoEstado => {
	const objNuevaPropiedadSesion = nuevoEstado.nuevoEstadoSesion; 
	return { sesion: objNuevaPropiedadSesion };
};

// Conectar redux con react:
// (1) Recibir el nuevo estado que está en el store de redux y 
//     almacenarlos en el props del componente Muro.
// (2) Importar los creadores de acciones que serán usadas en el 
//     componente Muro y almacenarlos en su props.
export default connect(mapStateToProps, { accionCargaPublicaciones, accionTerminarSesion })(Muro);