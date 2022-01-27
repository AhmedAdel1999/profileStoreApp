import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile } from '@fortawesome/free-solid-svg-icons'
import "./home.css"
const Home = () =>{
    return (
        <div className="homebox">
            <div className="home-content">
                <div>
                   <h3>Welcome to profile Store app<FontAwesomeIcon icon={faSmile}/></h3>
                   <p>
                       in this app you can Authentication login/register with email-password,
                       Upload images for display pictures of contacts,
                       Add/update/delete contacts & change display picture,
                       Add/update/delete profile links of individual contacts
                       Add/update/delete profile links of individual contacts
                        Search contacts by name or profile links,
                        Toast notifications for actions - adding/updating/deleting contact, or welcome message etc.
                        Dark mode toggle w/ local storage save
                   </p>
                </div>
            </div>
        </div>
    )
}
export default Home