import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import AuthService from "../services/auth.service";

const NavComponent = ({ currentUser, setCurrentUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  // Specify pages where the search bar should not appear
  const noSearchBarPages = ["/login", "/register"];
  const shouldShowSearchBar = !noSearchBarPages.includes(location.pathname);

  const handleLogout = () => {
    AuthService.logout(); // 清空local storage
    window.alert("登出成功!現在您會被導向到首頁。");
    setCurrentUser(null);
    setSearchTerm("");
  };

  const handleSearch = async () => {
    navigate(`/api/restaurants/findByName/${searchTerm}`);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          {/* Search Section */}
          {shouldShowSearchBar && (
            <div className="d-flex align-items-center w-50 ms-3 mt-4">
              <input
                type="text"
                value={searchTerm}
                className="form-control py-3 me-3 w-100 rounded-0"
                placeholder="Type restaurant name here..."
                aria-label="Type restaurant name here"
                style={{ backgroundColor: "#D9D9D9", height: "50px" }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="btn rounded"
                type="button"
                onClick={handleSearch} //()=>handleSearch()
                style={{
                  backgroundColor: "#c02434",
                  color: "white",
                  height: "50px",
                  fontFamily: "Inter",
                  fontSize: "18px",
                }}
              >
                Search
              </button>
            </div>
          )}

          {/* Navbar Toggle (for smaller screens) */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Items */}
          <div
            className="collapse navbar-collapse justify-content-end mt-4 fs-5 "
            id="navbarNav"
          >
            <ul className="navbar-nav ">
              <li className="nav-item me-4 ms-2 ">
                <Link
                  className="nav-link"
                  to="/register"
                  style={{ fontFamily: "Inter" }}
                >
                  Register
                </Link>
              </li>
              <>
                {currentUser === null ? (
                  <li className="nav-item me-2 ms-2 ">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                ) : (
                  <div className="d-flex">
                    <li className="nav-item me-2 ms-2 ">
                      <Link
                        className="nav-link"
                        onClick={handleLogout}
                        to="/homepage"
                      >
                        Logout
                      </Link>
                    </li>
                    <li className="nav-item me-2 ms-2">
                      <Link
                        className="nav-link"
                        to={`/api/restaurants/favrestaurant/${currentUser.user._id}`}
                      >
                        myRestaurant
                      </Link>
                    </li>
                  </div>
                )}
              </>
              <li className="nav-item me-2 ms-2">
                <Link className="nav-link" to="/homepage">
                  Homepage
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <style>
          {`
      .form-control::placeholder {
        color: white;
        font-size: 18px;
        font-family:"Inter";
      }
    `}
        </style>
      </nav>
    </div>
  );
};

export default NavComponent;
