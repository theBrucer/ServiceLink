import { Col, Container, Row } from "react-bootstrap"
import React, { Component } from "react"
import { connect } from "react-redux"
import { signIn } from "../../redux/actions/authActions"
import BodyTitle from "../BodyTitle"
import ForgotPasswordForm from "./ForgotPasswordForm"

class ForgotPassword extends Component {
	render() {
		return (
			<Container
				className="px-4 pb-4 pt-0 rounded"
				style={{ width: "385px" }}
			>
				<BodyTitle
					title="Forgot Password"
					className="text-center mb-3"
					fontSize="30px"
				/>
				<Row>
					<Col className="text-center mt-2">
						<ForgotPasswordForm />
						<div
							className="mt-3 font-weight-bold"
							onClick={() => this.props.displayLogin()}
							style={{ cursor: "pointer" }}
						>
							Back to Login
						</div>
					</Col>
				</Row>
			</Container>
		)
	}
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, { signIn })(ForgotPassword)
