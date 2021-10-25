import React, { useState } from "react"
import { connect } from "react-redux"
import { Field, Form } from "react-final-form"
import { Button, Spinner } from "react-bootstrap"
import { isEmailValid } from "../../Utility/EmailUtils"
import { publicFetch } from "../../Utility/FetchUtils"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min"
// import PhoneNumberInput from "../../forms/PhoneNumberInput"

const ForgotPasswordForm = (props) => {
	const [loading, setLoading] = useState(false)
	const [forgotSuccessMessage, setForgotSuccessMessage] = useState("")
	const [forgotErrorMessage, setForgotErrorMessage] = useState("")

	const renderSignupButton = () => {
		return (
			<>
				<Button
					variant={"primary"}
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
					Reset password
				</Button>
			</>
		)
	}

	const renderInput = ({ input, label, placeholder, meta, rows }) => {
		// console.log("Input is", input )

		// Determines whether we need the invalid border
		const className = `form-control${
			meta.error && meta.touched ? " invalid-border" : ""
		}`

		return (
			<div className="form-group">
				<input
					className={className}
					{...input}
					placeholder={placeholder}
					rows={rows}
					placeholder={"Enter your email"}
				/>
				{renderErrorMessage(meta)}
			</div>
		)
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
			setLoading(true)

			// Submit a login request to the api server
			const {data} = await publicFetch.post('/auth/resetpassword', formValues);


			// Show user the success message for resetting their password
			setForgotSuccessMessage(data.message)

			// Remove any error messages in case there were any
			setForgotErrorMessage("")

			
		} catch (err) {
			// Remove loader icon
			setLoading(false)

			// Retrieve the data from the response
			const { data } = err.response

			// Display the error message
			setForgotErrorMessage(data.message)

			// Hide any success message in case there was one
			setForgotSuccessMessage("")
		}
	}

	// !TODO:  HAVE ERRORS DISPLAY ONLY ON SUBMIT

	return (
		<>
			{/* The error message */}
			{forgotErrorMessage && (
				<div className="alert alert-danger text-center py-2">
					{forgotErrorMessage}
				</div>
			)}

			{/* The success message */}
			{forgotSuccessMessage && (
				<div className="alert alert-success text-center py-2">
					{forgotSuccessMessage}
				</div>
			)}

			{!forgotSuccessMessage && (
				<Form
					onSubmit={onSubmit}
					// initialValues={this.props.initialValues}

					validate={(values) => {
						// Creating an empty array for all the errors
						const errors = {}

						// User's Email
						if (!isEmailValid(values.userEmail)) {
							errors.userEmail =
								"Please enter a valid email address"
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
								// placeholder="your@email.com"
								component={renderInput}
							/>

							{renderSignupButton()}
						</form>
					)}
				/>
			)}
		</>
	)
}

export default connect(null, {})(ForgotPasswordForm)
