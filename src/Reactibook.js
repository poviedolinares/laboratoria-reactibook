
import React, { Component } from "react";
import { Route } from "react-router-dom";
import Muro from "./componentes/Muro";
import {connect} from "react-redux";

class Reactibook extends Component 
{
	render()
	{	
		return(
			<div>
				<Route exact path = "/" component = {Muro} /> 
			</div>
		);
	};
}

// conectar store de redux con Reactibook
export default connect(null)(Reactibook);