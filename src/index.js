import React from "react";
import ReactDOM from "react-dom";
import Reactibook from "./Reactibook";
import * as serviceWorker from "./serviceWorker";
import { withRouter } from "react-router";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter } from "react-router-dom";
import reduxThunk from "redux-thunk";
import reductores from "./reductores/todosLosReductores";

const store = createStore(reductores, {}, applyMiddleware(reduxThunk));

// Extender el componente Reactibook con funcionalidad (provisto
// por Router) para redireccionar fácilmente entre páginas.
const ReactibookConRouter = withRouter(() => <Reactibook />);

// 1. Provider: disponibiliza el store de redux para ser usuado por los
//    componentes de React.
// 2. BrowserRouter: una version de Router que usa la API history de
//    HTML5 (pushState, replaceState, popState).
// 3. ReactDOM: renderiza el componente en el elemento con id "root".

ReactDOM.render(
	<Provider store={store}> 
 		<BrowserRouter>
     		<ReactibookConRouter />
 	  	</BrowserRouter>
 	</Provider>,
 	document.getElementById("root")
);

serviceWorker.unregister();