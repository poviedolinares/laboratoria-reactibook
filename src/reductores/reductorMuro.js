import { OBJ_ACCION_CARGA_PUBLICACIONES } from "../acciones/tiposAcciones";

// Exportar para ser combinado en todosLosReductores.js.
export default (estadoActual = {}, objAccion) =>
{
	switch (objAccion.type)
	{
		case OBJ_ACCION_CARGA_PUBLICACIONES:
			return objAccion.publicaciones;
		default:
			return estadoActual;
	}
};