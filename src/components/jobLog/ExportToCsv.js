import _ from "lodash"
import { DateTime } from "luxon"
import React from "react"
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import { BoxArrowUp } from "react-bootstrap-icons"
import { CSVLink } from "react-csv"
import { renderCsvTime } from "../../Utility/TimeUtils"

function ExportToCsv({ accountName, jobs, technicians, leadGenerators }) {
	let csvData = []

	if (!_.isEmpty(jobs) && !_.isEmpty(technicians) && !_.isEmpty(leadGenerators)) {

		// console.log("jobs are", jobs)
		let jobsCopy = _.cloneDeep(jobs)

		let jobsArray = Object.values(jobsCopy)
		const tableHeaders = jobsArray.length > 0 ? Object.keys(jobsArray[0]) : [];

		jobsArray = jobsArray.map((job) => {
            
			job.timeReceived = DateTime.fromISO(job.timeReceived).toFormat("MM-d-yyyy h:mm a")
			job.timeTechnicianAssigned = job.timeTechnicianAssigned && DateTime.fromISO(job.timeTechnicianAssigned).toFormat("MM-d-yyyy h:mm a")
            job.user = accountName
			job.technician = job.technician
				? technicians[job.technician].name
				: ""
			job.leadGenerator = job.leadGenerator
				? leadGenerators[job.leadGenerator].name
				: ""

			return Object.values(job)
		})

		csvData = jobsArray.length > 0 ? [[...tableHeaders], ...jobsArray] : []
	}
	// let filename = `${accountName} Job Log ${renderCsvTime()}.csv`
	let filename = `Job Log ${renderCsvTime()}.csv`

	return (
		// {/* CSV Download Button  */}
		// {/* Overlay tooltip */}
		<OverlayTrigger
			key={"left"}
			placement={"left"}
			overlay={
				<Tooltip
					style={{
						backgroundColor: "white !important",
					}}
				>
					Export current Job Log to CSV
				</Tooltip>
			}
		>
			{/* Download to CSV Button itself */}
			<CSVLink
				data={csvData}
				// Add today's date to the Job-Log and number of results
				// when exporting to CSV
				filename={filename}
				target="_blank"
			>
				<Button size="sm" variant={"secondary"}>
					Export to CSV
					<BoxArrowUp
						className="ml-2"
						style={{ verticalAlign: "-.100em" }}
					/>
				</Button>
			</CSVLink>
		</OverlayTrigger>
	)
}

export default ExportToCsv
