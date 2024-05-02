import React, { useState , createContext } from 'react';
export const AuthContext = createContext();
export const AuthProvider = (props) =>{
    const isLogged = JSON.parse(localStorage.getItem("token"))
    const user = JSON.parse(localStorage.getItem("userData"))
    const [token,setToken] = useState(isLogged?isLogged:null)
    const[userData,setUserData] = useState(user?user:null)

    let state={
        token,
        userData,
        setToken,setUserData
    }
    return(
        <AuthContext.Provider value={{...state}}>
            {props.children}
        </AuthContext.Provider>
    );
}