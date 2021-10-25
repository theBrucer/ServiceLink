import React from "react"
import { connect } from "react-redux"
import { logIn } from "../redux/actions/authActions"
import BodyContainer from "./BodyContainer"
import Navigation from "./navigation/Navigation"

const Dashboard = () => {

	return (
		<>
			<Navigation />
			<BodyContainer />
		</>
	)
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, {logIn})(Dashboard)
