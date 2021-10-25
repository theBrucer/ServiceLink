import React from "react"
import { Redirect, Switch } from "react-router"
import JobLog from "./jobLog/JobLog"
import LeadGenerators from "./leadGenerators/LeadGenerators"
import PrivateRoute from "./PrivateRoute"
import ReportContainer from "./report/ReportContainer"
import SettingsContainer from "./settings/SettingsContainer"
import Technicians from "./technicians/Technicians"

const BodyContainer = () => {
	let bodyStyle = {
		// backgroundColor: "#F0F0F0",
		// height: `calc(100vh - ${this.props.navHeight}px)`,
	}

	return (
		<div style={bodyStyle} className="pt-4">
			<div className="container-xxl bg-light rounded shadow-sm">
				<Switch>
					{/* Job Log */}
					<PrivateRoute path="/dashboard/joblog" component={JobLog} />

					{/* Reports */}
					<PrivateRoute
						path="/dashboard/report"
						component={ReportContainer}
					/>

					{/* Technician Page */}
					<PrivateRoute
						path="/dashboard/technicians"
						component={Technicians}
					/>

					{/* Lead Generator Page */}
					<PrivateRoute
						path="/dashboard/leadgenerators"
						component={LeadGenerators}
					/>

					{/* Settings Related Routes */}
					<PrivateRoute
						path="/dashboard/settings"
						component={SettingsContainer}
					/>

					{/* Miscellaneous */}
					<Redirect from="/dashboard" to="/dashboard/joblog" />
				</Switch>
			</div>
		</div>
	)
}

export default BodyContainer
