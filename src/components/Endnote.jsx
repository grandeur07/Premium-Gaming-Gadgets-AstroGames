
import { Link } from 'react-router-dom'

const Endnote = () => {
  return (
    <div>

      <footer className="text-light bg-dark p-4 footer">
        <div className="footer-container">
          <div className="footer-section">
          <h2 className="bg-dark">AstroGadgets</h2>
          <div className='footer-section'>
            <p>
            Premium Accessories, Trusted Dealers, and Nonstop Playing — All in one place
          </p>
          </div>
          </div>

          {/* Explore */}
          <div className="footer-section">
            <h3>Explore</h3>
            <Link to="/">Browse Accessories</Link>
            <br/>
            <Link to="/addgadget">Sell Your Accessory</Link>
            <br />
            <Link to="/termsandconditions">Terms & Conditions</Link>
            <br />
            <Link to="/termsandconditions">About Us</Link>


          </div>


          {/* Contact us */}
          <div className="footer-section">
            <h3>Contact Us</h3>
            <span className="contactbutton badge">EMAIL</span> 
            <br />
            <i>grandeurjr@gmail.com</i> <br />
            <br />
            <span className="contactbutton">PHONE</span> 
            <br />
            <i>0759136485</i>
          </div>

        </div>

        {/* Bottom */}
        <h5 className='footer-bottom'>Developed by Grandeur.&copy; 2026. All Rights Reserved</h5>

        {/* Styles */}
        <style>{`
        body, html {
          'Poppins', sans-serif;
        }

        .footer {
          background: rgba(20, 20, 20, 0.95);
          color: #ddd;
          padding: 60px 20px 20px;
          backdrop-filter: blur(8px);
        }

        .footer-container {
          max-width: 1200px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 30px;
        }

        .footer-logo {
          color: #fff;
          10px;
          font-size: 1.8rem;
          letter-spacing: 1px;
        }

        .footer-section h3 {
          12px;
          color: #fff;
          font-size: 1.2rem;
          position: relative;
        }

        .footer-section h3::after {
          content: '';
          position: absolute;
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, #ff3c00, #e78669);
          bottom: -5px;
          left: 0;
          border-radius: 2px;
        }

        .footer-section p {
          font-size: 0.9rem;
          1.4;
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
        }

        .footer-section ul li {
          8px;
        }

        .footer-section a {
          color: #bbb;
          text-decoration: none;
          transition: 0.3s;
          display: inline-block;
          position: relative;
        }

        .footer-section a::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          background: #ff3c00;
          left: 0;
          bottom: -2px;
          transition: 0.3s;
        }

        .footer-section a:hover::after {
          width: 100%;
        }

        .footer-section a:hover {
          color: #ff3c00;
        }

        .newsletter {
          display: flex;
          10px;
        }

        .newsletter input {
          flex: 1;
          padding: 10px;
          border: none;
          outline: none;
          border-radius: 8px 0 0 8px;
          background: #333;
          color: #fff;
          transition: 0.3s;
        }

        .newsletter input:focus {
          box-shadow: 0 0 10px #ff758c;
          background: #222;
        }

        .newsletter input::placeholder {
          color: #aaa;
        }

        .newsletter button {
          padding: 10px 15px;
          border: none;
          cursor: pointer;
          border-radius: 0 8px 8px 0;
          background: linear-gradient(90deg, #ff758c, #ff7eb3);
          color: #fff;
          font-weight: 600;
          transition: transform 0.2s, box-shadow 0.3s;
        }

        .newsletter button:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 15px #ff758c;
        }

        .social-icons {
          display: flex;
          gap: 10px;
          12px;
          font-size: 1.2rem;
        }

        .social-icons a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: #222;
          color: #fff;
          transition: 0.3s;
          text-decoration: none;
        }

        .social-icons a:hover {
          background: linear-gradient(90deg, #ff758c, #ff7eb3);
          transform: translateY(-3px);
        }

        .footer-bottom {
          text-align: center;
          40px;
          border-top: 1px solid #222;
          padding-top: 15px;
          font-size: 14px;
          color: #888;
        }
          .contactbutton {
            background-color: #ff3c00 ;
            color: #000;
            padding: 5px 10px;
            border-radius: 9px; /* pill shape */
            font-size: 12px;
            font-weight: bold;
          }

        @media (max-width: 768px) {
          .footer-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      </footer>
    </div>
  )
}

export default Endnote