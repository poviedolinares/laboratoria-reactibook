// Componente principal que contiene componentes: Nueva Publicación y Lista de Publicaciones
import React, { Component } from "react";
import {connect} from "react-redux";
import NuevaPublicacion from "./NuevaPublicacion";
import ListaPublicaciones from "./ListaPublicaciones";

class Muro extends Component 
{
	render()
	{
		return (
			<div>
				<NuevaPublicacion />
				{/*<ListaPublicaciones />*/}
			</div>
			);
	}
}

// conectar store de redux con Muro
export default connect(null)(Muro);