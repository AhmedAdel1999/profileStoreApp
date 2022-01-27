import React, { useEffect, useState,useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink,faTimes,faPlus,faEdit } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/Modal'
import { ContactContext } from "../../context/contactContext";
import { GetAllContacts,optionsArray,AddUrl, EditUrl } from "../../utils/services";
import { useToasts } from 'react-toast-notifications'
import ErrorMsg from "../../utils/errorMsg";
import "./addURL.css"

const AddURL = ({showModal,setShowModal,contactId,urlId,isDark}) =>{

    const{setAllContacts,AllContacts}=useContext(ContactContext)
    const[urlData,setUrl]=useState({site:"",url:""})
    const[callback,setCallback]=useState(false)
    const[Edit,setEdit] = useState(false)
    const[error,setError]=useState(null)
    const { addToast:notify } = useToasts()
    


    useEffect(()=>{
        if(urlId){
            let data= AllContacts.filter((ele)=>ele.id===contactId)[0].contacts.filter((ele)=>ele.id===urlId)[0]
            setUrl({site:data.site,url:data.url})
            setEdit(true)
        }
        async function fun(){
        const res = await GetAllContacts()
        setAllContacts([...res])
        }
        fun();
        setError(null)
    },[callback,showModal])


    const handelChange = (e) =>{
        const {name,value}=e.target
        setUrl({...urlData,[name]:value})
    }

    const handelSubmit = async(e) =>{
        e.preventDefault();
        try {
            if(Edit){
                await EditUrl({urldata:{...urlData},contactid:contactId,urlid:urlId})
                notify(`you are updated this url to ${urlData.url}`,{
                    appearance: 'success',
                    autoDismiss:"true"
                })
            }else{
                await AddUrl({urldata:{...urlData},id:contactId})
                notify(`you are added new url ${urlData.url}`,{
                    appearance: 'success',
                    autoDismiss:"true"
                })
            }
            setCallback(!callback)
            setUrl({site:"",url:""})
            setShowModal(false)
        } catch (error) {
            setError(error.response.data.error)
        }
    }
    return(
        <Modal className={`modal ${isDark?"darkmodal":""}`} centered show={showModal} 
            onHide={() => setShowModal(false)} size="lg">
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
                            <label>Url</label>
                            <input onChange={handelChange} value={urlData.url} name="url" 
                            type="text" placeholder="For ex, https://www.facebook.com" />
                        </div>
                        <div style={{marginBottom:"10px"}}>
                            <label>Site</label>
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
                                    <><FontAwesomeIcon icon={faEdit} /> Update</>
                                    :
                                    <><FontAwesomeIcon icon={faPlus} /> Add</>
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}
export default AddURL;