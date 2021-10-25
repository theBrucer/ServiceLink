import React, { useState } from "react"
import { connect } from "react-redux"
import { Field, Form } from "react-final-form"
import { Button, Spinner } from "react-bootstrap"
import { Link } from "react-router-dom"
import { isEmailValid } from "../../Utility/EmailUtils"
import { isValidPhoneNumber } from "../../Utility/PhoneUtils"
import {
	isValidPassword,
	renderPasswordToolTip,
	renderPasswordShowHide,
} from "../../Utility/PasswordUtils"
import { signUp } from "../../redux/actions/authActions"
import { AsYouType } from "libphonenumber-js"
import { publicFetch } from "../../Utility/FetchUtils"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
// import PhoneNumberInput from "../../forms/PhoneNumberInput"

const SignUpForm = (props) => {
	const [showPassword, setShowPassword] = useState(false)
	const [loading, setLoading] = useState(false)
	const [phoneNumber, setPhoneNumber] = useState("")
	const [redirectOnLogin, setRedirectOnLogin] = useState(false)
	const [signUpSuccessMessage, setSignUpSuccessMessage] = useState("")
	const [signUpErrorMessage, setSignUpErrorMessage] = useState("")


	const renderSignupButton = () => {
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
					{loading ? (
						<Spinner
							animation="border"
							size="sm"
							className="mr-2"
						/>
					) : (
						""
					)}
					{props.onSubmitLabel}
				</Button>
			</>
		)
	}

	const handlePhoneNumberChange = (e) => {
		// Formats the number provided into (123) 456-7890
		setPhoneNumber(new AsYouType("US").input(e.target.value))
	}

	const renderInput = ({ input, label, placeholder, meta, rows }) => {
		// console.log("Input is", input )

		// Determines whether we need the invalid border
		const className = `form-control${
			meta.error && meta.touched ? " invalid-border" : ""
		}`

		// if(input.type === 'tel') {
		if (false) {
			return (
				<div className="form-group">
					<label>{label}</label>
					<input
						className={className}
						{...input}
						placeholder={placeholder}
						value={phoneNumber}
						onChange={handlePhoneNumberChange}
					/>
					{renderErrorMessage(meta)}
				</div>
			)
		} else {
			// The styling for the eye icon passed into renderShowHidePassword
			let passwordIconStyle = {
				position: "relative",
				left: "210px",
				top: "37px",
				fontSize: "1.2rem",
				cursor: "pointer",
				zIndex: "44",
			}

			return (
				<div className="form-group">
					<label>
						{label}
						{input.name === "password"
							? renderPasswordToolTip()
							: ""}
						{renderPasswordShowHide(
							input.name,
							showPassword,
							setShowPassword,
							passwordIconStyle
						)}
					</label>
					<input
						className={className}
						{...input}
						placeholder={placeholder}
						rows={rows}
					/>
					{renderErrorMessage(meta)}

					{input.name === "password" &&
					props.onSubmitLabel === "Login" ? (
						<small className="d-block text-center mt-1">
							Forgot password?{" "}
							<Link to="/forgotpassword">Click here</Link>
						</small>
					) : (
						""
					)}
				</div>
			)
		}
	}

	const renderErrorMessage = (meta) => {
		if (meta.error && meta.touched) {
			return <div className="invalid-input">{meta.error}</div>
		}
		return
	}

	const onSubmit = async (formValues) => {

		try {

			// Set the loader to be true
			setLoading(true);

			// Submit a login request to the api server
			const {data} = await publicFetch.post('/auth/signup', formValues);

			console.log("data is", data)

			// Pass on data to the Redux store
			props.signUp(data);

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

	// !TODO:  HAVE ERRORS DISPLAY ONLY ON SUBMIT

	return (
		<>
		{/* Once successfully signed up, redirect to settings */}
		{redirectOnLogin && <Redirect to="/dashboard/settings"/>}
		
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

					// User's Business/Account name
					if (!values.accountName) {
						errors.accountName =
							"Please provide a name for your account"
					}

					// User's contact phone number
					if (!isValidPhoneNumber(values.contactPhoneNumber)) {
						errors.contactPhoneNumber =
							"A valid 10 digit phone number is required"
					}

					// User's Email
					if (!isEmailValid(values.userEmail)) {
						errors.userEmail = "Please enter a valid email address"
					}

					// Password
					if (!isValidPassword(values.password)) {
						errors.password = "Please enter a valid password"
					}

					// Password and confirm password must match
					if (values.password !== values.confirmPassword) {
						errors.confirmPassword = "Passwords don't match"
					}

					return errors
				}}
				render={(props) => (
					<form onSubmit={props.handleSubmit}>
						{/* Field: Business Name */}
						<Field
							name="accountName"
							label="Account Name"
							type="text"
							placeholder=""
							component={renderInput}
						/>

						{/* Field: Contact Phone number */}
						<Field
							name="contactPhoneNumber"
							label="Contact Phone Number"
							placeholder="(123) 456-7890"
							type="tel"
							component={renderInput}
						/>

						{/* Field: Email */}
						<Field
							name="userEmail"
							label="Email"
							type="email"
							// placeholder="your@email.com"
							component={renderInput}
						/>

						{/* Field: Password */}
						<Field
							name="password"
							label="Password"
							type={showPassword ? "text" : "password"}
							component={renderInput}
						/>

						{/* Field: Confirm Password */}
						<Field
							name="confirmPassword"
							label="Confirm Password"
							type={showPassword ? "text" : "password"}
							component={renderInput}
						/>

						{renderSignupButton()}
					</form>
				)}
			/>
		</>
	)
}

export default connect(null, { signUp })(SignUpForm)
