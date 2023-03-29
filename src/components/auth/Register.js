import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field , ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faUserAlt,faLock,faAt } from '@fortawesome/free-solid-svg-icons'
import axiosInstance from "../utils/backendUrl";
import Load from "../utils/Load";
import ErrorMsg from "../utils/errorMsg";
import * as Yup from "yup";
import "./auth.css"

const Register = () => {
  const[error,setError]=useState(null)
  const[isSuccess,setIsSuccess]=useState(false)
  const[isLoading,setIsLoading]=useState(false)

  useEffect(()=>{
    if(isSuccess){
      window.location.href="/"
    }
  },[isSuccess])

  const onSubmit = async (values)=>{
    setIsLoading(true)
  try {
    let data = await axiosInstance.post("/api/register",values)
    localStorage.setItem("token",JSON.stringify(data.data.token))
    localStorage.setItem("userData",JSON.stringify({username:data.data.displayName,email:data.data.email}))
    setIsSuccess(true)
  } catch (error) {
    setError(error.response.data.error)
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

  if(isLoading){
    return <Load />
  }

  return (
    <div className="auth">
       <div className="auth-account">
        <h3>
          <FontAwesomeIcon icon={faEdit} />
          Create an acount
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
            <div>
              <label>username:</label><br/>
              <div>
                <FontAwesomeIcon icon={faUserAlt} />
                <Field type="text" name="displayName" placeholder="For ex. Ahmed" />
              </div>
              <ErrorMessage name="displayName" component="span" />
            </div>

            <div>
              <label>email:</label><br/>
              <div>
                <FontAwesomeIcon icon={faAt} />
                <Field type="email" name="email" placeholder="For ex. abc@example.com" />
              </div>
              <ErrorMessage name="email" component="span" />
            </div>

            <div>
              <label>password:</label><br/>
              <div>
                <FontAwesomeIcon icon={faLock} />
                <Field type="password" name="password" placeholder="Password must have minmum 6 charachters" />
              </div>
              <ErrorMessage name="password" component="span" />
            </div>
            <div className="submit">
              <p>
                Already have an account?
                <Link to="/login">Login</Link>
              </p>
              <button type="submit" className="submitbutton">
                <span><FontAwesomeIcon icon={faEdit} /></span>
                <span>Register</span>
              </button>
            </div>
          </Form>
        </Formik>
       </div>
    </div>
  );
}

export default Register;
