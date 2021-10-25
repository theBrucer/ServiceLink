import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import ChangePasswordForm from '../../forms/ChangePasswordForm'

class ChangePassword extends Component {
    render() {
        return (
            <Container className="mt-5">
                <ChangePasswordForm
                    initialValues={null}
                    onSubmitLabel="Change Password"
                    onSubmit={this.onSubmit}
                />
                {/* <div className="text-center mt-2">
                    <NavLink className="nav-link" to="/">Forgot your password?</NavLink>
                </div> */}
            </Container>

        )
    }
}

export default connect(null, null)(ChangePassword)
