import { useEffect, useState } from "react";
import "./login.page.css";
import { FadeLoader } from "react-spinners";
import api from "../utils/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../context/store";

function LoginPage() {

  const [loading, setLoginLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [data, setData] = useState<object>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // login using api
  
  useEffect(()=> {
    console.log(data);
  }, [data])
  const loginUser = () => {
        if (username!= "" || password != "") {
            setLoginLoading(true);
            axios.post(`${api}/api/auth/login`, {
                "username": username,
                "password": password
            }).then((res)=>{
                setLoginLoading(false);
                setData(res.data);
                dispatch(login(res.data));
                
                navigate('/');            
            }).catch(err => {
                if (err.response.status == 400) {
                    alert("Incorrect username or password");
                    setLoginLoading(false);
                }
            });
        }
  }

  return (
    <div className='login-layout'>
        <div className='login-card'>
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