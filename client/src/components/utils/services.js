import {faGithubSquare,faFacebookSquare,faTwitterSquare,faYoutubeSquare,faInstagramSquare} from "@fortawesome/free-brands-svg-icons"
import axiosInstance from "./backendUrl";
const optionsArray=[
  {value:'Facebook',icon:faFacebookSquare},
  {value:'Github',icon:faGithubSquare},
  {value:'Twitter',icon:faTwitterSquare},
  {value:'Youtube',icon:faYoutubeSquare},
  {value:'Instagram',icon:faInstagramSquare},
]
const Config = () => {
    return {
      headers: { 'x-auth-token': JSON.parse(localStorage.getItem("token")) },
    };
  };
  
const AddContact = async (contactObj) =>{
   let res = await axiosInstance.post(`/api/contacts`,{...contactObj},Config())
   return res.data;
}
const EditContact = async ({id,finalData}) =>{
  let res = await axiosInstance.patch(`/api/contacts/${id}/name_dp`,{...finalData},Config())
  return res.data;
}
const DeleteContact = async (contactId) =>{
  let res = await axiosInstance.delete(`/api/contacts/${contactId}`,Config())
  return res.data;
}
const AddUrl = async ({urldata,id}) =>{
  let res = await axiosInstance.post(`/api/contacts/${id}/url`,{...urldata},Config())
  return res.data;
}
const EditUrl = async ({urldata,contactid,urlid}) =>{
  let res = await axiosInstance.patch(`/api/contacts/${contactid}/url/${urlid}`,{...urldata},Config())
  return res.data;
}
const DeleteUrl = async ({contactid,urlid}) =>{
  let res = await axiosInstance.delete(`/api/contacts/${contactid}/url/${urlid}`,Config())
  return res.data;
}
const GetAllContacts = async () =>{
   let res = await axiosInstance.get(`/api/contacts`,Config())
   return res.data;
}
export {AddContact,EditContact,DeleteContact,GetAllContacts,AddUrl,EditUrl,DeleteUrl,optionsArray}