import React, { Component } from "react"
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
// import PhoneNumberInput from "../../forms/PhoneNumberInput"

class SignUpForm extends Component {
	state = {
		showPassword: false,	
		loading: false,
		phoneNumber: "",
	}

	componentDidMount() {
		console.log("Component reloaded")
		this.setState({ loading: false })
	}

	toggleShowPassword = () => {
		this.setState({ showPassword: !this.state.showPassword })
	}

	renderSignupButton = () => {
		return (
			<>
				<Button
					variant={
						this.props.onSubmitLabel === "Login"
							? "primary"
							: "success"
					}
					type="submit"
					className="mr-2 d-inline"
					style={{ width: "100%" }}
				>
					{this.state.loading ? (
						<Spinner
							animation="border"
							size="sm"
							className="mr-2"
						/>
					) : (
						""
					)}
					{this.props.onSubmitLabel}
				</Button>
			</>
		)
	}

	handlePhoneNumberChange = (e) => {
		// Formats the number provided into (123) 456-7890
		this.setState({
			phoneNumber: new AsYouType("US").input(e.target.value),
		})
	}

	renderInput = ({ input, label, placeholder, meta, rows }) => {
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
						value={this.state.phoneNumber}
						onChange={this.handlePhoneNumberChange}
					/>
					{this.renderErrorMessage(meta)}
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
							this.state.showPassword,
							this.toggleShowPassword,
							passwordIconStyle
						)}
					</label>
					<input
						className={className}
						{...input}
						placeholder={placeholder}
						rows={rows}
					/>
					{this.renderErrorMessage(meta)}

					{input.name === "password" &&
					this.props.onSubmitLabel === "Login" ? (
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

	renderErrorMessage = (meta) => {
		if (meta.error && meta.touched) {
			return <div className="invalid-input">{meta.error}</div>
		}
		return
	}

	onSubmit = (formValues) => {
		// Display the loader icon
		this.setState({ loading: true }, () => {
			// Submit the form values to the auth action
			this.props
				.signUp(formValues)

				// After a response had been received, stop
				// showing the loader
				.then((response) => {
					console.log("response is", response)

					// If response ISN'T positive (200), then
					// set state's loading to false to avoid memory leakage

					this.setState({ loading: false })
				})
		})
	}

	// !TODO:  HAVE ERRORS DISPLAY ONLY ON SUBMIT

	render() {
		return (
			<Form
				onSubmit={this.onSubmit}
				// initialValues={this.props.initialValues}

				validate={values => {
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
				render={props => (
					<form onSubmit={props.handleSubmit}>
						{/* Field: Business Name */}
						<Field
							name="accountName"
							label="Account Name"
							type="text"
							placeholder=""
							component={this.renderInput}
						/>

						{/* Field: Contact Phone number */}
						<Field
							name="contactPhoneNumber"
							label="Contact Phone Number"
							placeholder="(123) 456-7890"
							type="tel"
							component={this.renderInput}
						/>

						{/* Field: Email */}
						<Field
							name="userEmail"
							label="Email"
							type="email"
							// placeholder="your@email.com"
							component={this.renderInput}
						/>

						{/* Field: Password */}
						<Field
							name="password"
							label="Password"
							type={this.state.showPassword ? "text" : "password"}
							component={this.renderInput}
						/>

						{/* Field: Confirm Password */}
						<Field
							name="confirmPassword"
							label="Confirm Password"
							type={this.state.showPassword ? "text" : "password"}
							component={this.renderInput}
						/>

						{this.renderSignupButton()}
					</form>
				)}
			/>
		)
	}
}

export default connect(null, { signUp })(SignUpForm)
