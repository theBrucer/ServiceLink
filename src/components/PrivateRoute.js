import { connect } from "react-redux"
import { Redirect, Route } from "react-router"

const PrivateRoute = (props) => {


    // const isAuthenticated = () => {
    //     let localStorageAuth = fetchLocalStorage()
    //     // If no token or expiresAt property exist
    //     if (!localStorageAuth.token || !localStorageAuth.expiresAt) {
    //         return false;
    //     }
        
    //     // Compare the expiresAt time to current time
    //     // Expires at is saved at seconds, whereas date.getTime is in ms 
    //     // so we must divide by 1000

    //     const rightNow = Date.now();
    //     return localStorageAuth.expiresAt > Date.now() / 1000         
    // }



    const isAuthenticated = () => {
        // let localStorageAuth = fetchLocalStorage()
        // If no token or expiresAt property exist
        if (!props.auth.token || !props.auth.expiresAt) {
            return false;
        }
        
        // Compare the expiresAt time to current time
        // Expires at is saved at seconds, whereas date.getTime is in ms 
        // so we must divide by 1000

        return props.auth.expiresAt > Date.now() / 1000         
    }


	let { component: Component, ...rest } = props


	return (
		<Route
			{...rest}
			render={(props) => {
				// If user is signedin
				if (isAuthenticated()) {
					// Return the component that was passed
					return <Component {...props} />
				}

				// User is not signed in
				else {
					// Return user to login page
					return <Redirect to={{ pathname: "/" }} />
				}
			}}
		/>
	)
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps, null)(PrivateRoute)
