//import React
import React, { useState, useRef, useEffect } from "react";

//import Link from react router dom
import { Link, useNavigate } from "react-router-dom";

//import API
import Api from "../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import toast
import toast from "react-hot-toast";

export default function Navbar() {
  //state toggle
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  //function toggle handler
  const sidebarToggleHandler = (e) => {
    e.preventDefault();

    if (!sidebarToggle) {
      //add class on body
      document.body.classList.add("sb-sidenav-toggled");
      //set state "sidebarToggle" to true
      setSidebarToggle(true);
    } else {
      //remove class on body
      document.body.classList.remove("sb-sidenav-toggled");
      //set state "sidebarToggle" to false
      setSidebarToggle(false);
    }
  };

  //navigate
  const navigate = useNavigate();

  //method logout
  const logout = async (e) => {
    e.preventDefault();

    //fetch to rest api for logout
    await Api.post("/api/logout").then(() => {
      //remove user from cookies
      Cookies.remove("user");
      //remove token from cookies
      Cookies.remove("token");
      //remove permissions from cookies
      Cookies.remove("permissions");

      //show toast
      toast.success("Logout Successfully!", {
        position: "top-right",
        duration: 4000,
      });

      //redirect to login page
      navigate("/login");
    });
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Manual dropdown toggle handler
  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav
      className="navbar navbar-expand navbar-dark bg-gradient-primary border-bottom shadow-sm fixed-top"
      style={{
        paddingLeft: 0,
        height: "64px",
        zIndex: "1039",
        background: "linear-gradient(135deg, #2c7744 0%, #4CAF50 100%)",
        borderBottom: "3px solid #FFD700"
      }}
    >
      {/* Brand Logo */}
      <div className="navbar-brand-wrapper d-flex align-items-center">
        <Link to="/" className="navbar-brand ps-3 fw-bold text-white d-flex align-items-center">
          <div className="brand-icon-wrapper me-2">
            <i className="fas fa-graduation-cap fs-4"></i>
          </div>
          <span className="brand-text">Sistem Beasiswa</span>
        </Link>
      </div>

      {/* Sidebar Toggle */}
      <button
        className="btn btn-link btn-sm order-1 order-lg-0 me-3 text-white"
        id="sidebarToggle"
        onClick={sidebarToggleHandler}
        style={{
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "6px",
          padding: "8px 12px",
          transition: "all 0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "rgba(255,255,255,0.1)";
          e.target.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "transparent";
          e.target.style.transform = "scale(1)";
        }}
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Spacer */}
      <div className="d-none d-md-flex flex-grow-1"></div>

      {/* User Menu */}
      <ul className="navbar-nav ms-auto" ref={dropdownRef}>
        <li className="nav-item dropdown">
          <a
            className="nav-link d-flex align-items-center text-white"
            href="#!"
            role="button"
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              transition: "all 0.3s ease",
              position: "relative",
              cursor: "pointer"
            }}
            onClick={toggleDropdown}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "rgba(255,255,255,0.15)";
            }}
            onMouseLeave={(e) => {
              if (!isDropdownOpen) {
                e.target.style.backgroundColor = "transparent";
              }
            }}
          >
            <div className="user-avatar me-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: "38px",
                  height: "38px",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                  transition: "all 0.3s ease"
                }}
              >
                <i className="fas fa-user"></i>
              </div>
            </div>
            <div className="user-info d-none d-md-block me-3">
              <small className="d-block" style={{ fontSize: "12px", opacity: 0.9 }}>Welcome Back</small>
              <span style={{ fontSize: "14px", fontWeight: "500" }}></span>
            </div>

            {/* Animated Arrow - Straight Down/Up */}
            <div
              className="arrow-wrapper"
              style={{
                transition: "transform 0.3s ease",
              }}
            >
              <i
                className="fas fa-caret-down"
                style={{
                  fontSize: "16px",
                  opacity: 0.8,
                  transition: "all 0.3s ease",
                  transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)"
                }}
              ></i>
            </div>
          </a>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              className="dropdown-menu show shadow border-0"
              style={{
                borderRadius: "12px",
                border: "1px solid rgba(0,0,0,0.1)",
                minWidth: "220px",
                position: "absolute",
                top: "100%", // Muncul tepat di bawah navbar
                right: "0",
                left: "auto",
                marginTop: "8px", // Jarak dari trigger
                animation: "dropdownSlideDown 0.3s ease",
                zIndex: 1040
              }}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <div className="dropdown-header text-muted small d-flex align-items-center">
                <i className="fas fa-user-circle me-2"></i>
                User Menu
              </div>
              <hr className="dropdown-divider my-2" />
              <Link
                className="dropdown-item d-flex align-items-center py-3"
                to="/admin/gantiPassword"
                style={{
                  transition: "all 0.2s ease",
                  borderRadius: "6px",
                  margin: "2px 8px"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#f8f9fa";
                  e.target.style.transform = "translateX(5px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.transform = "translateX(0)";
                }}
                onClick={() => setIsDropdownOpen(false)}
              >
                <div className="icon-wrapper me-3">
                  <i
                    className="fas fa-key text-primary"
                    style={{
                      transition: "all 0.3s ease",
                      fontSize: "16px"
                    }}
                  ></i>
                </div>
                <div className="flex-grow-1">
                  <div style={{ fontWeight: "500", color: "#333" }}>Ganti Password</div>
                  <small className="text-muted" style={{ fontSize: "12px" }}>Update password akun</small>
                </div>
              </Link>
              <Link
                className="dropdown-item d-flex align-items-center py-3"
                onClick={(e) => {
                  logout(e);
                  setIsDropdownOpen(false);
                }}
                style={{
                  transition: "all 0.2s ease",
                  borderRadius: "6px",
                  margin: "2px 8px"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#fff5f5";
                  e.target.style.transform = "translateX(5px)";
                  e.target.style.color = "#dc3545";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.transform = "translateX(0)";
                  e.target.style.color = "#dc3545";
                }}
              >
                <div className="icon-wrapper me-3">
                  <i
                    className="fas fa-sign-out-alt"
                    style={{
                      transition: "all 0.3s ease",
                      fontSize: "16px",
                      color: "#dc3545"
                    }}
                  ></i>
                </div>
                <div className="flex-grow-1">
                  <div style={{ fontWeight: "500" }}>Logout</div>
                  <small className="text-muted" style={{ fontSize: "12px" }}>Keluar dari sistem</small>
                </div>
              </Link>
            </div>
          )}
        </li>
      </ul>

      {/* CSS Animation */}
      <style>
        {`
          @keyframes dropdownSlideDown {
            from {
              opacity: 0;
              transform: translateY(-5px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .dropdown-menu {
            animation: dropdownSlideDown 0.3s ease;
          }

          .arrow-wrapper i {
            transition: all 0.3s ease;
          }

          .nav-link:hover .arrow-wrapper i {
            opacity: 1;
          }

          /* Smooth transitions for all interactive elements */
          .nav-link, .dropdown-item, .btn {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          /* Hover effect for dropdown items */
          .dropdown-item:hover {
            transform: translateX(5px);
          }

          /* Arrow animation */
          .fa-caret-down {
            transform-origin: center;
          }

          /* Bouncing effect for sidebar toggle */
          @keyframes bounce {
            0%, 20%, 60%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-3px);
            }
            80% {
              transform: translateY(-1px);
            }
          }

          .btn:active {
            animation: bounce 0.5s;
          }

          /* Ensure dropdown appears below navbar */
          .nav-item.dropdown {
            position: relative;
          }

          .dropdown-menu {
            position: absolute;
            top: 100%;
            right: 0;
          }
        `}
      </style>
    </nav>
  );
}