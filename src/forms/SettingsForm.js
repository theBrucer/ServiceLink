import React, { Component } from "react"
import { Button, Col, Row } from "react-bootstrap"
import { Field, Form } from "react-final-form"
import { isEmailValid } from "../Utility/EmailUtils"
import { isValidPhoneNumber } from "../Utility/PhoneUtils"
import "./Forms.css"

class SettingsForm extends Component {
	renderInput = ({ input, label, description, placeholder, meta, rows }) => {
		// Determines whether we need the invalid border
		const className = `form-control${
			meta.error && meta.touched ? " invalid-border" : ""
		}`

		// If the input type is textarea, then render the textarea
		if (input.type === "textarea") {
			return (
				<div className="form-group row">
					<label>{label}</label>

					<textarea
						className={className}
						{...input}
						placeholder={placeholder}
						rows={rows}
					></textarea>
					{this.renderErrorMessage(meta)}
				</div>
			)
		}

		// Return a regular input
		return (
			<div className="form-group row">
				<label className="col-sm-3 col-form-label text-right">
					{label}
				</label>
				<div className="col-sm-9">
					<input
						className={className}
						{...input}
						placeholder={placeholder}
						rows={rows}
					/>
					{this.renderErrorMessage(meta)}
					<small className="text-secondary">{description}</small>
				</div>
			</div>
		)
	}

	// Rendering the error message beneath an input
	renderErrorMessage = (meta) => {
		if (meta.error && meta.touched) {
			return <div className="invalid-input">{meta.error}</div>
		}
		return
	}

	// Render the types of technicians. For now, we are focused only on LockSmiths
	renderTechnicianTypes = () => {
		let types = ["Locksmith"]

		return types.map((type) => {
			return (
				<option value={type} key={type}>
					{type}
				</option>
			)
		})
	}

	// This method allows to combine multiple validators on a given input
	// It would then be used like so:
	// validate={composeValidators(required, mustBeNumber, minValue(18))}
	// composeValidators = (...validators) => value =>
	// validators.reduce((error, validator) => error || validator(value), undefined)

	onSubmit = (formValues) => {
		console.log("we are in here")
		this.props.onSubmit(formValues)
	}

	handleChange = (values) => {
		console.log("values are", values)
	}


	render() {

		return (
			<Form
				onSubmit={this.onSubmit}
				initialValues={this.props.initialValues}
				validate={(values) => {
					// Creating an empty array for all the errors
					const errors = {}

					// Account Name
					// Input can't be empty
					if (!values.accountName) {
						errors.accountName = "Account name can't be empty"
					}

					// User's Email
					if (!isEmailValid(values.userEmail)) {
						errors.userEmail = "Please enter a valid email address"
					}

					// User's contact phone number
					if (!isValidPhoneNumber(values.contactPhoneNumber)) {
						errors.contactPhoneNumber =
							"A valid 10 digit phone number is required"
					}


					return errors;
				}}
				render={props => (
					<form onSubmit={props.handleSubmit}>
						{/* Field: User's name on account */}

						<Field
							name="accountName"
							label="Account Name"
							type="text"
							placeholder="Enter a name (business name or your name)"
							description="Your name or the name of your business"
							component={this.renderInput}
						/>

						{/* Field: User's email address */}

						<Field
							name="userEmail"
							label="Email"
							description="The email you'll use to log in"
							type="email"
							placeholder="email@address.com"
							component={this.renderInput}
						/>

						{/* Field: User's contact phone number */}

						<Field
							name="contactPhoneNumber"
							label="Contact Number"
							description="A phone number in case we need to contact you"
							type="tel"
							placeholder="(123) 456 7890"
							component={this.renderInput}
						/>

						<Row>
							<Col className="text-center">
								<Button
									variant="primary"
									type="submit"
									className="mr-2"
									disabled={props.pristine}
								>
									{this.props.onSubmitLabel}
								</Button>
							</Col>
						</Row>
					</form>
				)}
			/>
		)
	}
}

export default SettingsForm
