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
  // get user from cookies safely
  const userCookie = Cookies.get("user");
  let user = {};
  try {
    user = userCookie ? JSON.parse(userCookie) : {};
  } catch (err) {
    user = {};
  }

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
      className="navbar navbar-expand fixed-top admin-navbar-3d d-flex align-items-center justify-content-between"
    >
      {/* Left Group: Brand Logo & Sidebar Toggle */}
      <div className="d-flex align-items-center gap-2 ps-2">
        <Link to="/admin/dashboard" className="brand-box-3d">
          <i className="fas fa-graduation-cap text-dark fs-5"></i>
          <span>Sistem Beasiswa</span>
        </Link>

        {/* Sidebar Toggle Button 3D */}
        <button
          className="toggle-btn-3d"
          id="sidebarToggle"
          onClick={sidebarToggleHandler}
          title="Toggle Navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* Right Group: User Profile 3D Pill & Dropdown */}
      <ul className="navbar-nav me-2" ref={dropdownRef}>
        <li className="nav-item dropdown position-relative">
          <div
            className="user-pill-3d"
            onClick={toggleDropdown}
          >
            <div className="user-avatar-3d">
              <i className="fas fa-user"></i>
            </div>
            <div className="user-info d-none d-sm-block">
              <span className="d-block text-dark fw-bold" style={{ fontSize: "0.85rem", lineHeight: "1.2" }}>
                {user?.name || "Administrator"}
              </span>
            </div>
            <i
              className="fas fa-caret-down text-dark ms-1"
              style={{
                transition: "transform 0.2s ease",
                transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)"
              }}
            ></i>
          </div>

          {/* Dropdown Menu 3D */}
          {isDropdownOpen && (
            <div
              className="dropdown-menu-3d position-absolute"
              style={{
                top: "calc(100% + 8px)",
                right: 0,
                zIndex: 1040
              }}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <div className="px-3 py-2 border-bottom mb-2">
                <div className="fw-bold text-dark" style={{ fontSize: "0.9rem" }}>{user?.name || "Administrator"}</div>
                <small className="text-muted" style={{ fontSize: "0.75rem" }}>{user?.email || "admin@beasiswa.go.id"}</small>
              </div>

              <Link
                className="dropdown-item-3d d-flex align-items-center gap-2 mb-1"
                to="/admin/gantiPassword"
                onClick={() => setIsDropdownOpen(false)}
              >
                <i className="fas fa-key text-primary me-1"></i>
                <span>Ganti Password</span>
              </Link>

              <div className="dropdown-divider my-2 border-secondary opacity-25"></div>

              <button
                className="dropdown-item-3d d-flex align-items-center gap-2 text-danger w-100 bg-transparent border-0 text-start"
                onClick={(e) => {
                  logout(e);
                  setIsDropdownOpen(false);
                }}
              >
                <i className="fas fa-sign-out-alt text-danger me-1"></i>
                <span className="fw-bold">Logout</span>
              </button>
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