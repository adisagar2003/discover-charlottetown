import { IoMdHeart } from "react-icons/io";
import "./public/index.css";

export default function LocationCard() {
  return (
    <div className="location-card">
        <div className="location-image">
            <img src={"https://photographylife.com/wp-content/uploads/2023/05/Nikon-Z8-Official-Samples-00002.jpg"} />
        </div>
        <div className="location-content">
            <div className="location-title-and-desc">
                <div className="location-title">
                    Title
                </div>
                <div className="location-desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia veritatis atque corporis dignissimos enim inventore, similique ea totam corrupti, quis iste error quo.
                </div>
            </div>
            <div className="location-buttons">
                <button>
                    Visit
                </button>
                <div className="location-likes">
                    <button><IoMdHeart /></button>
                    <span>0</span>
                </div>
            </div>
        </div>
    </div>
  )
}