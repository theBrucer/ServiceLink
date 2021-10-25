import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import '../navigation/Navbar.css';

export default function SettingsNav() {

    /* 
        This functional component represents the settings tabs 
    */

    return (
        <Nav variant="tabs" className="settings-nav">
            <Nav.Item>
                <NavLink className="nav-link settings-nav-link" to="/dashboard/settings" exact>Account Information</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink className="nav-link settings-nav-link" to="/dashboard/settings/billing">Billing</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink className="nav-link settings-nav-link" to="/dashboard/settings/password/change">Change Password</NavLink>
            </Nav.Item>
        </Nav>
    )
}
