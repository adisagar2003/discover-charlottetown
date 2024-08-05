import { useEffect, useState } from "react"
import "./login.page.css"
import axios from "axios";
import api from "../utils/api";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../context/store";
import UploadWidget from "../stories/UploadWidget";
import {Cloudinary} from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";


export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);
  const [publicId,  setPublicId] = useState("");
  const [cloudName] = useState("dvdwmixyk");
  const [uploadPreset] = useState("q9bcphea");
  const [uwConfig] = useState({
    cloudName,
    uploadPreset
    // cropping: true, //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    // sources: [ "local", "url"], // restrict the upload sources to URL and local files
    // multiple: false,  //restrict upload to a single file
    // folder: "user_images", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
  });
  // for user state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName
    }
  });
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const myImage = cld.image(publicId);

  useEffect(()=>{
    console.log(myImage);
    
  },[]);
  const registerUser = () => {
    if (username != "" || password != "" || confirmPassword != "" || email != "") {
        // register user inside
        setRegisterLoading(true);
        if (password == confirmPassword) {
            // confirm password 
            // register the user
            axios.post(`${api}/api/user`, {
                "username":username, 
                "password": password,
                "profilePicture": `${profilePicture}`,
                "email": email
            }).then(() => {
                setRegisterLoading(false);

            });

            axios.post(`${api}/api/auth/login`, {
                "username": username,
                "password": password
            }).then((res)=>{
                dispatch(login(res.data));
                navigate('/');
            }).catch(err => {
                if (err.response.status == 400) {
                    alert("Incorrect username or password");
                }
            });

        } 
        else {
            // passwords and confirm password dont match
            alert("passwords dont match");
        }
    }
    else {
        alert("Empty credentials");
    }
  }
  return (
    <div className='login-layout'>
        <div className='login-card'>
            <h1 className="login-heading">
                {registerLoading ? <ClipLoader />: "Register"}
            </h1>
            <div className="login-form">
                <input onChange={e=>setUsername(e.target.value)} type="text" name="username" placeholder="username" />
                <input onChange={e=>setPassword(e.target.value)} type="password" name="password" id="" placeholder="password" />
                <input onChange={e=>setConfirmPassword(e.target.value)} type="password" name="confirmPassword" id="" placeholder="confirm password" />
                <input onChange={e=>setEmail(e.target.value)} type="text" name="email" id="" placeholder="Email" />
                <AdvancedImage
                    style={{maxWidth: "100%"}}
                    cldImg={myImage}
                    plugins={[responsive(), placeholder()]}
                    >
                </AdvancedImage>
                <input onChange={e=>setProfilePicture(e.target.value)} accept=".png,.jpg,.jpeg" type="file" name="profilePicture" id="" placeholder="password" />
                <UploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />
            </div>
            
            <button onClick={registerUser} className="login-button">
                {registerLoading ? <ClipLoader />:"Register"} 
            </button>
        </div> 
    </div>
  )
}   