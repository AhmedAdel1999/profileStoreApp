import React, { useState, useContext } from "react";
import SearchBox from "../search/searchBox";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus,faSearch } from '@fortawesome/free-solid-svg-icons'
import CreateContact from "../createcontact/createContact";
import { ContactContext } from "../../context/contactContext";
import ContactCard from "../contactCard/contactCard";
import "./contactpage.css"


const ContactsPage = ({isDark}) =>{
    const[showModal,setShowModal]=useState(false)
    const[search,setSearch]=useState('')
    const{AllContacts} = useContext(ContactContext)

    const filterByName = (contact, search) => {
        return contact.name.toLowerCase().includes(search.toLowerCase());
      };
    
      const filterByProfileLinks = (contact, search) => {
        const urlsArray = contact.contacts.map((c) => c.url);
    
        return urlsArray.find((u) =>
          u.toLowerCase().includes(search.toLowerCase())
        );
      };
    
      const contactsToDisplay = AllContacts.filter(
        (c) => filterByName(c, search) || filterByProfileLinks(c, search)
      );
    return(
        <React.Fragment>
            <SearchBox search={search} setSearch={setSearch} isDark={isDark} />
            <div className="contacts">
                <div className="addcontact">
                    <button onClick={()=>setShowModal(true)}>
                       <span><FontAwesomeIcon icon={faUserPlus} /></span>
                       <span>Add New Contact</span>
                    </button>
                </div>
                <CreateContact showModal={showModal} setShowModal={setShowModal} isDark={isDark} />
                {
                    search.length>0?
                    contactsToDisplay.length>0?
                    <div className="searchresult">
                        <FontAwesomeIcon icon={faSearch} />
                        Showing search results for query '{search}'
                    </div>
                    :
                    <div className="searchresult">
                        <FontAwesomeIcon icon={faSearch} />
                        Search: No matches found for '{search}'
                    </div>
                    :null
                }
                <div className="allcontacts">
                    {
                        AllContacts.length>0?
                        contactsToDisplay.map((ele)=>{
                            return <ContactCard isDark={isDark} key={ele.id} contactItem={ele} />
                        })
                        :
                        <div className="notexist">you have no contacts yet</div>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}
export default ContactsPage