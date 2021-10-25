import React, { Component } from "react"
import { Button, Col, Row } from "react-bootstrap"
import { Field, Form } from "react-final-form"
import { connect } from "react-redux"
import "./Forms.css"
import { isValidPassword } from "../Utility/PasswordUtils"

class ChangePasswordForm extends Component {
	renderInput = ({ input, label, description, placeholder, meta, rows }) => {
		// Determines whether we need the invalid border
		const className = `form-control${
			meta.error && meta.touched ? " invalid-border" : ""
		}`

		return (
			<div className="form-group">
				<label >
					{label}
				</label>

				<input
					className={className}
					{...input}
					placeholder={placeholder}
					rows={rows}
				/>
				{this.renderErrorMessage(meta)}
				<small className="text-secondary">{description}</small>
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

	onSubmit = (formValues) => {
		this.props.onSubmit(formValues)
	}

	isValidPassword = (password) => {
		if (!password) {
			return false
		}
		return true
	}

	render() {
		return (
			<Row>
				<Col className="col-lg-4 col-sm-6 mx-auto">
				<Form
					onSubmit={this.onSubmit}
					initialValues={this.props.initialValues}
					validate={(values) => {
						const errors = {}

						if (!values.oldPassword) {
							errors.oldPassword = "Password can't be blank"
						}

						if (!isValidPassword(values.newPassword)) {
							errors.newPassword =
								"Password must be at least 8 characters with at least 1 number and 1 special character"
						}

						if (!isValidPassword(values.confirmNewPassword)) {
							errors.confirmNewPassword =
								"Password must be at least 8 characters with at least 1 number and 1 special character"
						}

						if (values.newPassword !== values.confirmNewPassword) {
							errors.confirmNewPassword = "Passwords do not match"
						}

						return errors
					}}
					render={(props) => (
						<form onSubmit={props.handleSubmit}>
							{/* Field: Old Password */}

							<Field
								name="oldPassword"
								label="Old Password"
								type="password"
								component={this.renderInput}
							/>

							{/* Field: New Password */}

							<Field
								name="newPassword"
								label="New Password"
								type="password"
								component={this.renderInput}
							/>

							{/* Field: Confirm New Password */}

							<Field
								name="confirmNewPassword"
								label="Confirm Password"
								type="password"
								component={this.renderInput}
							/>

							<Row>
								<Col className="text-center">
									<Button
										variant="primary"
										type="submit"
										disabled={props.pristine}
										className="mr-2"
									>
										{this.props.onSubmitLabel}
									</Button>
								</Col>
							</Row>
						</form>
					)}
				/>
				</Col>
			</Row>
		)
	}
}

export default connect(null, null)(ChangePasswordForm)
