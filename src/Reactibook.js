import React, { Component } from "react";
import { Route } from "react-router-dom";
import Muro from "./componentes/Muro";
import InicioSesion from "./componentes/InicioSesion";
import { connect } from "react-redux";
import { accionCargaUsuario } from "./acciones/creadoresAcciones";


class Reactibook extends Component 
{
	// REACT ejecuta automáticamente (una sola vez) esta llamada 
	// después del componente Reactibook ser montado. En este orden:
	//
	// 1. componentWillMount
	// 2. render
	// 3. componentDidMount
	componentDidMount() 
	{
		// Permite escuchar cambios en el ESTADO de sesión
		// en firebase para disparar una acción en caso 
		// dicho ESTADO haya cambiado en el futuro.
		this.props.accionCargaUsuario();
	}

	render()
	{	
		return(
			<div>
				<Route exact path = "/" component = {InicioSesion} /> 
				<Route exact path = "/muro" component = {Muro} /> 
			</div>
		);
	};
}

// Esta línear tiene dos partes.
//
// Parte A. Conectar REDUX con REACT:
// (1) No recibimos actualizaciones del REDUX store (por ende null).
// (2) Importar los creadores de acciones que serán usadas en el 
//     componente Reactibook y almacenarlos en su PROPS.
// 
// Parte B. Exportar (export default) Reactibook para poder ser
// usado en index.js.
export default connect(null, { accionCargaUsuario })(Reactibook);