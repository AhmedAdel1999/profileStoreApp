 import React,{useContext,useState,useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt,faBars,faEdit,faSignInAlt,faUserAlt,faSun,faMoon,faTimes } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from "../context/authContext";
import { LightModeContext } from "../context/lightModeContext";
import {Link, NavLink} from "react-router-dom"
import { useMediaQuery } from "react-responsive";
import "./navbar.css"
const Navbar = () =>{

    const isShowToggle = useMediaQuery({maxWidth:992})
    const[toggle,setToggle]=useState(false)
    const {token,userData} = useContext(AuthContext)
    const {isDark,setMode} = useContext(LightModeContext)

    function changemode(){
        setMode(!isDark)
        localStorage.setItem("mode",JSON.stringify(!isDark))
    }

    useEffect(()=>{
        let currentMode = JSON.parse(localStorage.getItem("mode"))
        setMode(currentMode)
    },[isDark])

    const handelLogout = async() =>{
        localStorage.removeItem("token")
        localStorage.removeItem("userData")
        localStorage.setItem("mode",false)
        window.location.href="/login"
    }

    let style={
        overflow:toggle?"visible":"hidden",
        height:isShowToggle===false?"auto":toggle===true?token?"141px":"94px":"0px"
    }
    return(
        <div className={`navbar-section ${isDark?"dark":""}`} >
           <div className="logo">
                <Link to="/">
                    <FontAwesomeIcon icon={faUserAlt} />
                    ProfileStore
               </Link>
           </div>
           {
               isShowToggle&&
               <div className="toggel" onClick={()=>setToggle(!toggle)}>
                   {
                       toggle?
                       <FontAwesomeIcon icon={faTimes} />
                       :
                       <FontAwesomeIcon icon={faBars} />
                   }
               </div>
           }
           <ul className="links" style={{...style}}>
               {
                   token?
                   <React.Fragment>
                       <li>
                            <NavLink activeClassName="active" to="#">
                                <FontAwesomeIcon icon={faUserAlt} />
                                Hi,{userData.username}
                            </NavLink>
                       </li>
                       <li>
                            <NavLink to="/" activeClassName="imp" onClick={handelLogout}>
                                <FontAwesomeIcon icon={faSignOutAlt} />
                                Logout
                            </NavLink> 
                       </li>
                       <li>
                            <NavLink to="#" activeClassName="imp" className="mood" onClick={()=>changemode()}>
                                {
                                    isDark?
                                    <><FontAwesomeIcon icon={faMoon} /></>
                                    :
                                    <><FontAwesomeIcon icon={faSun} /></>
                                }
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