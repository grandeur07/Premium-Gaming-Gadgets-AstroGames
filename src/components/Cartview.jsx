  import React, { useContext } from "react";
  import { CartContext } from "./CartContext";
  import { useState } from 'react'
  import axios from 'axios';
  import "../styles/Cartview.css";



  const Cartview = () => {
    const { cart, removeFromCart, getTotal } = useContext(CartContext);

    // MPESA PAYEMENT
    // DECLAIRING STATE VARIABLES
    const[phone,setPhone] = useState("")
    const[messages,setMessages] = useState("")
    const[error,seterror] = useState("")


    // function for mpesa payement
  const handlesubmit = async(e)=>{
  e.preventDefault()

  setMessages("Please wait as we process the transaction")
  seterror("")

  try {

    const formData = new FormData()

    // FORMAT PHONE
    let formattedPhone = phone.trim()

    if (formattedPhone.startsWith("0")) {
      formattedPhone = "254" + formattedPhone.substring(1)
    }

    // SEND DATA
    formData.append("phone", formattedPhone)
    formData.append("amount", getTotal())

    const response = await axios.post(
      "https://modcom2026.alwaysdata.net/api/mpesa_payment",
      formData
    )

    setMessages(response.data.message)

  } catch (error) {

    console.log(error.response)

    seterror(
      error.response?.data?.message || error.message
    )
  }
}


    const img_url = "https://mathiasoryx.alwaysdata.net/static/images/";



    return (
  <div className="cart-page">

    <h2 className="cart-title">Your Cart</h2>

    {/* PRODUCTS */}
    <div className="cart-grid">

      {cart.map((product) => (
        <div className="cart-card" key={product.product_id}>

          <img
            src={img_url + product.product_photo}
            alt={product.product_name}
            className="product_img"
          />

          <h5>{product.product_name}</h5>

          <p>{product.product_description}</p>

          <b className="text-danger">
            KES {product.product_cost}
          </b>

          <button
            className="btn-remove"
            onClick={() => removeFromCart(product.product_id)}
          >
            Remove
          </button>

        </div>
      ))}
    </div>

    {/* CHECKOUT */}
    <div className="checkout-box">

      {cart.length === 0 && (
        <p className="empty">Your cart is empty</p>
      )}

      <div className="total">
        Total: KES {getTotal()}
      </div>

      <form onSubmit={handlesubmit}>
        <input
          type="tel"
          placeholder="Enter Phone Number (e.g 0712345678)"
          onChange={(e) => setPhone(e.target.value)}
        />

        <button className="pay-btn">
          Make Payment
        </button>
      </form>

      {/* STATUS */}
      <p style={{ color: "green" }}>{messages}</p>
      <p style={{ color: "red" }}>{error}</p>

    </div>

  </div>
)
  };

  export default Cartview;