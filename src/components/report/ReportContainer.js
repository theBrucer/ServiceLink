import React from "react"
import { Container } from "react-bootstrap"
import { connect } from "react-redux"
import BodyDescription from "../BodyDescription"
import BodyTitle from "../BodyTitle"

export const ReportContainer = (props) => {
	return (
		<Container fluid className="py-4 px-5">
			<BodyTitle title="Report 📊" />
			<BodyDescription
				description="View your weekly report here. How much you owe, who owes you and so forth."
				className="mb-4"
			/>
			<div>
				Things to add here:
				<ul>
					<li>How many texts have been sent this cycle</li>
					<li>How many jobs were received, accepted and rejected from lead generators</li>
					<li>Total value of all jobs completed, number of jobs still missing their value (until received, hard to determine the rest of the analytics)</li>
					<li>How many jobs each technician received, accepted and rejected</li>
					<li>How much money is owed to lead generators = total jobs accepted * fee per job</li>
					<li>How much money is owed to technicians = total jobs accepted * value of the job * commission rate</li>
					<li>The ability to see this for previous weeks (on a cyclical basis). One day, we'll give the option to across custom dates that the user can select</li>
					<li>The ability to export the described information above to CSV - Edon is it necessary? What should it look like?</li>
				</ul>
			</div>
		</Container>
	)
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ReportContainer)
