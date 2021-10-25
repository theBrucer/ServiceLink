import { QuestionCircle } from "react-bootstrap-icons"
import { Tooltip } from "./GeneralUtils"
import { Eye, EyeSlash } from "react-bootstrap-icons"

// Verifies that a password is valid
// Requirements:
// Minimum 8 characters
// At least one letter
// At least one number
// At least one special character
export const isValidPassword = (password) => {
	const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
	return re.test(String(password))
}

/*
    Renders a hover tooltip with additional information
    about password requirements
*/

export const renderPasswordToolTip = () => {
	return (
		<Tooltip
            description="Password must contain at least 8 characters, at least one number, and one special character"
			place="top"
			type="dark"
			effect="solid"
			content={
				<QuestionCircle
					className="mx-1 text-secondary"
					style={{ verticalAlign: "-.200em", cursor: "pointer" }}
				/>
			}
		/>
	)
};


/* 
    Renders an eye icon, which if clicked on, will show and hide the password
    being typed in an input form
*/
export const renderPasswordShowHide = (inputName, showPassword, setShowPassword, iconStyle) => {
    // let iconStyle = {
    //     position: "relative",
    //     left: "210px",
    //     top: "37px",
    //     fontSize: "1.2rem",
    //     cursor: "pointer",
    //     zIndex: "44"
    // }

    if (inputName === "password") {
        if (showPassword) {
            return (
                <EyeSlash
                    onClick={() => setShowPassword(!showPassword)}
                    style={iconStyle}
                    className="text-secondary"
                />
            )
        } else {
            return (
                <Eye
                    onClick={() => setShowPassword(!showPassword)}
                    style={iconStyle}
                    className="text-secondary"
                />
            )
        }
    }   
};
