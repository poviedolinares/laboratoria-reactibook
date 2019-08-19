import "./Muro.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { accionIniciarSesion, accionCrearUsuario } from "../acciones/creadoresAcciones";
import _ from "lodash";

class InicioSesion extends Component
{
	state = 
	{
		textoEmail: "",
		textoPassword: "",
		mensajeErrorEmail: "",
		mensajeErrorPassword: ""
	};
	
	// Se ejecuta automáticamente cada vez que el 
	// componente (incluyendo los props) es actualizado.
	componentDidUpdate(propsAnteriores, estadoAnterior)
	{
		// Si la sesión no es null (es decir, el usuario
		// ha iniciado sesion exitósamente), redireccionar 
		// al componente Muro.
		if (this.props.sesion) 
		{
			this.props.history.push("/muro");
		}
	}

	emailValido = () =>
	{
		const {textoEmail} = this.state;
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(String(textoEmail).toLowerCase());
	}

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
		const {textoEmail, textoPassword} = this.state;
		const {accionIniciarSesion} = this.props;

		if (!this.emailValido())
		{
			this.setState({mensajeErrorEmail: "email no valido"});
			return;
		}

		if (_.isEmpty(textoPassword))
		{
			this.setState({mensajeErrorPassword: "debe ingresar password"});
			return;
		}

		accionIniciarSesion(textoEmail, textoPassword);
	};
	
	manejarCrearUsuario = evento =>
	{
		const {textoEmail,textoPassword} = this.state;
		const {accionCrearUsuario} = this.props;
		accionCrearUsuario(textoEmail, textoPassword);
	};

	render()
	{
		const {textoEmail, textoPassword, mensajeErrorEmail, mensajeErrorPassword} = this.state;
		const hayErrorEmail = !_.isEmpty(mensajeErrorEmail);
		const hayErrorPassword = !_.isEmpty(mensajeErrorPassword);
		return(
			<div className="iniciar">
				<div className="muro">
				 	<div>Email:</div>
				 	<div className="campo-entrada-session"><input id="email" 
				 				type="email" 
				 				value={textoEmail} 
				 				onChange = {this.manejarCambioEmail} /> 
				 	</div>
				 	{ hayErrorEmail && (<div className="error-entrada-session">{mensajeErrorEmail}</div>) }
					
					<div className="etiqueta-entrada-session">Password:</div>
				 	<div className="campo-entrada-session"><input id="Password" 
				 				type="Password" 
				 				value={textoPassword} 
				 				onChange = {this.manejarCambioPassword} /> 
				 	</div>
				 	{ hayErrorPassword && (<div className="error-entrada-session">{mensajeErrorPassword}</div>) }

				 	<div className="pieddepagina">
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
				</div> 	
			</div> 	
		);
	}
}

// Convierte el estado almacenado en el redux store a props del
// componente InicioSesion (mírese llamada a connect abajo:
// esa llamada hace que cada vez que el estado del redux store
// es actualizado, la función mapStateToProps es llamada).
const mapStateToProps = nuevoEstado => {
	const objNuevaPropiedadSesion = nuevoEstado.nuevoEstadoSesion; 
	return { sesion: objNuevaPropiedadSesion };
};

// Conectar redux con react:
// (1) Recibir el nuevo estado que está en el store de redux y 
//     almacenarlos en el props del componente IniciarSesion.
// (2) Importar los creadores de acciones que serán usadas en el 
//     componente IniciarSesion y almacenarlos en su props.
export default connect(mapStateToProps, { accionIniciarSesion, accionCrearUsuario })(InicioSesion);