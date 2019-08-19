import { OBJ_ACCION_ADICIONAR_ERROR, OBJ_ACCION_REMOVER_ERROR } from "../acciones/tiposAcciones";

// Exportar para ser combinado en todosLosReductores.js.
// Este reductor adiciona o remueve errores globales en un array.
// Estos errores serán mostrados por el componente Reactibook.
export const nuevoEstadoError = (estadoActual = [], objAccion) =>
{
	switch (objAccion.type)
	{
		case OBJ_ACCION_ADICIONAR_ERROR:
      		return estadoActual.concat([objAccion.error]);
		case OBJ_ACCION_REMOVER_ERROR:
      		return estadoActual.filter((error, i) => i !== objAccion.indice);
		default:
			return estadoActual;
	}
};