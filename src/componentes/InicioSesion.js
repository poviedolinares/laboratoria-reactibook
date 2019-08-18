import "./Muro.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { accionIniciarSesion, accionCrearUsuario } from "../acciones/creadoresAcciones";


class InicioSesion extends Component
{
	state = 
	{
		textoEmail: "",
		textoPassword: ""	
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

	manejarCambioEmail = evento =>
	{
		this.setState ({textoEmail: evento.target.value});
	};

	manejarCambioPassword = evento =>
	{
		this.setState ({textoPassword: evento.target.value});
	};

	manejarInicioSesion = evento =>
	{
		const {textoEmail,textoPassword} = this.state;
		const {accionIniciarSesion} = this.props;
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
		const {textoEmail, textoPassword} = this.state;
		return(
			<div >
			 	<div>Email:</div>
			 	<div><input id="email" 
			 				type="email" 
			 				value={textoEmail} 
			 				onChange = {this.manejarCambioEmail} /> </div>
				
				<div>Password:</div>
			 	<div><input id="Password" 
			 				type="Password" 
			 				value={textoPassword} 
			 				onChange = {this.manejarCambioPassword} /> 
			 	</div>
			 	<button onClick ={this.manejarInicioSesion}> Iniciar Sesión </button>
			 	<button onClick ={this.manejarCrearUsuario}> Crear Usuario </button>


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



