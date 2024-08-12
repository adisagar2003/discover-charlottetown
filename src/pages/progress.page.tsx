import "./progress.page.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useAppSelector } from "../context/store";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../utils/api";

ChartJS.register(ArcElement, Tooltip, Legend);

function ProgressPage() {
  
  // const data = {
  //   labels: [
  //     'Unexplored areas',
  //   ],
  //   datasets: [{
  //     label: '',
  //     data: [80,20],
  //     backgroundColor: [
  //       'rgb(126, 178, 234)',
  //       'rgb(77, 216, 238)'
  //     ],
  //     hoverOffset: 1
  //   }]
  // };

  const userData:(any) = useAppSelector((state) => state.value);
  const [locationLength, setLocationLength] = useState(0);
  const [dynamicUserData, setDynamicUserData] = useState<any>(null);

  useEffect(()=>{
    if (userData) {
      // load user data from the id provided
      axios.get(`${api}/api/user/${userData.user.id}`).then((response)=>{
        setDynamicUserData(response.data.response);
    });
      if (dynamicUserData!=null) {
        setLocationLength(dynamicUserData.locations.length);
      }
    } 
  }, [userData, dynamicUserData])
  return (
    <div className="main" >
      {/* <div className="progress-container">
        <div className="progress-piechart">
          <Pie data={data} />
        </div>
        <div className="progress-recommendations">
          <h2>Recommendations</h2>
          <div className="card-container">
              <LocationCard title="Azteca" likes={10} image="https://www.tourismpei.com/sites/default/files/images/Azteca%20Mexican%20Restaurant.jpg" description="This restaurant provides you with nice food and a place to rest after a long walk around Charlottetown City Hall. Try perfectly cooked Tacos al Pastor and good enchiladas. You can have tasty tres leches cakes at Azteca Mexican Restaurant." />
              <LocationCard title="Azteca" likes={30} image="https://www.tourismpei.com/sites/default/files/images/Azteca%20Mexican%20Restaurant.jpg" description="This restaurant provides you with nice food and a place to rest after a long walk around Charlottetown City Hall. Try perfectly cooked Tacos al Pastor and good enchiladas. You can have tasty tres leches cakes at Azteca Mexican Restaurant." />
              <LocationCard title="Azteca" likes={40} image="https://www.tourismpei.com/sites/default/files/images/Azteca%20Mexican%20Restaurant.jpg" description="This restaurant provides you with nice food and a place to rest after a long walk around Charlottetown City Hall. Try perfectly cooked Tacos al Pastor and good enchiladas. You can have tasty tres leches cakes at Azteca Mexican Restaurant." />
          </div>
        </div>
      </div> */}
      <div className="progress-container">
        <div className="progress-content">
          <div className="progress-activity">
            <div className="progress-heading">
                <span>
                  Activity
                </span>
                <span className="year">
                  2024  
                </span>
            </div>
            <div className="progress-profile">
                <div className="progress-profile-picture">
                  <img src={dynamicUserData.profilePicture} alt="" />
                </div>
                <div className="progress-profile-contents">
                  <span className="progress-profile-name">
                    {dynamicUserData.username}
                  </span>
                  <span>
                    {locationLength} locations visited
                  </span>
                </div>  
                <div className="progress-analytics">
                  <div className="progress-bar">
        
                  </div>
                </div>
            </div>
            <div className="progress-bar">
                <div style={{width:"20%" }}  className="progress-bar-bg">
                  
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressPage