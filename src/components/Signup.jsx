import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../styles/Signin.css";

const Signup = () => {
// declaring state variables
const[username,setUsername] = useState("")
const[email,setEmail] = useState("")
const[phone,setPhone] = useState("")
const[password,setPassword] = useState("")

const navigate = useNavigate()

// status messages
const[loading,setLoading] = useState("")
const[error,setError] = useState("")
const[success,setSuccess] = useState("")

// funtion to signup
const submitSignupDetails =async(e)=>{
  e.preventDefault()
  setLoading("please wait ...")
  try {
    const formData= new FormData();
    formData.append("username",username);
    formData.append("email",email);
    formData.append("phone",phone);
    formData.append("password",password);

    // adding base url

  const response = await axios.post("https://mathiasoryx.alwaysdata.net/api/signup",formData)

  
  setSuccess(response.data.success)
  setLoading("")

  // reset Values
  setPhone("")
  setUsername("")
  setPassword("")
  setEmail("")

  } catch (error) {
    setError(error.message)
  }
}


return (
  <div className="auth-page">

    <div className="auth-card">

      <h1 className="auth-title">Create Account</h1>

      {/* STATUS MESSAGES */}
      {loading && (
      <div className="auth-loading">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Please wait, we are Signing you up...</span>
        </div>
        <p>{loading}</p>
      </div>
    )}
      {error && <p className="auth-error">{error}</p>}
      {success && <p className="auth-success">{success}</p>}


      {/* signup form */}
      <form onSubmit={submitSignupDetails}>

        <input
          type="text"
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="Enter Phone"
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="auth-btn" onClick={() => navigate("/signin")}>
          Sign Up
        </button>

      </form>

      <Link to="/signin" className="auth-link">
        Already have an account? Login
      </Link>

    </div>

  </div>
)

}

export default Signup

