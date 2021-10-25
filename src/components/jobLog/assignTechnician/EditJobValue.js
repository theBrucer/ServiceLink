import React, { useState } from "react"
import { Badge } from "react-bootstrap"
import { connect } from "react-redux"
import { updateJobValue } from "../../../redux/actions/jobActions"

const EditJobValue = (props) => {
	const [jobValue, setJobValue] = useState(props.jobValue)

	return (
		<>$
			<input
				type="number"
				min="0"
				value={jobValue}
				onChange={(e) => setJobValue(e.target.value)}
				style={{ width: "80px" }}
			/>

			<Badge
				size={"sm"}
				variant={"secondary"}
				className={"ml-1"}
				style={{ cursor: "pointer", verticalAlign: ".150em" }}
				onClick={() => {
					props.updateJobValue(props.jobId, jobValue)
					props.toggleJobValueEditor()
				}}
			>
				Save
				{/* <PencilFill className={'ml-1'} style={{ verticalAlign: ".050em", fontSize: '.8em'}}/> */}
			</Badge>
			<Badge
				size={"sm"}
				// variant={"outline-secondary"}
				className={"ml-1 border border-secondary"}
				style={{ cursor: "pointer", verticalAlign: ".150em" }}
				onClick={() => {
					props.toggleJobValueEditor()
				}}
			>
				Cancel
				{/* <PencilFill className={'ml-1'} style={{ verticalAlign: ".050em", fontSize: '.8em'}}/> */}
			</Badge>
		</>
	)
}

export default connect(null, { updateJobValue })(EditJobValue)
