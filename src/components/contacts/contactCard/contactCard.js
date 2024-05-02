import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faUserMinus,faPlus } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from "../../../context/authContext";
import { ContactContext } from "../../../context/contactContext";
import { DeleteContact, GetAllContacts } from "../../../utils/services";
import { Ring } from "react-cssfx-loading";
import UrlCard from "../urlCard/urlCard";
import AddURL from "../addURL/addURL";
import CreateContact from "../createcontact/createContact";
import { useMediaQuery } from "react-responsive";
import "./contactCard.css"





const ContactCard = ({contactItem}) =>{

    const { userData } = useContext(AuthContext)
    const { setAllContacts } = useContext(ContactContext)
    const isMobile = useMediaQuery({ maxWidth: 1000 });
    const isMiddle = useMediaQuery({ minWidth: 550,maxWidth:850 });

    const[showModal,setShowModal]=useState(false)
    const[showCrtModal,setShowCrtModal]=useState(false)
    const[currentContactId,setContactId] = useState("")
    const[loading,setLoading] = useState(false)

    const handleDeleteContact = async (contactId) =>{
         setLoading(true)
         setContactId(contactId)
         await DeleteContact({userId:userData.id,contactId})
         const data = await GetAllContacts()
         setAllContacts(data)
         setLoading(false)
    }

    
    
    const formattedName = (name) => {
      const nameCharCount = isMiddle ? 40:isMobile?6 : 40;
      return name.length > nameCharCount
        ? name.slice(0, nameCharCount).concat('..')
        : name;
    };


    return(
        <div className={`contact-card`}>
            <div className="card-head">
               <div className="head-info">
                   <img alt="contact-img" loading="lazy" src={contactItem.displayPicture} />
                   <span>{formattedName(contactItem.name)}</span>
               </div>
               <div className="head-icons">
                   <button onClick={()=>setShowCrtModal(true)}>
                       <FontAwesomeIcon icon={faEdit} />Edit
                   </button>
                   <CreateContact showModal={showCrtModal} contactId={contactItem.id} setShowModal={setShowCrtModal} />
                   <button onClick={()=>handleDeleteContact(contactItem.id)}>
                       <FontAwesomeIcon icon={faUserMinus} />
                       <span style={{marginRight:"5px"}}>Delete</span>
                       {
                        (loading&&currentContactId===contactItem.id)&&
                        <Ring width={"25px"} height={"25px"} color="#fff" />
                       }
                   </button>
               </div>
            </div>
            <div className="url-box">
                {
                    contactItem.contacts.map((ele)=>{
                        return <UrlCard 
                                key={ele.id} 
                                contact={ele} 
                                contactItem={contactItem}
                                userData={userData}
                                setAllContacts={setAllContacts}
                            />
                    })
                }
            </div>
            <div className="addurl">
                <button onClick={()=>setShowModal(true)}>
                    <FontAwesomeIcon icon={faPlus} />
                    Add URL
                </button>
                <AddURL showModal={showModal} contactId={contactItem.id} setShowModal={setShowModal} />
            </div>
        </div>
    )
}
export default ContactCard;