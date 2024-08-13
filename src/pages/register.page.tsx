import { useEffect, useState } from "react"
import "./login.page.css"
import axios from "axios";
import api from "../utils/api";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../context/store";
import UploadWidget from "../stories/UploadWidget";
import Cookies from "universal-cookie";

export default function RegisterPage() {
  const cookies = new Cookies();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);
  const [,  setPublicId] = useState("");
  const [cloudName] = useState("dvdwmixyk");
  const [uploadPreset] = useState("q9bcphea");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
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
//   const cld = new Cloudinary({
//     cloud: {
//       cloudName
//     }
//   });
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const myImage = cld.image(publicId);

  useEffect(()=> {
    setImageUrl(localStorage.getItem("profilePicture")) ;
  }, []);

  const registerUser = () => {
    if (username != "" || password != "" || confirmPassword != "" || email != "") {
        // register user inside
        setRegisterLoading(true);
        if (password == confirmPassword) {
            // confirm password 
            // register the user
            if (imageUrl != null) {
                localStorage.removeItem("profilePicture");
                axios.post(`${api}/api/user`, {
                    "username":username, 
                    "password": password,
                    "profilePicture": `${imageUrl}`,
                    "email": email
                }).then(() => {
                    setRegisterLoading(false);
                    axios.post(`${api}/api/auth/login`, {
                        "username": username,
                        "password": password
                    }).then((res)=>{
                        dispatch(login(res.data));                
                        cookies.set('token', res.data.token);
                        navigate('/');
                    }).catch(err => {
                        if (err.response.status == 400) {
                            alert("Incorrect username or password");
                        }
                    });
        
                });
            } else {
                alert('insert an image');
            }   
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
                {/* <AdvancedImage
                    style={{maxWidth: "100%"}}
                    cldImg={myImage}
                    plugins={[responsive(), placeholder()]}
                    >
                </AdvancedImage> */}
            </div>
            <UploadWidget uwConfig={uwConfig} setPublicId={setPublicId} setResultUrl={setImageUrl} />
            <button onClick={registerUser} className="login-button">
                {registerLoading ? <ClipLoader />:"Register"} 
            </button>
        </div> 
    </div>
  )
}   