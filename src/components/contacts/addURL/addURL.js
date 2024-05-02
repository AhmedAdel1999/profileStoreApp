import React, { useEffect, useState,useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink,faTimes,faPlus,faEdit } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/Modal'
import { ContactContext } from "../../../context/contactContext";
import { AuthContext } from "../../../context/authContext";
import { GetAllContacts,optionsArray,EditContact } from "../../../utils/services";
import { useToasts } from "react-toast-notifications";
import { Ring } from "react-cssfx-loading";
import ErrorMsg from "../../../utils/errorMsg";
import "./addURL.css"

const AddURL = ({showModal,setShowModal,contactId,urlId}) =>{

    const{setAllContacts,AllContacts}=useContext(ContactContext)
    const { userData } = useContext(AuthContext)
    const currentUserContacts = AllContacts.filter((ele)=>ele.userId===userData.id)
    const contactItem  = currentUserContacts.filter((ele)=>ele.id===contactId)[0]
    const { addToast:notify } = useToasts()

    const[urlData,setUrl]=useState({site:"",url:""})
    const[Edit,setEdit] = useState(false)
    const[error,setError]=useState(null)
    const[isLoading,setIsLoading]=useState(false)
    const [callback,setCallback] = useState(false)
    
    
    useEffect(()=>{
        if(urlId){
            let data= currentUserContacts.filter((ele)=>ele.id===contactId)[0].contacts.filter((ele)=>ele.id===urlId)[0]
            setUrl({site:data.site,url:data.url})
            setEdit(true)
        }
    },[callback])


    const handelChange = (e) =>{
        const {name,value}=e.target
        setUrl({...urlData,[name]:value})
    }

    const handelSubmit = async(e) =>{
        e.preventDefault();
        setIsLoading(true)
        try {
            if(Edit){
                let newUrl = {...contactItem.contacts.filter((ele)=>ele.id===urlId)[0],...urlData}
                let modifiedContacts=[]
                contactItem.contacts.forEach((ele)=>{
                    if(ele.id===urlId){
                        modifiedContacts.push(newUrl)
                    }else{
                        modifiedContacts.push(ele)
                    }
                })
                await EditContact({
                    userId:userData.id,
                    contactId,
                    finalData:{
                        ...contactItem,
                        contacts:modifiedContacts
                    }
                })
                const data = await GetAllContacts()
                setAllContacts(data)
                notify(`you are updated this url to ${urlData.url}`,{
                    appearance: 'success',
                    autoDismiss:"true"
                })
                setIsLoading(false)
                setCallback(!callback)
            }else{
                await EditContact({
                    userId:userData.id,
                    contactId,
                    finalData:{
                        ...contactItem,
                        contacts:[
                            ...contactItem.contacts,
                            {...urlData,id:Math.random().toString(36).slice(2)}
                        ]
                    }
                })
                const data = await GetAllContacts()
                setAllContacts(data)
                notify(`you are added new url ${urlData.url}`,{
                    appearance: 'success',
                    autoDismiss:"true"
                })
                setIsLoading(false)
                setCallback(!callback)
            }
            setUrl({site:"",url:""})
            setShowModal(false)
        } catch (error) {
            setError(error.message)
            setIsLoading(false)
        }
    }
    return(
        <Modal className={`modal`} centered show={showModal} 
            onHide={() => setShowModal(false)} size="lg">
            <div className="modal-content">
                <div className="modal-header">
                <div>
                        {
                            Edit?
                                <React.Fragment>
                                    <FontAwesomeIcon icon={faLink} />
                                    Edit Link - URL & Site
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <FontAwesomeIcon icon={faLink} />
                                    Add New Link
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
                    <div>
                        <form onSubmit={handelSubmit}>
                            <div style={{marginBottom:"10px"}}>
                                <label>Url:</label>
                                <input onChange={handelChange} value={urlData.url} name="url" 
                                type="text" placeholder="For ex, https://www.facebook.com" />
                            </div>
                            <div style={{marginBottom:"10px"}}>
                                <label>Site:</label>
                                <select onChange={handelChange} name="site" value={urlData.site} >
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
            </div>
        </Modal>
    )
}
export default AddURL;