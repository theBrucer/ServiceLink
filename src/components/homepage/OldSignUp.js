import React, { Component } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import BodyTitle from "../BodyTitle"
import SignUpForm from "./SignUpForm"
import { getQueryStringKeyValuePairs } from '../../Utility/UrlUtils'

class SignUp extends Component {


	renderError = () => {

		// Extract queries from URL
		let queries = getQueryStringKeyValuePairs(this.props.location)

		// If the queries array is not empty and has a notification style of 'error'
		if (queries !== null && queries.notification === 'error') {
			
			// Initialize the error message 
			let errorMessage = "";

			// Depending on the queries message, update the Error Message
			switch(queries.message) {
				case("emailexists"):
					errorMessage = 'An account with that email already exists';
					break;
				case("phonenumberexists"):
					errorMessage = "An account with that phone number already exists"
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
				style={{ width: "375px" }}
			>
				<BodyTitle title="Sign Up" className="text-center mb-3" />
				<Row>
					<Col>
                    <SignUpForm 
                        onSubmitLabel="Sign Up"
                        />
					</Col>
				</Row>
				<Row>
					<Col className="text-center mt-2">

						{this.renderError()}

						Already have an account? {" "}
						<Link to="/" className="font-weight-bold text-dark">
							Login
						</Link>
					</Col>
				</Row>
			</Container>
		)
	}
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, null)(SignUp)
