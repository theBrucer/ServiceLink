import { Col, Container, Row } from "react-bootstrap"
import React from "react"
import BodyTitle from "../BodyTitle"
import LoginForm from "./LoginForm"

const LogIn = (props) => {

	return (
		<Container
			className="px-4 pb-4 pt-0 rounded"
			style={{ width: "375px" }}
		>
			<BodyTitle title="Login" className="text-center mb-2" />
			<Row>
				<Col>
					<LoginForm
						location={props.location}
						onSubmitLabel="Login"
						displayForgotPassword={props.displayForgotPassword}
					/>
				</Col>
			</Row>
			<Row>
				<Col className="text-center mt-2">
					Don't have an account yet?{" "}
					<span
						onClick={() => props.displaySignup()}
						className="font-weight-bold text-dark"
						style={{cursor: 'pointer'}}
					>
						Sign up
					</span>
				</Col>
			</Row>
		</Container>
	)
}

export default LogIn;
