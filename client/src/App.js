import React, {useContext, useState} from "react"
import {BrowserRouter,Route,Switch} from "react-router-dom"
import { AuthContext } from "./components/context/authContext";
import { LightModeContext } from "./components/context/lightModeContext";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/navbar/Navroute";
import ContactsPage from "./components/contacts/contactpage/contactsPage";
import Home from "./components/home/Home"
import PageNotFound from "./components/utils/pagenotfound/pageNotFound"
import './App.css';

const App = () => {
  const {token} = useContext(AuthContext)
  const {isDark} = useContext(LightModeContext)
  return (
    <BrowserRouter>
      <div className="App" style={{background:isDark?"#000":"#fff",color:isDark?"#fff":"#000"}}>
        <Navbar />
        <Switch>
          <Route path="/" exact strict render={()=>token?<ContactsPage isDark={isDark} />:<Home />} />
          <Route path="/login" exact strict component={Login} />
          <Route path="/register" exact strict component={Register} />
          <Route path="*" exact strict component={PageNotFound} />
        </Switch>  
      </div>
    </BrowserRouter>
  );
}

export default App;
