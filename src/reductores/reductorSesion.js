import { OBJ_ACCION_CARGA_USUARIO } from "../acciones/tiposAcciones";

// Exportar para ser combinado en todosLosReductores.js.
export default (estadoActual = {}, objAccion) =>
{
	switch (objAccion.type)
	{
		case OBJ_ACCION_CARGA_USUARIO:
			const objNuevoEstadoSession = objAccion.usuario;
			return objNuevoEstadoSession;
		default:
			return estadoActual;
	}
};