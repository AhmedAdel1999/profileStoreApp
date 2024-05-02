import React, { useState, useContext, useEffect } from "react";
import SearchBox from "../../components/contacts/search/searchBox";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus,faSearch } from '@fortawesome/free-solid-svg-icons'
import CreateContact from "../../components/contacts/createcontact/createContact";
import { ContactContext } from "../../context/contactContext";
import { AuthContext } from "../../context/authContext";
import ContactCard from "../../components/contacts/contactCard/contactCard";
import { GetAllContacts } from "../../utils/services";

import "./contactpage.css"


const ContactsPage = () =>{
    const[showModal,setShowModal]=useState(false)
    const[search,setSearch]=useState('')
    const {userData} = useContext(AuthContext)
    const{AllContacts,setAllContacts} = useContext(ContactContext)
    const CurrentUserContacts = AllContacts.filter((item)=>item.userId===userData.id)

    useEffect(()=>{
      async function getContacts(){
        const data = await GetAllContacts()
        setAllContacts(data)
      }
      getContacts()
    },[])
    const filterByName = (contact, search) => {
        return contact.name.toLowerCase().includes(search.toLowerCase());
      };
    
      const filterByProfileLinks = (contact, search) => {
        const urlsArray = contact.contacts.map((c) => c.url);
    
        return urlsArray.find((u) =>
          u.toLowerCase().includes(search.toLowerCase())
        );
      };
    
      const contactsToDisplay = CurrentUserContacts.filter(
        (c) => filterByName(c, search) || filterByProfileLinks(c, search)
      );
    return(
        <div className="contacts-page">
            <div className="contacts-header">

              <SearchBox search={search} setSearch={setSearch} />
              <button className="addcontact" onClick={()=>setShowModal(true)}>
                <span><FontAwesomeIcon icon={faUserPlus} /></span>
                <span>Add New Contact</span>
              </button>
              <CreateContact showModal={showModal} setShowModal={setShowModal} />

            </div>
            <div className="contacts">
                
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
                        Search: No Matches Found For '{search}'
                    </div>
                    :null
                }
                <div className="allcontacts">
                    {
                        CurrentUserContacts.length>0?
                        contactsToDisplay.map((ele)=>{
                            return <ContactCard key={ele.id} contactItem={ele} />
                        })
                        :
                        <div className="notexist">You Have NO Contacts Yet..</div>
                    }
                </div>
            </div>
        </div>
    )
}
export default ContactsPage