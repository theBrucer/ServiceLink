import React, { useState } from "react"
import { connect } from "react-redux"
import { Field, Form } from "react-final-form"
import { Button, Spinner } from "react-bootstrap"
import { isEmailValid } from "../../Utility/EmailUtils"
import { logIn } from "../../redux/actions/authActions"
import { renderPasswordShowHide } from "../../Utility/PasswordUtils"
import { publicFetch } from "../../Utility/FetchUtils"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"

const LogInForm = (props) => {
	const [showPassword, setShowPassword] = useState(false)
	const [loading, setLoading] = useState(false)
	const [redirectOnLogin, setRedirectOnLogin] = useState(false)
	const [signUpSuccessMessage, setSignUpSuccessMessage] = useState("")
	const [signUpErrorMessage, setSignUpErrorMessage] = useState("")

	const renderLoginButton = () => {
		return (
			<>
				<Button
					variant={
						props.onSubmitLabel === "Login" ? "primary" : "success"
					}
					type="submit"
					className="mr-2 d-inline"
					style={{ width: "100%" }}
				>
					{loading && (
						<Spinner
							animation="border"
							size="sm"
							className="mr-2"
						/>
					)}
					{signUpSuccessMessage ? "Logging you in..." : props.onSubmitLabel}
				</Button>
			</>
		)
	}

	const renderInput = ({ input, label, placeholder, meta, rows }) => {
		// Determines whether we need the invalid border
		const className = `form-control${
			meta.error && meta.touched ? " invalid-border" : ""
		}`

		// Styling for eye icon in showHidePassword
		let passwordIconStyle = {
			position: "relative",
			left: "230px",
			top: "37px",
			fontSize: "1.2rem",
			cursor: "pointer",
			zIndex: "44",
		}

		return (
			<div className="form-group">
				<label>{label}</label>
				{renderPasswordShowHide(
					input.name,
					showPassword,
					setShowPassword,
					passwordIconStyle
				)}
				<input
					className={className}
					{...input}
					placeholder={placeholder}
					rows={rows}
				/>

				{/* Render the password showhidebutton */}
				{renderErrorMessage(meta)}

				{input.name === "password" ? (
					<small className="d-block text-center mt-1">
						Forgot password?{" "}
						<span style={{cursor: 'pointer', fontWeight: 'bold'}} onClick={() => props.displayForgotPassword()}>Click here</span>
					</small>
				) : (
					""
				)}
			</div>
		)
	}

	const renderErrorMessage = (meta) => {
		if (meta.error && meta.touched) {
			return <div className="invalid-input">{meta.error}</div>
		}
		return ""
	}

	const isValidPassword = (password) => {
		if (password === undefined) {
			return false;
		}
		return true
	}

	const onSubmit = async formValues => {

		try {
			// Set the loader to be true
			setLoading(true);

			// Submit a login request to the api server
			const {data} = await publicFetch.post('/auth/login', formValues);

			// Pass on data Redux store
			props.logIn(data);

			// Set up a brief signup success message to show the user they're 
			// successfully logged in
			setSignUpSuccessMessage(data.message)

			// Remove any error messages in case there were any
			setSignUpErrorMessage("")
			
			// Give 700ms for the success display message to show
			// before navigating to the dashboard
			setTimeout(() => {
				setRedirectOnLogin(true);
			}, 900);

		} catch (err) {

			// Remove loader icon
			setLoading(false)

			// Retrieve the data from the response
			const { data } = err.response

			// Display the error message
			setSignUpErrorMessage(data.message)

			// Hide any success message in case there was one
			setSignUpSuccessMessage("")
		}

	}

	return (
		<>
		{/* Once successfully signed up, redirect to dashboard */}
		{redirectOnLogin && <Redirect to="/dashboard/joblog"/>}
		
		{/* The error message */}
		{signUpErrorMessage && <div className="alert alert-danger text-center py-2">{signUpErrorMessage}</div>}
		
		{/* The success message */}
		{signUpSuccessMessage && <div className="alert alert-success text-center py-2">{signUpSuccessMessage}</div>}
		
		<Form
			onSubmit={onSubmit}
			// initialValues={this.props.initialValues}
			validate={(values) => {
				// Creating an empty array for all the errors
				const errors = {}

				// User's Email
				if (!isEmailValid(values.userEmail)) {
					errors.userEmail = "Please enter a valid email address"
				}

				if (!isValidPassword(values.password)) {
					errors.password = "Please enter a password"
				}

				return errors
			}}
			render={(props) => (
				<form onSubmit={props.handleSubmit}>
					{/* Field: Email */}

					<Field
						name="userEmail"
						label="Email"
						type="email"
						// placeholder="you@email.com"
						component={renderInput}
					/>

					{/* Field: Password */}
					<Field
						name="password"
						label="Password"
						type={showPassword ? "text" : "password"}
						component={renderInput}
					/>

					{renderLoginButton()}
				</form>
			)}
		/>
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	}
}

export default connect(mapStateToProps, { logIn })(LogInForm)
