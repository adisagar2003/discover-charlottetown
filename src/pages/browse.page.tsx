import { MdSearch } from "react-icons/md";
import "./browse.page.css";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../utils/api";
import LocationCard from "../stories/LocationCard";
import { Location } from "../models/location.model";
import Searchbar from "../stories/Searchbar";

export default function BrowsePage() {

  return (
    <div className="browse-page">
        <Searchbar />
    </div>
  )
}