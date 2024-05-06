import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field , ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock,faSignInAlt,faAt } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import axiosInstance from "../../utils/backendUrl";
import { Ring } from "react-cssfx-loading";
import ErrorMsg from "../../utils/errorMsg";
import * as Yup from "yup";
import "./auth.css"


const Login = () => {

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
    let isExist = false
    let userId
    let username
    try{
      const response = await axiosInstance.get("/users")
      const data = await response.data
      if(data.length){

        for(let i=0; i<data.length; i++){
            if(data[i].email===values.email && data[i].password===values.password){
                isExist=true
                 userId=data[i].id
                 username=data[i].displayName
                break;
            }
        }

        if(isExist){
          localStorage.setItem("token",JSON.stringify(Math.random().toString(36).slice(2)))
          localStorage.setItem("userData",JSON.stringify({...values,id:userId,displayName:username}))
          setToken(JSON.parse(localStorage.getItem("token")))
          setUserData(JSON.parse(localStorage.getItem("userData")))
          setIsSuccess(true)
        }else{
          throw new Error("user not found or password don,t match")
        }

      }else{
        throw new Error("User Not Found")
      }
    }catch(error){
        setError(error.message)
        setIsLoading(false)
    }
}
  const schema = () =>{
    const schema = Yup.object().shape({
      email:Yup.string().email("email must be like this example@gmail.com").required("Required"),
      password:Yup.string().min(6, 'Too Short!').required("Required"),
    })
    return schema
  }

  return (
    <div className="auth">
      <div className="auth-content">
        <h3 className="auth-header">
          <FontAwesomeIcon icon={faSignInAlt} />
          Login Form
        </h3>
        <div>
          {error&& <ErrorMsg ErrMsg={error} />}
        </div>
        <Formik 
          initialValues={{
          email:"ahmed@gmail.com",
          password:"ahmed123"
          }}
          onSubmit={onSubmit}
          validationSchema={schema}
        >
          <Form>
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
                <span><FontAwesomeIcon icon={faSignInAlt} /></span>
                <span>Login</span>
                {
                  isLoading&&
                  <Ring width={"25px"} height={"25px"} color="#fff" />
                }
              </button>
              <p>
                Dont have an account?
                <Link to="/register">Register</Link>
              </p>
              
            </div>
          </Form>
        </Formik>
        </div>
    </div>
  );
}

export default Login;
