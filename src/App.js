import React, { useEffect } from "react"
import { Route } from "react-router"
import Dashboard from "./components/Dashboard"
import HomePage from "./components/homepage/HomePage"
import PrivateRoute from "./components/PrivateRoute"
import "./stylesheets/body.css"

const App = () => {

	useEffect(() => {
		// Add the body-style class to body for dark background
		document.body.classList.add('body-style')

		// Cleanup function, when component unmounts
		return () => {

			// Remove the body-style class from the body element
			document.body.classList.remove('body-style')
		}

	},[]);

	return (
		<>
			<PrivateRoute path="/dashboard" component={Dashboard} />
			<Route path="/" component={HomePage} exact />
		</>
	)
}

export default App;
