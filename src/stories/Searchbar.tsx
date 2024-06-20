import { MdSearch } from "react-icons/md"

function Searchbar() {
  return (
    <div className="searchbar">
        <input type="text" placeholder="Search here..."/>
        <MdSearch />
    </div>
  )
}

export default Searchbar