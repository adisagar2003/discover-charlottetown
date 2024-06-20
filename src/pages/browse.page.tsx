import Searchbar from "../stories/Searchbar";
import "./browse.page.css";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function BrowsePage() {
  return (
    <div className="browse-page">
        <div className="browsepage-content">
            <div className="searchbox">
                <Searchbar />
            </div>
            <div className="skeleton">
                <SkeletonTheme duration={1} height={20} baseColor="#fff" highlightColor="#999">
                    <Skeleton count={14} />
                </SkeletonTheme>
            </div>
        </div>
    </div>
  )
}