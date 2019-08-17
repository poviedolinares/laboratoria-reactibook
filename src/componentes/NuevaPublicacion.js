// Componente Nueva Publicación
import "./Muro.css"
import React, { Component } from "react";
import {connect} from "react-redux";

class NuevaPublicacion extends Component 
{
	state = {
		textoPublicacion: "",
		privacidad: "publico"
	};

	manejarCambioTexto = evento =>
	{
		this.setState({textoPublicacion: evento.target.value});
	};

	manejarCambioPrivacidad = evento =>
	{
		this.setState({privacidad: evento.target.value});
	};

	manejarPublicar = evento =>
	{
		const { textoPublicacion, privacidad } = this.state;
		console.log(this.state);
	};

/*	function manerjarCambioTexto(evento) 
	{
		this.setState({textoPublicacion: evento.target.value});
	}*/

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

// conectar store de redux con NuevaPublicacion
export default connect(null)(NuevaPublicacion);