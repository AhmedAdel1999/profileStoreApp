 import React,{useContext} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt,faEdit,faSignInAlt,faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from "../../context/authContext";
import {Link, NavLink} from "react-router-dom"
import logonoir from "../../assets/logonoir.png"
import "./navbar.css"



const Navbar = () =>{

    const {token,userData,setToken,setUserData} = useContext(AuthContext)
    const handelLogout = () =>{
        localStorage.removeItem("token")
        localStorage.removeItem("userData")
        setToken(null)
        setUserData(null)
    }

    return(
        <div className={`navbar-section`} >
           <Link className="logo" to="/">
                <img
                  alt="logo img"
                  loading="lazy"
                  src={logonoir} 
                />
           </Link>
           <ul className="links">
               {
                   token?
                   <React.Fragment>
                       <li>
                            <NavLink activeClassName="active" to="/">
                                <FontAwesomeIcon icon={faUserAlt} />
                                Hi,{userData.displayName}
                            </NavLink>
                       </li>
                       <li>
                            <NavLink to="/" activeClassName="imp" onClick={handelLogout}>
                                <FontAwesomeIcon icon={faSignOutAlt} />
                                Logout
                            </NavLink> 
                       </li>
                   </React.Fragment>
                   :
                   <React.Fragment>
                       <li>
                            <NavLink activeClassName="active" to="/login">
                                <FontAwesomeIcon icon={faSignInAlt} />
                                Login
                            </NavLink>
                       </li>
                       <li>
                            <NavLink activeClassName="active" to="/register">
                                <FontAwesomeIcon icon={faEdit} />
                                Register
                            </NavLink>
                       </li>
                   </React.Fragment>
               }
           </ul>
        </div>
    )
}
export default Navbar