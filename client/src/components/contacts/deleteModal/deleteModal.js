import React, { useEffect, useState,useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faTrash,faCheck } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/Modal'
import { useToasts } from 'react-toast-notifications'
import { ContactContext } from "../../context/contactContext";
import { GetAllContacts,DeleteUrl, DeleteContact } from "../../utils/services";
import "./deleteModal.css"

const DeleteModal = ({showDelModal,setShowDelModal,contactId,urlId,isDark}) =>{


    const[callback,setCallback]=useState(false)
    const{setAllContacts,AllContacts}=useContext(ContactContext)
    const { addToast:notify } = useToasts()
    let data= urlId?
    AllContacts.filter((ele)=>ele.id===contactId)[0].contacts.filter((ele)=>ele.id===urlId)[0]
    :AllContacts.filter((ele)=>ele.id===contactId)[0]

    useEffect(()=>{
        async function fun(){
        const res = await GetAllContacts()
        setAllContacts([...res])
        }
        fun();
    },[callback])
    

    const handelDelete = async () =>{
        try {
            if(urlId){
                await DeleteUrl({contactid:contactId,urlid:urlId})   
            }else{
                await DeleteContact(contactId)
            }
            setCallback(!callback)
            setShowDelModal(false)
        } catch (error) {
            notify(error.response.data.error,{
                appearance: 'error',
                autoDismiss:"true"
            })
        }
    }
    return(
        <Modal centered className={`modal ${isDark?"darkmodal":""}`} show={showDelModal} 
        onHide={() => setShowDelModal(false)} size="lg">
            <div className="modal-header">
                <div>
                    <FontAwesomeIcon icon={faTrash} />
                    Confirm Delete
                </div>
                <div>
                    <FontAwesomeIcon icon={faTimes} onClick={()=>setShowDelModal(false)} />
                </div>
            </div>
            <div className="modal-body">
                <p>
                    {
                        urlId?
                        <span>Are you sure you want to delete {data.site} link {data.url}?</span>
                        :
                        <span>Are you sure you want to delete contact named as '{data.name}'?</span>
                    }    
                </p>
            </div>
            <div className="modal-footer">
                <div>
                    <button onClick={()=>setShowDelModal(false)}>
                       <FontAwesomeIcon icon={faTimes} /> No
                    </button>
                    <button onClick={()=>handelDelete()}>
                    <FontAwesomeIcon icon={faCheck} /> Yes
                    </button>
                </div>
            </div>
        </Modal>
    )
}
export default DeleteModal;