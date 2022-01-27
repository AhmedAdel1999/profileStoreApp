import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faUserMinus,faPlus } from '@fortawesome/free-solid-svg-icons'
import UrlCard from "../urlCard/urlCard";
import AddURL from "../addURL/addURL";
import CreateContact from "../createcontact/createContact";
import DeleteModal from "../deleteModal/deleteModal";
import "./contactCard.css"

const ContactCard = ({contactItem,isDark}) =>{

    const[showModal,setShowModal]=useState(false)
    const[showCrtModal,setShowCrtModal]=useState(false)
    const[showDelModal,setShowDelModal]=useState(false)


    return(
        <div className={`contact-card ${isDark?"darkcontact":""}`}>
            <div className="card-head">
               <div className="head-info">
                   <img src={contactItem.displayPicture.link} />
                   <span>{contactItem.name}</span>
               </div>
               <div className="head-icons">
                   <button onClick={()=>setShowCrtModal(true)}>
                       <FontAwesomeIcon icon={faEdit} />Edit
                   </button>
                   <CreateContact showModal={showCrtModal} isDark={isDark} contactId={contactItem.id} setShowModal={setShowCrtModal} />
                   <button onClick={()=>setShowDelModal(true)}>
                       <FontAwesomeIcon icon={faUserMinus} />Delete
                   </button>
                   <DeleteModal showDelModal={showDelModal} isDark={isDark} setShowDelModal={setShowDelModal} contactId={contactItem.id} />
               </div>
            </div>
            <div className="url-box">
                {
                    contactItem.contacts.map((ele)=>{
                        return <UrlCard key={ele.id} isDark={isDark} contact={ele} contactId={contactItem.id} />
                    })
                }
            </div>
            <div className="addurl">
                <button onClick={()=>setShowModal(true)}>
                    <FontAwesomeIcon icon={faPlus} />
                    Add URL
                </button>
                <AddURL showModal={showModal} isDark={isDark} contactId={contactItem.id} setShowModal={setShowModal} />
            </div>
        </div>
    )
}
export default ContactCard;