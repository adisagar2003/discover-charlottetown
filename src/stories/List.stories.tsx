/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import api from "../utils/api";
import axios from "axios";
import { ClipLoader } from "react-spinners";

function List(props: any) {

  const [responseData, setResponseData] = useState([]);
  const [responseLoading, setResponseLoading] = useState(true);

  useEffect(()=> {
    setResponseLoading(false);
  }, []);

  useEffect(()=>{
    setResponseLoading(true);
    axios.get(`${api}/api/locationMapSearch/${props.searchValue}`).then((response)=>{
        setResponseData(response.data.response);
        setResponseLoading(false);
    })
  },[props]);  

  return (
    <div className="responseData">
        {responseLoading ? <ClipLoader />: null}
        {!responseLoading && responseData.length != 0 && responseData.map((data)=>{
            return (<div>{JSON.stringify(data)}</div>)
        })}

    </div>
  )
}

export default List