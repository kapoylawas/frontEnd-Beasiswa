import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const { pathname } = location;
  const activeRoute = pathname.split("/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Top Bar dengan informasi kontak dan media sosial */}
      <div className="top-navbar">
        <div className="container-fluid">
          <div className="top-nav-content">
            <div className="contact-info">
              {/* <i className="fas fa-envelope me-2"></i>
              <span>beasiswa@sidoarjo.go.id</span> */}
            </div>
            <div className="social-links">
              <span className="me-2">IKUTI KAMI:</span>
              <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/pemkabsidoarjo1" className="social-link">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/pemkabsidoarjo" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
              <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/@pemerintahkabupatensidoarj380" className="social-link">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="main-navbar navbar navbar-expand-lg">
        <div className="container-fluid">
          {/* Brand Logo */}
          <Link className="navbar-brand" to="/">
            <i className="fas fa-graduation-cap me-2"></i>
            <span>Beasiswa Sidoarjo</span>
          </Link>

          {/* Mobile Toggle Button - Clean Icon Only */}
          <button
            className={`navbar-toggler ${isMenuOpen ? 'menu-open' : ''}`}
            type="button"
            onClick={toggleMenu}
            aria-controls="navbarNav"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <span className="toggler-bar"></span>
              <span className="toggler-bar"></span>
              <span className="toggler-bar"></span>
            </span>
          </button>

          {/* Navigation Menu */}
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className={`nav-link ${activeRoute[1] === "" ? "active" : ""}`}
                  to="/"
                  onClick={closeMenu}
                >
                  <i className="fas fa-home me-2"></i>
                  Beranda
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${activeRoute[1] === "info" ? "active" : ""}`}
                  to="/info"
                  onClick={closeMenu}
                >
                  <i className="fas fa-info-circle me-2"></i>
                  Persyaratan
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${activeRoute[1] === "registers" ? "active" : ""}`}
                  to="/registers"
                  onClick={closeMenu}
                >
                  <i className="fas fa-user-graduate me-2"></i>
                  Pendaftaran
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${activeRoute[1] === "login" ? "active" : ""}`}
                  to="/login"
                  onClick={closeMenu}
                >
                  <i className="fas fa-user-lock me-2"></i>
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <style jsx>{`
        /* Top Navigation Bar */
        .top-navbar {
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          color: white;
          padding: 8px 0;
          font-size: 14px;
          border-bottom: 2px solid #ffd700;
        }

        .top-nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 15px;
        }

        .contact-info {
          display: flex;
          align-items: center;
        }

        .contact-info i {
          color: #ffd700;
        }

        .social-links {
          display: flex;
          align-items: center;
        }

        .social-link {
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 10px;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .social-link:hover {
          background: #ffd700;
          color: #1e3c72;
          transform: translateY(-2px);
        }

        /* Main Navigation Bar */
        .main-navbar {
          background: #ffffff;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
          padding: 0;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .main-navbar .container-fluid {
          padding: 0 15px;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          font-weight: 700;
          font-size: 24px;
          color: #1e3c72 !important;
          padding: 15px 0;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .navbar-brand:hover {
          color: #2a5298 !important;
          transform: translateY(-1px);
        }

        .navbar-brand i {
          font-size: 28px;
          color: #2a5298;
        }

        /* Navigation Items */
        .navbar-nav {
          gap: 5px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          padding: 15px 20px !important;
          color: #333 !important;
          font-weight: 500;
          border-radius: 8px;
          transition: all 0.3s ease;
          text-decoration: none;
          white-space: nowrap;
        }

        .nav-link:hover {
          background: linear-gradient(135deg, #f0f5ff 0%, #e8f0ff 100%);
          color: #1e3c72 !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(30, 60, 114, 0.15);
        }

        .nav-link.active {
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          color: white !important;
          box-shadow: 0 4px 15px rgba(30, 60, 114, 0.3);
        }

        .nav-link i {
          font-size: 16px;
          width: 20px;
          text-align: center;
        }

        /* Clean Mobile Toggle Button - Icon Only */
        .navbar-toggler {
          border: 1.5px solid #1e3c72;
          padding: 10px;
          border-radius: 6px;
          transition: all 0.3s ease;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          position: relative;
        }

        .navbar-toggler:focus {
          box-shadow: 0 0 0 2px rgba(30, 60, 114, 0.2);
          outline: none;
        }

        .navbar-toggler:hover {
          background: #f8f9fa;
          border-color: #2a5298;
        }

        .navbar-toggler.menu-open {
          background: #1e3c72;
          border-color: #1e3c72;
        }

        .navbar-toggler-icon {
          width: 20px;
          height: 14px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: none !important;
          transition: all 0.3s ease;
        }

        .toggler-bar {
          display: block;
          height: 2px;
          width: 100%;
          background-color: #1e3c72;
          border-radius: 1px;
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .navbar-toggler.menu-open .toggler-bar {
          background-color: white;
        }

        /* Smooth hamburger animation */
        .navbar-toggler.menu-open .navbar-toggler-icon {
          transform: rotate(180deg);
        }

        .navbar-toggler.menu-open .toggler-bar:nth-child(1) {
          transform: translateY(6px) rotate(45deg);
        }

        .navbar-toggler.menu-open .toggler-bar:nth-child(2) {
          opacity: 0;
          transform: scale(0);
        }

        .navbar-toggler.menu-open .toggler-bar:nth-child(3) {
          transform: translateY(-6px) rotate(-45deg);
        }

        /* Mobile Menu Styles */
        @media (max-width: 991.98px) {
          .top-nav-content {
            flex-direction: column;
            gap: 8px;
            text-align: center;
          }

          .navbar-collapse {
            background: white;
            margin-top: 10px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
            padding: 10px;
          }

          .navbar-nav {
            gap: 0;
          }

          .nav-link {
            border-radius: 6px;
            margin-bottom: 5px;
            justify-content: flex-start;
          }

          .nav-link:last-child {
            margin-bottom: 0;
          }

          .nav-link:hover {
            transform: none;
          }
        }

        /* Small Mobile Devices */
        @media (max-width: 575.98px) {
          .navbar-brand {
            font-size: 20px;
          }

          .navbar-brand i {
            font-size: 24px;
          }

          .social-links span {
            display: none;
          }

          .social-links {
            justify-content: center;
          }

          .navbar-toggler {
            width: 40px;
            height: 40px;
            padding: 8px;
          }

          .navbar-toggler-icon {
            width: 18px;
            height: 12px;
          }
        }

        /* Large Desktop */
        @media (min-width: 1200px) {
          .container-fluid {
            max-width: 1200px;
            margin: 0 auto;
          }
        }
      `}</style>
    </>
  );
}