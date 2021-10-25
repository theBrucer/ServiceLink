import React from "react"
import { Button, Modal } from "react-bootstrap"
import { Field, Form } from "react-final-form"
import history from "../history"
import { isValidPhoneNumber } from "../Utility/PhoneUtils"
import "./Forms.css"

const LeadGeneratorForm = (props) => {
	const { formTitle, onSubmit, onSubmitLabel, initialValues } = props

	const handleClose = () => {
		history.push("/dashboard/leadgenerators")
	}

	const renderInput = ({ input, label, placeholder, meta, rows }) => {
		// Determines whether we need the invalid border
		const className = `form-control${
			meta.error && meta.touched ? " invalid-border" : ""
		}`

		// If the input type is textarea, then render the textarea
		if (input.type === "textarea") {
			return (
				<div className="form-group">
					<label>{label}</label>
					<textarea
						className={className}
						{...input}
						placeholder={placeholder}
						rows={rows}
					></textarea>
					{renderErrorMessage(meta)}
				</div>
			)
		}

		// Return a regular input
		return (
			<div className="form-group">
				<label>{label}</label>
				<input
					className={className}
					{...input}
					placeholder={placeholder}
					rows={rows}
				/>
				{renderErrorMessage(meta)}
			</div>
		)
	}

	// Rendering the error message beneath an input
	const renderErrorMessage = (meta) => {
		if (meta.error && meta.touched) {
			return <div className="invalid-input">{meta.error}</div>
		}
		return
	}

	return (
		<Modal show={true} onHide={handleClose} animation={false}>
			<Modal.Header closeButton>
				<Modal.Title>{formTitle}</Modal.Title>
			</Modal.Header>
			<Form
				onSubmit={onSubmit}
				initialValues={initialValues}
                validate={values => {
                    // Creating an empty array for all the errors
					const errors = {}

					// Name
					if (!values.name) {
						errors.name = "Please provide a name for the lead generator"
					}

					// Phone Number
					if (!isValidPhoneNumber(values.phoneNumber)) {
						errors.phoneNumber =
							"A valid 10 digit phone number is required"
					}

					// CommissionRate
					if (!values.fee) {
						errors.fee =
							"Please provide a job fee value for the lead generator"
					}

                    return errors;

                }}
				render={(props) => (
					<form onSubmit={props.handleSubmit}>
						{/* Field: Name of Lead Generator */}

						<Modal.Body>
							<Field
								name="name"
								label="Lead Generator Name"
								type="text"
								placeholder="Enter Lead Generator's Name"
								component={renderInput}
							/>

							{/* Field: Phone Number of Lead Generator */}

							<Field
								name="phoneNumber"
								label="Phone Number"
								type="tel"
								placeholder="(123) 456 7890"
								component={renderInput}
							/>

							{/* Job Fee */}
							<Field
								name="fee"
								label="Fee ($)"
								type="number"
								placeholder="$XX"
								component={renderInput}
							/>

							{/* Field: Notes about Lead Generator (Optional) */}
							<Field
								name="notes"
								label="Notes"
								type="textarea"
								rows="3"
								placeholder="Add any notes (optional)"
								component={renderInput}
							/>
						</Modal.Body>
						<Modal.Footer>
							<Button
								onClick={() =>
									history.push("/dashboard/leadgenerators")
								}
								variant="secondary"
							>
								Cancel
							</Button>
							<Button
								variant="primary"
								type="submit"
								className="mr-2"
								disabled={props.pristine}
							>
								{onSubmitLabel}
							</Button>
						</Modal.Footer>
					</form>
				)}
			/>
		</Modal>
	)
}

export default LeadGeneratorForm
