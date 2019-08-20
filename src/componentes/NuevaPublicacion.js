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
		const idUsuario = this.props.sesion.uid;
		const emailUsuario = this.props.sesion.email;
		this.props.accionPublicar(
			this.state.textoPublicacion,
			this.state.privacidad,
			idUsuario,
			emailUsuario);
		this.setState({ textoPublicacion: "" });
	};

	render()
	{
		const textoVacio = _.isEmpty(this.state.textoPublicacion);
		return (
			<div className="muro">
				<div>
					{ /* Creación del input de nueva publicacion */ }
					<textarea
						className="texto-publicacion"
						value = {this.state.textoPublicacion}
						onChange = {this.manejarCambioTexto}
						id = "nuevaPublicacion"
						type = "textarea"
					/>
				</div>
				<div className="botones"> 
					{ /* Creación de la lista de opciones de privacidad */ }
					<span> 
						<select 
							className="lista-privacidad"
							id = "lista-privacidad"
							value = {this.state.privacidad}
							onChange = {this.manejarCambioPrivacidad}>
							<option value="publico">Público</option>
							<option value="amigos">Amigos</option>
						</select>
					</span>

					{ /* Creación del botón de publicar */ }
					<span> 
						{ 
							// Validación de la caja de texto (textarea) de la publicación
							// nueva. Si es vacío, deshabilitar el botón publicar.
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

// Convierte el ESTADO almacenado en el REDUX store a PROPS del
// componente NuevaPublicacion (mírese llamada a connect abajo:
// esa llamada hace que cada vez que el ESTADO del REDUX store
// es actualizado, la función mapStateToProps es llamada).
const mapStateToProps = nuevoEstado => {
	const objNuevaPropiedadSesion = nuevoEstado.nuevoEstadoSesion;
	return { sesion: objNuevaPropiedadSesion };
};

// Esta línear tiene dos partes.
//
// Parte A. Conectar REDUX con REACT:
// (1) Recibir el nuevo ESTADO que está en el store de REDUX y 
//     almacenarlos en el PROPS del componente NuevaPublicacion.
// (2) Importar los creadores de acciones que serán usadas en el 
//     componente NuevaPublicacion y almacenarlos en su PROPS.
// 
// Parte B. Exportar (export default) NuevaPublicacion para poder ser
// usado en el componente Muro.
export default connect(mapStateToProps, { accionPublicar })(NuevaPublicacion);