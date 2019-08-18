import React, { Component } from "react";
import {connect} from "react-redux";
import Publicacion from "./Publicacion";
import _ from "lodash";

// import { accionCargaPublicaciones } from "../acciones/creadoresAcciones";

// Componente que muestra las publicaciones almacenadas (nuevo estado)
// en el redux store.
class ListaPublicaciones extends Component 
{
	render()
	{
		const { muro } = this.props;
		const componentesTodasLasPublicaciones = _.map(muro, (publicacionesDeAutor, idAutor) =>
			{
				const componentesPublicacionesDeAutor = _.map(publicacionesDeAutor, (publicacion, idPublicacion) =>
					{
						return <Publicacion
							key={idPublicacion}
							idAutor={idAutor}
							idPublicacion={idPublicacion}
							privacidad={publicacion.privacidad}
							texto={publicacion.texto} />

					});

				return componentesPublicacionesDeAutor;
		 	});

		if (_.isEmpty(componentesTodasLasPublicaciones)) {
			return (<div>No hay publicaciones para mostrar</div>);
		}

		return (
			<div>
				{componentesTodasLasPublicaciones}
			</div>
		);
	}
}

// Convierte el estado almacenado en el redux store a props del
// componente ListaPublicaciones (mírese llamada a connect abajo:
// esa llamada hace que cada vez que el estado del redux store
// es actualizado, la función mapStateToProps es llamada).
const mapStateToProps = nuevoEstado => {
	const muro = nuevoEstado.reductorMuro;
	return { muro };
};

// Conectar redux con react:
// (1) Recibir el nuevo estado que está en el store de redux y 
//     almacenarlos en el props del componente ListaPublicaciones.
// (2) Importar los creadores de acciones que serán usadas en el 
//     componente ListaPublicaciones y almacenarlos en su props.
export default connect(mapStateToProps, { /* acciones */ })(ListaPublicaciones);