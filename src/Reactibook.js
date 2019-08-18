
import React, { Component } from "react";
import { Route } from "react-router-dom";
import Muro from "./componentes/Muro";
import InicioSesion from "./componentes/InicioSesion";
import { connect } from "react-redux";
import { accionCargaUsuario } from "./acciones/creadoresAcciones";


class Reactibook extends Component 
{
	// Se ejecuta automáticamente (una vez) 
	// después del componente ser montado.
	componentDidMount() 
	{
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

// conectar store de redux con Reactibook
export default connect(null, { accionCargaUsuario })(Reactibook);