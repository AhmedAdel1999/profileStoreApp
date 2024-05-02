import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTimes } from '@fortawesome/free-solid-svg-icons'
import { EditContact, GetAllContacts, optionsArray } from "../../../utils/services";
import { Ring } from "react-cssfx-loading";
import { useMediaQuery } from 'react-responsive';
import AddURL from "../addURL/addURL";
import "./urlCard.css"

const UrlCard = ({contact,contactItem,userData,setAllContacts}) =>{
    
    const[showModal,setShowModal]=useState(false)
    const[loading,setLoading] = useState(false)
    const[currentUrlId,setCurrentUrlId] = useState("")
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

    const handleDeleteUrl = async (urlId) =>{
         setLoading(true)
         setCurrentUrlId(urlId)
         await EditContact({
            userId:userData.id,
            contactId:contactItem.id,
            finalData:{
                ...contactItem,
                contacts:contactItem.contacts.filter((ele)=>ele.id!==contact.id)
            }
         })
         const data = await GetAllContacts()
         setAllContacts(data)
         setLoading(false)
    }
    return(
        <div className={`url-card`}>
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
                    <span>Edit</span>
                </button>
                <AddURL 
                    showModal={showModal} 
                    setShowModal={setShowModal} 
                    urlId={contact.id} 
                    contactId={contactItem.id}
                />
                <button onClick={()=>handleDeleteUrl(contact.id)}>
                    <FontAwesomeIcon icon={faTimes} />
                    <span>Delete</span>
                    {
                        (loading&&currentUrlId===contact.id)&&
                        <Ring width={"25px"} height={"25px"} color="#fff" />
                    }
                </button>
            </div>
        </div>
    )
}
export default UrlCard