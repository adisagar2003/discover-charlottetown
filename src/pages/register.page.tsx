import React from 'react'
import "./login.page.css"
export default function RegisterPage() {
  return (
    <div className='login-layout'>
        <div className='login-card'>
            <h1 className="login-heading">
                Register
            </h1>
            <div className="login-form">
                <input type="text" name="username" placeholder="username" />
                <input type="password" name="password" id="" placeholder="password" />
                <input type="password" name="confirmPassword" id="" placeholder="confirm password" />
                <input type="text" name="email" id="" placeholder="Email" />
                <input accept=".png,.jpg,.jpeg" type="file" name="profilePicture" id="" placeholder="password" />
            </div>
            <button className="login-button">
                Login 
            </button>
        </div>
    </div>
  )
}   