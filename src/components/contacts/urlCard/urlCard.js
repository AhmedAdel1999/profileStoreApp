import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTimes } from '@fortawesome/free-solid-svg-icons'
import { optionsArray } from "../../utils/services";
import { useMediaQuery } from 'react-responsive';
import AddURL from "../addURL/addURL";
import DeleteModal from "../deleteModal/deleteModal";
import "./urlCard.css"

const UrlCard = ({contact,contactId,isDark}) =>{
    
    const[showModal,setShowModal]=useState(false)
    const[showDelModal,setShowDelModal]=useState(false)

    const filterSites = (site) =>{
        let res
        optionsArray.forEach((ele)=>{
            if(ele.value.endsWith(site)){ res= ele.icon}
        })
        return res
    }
   
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const linkCharCount = isMobile ? 30 : 70;
    const formattedLink = (link) => {
      return link.length > linkCharCount
        ? link.slice(0, linkCharCount).concat('...')
        : link;
    };
    return(
        <div className={`url-card ${isDark?"darkurl":""}`}>
            <div className="url">
               <FontAwesomeIcon icon={filterSites(contact.site)} />
               <a href={contact.url.startsWith("http")?`${contact.url}`:`https://${contact.url}`} target="_blank">
                   <span>
                       {formattedLink(contact.url).startsWith("http")?
                       formattedLink(contact.url).split('//')[1]
                       :
                       formattedLink(contact.url)
                       }
                   </span><br/>
                   <span>{contact.site}</span>
               </a>
            </div>
            <div className="card-icons">
                <button onClick={()=>setShowModal(true)}>
                    <FontAwesomeIcon icon={faEdit} />
                </button>
                <AddURL isDark={isDark} showModal={showModal} setShowModal={setShowModal} contactId={contactId} urlId={contact.id} />
                <button onClick={()=>setShowDelModal(true)}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <DeleteModal isDark={isDark} showDelModal={showDelModal} setShowDelModal={setShowDelModal} contactId={contactId} urlId={contact.id} />
            </div>
        </div>
    )
}
export default UrlCard