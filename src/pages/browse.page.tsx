import { MdSearch } from "react-icons/md";
import "./browse.page.css";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../utils/api";
import LocationCard from "../stories/LocationCard";

export default function BrowsePage() {
  const [isLoadingLocations, setLoadingLocations] = useState(true);
  const [search, setSearch] = useState("");
  const [locations, setLocation] = useState([]);
  useEffect(()=> {
    try {
        const location =axios.get(`${api}/api/location/4`).then((res)=>{
            setLocation(res.data.data);
            console.log(locations);
        });

        setLoadingLocations(false);
    }
    catch (err) {
        setLocation([]);
        setLoadingLocations(false);
    }
  }, []);

  return (
    <div className="browse-page">
        <div className="browsepage-content">
            <div className="searchbox">
                <div className="searchbar">
                    <input type="text" onChange={e=>setSearch(e.target.value)} placeholder="Search here..."/>
                <MdSearch />
            </div>
            </div>
            {isLoadingLocations &&  <div className="skeleton">
                <SkeletonTheme duration={1} height={20} baseColor="#fff" highlightColor="#999">
                    <Skeleton count={14} />
                </SkeletonTheme>
            </div>}
            {!isLoadingLocations && locations.length > 0 && (
                <div className="browse-locations">
                    {locations.map((location) => {
                        return (<LocationCard title={location.title} description={location.description} likes={location.likes} image={location.image} />)
                    })}
                </div>
            )}
        </div>
    </div>
  )
}