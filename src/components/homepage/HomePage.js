import React, { useEffect, useState } from "react"
import { Col, Container, Image, Row } from "react-bootstrap"
import { Mailbox } from "react-bootstrap-icons"
import { connect } from "react-redux"
import logo from "../../img/logo192.png"
import { signIn } from "../../redux/actions/authActions"
import LogIn from "./LogIn"
import SignUp from "./SignUp"
import ForgotPassword from "./ForgotPassword"
import { ReactComponent as Blob } from "../../img/blob.svg"
import _ from "lodash"
import LaunchDashboard from "./LaunchDashboard"

const HomePage = (props) => {
	const [showLogin, setShowLogin] = useState(true)
	const [showSignUp, setShowSignup] = useState(false)
	const [showLaunchDashboard, setShowLaunchDashboard] = useState(false)

	


	useEffect(() => {
		if (!_.isEmpty(props.user)) {
			displayDashboard()
		}
	}, [])

	const displayLogin = () => {
		setShowLogin(true)
		setShowSignup(false)
		// setShowForgotPassword(false)
	}

	const displaySignup = () => {
		setShowLogin(false)
		setShowSignup(true)
		// setShowForgotPassword(false)
	}

	const displayForgotPassword = () => {
		setShowLogin(false)
		// setShowForgotPassword(true)
	}

	const displayDashboard = () => {
		setShowLogin(false)
		setShowLaunchDashboard(true)
	}


	const renderContent = () => {
		if(showLaunchDashboard) {
			return (<LaunchDashboard/>)
		}
		else if(showLogin) {
			return (<LogIn
				displaySignup={displaySignup}
				displayForgotPassword={displayForgotPassword}
			/>)
		}
		else if(showSignUp) {
			return (<SignUp displayLogin={displayLogin} />)
		}
		else {
			return (<ForgotPassword displayLogin={displayLogin} />)
		}
	}

	return (
		<>
			<Blob
				style={{
					position: "fixed",
					zIndex: "0",
					height: "100vh",
				}}
			/>
			<Container className="bg-white" fluid>
				<Row className="align-items-center" style={{ height: "100vh" }}>
					<Col className="text-center">
						<Image
							className="d-block mx-auto mb-3"
							src={logo}
							style={{ zIndex: "999" }}
						/>
						<h1 className="text-white font-weight-bold display-1">
							Leadeem
						</h1>
					</Col>
					<Col>

						{renderContent()}

						{/* Contact Email Button  */}
						<div className="d-block text-center">
							<a
								href="mailto:admin@leadeem.com"
								target="_blank"
								className="text-dark"
								rel="noreferrer"
							>
								<Mailbox
									className="mr-2"
									style={{
										verticalAlign: "-.200em",
										fontSize: "1.45rem",
									}}
								/>
								Contact Us
							</a>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	)
}

const mapStateToProps = (state) => {
	return { user: state.auth.userInfo }
}

export default connect(mapStateToProps, { signIn })(HomePage)
