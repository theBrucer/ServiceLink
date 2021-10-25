import { Col, Container, Row } from "react-bootstrap"
import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import BodyTitle from "../BodyTitle"
import LoginForm from "./LoginForm"
import { getQueryStringKeyValuePairs } from '../../Utility/UrlUtils'

export class LogIn extends Component {

	renderError = () => {

		// Extract queries from URL
		let queries = getQueryStringKeyValuePairs(this.props.location)

		// If the queries array is not empty and has a notification style of 'error'
		if (queries !== null && queries.notification === 'error') {
			
			// Initialize the error message 
			let errorMessage = "";

			// Depending on the queries message, update the Error Message
			switch(queries.message) {
				case("no_account"):
					errorMessage = 'No account found with that email';
					break;
				case("incorrect_combo"):
					errorMessage = "Wrong email or password."
					break;			
				default:
					return;	
			}

			// Final check that the error message is in fact populated with a message
			if(errorMessage !== '') {
				return (
					<div className="alert alert-danger text-center py-2">{errorMessage}</div>
				)
			}	
		}

		return null;
	}


	render() {
		return (
			<Container
                className="px-4 pb-4 pt-0 rounded"
                style={{width: '375px'}}
            
            >
				<BodyTitle title="Login" className="text-center mb-2" />
				<Row>
					<Col>
                        <LoginForm 
							location={this.props.location}
                            onSubmitLabel="Login"
                        
                        />

					</Col>
				</Row>
				<Row>
					<Col className="text-center mt-2">					
						{this.renderError()}

						Don't have an account yet?{" "}
						<Link to="/signup" className="font-weight-bold text-dark">
							Sign up
						</Link>
					</Col>
				</Row>
                
			</Container>
		)
	}
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, null)(LogIn)
