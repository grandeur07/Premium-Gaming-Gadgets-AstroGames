import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import "../styles/Addgadget.css";

const Addgadget = () => {
  //declairing state variables
  const[product_name,setProductName] = useState("")
  const[product_description,setProductDescription] = useState("")
  const[product_category,setProductCategory] = useState("")
  const[product_cost,setProductCost] = useState("")
  const[product_photo,setProductPhoto] = useState("")


// Status messages
const[loading,setLoading] = useState("")
const[success,setSuccess] = useState("")
const[error,setError] = useState("")


// function to add submit
const handleSubmit = async (e) => {
  e.preventDefault()

  setLoading("Uploading product...")
  setSuccess("")
  setError("")

  try {
    const formData = new FormData()
    formData.append("product_name", product_name)
    formData.append("product_description", product_description)
    formData.append("product_category", product_category)
    formData.append("product_cost", product_cost)
    formData.append("product_photo", product_photo)

    const response = await axios.post(
      "https://mathiasoryx.alwaysdata.net/api/add_product",
      formData
    )

    setSuccess(response.data.success)

    // clear form
    setProductName("")
    setProductDescription("")
    setProductCategory("")
    setProductCost("")
    setProductPhoto(null)

  } catch (err) {
    setError(err.message)
  } finally {
    setLoading("")
  }
}

  return (
  <div className="add-page">

    <div className="add-card">

      <h1 className="add-title">Upload Gadget</h1>

      <Link to="/" className="nav-btn">
        GET ALL GADGETS
      </Link>

      {/* MESSAGES */}
      {loading && <p>{loading}</p>}
      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Product Name"
          value={product_name}
          onChange={(e) => setProductName(e.target.value)}
          required
        />

        <textarea
          placeholder="Product Description"
          value={product_description}
          onChange={(e) => setProductDescription(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Product Cost"
          value={product_cost}
          onChange={(e) => setProductCost(e.target.value)}
          required
        />

        <select
          onChange={(e) => setProductCategory(e.target.value)}
          required
        >
          <option value="">Choose Category</option>
          <option value="Console">Console</option>
          <option value="Controller">Controller</option>
          <option value="Ps4 Game">Ps4 Game</option>
          <option value="Other Accessory">Other Accessory</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProductPhoto(e.target.files[0])}
          required
        />

        <button className="add-btn">
          Add Product
        </button>

      </form>

    </div>

  </div>
)
}

export default Addgadget