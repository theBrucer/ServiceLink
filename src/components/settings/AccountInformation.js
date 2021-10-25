import React, { Component } from 'react'
import { Alert, Badge } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import SettingsForm from '../../forms/SettingsForm'
import { editUser } from '../../redux/actions/authActions'
import { formatPhoneNumber } from '../../Utility/PhoneUtils'
import { getQueryStringKeyValuePairs } from '../../Utility/UrlUtils'
import { renderEmailAlert, renderSettingsAlert } from '../notifications/AlertNotification'


class AccountInformation extends Component {


    renderPhoneAlert = () => {
        let userPhoneNumber = this.props.user.twilioPhoneNumber;
        if(userPhoneNumber) {
            return (
                <>
                  Your account phone number is <span className="font-weight-bold"> {formatPhoneNumber(userPhoneNumber)}</span>.
                    Send all jobs to this phone number and they'll show in the <Link to="/dashboard/joblog" className="alert-link">Job Log</Link>
                </>)
        }
        else {
            return (
                <>
                You currently do not have a phone number assigned to your account. Contact support at <a href="mailto:admin@leadeem.com" target="_blank" rel="noreferrer">admin@leadeem.com</a>
                </>
            )
        }
    }

     
    onSubmit = (formValues) => {
        this.props.editUser(formValues)
    }

    render() {

        let queries = getQueryStringKeyValuePairs(this.props.location)

        let {accountName,
            userEmail,
            userEmailConfirmed,
            contactPhoneNumber,
            accountStatus} = this.props.user;

        return (
            <div>
                
                <h4 className="my-4 text-center text-secondary">
                    Your account status is currently <Badge variant={accountStatus === "ACTIVE" ? `success` : `warning`}>{accountStatus}</Badge> <br />
                </h4>

                <Alert variant="primary" className="my-3 mb-3 text-center">{this.renderPhoneAlert()}</Alert>
                
                {/* Render URL query related alerts */}
                {renderSettingsAlert(queries)}

                {/* Render email confirmation alert */}
                {renderEmailAlert(!userEmailConfirmed)}


                <SettingsForm
                    initialValues={{
                        accountName,
                        userEmail,
                        contactPhoneNumber}
                    }
                    onSubmitLabel="Save Settings"
                    onSubmit={this.onSubmit}
                />
                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.userInfo

})

export default connect(mapStateToProps, { editUser })(AccountInformation)
