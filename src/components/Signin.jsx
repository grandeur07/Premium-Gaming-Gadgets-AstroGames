import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../styles/Signin.css";



const Signin = () => {
  //Declairing state variables
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")

  // Status messages
  const[loading,setLoading] = useState("")
  const[error,setError] = useState("")
  const[success,setSuccess] = useState("")


  // Navigation
  const navigate = useNavigate()
  // Function to sign in
const handleSignin = async(e) =>{
  e.preventDefault()
  setLoading("Please wait...")
   try{
    // Retrieveing user details
    const formData = new FormData();
    formData.append("email",email)
    formData.append("password", password)

    // Adding base url
    const response = await axios.post("https://mathiasoryx.alwaysdata.net/api/signin",formData)
    if(response.data.user){
      setSuccess(response.data.message)

      // Saving user in local storage
      setLoading("  ")
      localStorage.setItem("user",JSON.stringify(response.data.user))
      window.location.href="/"
    
    }else{
      setError(response.data.message)
      setLoading("")
    }
   }catch (error){
    setError(error.message)
   }
}


  return (
  <div className="auth-page">

    <div className="auth-card">

      <h1 className="auth-title">Login to your Account</h1>

      {/* STATUS MESSAGES */}
      {loading && <p className="auth-loading">{loading}</p>}
      {success && <p className="auth-success">{success}</p>}
      {error && <p className="auth-error">{error}</p>}

      <form onSubmit={handleSignin}>

        <input
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="auth-btn">
          Sign In
        </button>

      </form>

      <Link to="/Signup" className="auth-link">
        Don’t have an account? Sign up
      </Link>

    </div>

  </div>
)
}

export default Signin