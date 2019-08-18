// Componente Nueva Publicación
import "./Muro.css"
import React, { Component } from "react";
import { connect } from "react-redux";
import { accionPublicar } from "../acciones/creadoresAcciones";

class NuevaPublicacion extends Component 
{
	state = {
		textoPublicacion: "",
		privacidad: "publico"
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
		const { accionPublicar } = this.props;
		accionPublicar(textoPublicacion, privacidad, "usuarioUno");
		this.setState({ textoPublicacion: "" });
	};

	render()
	{
		const { textoPublicacion, privacidad } = this.state;
		return (
			<div>
				<div>
					<textarea
						className="texto-publicacion"
						value = {textoPublicacion}
						onChange = {this.manejarCambioTexto}
						id = "nuevaPublicacion"
						type = "textarea"
					/>
				</div>
				<div> 
					<span> 
						<select 
							id = "lista-privacidad"
							value = {privacidad}
							onChange = {this.manejarCambioPrivacidad}
						>
								<option value="publico">Público</option>
								<option value="amigos">Amigos</option>
							</select>
					</span>
					<span> 
						<button type="submit" id="boton-publicar" onClick={this.manejarPublicar}>
							Publicar
						</button>
					</span>
				</div>
			</div>
			);
	};

};

// Convierte el estado almacenado en el redux store a props del
// componente.
const mapStateToProps = estado => {
	//const { datos, autenticacion } = estado
}

// Conectar store de redux con NuevaPublicacion
export default connect(null, { accionPublicar })(NuevaPublicacion);