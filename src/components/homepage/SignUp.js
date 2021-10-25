import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import BodyTitle from "../BodyTitle"
import SignUpForm from "./SignUpForm"

const SignUp = (props) => {
	return (
		<Container
			className="px-4 pb-4 pt-0 rounded"
			style={{ width: "375px" }}
		>
			<BodyTitle title="Sign Up" className="text-center mb-3" />
			<Row>
				<Col>
					<SignUpForm onSubmitLabel="Sign Up" />
				</Col>
			</Row>
			<Row>
				<Col className="text-center mt-2">
					Already have an account?{" "}
					<span 
						onClick={() => props.displayLogin()}
						className="font-weight-bold text-dark"
						style={{cursor: 'pointer'}}
						>
						Login
					</span>
				</Col>
			</Row>
		</Container>
	)
}

export default SignUp;
