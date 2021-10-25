import React, { Component } from 'react'
import { connect } from 'react-redux'

class Billing extends Component {
    render() {
        return (
            <div className="mt-5 mb-3 text-center">
                For billing, contact us directly at <a href="mailto:admin@leadeem.com" target="_blank" rel="noreferrer">admin@leadeem.com</a>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Billing)
