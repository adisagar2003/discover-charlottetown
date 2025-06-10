import { useEffect, useState } from "react"
import { MdSearch } from "react-icons/md"
import useDebounce from "../hooks/useDebounce";
import List from "./List.stories";

function Searchbar() {
  const [searchcontent, setSearchContent] = useState("");
  const {debouncedValue, isCleaning} = useDebounce(searchcontent);

  // whenever my search target changes, reset searchData to []
  useEffect(() => {
    console.log(debouncedValue);
  }, [debouncedValue])
  
  return (
    <div className="searchbar-container">
      <div className="searchbar-header">
        <div className="searchbar-heading">
          <h1>Discover Charlottetown</h1>
          <p>Search for places to visit and explore</p>
        </div>
        <div className="searchbar">
          <MdSearch />
          <input 
            type="text" 
            onChange={e => setSearchContent(e.target.value)} 
            placeholder="Search locations, attractions, or activities..."
            value={searchcontent}
          />
        </div>
      </div>
      <div className="searchbar-content">
        <List searchValue={debouncedValue} isDebounceCleaning={isCleaning} />
      </div>
    </div>
  )
}

export default Searchbar