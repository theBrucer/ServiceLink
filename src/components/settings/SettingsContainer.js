import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import BodyTitle from '../BodyTitle'
import PrivateRoute from '../PrivateRoute'
import AccountInformation from './AccountInformation'
import Billing from './Billing'
import ChangePassword from './ChangePassword'
import SettingsNav from './SettingsNav'


class SettingsContainer extends Component {

    render() {

        return (
            <Container className="py-4">
                <BodyTitle title="Account Settings 🛠" className="mb-4 text-center" />
                <SettingsNav />
                <PrivateRoute path="/dashboard/settings" exact component={AccountInformation} />
                <PrivateRoute path="/dashboard/settings/billing" component={Billing} />
                <PrivateRoute path="/dashboard/settings/password/change" component={ChangePassword} />
            </Container>
        )
    }
}



export default connect(null)(SettingsContainer)