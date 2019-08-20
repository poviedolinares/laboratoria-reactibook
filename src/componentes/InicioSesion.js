import "./Muro.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { accionIniciarSesion, accionCrearUsuario } from "../acciones/creadoresAcciones";
import _ from "lodash"; // biblioteca con implementaciones robustas de comparaciones de cadenas, entre otras cosas.

// TODO: definir en archivo separado.
const mapaErrores = 
{
	"auth/user-not-found" : "Usuario inválido", 
	"auth/wrong-password" : "Password inválido"
};

class InicioSesion extends Component
{
	// Estado local del componente InicioSesion
	state = 
	{
		textoEmail: "",
		textoPassword: "",
		mensajeErrorEmail: "",
		mensajeErrorPassword: "",
	};
	
	// REACT ejecuta esta llamada automáticamente cada vez que el 
	// el state local o los PROPS del componente InicioSesion son actualizados. 
	//
	// Esta es ejecutada después de Render:
	// 1. componentWillUpdate
	// 2. render
	// 3. componentDidUpdate
	componentDidUpdate(propsAnteriores, estadoLocalAnterior)
	{
		// Si la sesión no es null (es decir, el usuario
		// ha iniciado sesion exitósamente), redireccionar al componente Muro
		if (this.props.sesion && this.props.sesion.uid) 
		{
			this.props.history.push("/muro");
		}
	}

	emailValido = () =>
	{
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(String(this.state.textoEmail).toLowerCase());
	};

	manejarCambioEmail = evento =>
	{
		this.setState(
			{
				textoEmail: evento.target.value,
				mensajeErrorEmail: "",
				mensajeErrorPassword: ""
			});
	};

	manejarCambioPassword = evento =>
	{
		this.setState(
			{
				textoPassword: evento.target.value,
				mensajeErrorEmail: "",
				mensajeErrorPassword: ""
			});
	};

	manejarInicioSesion = evento =>
	{
		if (!this.emailValido())
		{
			this.setState({ mensajeErrorEmail: "email no válido" });
			return;
		}

		if (_.isEmpty(this.state.textoPassword))
		{
			this.setState({ mensajeErrorPassword: "debe ingresar password" });
			return;
		}

		// Esta acción realiza la validación de usuario en firebase.
		this.props.accionIniciarSesion(this.state.textoEmail, this.state.textoPassword);
	};
	
	manejarCrearUsuario = evento =>
	{
		// Esta acción crea el usuario en firebase.
		this.props.accionCrearUsuario(this.state.textoEmail, this.state.textoPassword);
	};

	render()
	{
		const hayErrorEmail = !_.isEmpty(this.state.mensajeErrorEmail);
		const hayErrorPassword = !_.isEmpty(this.state.mensajeErrorPassword);
		const hayCodigoErrorValidacionBD = !_.isEmpty(this.props.codigoError);

		return(
			<div className="iniciar">
				<div className="muro">
				 	<div>Email:</div>
				 	<div className="campo-entrada-session"><input id="email" 
				 				type="email" 
				 				value={this.state.textoEmail} 
				 				onChange={this.manejarCambioEmail} /> 
				 	</div>
				 	{ 
				 		hayErrorEmail &&
				 		(<div className="error-entrada-session">{this.state.mensajeErrorEmail}</div>) 
				 	}
					
					<div className="etiqueta-entrada-session">Password:</div>
				 	<div className="campo-entrada-session"><input id="password" 
				 				type="password" 
				 				value={this.state.textoPassword} 
				 				onChange = {this.manejarCambioPassword} /> 
				 	</div>
				 	{ 
				 		hayErrorPassword &&
				 		(<div className="error-entrada-session">{this.state.mensajeErrorPassword}</div>) 
				 	}

				 	<div className="piedepagina">
					 	<button 
					 		className = "botones-iniciar"
					 		onClick = {this.manejarInicioSesion}>
					 		Iniciar Sesión
					 	</button>
					 	<button 
					 		className = "botones-iniciar"
					 		style = {{display: "none"}}
					 		onClick = {this.manejarCrearUsuario}>
					 		Crear Usuario
					 	</button>
					</div>
					{ 
						hayCodigoErrorValidacionBD && 
						(<div className="error-entrada-session">{mapaErrores[this.props.codigoError]}</div>) 
					}
				</div> 	
			</div> 	
		);
	}
}

// Convierte el ESTADO almacenado en el REDUX store a PROPS del
// componente InicioSesion (mírese llamada a connect abajo:
// el connect hace que cada vez que el ESTADO del REDUX store
// es actualizado, la función mapStateToProps es llamada).
const mapStateToProps = nuevoEstado => {
	const objNuevaPropiedadSesion = nuevoEstado.nuevoEstadoSesion;
	const objNuevaPropiedadError = nuevoEstado.nuevoEstadoError;
	return { sesion: objNuevaPropiedadSesion, codigoError: objNuevaPropiedadError };
};

// Esta línear tiene dos partes.
//
// Parte A. Conectar REDUX con REACT:
// (1) Recibir el nuevo ESTADO que está en el store de REDUX y 
//     almacenarlos en el PROPS del componente InicioSesion.
// (2) Importar los creadores de acciones que serán usadas en el 
//     componente InicioSesion y almacenarlos en su PROPS.
// 
// Parte B. Exportar (export default) InicionSesion para poder ser
// usado en el componente Muro.
export default connect(mapStateToProps, { accionIniciarSesion, accionCrearUsuario })(InicioSesion);