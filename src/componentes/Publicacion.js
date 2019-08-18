import React, { Component } from "react";
import {connect} from "react-redux";

// import { accionCargaPublicaciones } from "../acciones/creadoresAcciones";

// Componente que muestra las publicaciones almacenadas (nuevo estado)
// en el redux store.
class Publicacion extends Component 
{
	render()
	{
		const { idAutor, idPublicacion, privacidad, texto } = this.props;
		return (<div id={idPublicacion}>{texto}</div>);
	}
}

// Convierte el estado almacenado en el redux store a props del
// componente Publicacion (mírese llamada a connect abajo:
// esa llamada hace que cada vez que el estado del redux store
// es actualizado, la función mapStateToProps es llamada).
const mapStateToProps = nuevoEstado => {
};

// Conectar redux con react:
// (1) Recibir el nuevo estado que está en el store de redux y 
//     almacenarlos en el props del componente Publicacion.
// (2) Importar los creadores de acciones que serán usadas en el 
//     componente Publicacion y almacenarlos en su props.
export default connect(null, { /* acciones */ })(Publicacion);