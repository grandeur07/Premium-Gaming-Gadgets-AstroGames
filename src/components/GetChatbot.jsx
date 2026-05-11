import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";

import "../styles/GetChatbot.css";

const GadgetChatbot = ({ products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 What gadget are you looking for today?" }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const navigate = useNavigate();
  const { addToCart, removeFromCart, cart } = useContext(CartContext);

  const messagesEndRef = useRef(null);

  const img_url = "https://mathiasoryx.alwaysdata.net/static/images/";

  const isInCart = (id) => {
    return cart.some(item => item.product_id === id);
  };

  // 🔍 search
  const searchProducts = (query) => {
    return products.filter(p =>
      p.product_name.toLowerCase().includes(query.toLowerCase())
    );
  };

  // auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // typing simulation
    setTyping(true);

    setTimeout(() => {
      const results = searchProducts(input);

      let botReply;

      if (results.length > 0) {
        botReply = {
          sender: "bot",
          text: `I found ${results.length} product(s) for "${input}" 👇`,
          products: results
        };
      } else {
        botReply = {
          sender: "bot",
          text: `No results for "${input}" 😢 Try another name`
        };
      }

      setMessages(prev => [...prev, botReply]);
      setTyping(false);
    }, 800);
  };

  return (
    <>
      {/* 💬 Floating Button */}
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        💬
      </button>

      {/* 💬 Chat Window */}
      {isOpen && (
        <div className="chatbot-container">

          {/* HEADER */}
          <div className="chatbot-header">
            <span>Shop Assistant</span>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>

          {/* MESSAGES */}
          <div className="chatbot-messages">

            {messages.map((msg, i) => (
              <div key={i}>

                {/* USER */}
                {msg.sender === "user" && (
                  <div className="user-msg">{msg.text}</div>
                )}

                {/* BOT TEXT */}
                {msg.sender === "bot" && msg.text && (
                  <div className="bot-msg">{msg.text}</div>
                )}

                {/* 🛒 HORIZONTAL PRODUCT SCROLL */}
                {msg.sender === "bot" && msg.products && (
                  <div className="chat-scroll">

                    {msg.products.slice(0, 6).map(product => (
                      <div className="chat-card" key={product.product_id}>

                        <img
                          src={img_url + product.product_photo}
                          alt={product.product_name}
                        />

                        <h6>{product.product_name}</h6>

                        <p>KES {product.product_cost}</p>

                        <button
                          className="btn btn-sm btn-dark w-100"
                          onClick={() =>
                            navigate("/mpesapayement", { state: { product } })
                          }
                        >
                          Buy
                        </button>

                        <button
                          className="btn btn-sm btn-outline-dark w-100 mt-1"
                          onClick={() =>
                            isInCart(product.product_id)
                              ? removeFromCart(product.product_id)
                              : addToCart(product)
                          }
                        >
                          {isInCart(product.product_id)
                            ? "Remove"
                            : "Add to Cart"}
                        </button>

                      </div>
                    ))}


                  </div>
                )}

              </div>
            ))}

            {/* typing */}
            {typing && <div className="bot-msg">Typing...</div>}

            <div ref={messagesEndRef}></div>

          </div>

          {/* INPUT */}
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Search gadgets..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>

        </div>
      )}
    </>
  );
};

export default GadgetChatbot;