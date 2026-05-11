import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useContext } from "react";
import { CartContext } from "./CartContext";

import blackops7 from '../images/blackops7.jpg'
import fc26 from '../images/fc26.webp'
import gta6 from '../images/gta6.jpg'
import ps5prwallpaper2 from '../images/ps5prowallpaper2.webp'
import psplus from '../images/psplus.png'
import Controllers from '../images/Controllers.jpg'
import GamingConsole from '../images/GamingConsole.jpg'
import OtherAccessory from '../images/OtherAccessory.jpg'
import PS4Games from '../images/PS4Games.jpg'
import GadgetChatbot from "./GetChatbot";

import "../styles/Getgadget.css";

const Getgadget = () => {

  // State variables
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("") // no default
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const img_url = "https://mathiasoryx.alwaysdata.net/static/images/"

  // OPTIONAL: category images (replace with your own)
  const categoryImages = {
    "Console": GamingConsole,
    "Controller": Controllers,
    "Ps4 Game": PS4Games,
    "Other Accessory": OtherAccessory
  }

  // Fetch products
  const getProducts = async () => {
    setLoading("Please wait as we retrieve products...")

    try {
      const response = await axios.get("https://mathiasoryx.alwaysdata.net/api/get_product_details")

      setProducts(response.data)

      // Extract unique categories (NO "All")
      const uniqueCategories = [...new Set(
        response.data
          .map(item => item.product_category)
          .filter(cat => cat && cat.trim() !== "")
      )]

      setCategories(uniqueCategories)

      setLoading("")
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  // FILTER ONLY WHEN CATEGORY CLICKED
  useEffect(() => {
    let filtered = []

    if (selectedCategory) {
      filtered = products.filter(
        product => product.product_category === selectedCategory
      )

      if (searchTerm.trim() !== "") {
        filtered = filtered.filter(product =>
          product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.product_description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }
    }

    setFilteredProducts(filtered)
  }, [selectedCategory, searchTerm, products])

const { addToCart,removeFromCart, cart } = useContext(CartContext)

const [toast, setToast] = useState("")



const isInCart = (id) => {
  return cart.some(item => item.product_id === id)
}

  return (
    <div className='text-center'>

      {toast && (
        <div className="alert alert-success text-center m-3">
          {toast}
        </div>
      )}
      
       {/* cart icon */}
        <div className="d-flex justify-content-end p-2">
        <button className="cartbutton position-relative" onClick={() => navigate("/cart")}>
          🛒 Cart

          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {cart.length}
          </span>
        </button>

      </div>

      {/* Carousel section */}
          <section className="hero-section">

            <div className="carousel slide carousel-hover" id="mycarousel" data-bs-ride="carousel">
              
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={blackops7} className="d-block w-100 hero-img " alt='cod black ops' />
                </div>

                <div className="carousel-item">
                  <img src={fc26} className="d-block w-100 hero-img" alt='eafc26' />
                </div>

                <div className="carousel-item">
                  <img src={gta6} className="d-block w-100 hero-img" alt='rockstar games'/>
                </div>

                <div className="carousel-item">
                  <img src={ps5prwallpaper2} className="d-block w-100 hero-img" alt='ps5 wallpaper'/>
                </div>

                <div className="carousel-item">
                  <img src={psplus} className="d-block w-100 hero-img" alt='playstation plus'/>
                </div>
              </div>

            </div>

            {/* overlay */}
            <div className="hero-overlay">
              <h1>Premium Gaming Gadgets</h1>
              <p>Shop consoles, Controllers, Games, and Accessories at the best prices.</p>

            </div>

          </section>


      <div>
         

        {/* SEARCH BAR */}
        <div className="row mt-3">
          <div className="col-md-6 mx-auto">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div> 
      </div>
      

      {/* CATEGORY BUTTONS (LARGE + IMAGE SUPPORT) */}
      <div className="row mt-4">
  {categories.map((cat, index) => (
    <div className="col-md-3 col-6 mb-3" key={index}>

      <div
        onClick={() => setSelectedCategory(cat)}
        className={`category-tile ${selectedCategory === cat ? "active-cat" : ""}`}
      >

        {categoryImages[cat] && (
          <img
            src={categoryImages[cat]}
            className="category-img"
            alt={cat}
          />
        )}

        <div className="category-overlay"></div>

        <h5 className="category-text">{cat}</h5>

      </div>

    </div>
  ))}
</div>

      {/* PRODUCTS (ONLY AFTER CATEGORY CLICK) */}
      <div className='row mt-4'>
        <h3>Available products</h3>

        {!selectedCategory && (
          <p className="text-center text-muted">Select a category to view products</p>
        )}

        {loading && (
          <div className="text-center my-4">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2">Please wait, we are retrieving the products...</p>
          </div>
        )}

        {error}


        {/* product cards */}
        {filteredProducts.map((product) => (
          <div className='col-md-4 mb-4' key={product.product_id}>
            <div className='card shadow p-3 product-card' >
              <img
                src={img_url + product.product_photo}
                alt={product.product_name}
                className='main-product-img'
              />
              {/* product card body begins here */}
              <div className='card-body text-left'>

                <p className='text-muted'>{product.product_description}</p>

                <h5>{product.product_name}</h5>
               

                <b className='text-success'>KES {product.product_cost}</b>

                <button
                  className='btn btn-dark mt-2 w-100'
                  onClick={() => navigate("/mpesapayement", { state: { product } })}
                >
                  Purchase now
                </button>

                {/* Add to cart button */}
                <button
                  className={`cartbutton mt-2 w-100 ${
                    isInCart(product.product_id) ? "remove" : "add"
                  }`}
                  onClick={() => {
                    if (isInCart(product.product_id)) {
                      removeFromCart(product.product_id)
                      setToast("Removed from cart ❌")
                    } else {
                      addToCart(product)
                      setToast("Added to cart ✅")
                    }

                    setTimeout(() => setToast(""), 1500)
                  }}
                >
                  {isInCart(product.product_id) ? "Remove from Cart" : "Add to Cart"}
                </button>
                




              </div>
            </div>
          </div>
        ))}
      </div>

        <GadgetChatbot products={products} />

    </div>
  )
}

export default Getgadget


// 
