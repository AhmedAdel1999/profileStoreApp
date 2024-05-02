import React, {useContext } from "react"
import {BrowserRouter,Route,Routes} from "react-router-dom"
import { AuthContext } from "./context/authContext";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Navbar from "./components/navbar/Navroute";
import ContactsPage from "./pages/contactpage/contactsPage";
import Home from "./pages/home/Home"
import PageNotFound from "./pages/pagenotfound/pageNotFound"
import './App.css';

const App = () => {
  const {token} = useContext(AuthContext)

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={token?<ContactsPage />:<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>  
      </div>
    </BrowserRouter>
  );
}

export default App;
