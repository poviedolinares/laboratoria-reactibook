import "./Muro.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { accionRemoverError } from "../acciones/creadoresAcciones";

class Errores extends Component
{
	render()
	{
		const { errores } = this.props;
		// TODO: mostrar errores.
		return { errores && (<div />) }
	}
}

// Convierte el estado almacenado en el redux store a props del
// componente Errores (mírese llamada a connect abajo:
// esa llamada hace que cada vez que el estado del redux store
// es actualizado, la función mapStateToProps es llamada).
const mapStateToProps = nuevoEstado => {
	const objNuevaPropiedadError = nuevoEstado.nuevoEstadoError;
	return { error: objNuevaPropiedadError };
};

// Conectar redux con react:
// (1) Recibir el nuevo estado que está en el store de redux y 
//     almacenarlos en el props del componente Errores.
// (2) Importar los creadores de acciones que serán usadas en el 
//     componente Errores y almacenarlos en su props.
export default connect(mapStateToProps, { accionRemoverError })(Errores);
