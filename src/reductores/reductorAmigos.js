import { OBJ_ACCION_CARGA_AMIGOS } from "../acciones/tiposAcciones";

// Exportar para ser combinado en todosLosReductores.js.
export const nuevoEstadoAmigos = (estadoActual = {}, objAccion) =>
{
	switch (objAccion.type)
	{
		case OBJ_ACCION_CARGA_AMIGOS:
			const objNuevoEstadoAmigos = objAccion.amigos;
			return objNuevoEstadoAmigos;
		default:
			return estadoActual;
	}
};