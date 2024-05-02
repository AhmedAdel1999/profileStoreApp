import React, { useState , createContext } from 'react';
export const ContactContext = createContext();
export const ContextProvider = (props) =>{
    const[AllContacts,setAllContacts]=useState([])
    let state={
        AllContacts,
        setAllContacts,
    }
    return(
        <ContactContext.Provider value={{...state}}>
            {props.children}
        </ContactContext.Provider>
    );
}