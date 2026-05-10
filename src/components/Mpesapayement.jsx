import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import "../styles/Mpesapayement.css";


const Mpesapayement = () => {

// Declairing state variables
const {product} = useLocation().state || {};
const[phone,setPhone] = useState("")
const[messages,setMessages] = useState("")
const[error,seterror] = useState("")

// image url
  const img_url = "https://mathiasoryx.alwaysdata.net/static/images/"


// function for mpesa payement
const handlesubmit = async (e) => {
  e.preventDefault()
  setMessages("Please wait as we process the transaction")
  seterror("")

  try {
    // FORMAT PHONE FIRST
    let formattedPhone = phone.trim()

    if (formattedPhone.startsWith("0")) {
      formattedPhone = "254" + formattedPhone.substring(1)
    }

    // optional safety: remove spaces
    formattedPhone = formattedPhone.replace("")

    const formData = new FormData()
    formData.append("phone", formattedPhone)
    formData.append("amount", product.product_cost)
    console.log(product.product_cost)

    const response = await axios.post(
      "https://modcom2026.alwaysdata.net/api/mpesa_payment",
      formData
    )

    setMessages(response.data.message)

  } catch (error) {
    seterror(error.message)
  }
}





return (
  <div className="mpesa-page">

    <h1 className="mpesa-title">LIPA NA MPESA</h1>

    <div className="mpesa-card">

      <img
        src={img_url + product.product_photo}
        alt={product.product_name}
      />

      <div className="mpesa-name">
        {product.product_name}
      </div>

      <div className="mpesa-price">
        KSH {product.product_cost}
      </div>

      <form onSubmit={handlesubmit}>

        <input
          type="tel"
          placeholder="Enter Phone Number (e.g 0712345678)"
          onChange={(e) => setPhone(e.target.value)}
        />

        <button className="mpesa-btn">
          Make Payment
        </button>

      </form>

      {/* MESSAGES */}
      {messages && (
        <div className="success-msg">
          {messages}
        </div>
      )}

      {error && (
        <div className="error-msg">
          {error}
        </div>
      )}

    </div>

  </div>
)
}

export default Mpesapayement