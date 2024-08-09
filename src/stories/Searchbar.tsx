import { useState } from "react"
import { MdSearch } from "react-icons/md"
import useDebounce from "../hooks/useDebounce";
import List from "./List.stories";

function Searchbar() {
  const [searchcontent, setSearchContent] = useState("");
  const searchData = useDebounce(searchcontent);
  return (
    <div className="searchbar-container">
      <div className="searchbar-header">
        <div className="searchbar-heading">
          <h1>Search</h1>
         
        </div>
        <div className="searchbar">
          <MdSearch color={"#c0c0c0"}  />
          <input type="text" onChange={e=>setSearchContent(e.target.value)} placeholder="Search here..."/>
        </div>
      </div>
      <div className="searchbar-content">
        <List searchValue={searchData} />
      </div>
    </div>
    
  )
}

export default Searchbar