import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field , ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faUserAlt,faLock,faAt } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from "../../context/authContext";
import axiosInstance from "../../utils/backendUrl";
import ErrorMsg from "../../utils/errorMsg";
import { Ring } from "react-cssfx-loading";
import * as Yup from "yup";
import "./auth.css"

const Register = () => {

  const {setToken,setUserData} = useContext(AuthContext)
  const[error,setError]=useState(null)
  const[isSuccess,setIsSuccess]=useState(false)
  const[isLoading,setIsLoading]=useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    if(isSuccess){
      navigate("/")
    }
  },[isSuccess])

  const onSubmit = async (values)=>{
    setIsLoading(true)
    let isExist=false
    try{
      const response = await axiosInstance.get("/users")
      const data = await response.data
      if(data.length>0){
          for(let i=0; i<data.length; i++){
            if(data[i].email===values.email){
              isExist = true
              throw new Error("This User Is Already Registered");
            }
          }

          if(!isExist){
            const response = await axiosInstance.post("/users",values)
            const data = await response.data
            localStorage.setItem("token",JSON.stringify(Math.random().toString(36).slice(2)))
            localStorage.setItem("userData",JSON.stringify({...data}))
            setToken(JSON.parse(localStorage.getItem("token")))
            setUserData(JSON.parse(localStorage.getItem("userData")))
            setIsSuccess(true)
          }
        
      }else{
        const response = await axiosInstance.post("/users",values)
        const data = await response.data
        localStorage.setItem("token",JSON.stringify(Math.random().toString(36).slice(2)))
        localStorage.setItem("userData",JSON.stringify({...data}))
        setToken(JSON.parse(localStorage.getItem("token")))
        setUserData(JSON.parse(localStorage.getItem("userData")))
        setIsSuccess(true)
      }
    }catch(error) {
      setError(error.message)
      setIsLoading(false)
  }
}


  const schema = () =>{
    const schema = Yup.object().shape({
      displayName:Yup.string().min(2, 'Too Short!').required("required"),
      email:Yup.string().email("email must be like this example@gmail.com").required("required"),
      password:Yup.string().min(6, 'Too Short!').required("required"),
    })
    return schema
  }


  return (
    <div className="auth">
       <div className="auth-content">
        <h3 className="auth-header">
          <FontAwesomeIcon icon={faEdit} />
          Register Form
        </h3>
        <div>
          {error&&<ErrorMsg ErrMsg={error} />}
        </div>
        <Formik 
          initialValues={{
          displayName:"",
          email:"",
          password:""
          }}
          onSubmit={onSubmit}
          validationSchema={schema}
        >
          <Form>
            <div className="input-item">
              <label>username:</label>
              <div>
                <span><FontAwesomeIcon icon={faUserAlt} /></span>
                <Field type="text" name="displayName" placeholder="For ex. Ahmed" />
              </div>
              <ErrorMessage name="displayName" component="span" />
            </div>

            <div className="input-item">
              <label>email:</label>
              <div>
                <span><FontAwesomeIcon icon={faAt} /></span>
                <Field type="email" name="email" placeholder="For ex. abc@example.com" />
              </div>
              <ErrorMessage name="email" component="span" />
            </div>

            <div className="input-item">
              <label>password:</label>
              <div>
                <span><FontAwesomeIcon icon={faLock} /></span>
                <Field type="password" name="password" placeholder="Password must have minmum 6 charachters" />
              </div>
              <ErrorMessage name="password" component="span" />
            </div>


            <div className="submit">
              <button type="submit" className="submitbutton">
                <span><FontAwesomeIcon icon={faEdit} /></span>
                <span>Register</span>
                {
                  isLoading&&
                  <Ring width={"25px"} height={"25px"} color="#fff" />
                }
              </button>
              <p>
                Already have an account?
                <Link to="/login">Login</Link>
              </p>
            </div>
          </Form>
        </Formik>
       </div>
    </div>
  );
}

export default Register;
