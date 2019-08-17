import React from 'react';
import ReactDOM from 'react-dom';
import Reactibook from './Reactibook';
import * as serviceWorker from './serviceWorker';
import { withRouter } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';

//import "materialize-css/dist/css/materialize.min.css";
//import "materialize-css/dist/js/materialize.min.js";

const store = createStore(() => {} /*redeucers*/, {}, composeWithDevTools(applyMiddleware(reduxThunk)));
const ReactibookConRouter = withRouter(() => <Reactibook />);

ReactDOM.render(
	<Provider store={store}>
 		<BrowserRouter>
     		<ReactibookConRouter />
   		</BrowserRouter>
 	</Provider>,
 	document.getElementById("root")
);

serviceWorker.unregister();