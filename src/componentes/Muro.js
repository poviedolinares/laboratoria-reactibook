import React, { Component } from "react";
import {connect} from "react-redux";
import NuevaPublicacion from "./NuevaPublicacion";
import ListaPublicaciones from "./ListaPublicaciones";
import Publicacion from "./Publicacion";
import { accionCargaPublicaciones } from "../acciones/creadoresAcciones";

// Componente principal que contiene componentes: 
// Nueva Publicación y Lista de Publicaciones
class Muro extends Component 
{
	componentDidMount()
	{
		const { accionCargaPublicaciones } = this.props;
		accionCargaPublicaciones();
	}

	render()
	{
		return (
			<div>
				<NuevaPublicacion />
				<ListaPublicaciones />
			</div>
		);
	}
}

// Convierte el estado almacenado en el redux store a props del
// componente Muro (mírese llamada a connect abajo:
// esa llamada hace que cada vez que el estado del redux store
// es actualizado, la función mapStateToProps es llamada).
const mapStateToProps = nuevoEstado => {
	//const { muro, autenticacion } = estado
};

// Conectar redux con react:
// (1) Recibir el nuevo estado que está en el store de redux y 
//     almacenarlos en el props del componente Muro.
// (2) Importar los creadores de acciones que serán usadas en el 
//     componente Muro y almacenarlos en su props.
export default connect(null, { accionCargaPublicaciones })(Muro);