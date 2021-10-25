import React, { useState} from "react"
import { connect } from "react-redux"
import { Button, Form } from "react-bootstrap"
import {
	ArrowCounterclockwise
} from "react-bootstrap-icons";
import { updateJobDescription } from "../../../redux/actions/jobActions";

const EditJobDescription = (props) => {
	
    // Temporary job description is what's displayed in the input box
	const [tempJobDescription, setTempJobDescription] = useState(
		props.job.updatedDescription !== ""
			? props.job.updatedDescription
			: props.job.description
	)

    
    let jobDescription = props.job.updatedDescription || props.job.description;

    // Reset job description to original job description
    // that was received via SMS
	const resetJobDescription = () => {
        setTempJobDescription(props.job.description)
    }

    const handleUpdateJobDescription = () => {
        props.updateJobDescription(props.job._id, tempJobDescription)
        props.toggleDescriptionEditor()
    }

	return (
        <Form.Group className="text-center mb-1">
					<Form.Control
						as="textarea"
						rows={4}
						value={tempJobDescription}
						onChange={(e) => setTempJobDescription(e.target.value)}
					/>
					<Button
						className="mt-3 mr-3"
						onClick={handleUpdateJobDescription}
						disabled={
							jobDescription === "" ||
							tempJobDescription ===
								jobDescription
						}
					>
						Update Job Description
					</Button>
					<Button
						variant={"secondary"}
						className="mt-3"
						onClick={() => {
							props.toggleDescriptionEditor()
						}}
					>
						Cancel
					</Button>
					<div>
						<Button
							variant={"outline-secondary"}
							className="mt-2"
							size={"sm"}
							// Disable the reset description button if the displayed job description
							// is identical to the original job description
							disabled={
                                tempJobDescription === props.job.description
							}
							onClick={() => resetJobDescription()}
						>
							Reset description to original
							<ArrowCounterclockwise />
						</Button>
					</div>
				</Form.Group>
    )
}

export default connect(null, {updateJobDescription})(EditJobDescription)
