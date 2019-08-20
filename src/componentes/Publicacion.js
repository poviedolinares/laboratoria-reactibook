import "./Muro.css"
import React, { Component } from "react";
import {connect} from "react-redux";
import _ from "lodash";
import { accionEditarPublicacion, accionEliminarPublicacion } from "../acciones/creadoresAcciones";


// Componente que muestra las publicaciones almacenadas (nuevo estado)
// en el redux store.
class Publicacion extends Component 
{
	state = 
	{
		textoPublicacion : this.props.texto,
		mostrarPublicacion : true,
		mostrarEdicion : false,
		mostrarModal : false
	};

	manejarCambioTexto = evento =>
	{
		this.setState({ textoPublicacion: evento.target.value });
	};

	manejarEditarPublicacion = evento =>
	{
		this.setState({ mostrarPublicacion : false, mostrarEdicion : true });
	};

	manejarEliminarPublicacion = evento =>
	{
		this.setState({ mostrarModal : true });
	};

	manejarGuardar = evento =>
	{
		const { idPublicacion, idUsuario, emailAutor, privacidad, accionEditarPublicacion } = this.props;
		const { textoPublicacion } = this.state;

		if (!_.isEmpty(textoPublicacion))
		{
			accionEditarPublicacion(idPublicacion, textoPublicacion, privacidad, idUsuario, emailAutor);
			this.setState({ mostrarPublicacion : true, mostrarEdicion : false });
		}
	};

	manejarSi = () =>
	{
		this.setState({ mostrarModal : false });
		const { idPublicacion, idUsuario, accionEliminarPublicacion } = this.props;
		accionEliminarPublicacion(idUsuario, idPublicacion);
	};

	manejarNo = () =>
	{
		this.setState({ mostrarModal : false });
	};

	render()
	{
		// Determinar y el usuario es el autor de la publicación que será
		// mostrada por este componente.		
		const usuarioEsAutor = _.isEqual(this.props.idUsuario, this.props.idAutor);

		return (
			<div>
				{
					// Mostrar caja de publicacion (es decir, no está en modo de edición)
					this.state.mostrarPublicacion &&
					(
						<div className="publicacion">
							<div className="email">{this.props.emailAutor}</div>
							<div id={this.props.idPublicacion}>{this.props.texto}</div>
							{/* Renderizar links de edición y eliminación si el usuario
								es el autor */}
							{ 
								usuarioEsAutor &&
								(

									<div className="margen">
										<span
											className="link pequeno"
											onClick={this.manejarEditarPublicacion}>editar
										</span>
										<span 
											className="link pequeno"
											onClick={this.manejarEliminarPublicacion}>eliminar
										</span>
									</div>
								)
							}
						</div>
					)
				}


				{ 
					// Mostrar la caja de edición de la publicación.
					usuarioEsAutor && this.state.mostrarEdicion &&
					(
						<div className="publicacion">
							<textarea
								className="texto-publicacion"
								value = {this.state.textoPublicacion}
								onChange = {this.manejarCambioTexto}
								type = "textarea"
							/>
							<div>
								<span className="link" onClick={this.manejarGuardar}>guardar</span>
							</div>
						</div>
					)
				}


				{
					// Mostrar el modal de confirmación de eliminación.
					this.state.mostrarModal &&
					(
						<div className="telon">
        					<div className="modal">
          						¿Remover la publicación?

          						<div className="piedepagina">
            						<button onClick={this.manejarSi}>Si</button>
            						<button onClick={this.manejarNo}>No</button>
          						</div>
					        </div>
					    </div>
					)
				}
			</div>
		);
	}
}

// Convierte el estado almacenado en el redux store a props del
// componente Publicacion (mírese llamada a connect abajo:
// esa llamada hace que cada vez que el estado del redux store
// es actualizado, la función mapStateToProps es llamada).
const mapStateToProps = nuevoEstado => {
};

// Conectar redux con react:
// (1) Recibir el nuevo estado que está en el store de redux y 
//     almacenarlos en el props del componente Publicacion.
// (2) Importar los creadores de acciones que serán usadas en el 
//     componente Publicacion y almacenarlos en su props.
export default connect(null, { accionEditarPublicacion, accionEliminarPublicacion })(Publicacion);