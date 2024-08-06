import { useEffect, useState } from 'react'
import { useAppSelector } from '../context/store';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import api from '../utils/api';

export default function Progress() {
    const [percentage, setPercentage] = useState(0);
  // check if the user is logged in or not

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userData:(any) = useAppSelector((state)=>state.value);
 
  // Calculate percentage of progress calculated
  useEffect(()=>{
    axios.get(`${api}/api/progress`, {withCredentials: true}).then((response)=>{
        setPercentage(response.data.response);
        
    }).catch(err=>console.log(err));
  },[]);

  return (
    <div className='progress-ring'>
        {userData?.user && <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
            // Rotation of path and trail, in number of turns (0-1)
            rotation: 0.25,
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'round',
            // Text size
            textSize: '12px',
            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,
            // Can specify path transition in more detail, or remove it entirely
            // pathTransition: 'none',
            // Colors
            pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
            textColor: '#f88',
            trailColor: '#d6d6d6',
            backgroundColor: '#3e98c7',
  })}
/>}

        ;
    </div>
  )
}