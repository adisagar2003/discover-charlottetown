import { useEffect, useState } from "react"
import "./login.page.css"
import axios from "axios";
import api from "../utils/api";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../context/store";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // development testing....getting the image to register
  useEffect(() => {
    console.log(profilePicture);
  }, [profilePicture])
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
                <input onChange={e=>setProfilePicture(e.target.value)} accept=".png,.jpg,.jpeg" type="file" name="profilePicture" id="" placeholder="password" />
            </div>
            <button onClick={registerUser} className="login-button">
                {registerLoading ? <ClipLoader />:"Register"} 
            </button>
        </div>
    </div>
  )
}   