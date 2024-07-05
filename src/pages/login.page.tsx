import "./login.page.css";

function LoginPage() {
  return (
    <div className='login-layout'>
        <div className='login-card'>
            <h1 className="login-heading">
                Login
            </h1>
            <div className="login-form">
                <input type="text" name="username" placeholder="username" />
                <input type="password" name="password" id="" placeholder="password" />
            </div>
            <button className="login-button">
                Login
            </button>
        </div>
    </div>
  )
}

export default LoginPage