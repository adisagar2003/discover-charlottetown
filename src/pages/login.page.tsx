import { useState } from "react";
import "./login.page.css";
import { FadeLoader } from "react-spinners";
import api from "../utils/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../context/store";
import Cookies from 'universal-cookie';
import { userService } from "../services/userService";

function LoginPage() {
  const cookies = new Cookies();
  const [loading, setLoginLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = () => {
        if (username !== "" && password !== "") {
            setLoginLoading(true);
            userService.loginUser({username, password})
                .then((res) => {
                    dispatch(login(res.data));  
                    cookies.set('token', res.data.token);
                    navigate('/');    
                    window.location.reload();        
                })
                .catch(err => {
                    if (err.response?.status === 400) {
                        alert("Incorrect username or password");
                    } else {
                        alert("An error occurred. Please try again.");
                    }
                })
                .finally(() => {
                    setLoginLoading(false);
                });
        } else {
            alert("Please enter both username and password");
        }
  }

  return (
    <div className='login-layout'>
        <div className='login-card'>
            <div className="login-credentials">
                <span>Sample credentials:</span>
                <span>username: user</span>
                <span>password: password</span>
            </div>
            <h1 className="login-heading">
                Login
            </h1>
            <div className="login-form">
                <input onChange={(e)=>setUsername(e.target.value)} type="text" name="username" placeholder="username" />
                <input onChange={(e)=>setPassword(e.target.value)} type="password" name="password" id="" placeholder="password" />
            </div>
            <button onClick={loginUser} className="login-button">
                {loading ?  <FadeLoader height={14} /> : "login" }
            </button>
        </div>
    </div>
  )
}

export default LoginPage