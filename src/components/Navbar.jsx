// components/Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/signin");
  };



  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 sticky-top shadow-sm">
      <NavLink className="navbar-brand fw-bold maintitle" to="/">
        Astrogadgets
      </NavLink>

      {/* Mobile toggle */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
        <ul className="navbar-nav ms-auto">

          {/* Always visible */}
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Gadgets
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/addgadget" className="nav-link">
              Sell Through Us
            </NavLink>
          </li>

          {/* Conditional Rendering */}
          {user ? (
            <>
              {/* Username */}
              <li className="nav-item d-flex align-items-center me-2">
                <span className="text-light fw-semibold me-2">
                  👋 {user.username}
                </span>
              </li>

              {/* Logout */}
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-danger ms-2"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink to="/signup" className="nav-link">
                  Signup
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/signin" className="nav-link">
                  Signin
                </NavLink>
              </li>
            </>
          )}

        </ul>
      </div>
      <style>{`
        .maintitle {
          color: #ff3c00;
          cursor: pointer;
          font-size:30px
        }
          .navbar {
            background: linear-gradient(90deg, #111, #1c1c1c);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }

          .maintitle {
            color: #ff3c00;
            cursor: pointer;
            font-size: 26px;
            letter-spacing: 1px;
            font-weight: 700;
          }

          .navbar-nav .nav-link {
            color: #ddd !important;
            margin-right: 10px;
            transition: 0.3s ease;
            font-weight: 500;
          }

          .navbar-nav .nav-link:hover {
            color: #ff3c00 !important;
            transform: translateY(-1px);
          }

          .navbar-nav .nav-link.active {
            color: #ff3c00 !important;
          }

          .btn-danger {
            border-radius: 20px;
            padding: 4px 12px;
          }

      `}</style>
    </nav>
  );
}

export default Navbar;