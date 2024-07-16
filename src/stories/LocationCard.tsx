import { IoMdHeart } from "react-icons/io";
import "./public/index.css";

interface LocationCardProps {
  title: string,
  description: string,
  likes: number,
  image: string  
}

export default function LocationCard(Props: LocationCardProps) {
  return (
    <div className="location-card">
        <div className="location-image">
            <img src={Props.image} />
        </div>
        <div className="location-content">
            <div className="location-title-and-desc">
                <div className="location-title">
                {Props.title.length > 10 ? `${Props.title.slice(0,10)}...`:Props.title}
                </div>
                <div className="location-desc">
                    {Props.description.length > 100 ? `${Props.description.slice(0,100)}...`:Props.description}
                </div>
            </div>
            <div className="location-buttons">
                <button>
                    Visit
                </button>
                <div className="location-likes">
                    <button><IoMdHeart /></button>
                    <span>{Props.likes}</span>
                </div>
            </div>
        </div>
    </div>
  )
}