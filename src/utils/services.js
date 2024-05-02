import {faGithubSquare,faFacebookSquare,faTwitterSquare,faYoutubeSquare,faInstagramSquare, faLinkedin} from "@fortawesome/free-brands-svg-icons"
import axiosInstance from "./backendUrl";
import axios from "axios";
const optionsArray=[
  {value:'Facebook',icon:faFacebookSquare},
  {value:'Github',icon:faGithubSquare},
  {value:'Twitter',icon:faTwitterSquare},
  {value:'Youtube',icon:faYoutubeSquare},
  {value:'Instagram',icon:faInstagramSquare},
  {value:"Linkedin",icon:faLinkedin}
]

const uploadImg = async (image) =>{
  const fd = new FormData();
  fd.append('file',image)
  fd.append("upload_preset","jobportal")
  fd.append("api_key", "372336693865194")
  let response= await axios.post("https://api.cloudinary.com/v1_1/dibuevfps/image/upload",fd);
  let url = await response.data.url
  return url
}

  
const AddContact = async ({userId,contactObj}) =>{
   const displayPicture = await uploadImg(contactObj.displayPicture)
   let res = await axiosInstance.post(`users/${userId}/contacts`,{...contactObj,displayPicture})
   return res.data;
}

const EditContact = async ({userId,contactId,finalData}) =>{
  if(finalData.updatedImg){
    const displayPicture = await uploadImg(finalData.updatedImg)
    let res = await axiosInstance.put(`/users/${userId}/contacts/${contactId}`,{name:finalData.name,displayPicture})
    return res.data;
  }else{
    let res = await axiosInstance.put(`/users/${userId}/contacts/${contactId}`,{...finalData})
    return res.data;
  }
}

const DeleteContact = async ({userId,contactId}) =>{
  let res = await axiosInstance.delete(`users/${userId}/contacts/${contactId}`)
  return res.data;
}

const GetAllContacts = async () =>{
   let res = await axiosInstance.get(`contacts`)
   return res.data;
}

export {AddContact,EditContact,DeleteContact,GetAllContacts,optionsArray}