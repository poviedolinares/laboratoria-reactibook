import { OBJ_ACCION_ERROR } from "../acciones/tiposAcciones";

// Exportar para ser combinado en todosLosReductores.js.
export const nuevoEstadoError = (estadoActual = [], objAccion) =>
{
	switch (objAccion.type)
	{
		case OBJ_ACCION_ERROR:
			const objNuevoEstadoError = objAccion.codigoError;
			return objNuevoEstadoError;
		default:
			return estadoActual;
	}
};