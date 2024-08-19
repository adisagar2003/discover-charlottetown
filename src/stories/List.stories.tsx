/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import api from "../utils/api";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import LocationMapComponent from "./LocationMapComponent";

function List(props: any) {
  
  const [responseData, setResponseData] = useState<any>([]);
  const [responseLoading, setResponseLoading] = useState(false);

  useEffect(()=> {
    setResponseLoading(false);
  }, []);

  useEffect(()=>{
    setResponseLoading(true);
    if (props.searchValue != "") {
      axios.get(`${api}/api/locationMapSearch/${props.searchValue}`).then((response)=>{
        setResponseData(response.data.response);
        setResponseLoading(false);
    }).catch(()=>{
      setResponseData(false);
    })
    }
    else {
      axios.get(`${api}/api/locationMapSearch/a`).then((response)=>{
        setResponseData(response.data.response);
        setResponseLoading(false);
    }).catch(()=>{
      setResponseData(false);
    })
    }
    
  },[props]);  

  return (
    <div className="List-responseData">
        {responseLoading ? <ClipLoader />: null}

        {!responseLoading && responseData.length != 0 && responseData.map((data: { properties: { name: string; category: string; }; })=>{
            return (<div>
            <LocationMapComponent text={data.properties.name} category={data.properties.category} />
            </div>)
        })}
        
    </div>
  )
}

export default List