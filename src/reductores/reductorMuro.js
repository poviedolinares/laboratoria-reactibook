import { OBJ_ACCION_CARGA_PUBLICACIONES } from "../acciones/tiposAcciones";

// Exportar para ser combinado en todosLosReductores.js.
export default (estadoActual = {}, objAccion) =>
{
	switch (objAccion.type)
	{
		case OBJ_ACCION_CARGA_PUBLICACIONES:
			const objNuevoEstadoMuro = objAccion.publicaciones;
			return objNuevoEstadoMuro;
		default:
			return estadoActual;
	}
};