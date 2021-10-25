import React, { useState } from "react"
import { Badge } from "react-bootstrap"
import { connect } from "react-redux"
import { updateCommissionRate } from "../../../redux/actions/jobActions"

const EditCommissionRate = (props) => {
	const [commissionRate, setCommissionRate] = useState(props.commissionRate)


	// Make sure there is a percentage icon on the input on the right

	if (commissionRate === null) setCommissionRate(0)

	return (
		<>
			<input
				type="number"
				min="0"
				max="99"
				value={commissionRate}
				onChange={(e) => e.target.value >= 100 ? setCommissionRate(100) : setCommissionRate(e.target.value)}
				style={{ width: "50px" }}
			/>

			<Badge
				size={"sm"}
				variant={"secondary"}
				className={"ml-1"}
				style={{ cursor: "pointer", verticalAlign: ".150em" }}
				onClick={() => {
					props.updateCommissionRate(props.jobId, commissionRate)
					props.toggleCommissionRateEditor()
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
					props.toggleCommissionRateEditor()
				}}
			>
				Cancel
				{/* <PencilFill className={'ml-1'} style={{ verticalAlign: ".050em", fontSize: '.8em'}}/> */}
			</Badge>
		</>
	)
}

export default connect(null, { updateCommissionRate })(EditCommissionRate)
