import React from "react"
import { Button, Modal } from "react-bootstrap"
import { Field, Form } from "react-final-form"
import history from "../../history"
import { isValidPhoneNumber } from "../../Utility/PhoneUtils"
import { addTechnician } from '../../redux/actions/technicianActions'
import { connect } from "react-redux"

// This Modal is for displaying information and two actions.
// For creating a Form modal, refer to the FormModal.js

const FormModal = (props) => {
	const handleClose = () => {
		history.push("/dashboard/technicians")
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

	const onSubmit = (formValues) => {
		props.addTechnician(formValues)
	}

	const validName = (value) => {
		if (!value) {
			return "Provide a name for the Technician"
		}
		return undefined
	}

	const isValidPhoneNumberChecker = (value) => {
		// Using the validatePhoneNumber method from the PhoneUtils
		return isValidPhoneNumber(value)
			? undefined
			: "A valid 10 digit phone number is required"
	}

	return (
			<Modal
                id="modal"
				show={true}
				onHide={handleClose}
				// animation={false}
				// dialogClassName={dialogClassName}
			>
				<Modal.Header closeButton>
					<Modal.Title>Add Technician 👨🏻‍🔧👩🏻‍🔧</Modal.Title>
				</Modal.Header>

				<Form
					onSubmit={onSubmit}
					initialValues={props.initialValues}
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
									validate={validName}
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
									validate={isValidPhoneNumberChecker}
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
								<Button
									variant="secondary"
									onClick={handleClose}
								>
									Cancel
								</Button>
								<Button
									variant="primary"
									type="submit"
									className="mr-2"
									disabled={props.pristine}
								>
									Add Technician
								</Button>
							</Modal.Footer>
						</form>
					)}
				/>
			</Modal>
	)
}

export default connect(null, {addTechnician})(FormModal)
