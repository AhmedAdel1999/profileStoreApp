import React, { useState , createContext } from 'react';
export const AuthContext = createContext();
export const AuthProvider = (props) =>{
    const token = JSON.parse(localStorage.getItem("token"))
    const userData = JSON.parse(localStorage.getItem("userData"))

    let state={
        token,
        userData,
    }
    return(
        <AuthContext.Provider value={{...state}}>
            {props.children}
        </AuthContext.Provider>
    );
}