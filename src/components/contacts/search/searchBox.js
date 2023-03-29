import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faTimes } from '@fortawesome/free-solid-svg-icons'
import "./search.css"

const SearchBox = ({search,setSearch,isDark}) =>{
    return(
        <div className="searchbox">
            <FontAwesomeIcon icon={faSearch} />
            <input style={{background:isDark?"#000":"#fff",color:isDark?"#fff":"#000"}} placeholder="Search for contact name or profile link"
             type="text" value={search} onChange={(e)=>setSearch(e.target.value)} />
            {search.length>0 &&
            <FontAwesomeIcon onClick={()=>setSearch('')} icon={faTimes} />}
        </div>
    )
}
export default SearchBox