import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch,faTimes } from '@fortawesome/free-solid-svg-icons'
import "./search.css"

const SearchBox = ({search,setSearch}) =>{
    return(
        <div className="searchbox">
            <div className="searchicon"><FontAwesomeIcon icon={faSearch} /></div>
            <input  placeholder="Search For Contact Name OR Profile Link.."
             type="text" value={search} onChange={(e)=>setSearch(e.target.value)} />
            {search.length>0 &&
            <FontAwesomeIcon onClick={()=>setSearch('')} icon={faTimes} />}
        </div>
    )
}
export default SearchBox