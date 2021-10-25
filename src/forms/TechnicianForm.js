import React from "react"
import { Button, Modal } from "react-bootstrap"
import { Field, Form } from "react-final-form"
import history from "../history"
import { isValidPhoneNumber } from "../Utility/PhoneUtils"

// This Modal is for displaying information and two actions.
// For creating a Form modal, refer to the FormModal.js

const AddTechnician = (props) => {
	const { formTitle, onSubmit, onSubmitLabel, initialValues } = props

	const handleClose = () => {
		history.push("/dashboard/technicians")
	}

	const renderInput = ({
		input,
		label,
		placeholder,
		meta,
		rows,
	}) => {
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

	// Render the types of technicians. For now, we are focused only on LockSmiths
	const renderTechnicianTypes = () => {
		let types = ["Locksmith"]

		return types.map((type) => {
			return (
				<option value={type} key={type}>
					{type}
				</option>
			)
		})
	}

	return (
		<Modal
			show={true}
			onHide={handleClose}
			animation={false}
			// dialogClassName={dialogClassName}
		>
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
						errors.name = "Please provide a name for the technician"
					}

					// Phone Number
					if (!isValidPhoneNumber(values.phoneNumber)) {
						errors.phoneNumber =
							"A valid 10 digit phone number is required"
					}

					// CommissionRate
					let regex = /^\d{1,2}$/ // Between 1 and 2 digits
					if (!regex.test(values.commissionRate)) {
						errors.commissionRate =
							"Please provide a valid commission rate for the technician"
					}


					return errors;
				}}
				render={(props) => (
					<form onSubmit={props.handleSubmit}>
						{/* Field: Name of Technician */}
						<Modal.Body>
							<Field
								name="name"
								label="Technician Name"
								type="text"
								placeholder="Enter Technician's Name"
								component={renderInput}
							/>

							{/* Field: Type of Technician */}

							<Field
								name="type"
								// We are hard coding the value "locksmith" for the time being until
								// we expand to further services
								initialValue="Locksmith"
							>
								{({ input, meta }) => (
									<div className="form-group">
										<label>Type</label>
										<select
											className="form-control"
											{...input}
											type="select"
											disabled
										>
											{/* <option /> */}
											{renderTechnicianTypes()}
										</select>
									</div>
								)}
							</Field>


							{/* Field: Phone Number of Technician */}

							<Field
								name="phoneNumber"
								label="Phone Number"
								type="tel"
								placeholder="(123) 456 7890"
								component={renderInput}
							/>

							{/* Commission Rate */}
							<Field
								name="commissionRate"
								label="Commission Rate (%)"
								type="number"
								placeholder="XX%"
								component={renderInput}
							/>

							{/* Field: Notes about Technician (Optional) */}

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
							<Button variant="secondary" onClick={handleClose}>
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

export default AddTechnician
