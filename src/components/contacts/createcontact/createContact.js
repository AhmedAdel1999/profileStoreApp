import React, { useEffect, useState,useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus,faFileUpload,faTimes,faEdit,faPlus } from '@fortawesome/free-solid-svg-icons'
import { Modal } from "react-bootstrap";
import Ring from "react-cssfx-loading/lib/Ring"
import { useToasts } from 'react-toast-notifications'
import { AddContact,EditContact,GetAllContacts,optionsArray } from "../../utils/services";
import { ContactContext } from "../../context/contactContext";
import ErrorMsg from "../../utils/errorMsg";
import "./createcontact.css"

const CreateContact = ({showModal,setShowModal,contactId,isDark}) =>{


    const[contactData,setContact]=useState({site:'',name:'',url:''})
    const{setAllContacts,AllContacts}=useContext(ContactContext)
    const[picture,setPicture]=useState('')
    const[image,setImage]=useState(null)
    const[callback,setCallback]=useState(false)
    const[Edit,setEdit]=useState(false)
    const[error,setError]=useState(null)
    const[isLoading,setIsLoading]=useState(false)
    const { addToast:notify } = useToasts()

    useEffect(()=>{
        if(contactId){
           let data = AllContacts.filter((ele)=>ele.id===contactId)[0]
           setContact({...contactData,name:data.name})
           setEdit(true)
        }
        async function fun(){
        const res = await GetAllContacts()
        setAllContacts([...res])
        }
        fun();
        setError(null)
    },[callback,showModal])
    useEffect(()=>{
    if(image){
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = async () => {
            setPicture(reader.result)  
        };
    }
    },[image])

    const handelChange = (e) =>{
    const {name,value}=e.target
    setContact({...contactData,[name]:value})
    }


    const handelSubmit = async (e) =>{
    e.preventDefault();
    setIsLoading(true)
    try {
        if(Edit){
           await EditContact({id:contactId,finalData:{name:contactData.name,displayPicture:picture}})
           notify(`you are update contact name to "${contactData.name}"`,{
            appearance: 'success',
            autoDismiss:"true"
        })
        setIsLoading(false)
        }else{
            await AddContact({name:contactData.name,
                displayPicture:picture,
                contacts:{
                    site:contactData.site,
                    url:contactData.url
                }
            })
            notify(`you are added new contact "${contactData.name}"`,{
                appearance: 'success',
                autoDismiss:"true"
            })
            setIsLoading(false)
        }
        setCallback(!callback)
        setContact({site:'',name:'',url:''})
        setPicture('')
        setShowModal(false)
    } catch (error) {
        setError(error.response.data.error)
        setIsLoading(false)
    }
    }

    return(
            <Modal className={`modal ${isDark?"darkmodal":""}`} 
             centered show={showModal} onHide={() => setShowModal(false)} size="lg">
                <div className="modal-header">
                    <div>
                    {
                        Edit?
                            <React.Fragment>
                                <FontAwesomeIcon icon={faEdit} />
                                Edit Contact - Name & Display Picture
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <FontAwesomeIcon icon={faUserPlus} />
                                Add New Contact
                            </React.Fragment>
                    }
                    </div>
                    <div>
                        <FontAwesomeIcon onClick={()=>setShowModal(false)} icon={faTimes} />
                    </div>
                </div>
                <div className="modal-body">
                   <div>
                       {error&& <ErrorMsg ErrMsg={error} />}
                   </div>
                   <div className="contactdata">
                       <form onSubmit={handelSubmit}>
                           <div>
                               <label>Name:</label>
                               <input onChange={handelChange} value={contactData.name} name="name"
                                type="text" placeholder="Enter name" />
                           </div>
                           {
                               Edit===false&&
                               <React.Fragment>
                                   <div>
                                        <label>URL:</label>
                                        <input onChange={handelChange} name="url"
                                        type="text" placeholder="For ex, https://www.facebook.com" />
                                    </div>
                                    <div>
                                        <label>Site:</label>
                                        <select onChange={handelChange} name="site" value={contactData.site}>
                                            <option value="">Select Site Name</option>
                                            {
                                                optionsArray.map((ele,ind)=>{
                                                    return(
                                                            <option key={ind} value={ele.value}>{ele.value}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                               </React.Fragment>
                           }
                           <div className="upload">
                                <label htmlFor="img">
                                    <FontAwesomeIcon icon={faFileUpload} />
                                    Select Image For Db
                               </label>
                               <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="img" style={{display:"none"}}/>
                           </div>
                           {
                               image&&
                               <div className="imgbox">
                                   <img src={URL.createObjectURL(image)} />
                                   <span>
                                      <FontAwesomeIcon onClick={()=>setImage(null)} icon={faTimes} />
                                   </span>
                               </div>
                           }
                           <div className="submit">
                               <button type="submit">
                                   {
                                       Edit?
                                       <React.Fragment>
                                           <span><FontAwesomeIcon icon={faEdit} /> Update</span>
                                          {
                                            isLoading&&
                                            <Ring color="#FFF" width="25px" height="25px" duration="1s" />
                                          } 
                                       </React.Fragment>
                                       :
                                       <React.Fragment>
                                            <span><FontAwesomeIcon icon={faPlus} /> Add</span>
                                            {
                                            isLoading&&
                                            <Ring color="#FFF" width="25px" height="25px" duration="1s" />
                                           } 
                                            
                                       </React.Fragment>
                                   }
                               </button>
                           </div>
                       </form>
                   </div>
                </div>
            </Modal>
    )
}
export default CreateContact