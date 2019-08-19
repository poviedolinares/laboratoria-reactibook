import "./Muro.css"
import React, { Component } from "react";
import { connect } from "react-redux";
import { accionPublicar } from "../acciones/creadoresAcciones";
import _ from "lodash";

class NuevaPublicacion extends Component 
{
	state =
	{
		textoPublicacion: "",
		privacidad: "publico",
	};

	manejarCambioTexto = evento =>
	{
		this.setState({ textoPublicacion: evento.target.value });
	};

	manejarCambioPrivacidad = evento =>
	{
		this.setState({ privacidad: evento.target.value });
	};

	manejarPublicar = evento =>
	{
		const { textoPublicacion, privacidad } = this.state;
		const { sesion, accionPublicar } = this.props;
		const idUsuario = sesion.uid;

		accionPublicar(textoPublicacion, privacidad, idUsuario);
		this.setState({ textoPublicacion: "" });
	};

	render()
	{
		const { textoPublicacion, privacidad } = this.state;
		const textoVacio = _.isEmpty(textoPublicacion);
		return (
			<div className="muro">
				<div>
					<textarea
						className="texto-publicacion"
						value = {textoPublicacion}
						onChange = {this.manejarCambioTexto}
						id = "nuevaPublicacion"
						type = "textarea"
					/>
				</div>
				<div className="botones"> 
					<span> 
						<select 
							className="lista-privacidad"
							id = "lista-privacidad"
							value = {privacidad}
							onChange = {this.manejarCambioPrivacidad}
						>
								<option value="publico">Público</option>
								<option value="amigos">Amigos</option>
							</select>
					</span>
					<span> 
						{ 
							textoVacio ?
							(
								<button type="submit" id="boton-publicar" onClick={this.manejarPublicar} disabled>
									Publicar
								</button>
							) : (
								<button type="submit" id="boton-publicar" onClick={this.manejarPublicar}>
									Publicar
								</button>
							)
						}
					</span>
				</div>
			</div>
			);
	};

};

// Convierte el estado almacenado en el redux store a props del
// componente NuevaPublicacion (mírese llamada a connect abajo:
// esa llamada hace que cada vez que el estado del redux store
// es actualizado, la función mapStateToProps es llamada).
const mapStateToProps = nuevoEstado => {
	const objNuevaPropiedadSesion = nuevoEstado.nuevoEstadoSesion;
	return { sesion: objNuevaPropiedadSesion };
};

// Conectar redux con react:
// (1) Recibir el nuevo estado que está en el store de redux y 
//     almacenarlos en el props del componente NuevaPublicacion.
// (2) Importar los creadores de acciones que serán usadas en el 
//     componente NuevaPublicacion y almacenarlos en su props.
export default connect(mapStateToProps, { accionPublicar })(NuevaPublicacion);