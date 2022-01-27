import React, { useState , createContext } from 'react';
export const LightModeContext = createContext();
export const LightModeProvider = (props) =>{
    const[isDark,setMode]=useState(false)
    let state={
        isDark,
        setMode,
    }
    return(
        <LightModeContext.Provider value={{...state}}>
            {props.children}
        </LightModeContext.Provider>
    );
}