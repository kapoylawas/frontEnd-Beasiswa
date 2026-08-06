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
      {/* Top Bar dengan Ticker Info Instansi (Saweria 3D style) */}
      <div className="top-navbar">
        <div className="container-fluid max-w-7xl mx-auto px-4">
          <div className="top-nav-content">
            <div className="d-flex align-items-center gap-2">
              <span className="top-nav-badge">INFORMASI RESMI</span>
              <span className="d-none d-md-inline text-slate-800 font-bold">
                <i className="fas fa-bullhorn me-2 text-rose-600"></i>
                Portal Pendaftaran Beasiswa Pemerintah Kabupaten Sidoarjo
              </span>
            </div>
            <div className="social-links">
              <span className="d-none d-sm-inline me-1 text-xs font-bold text-slate-800">
                SOSIAL MEDIA:
              </span>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/pemkabsidoarjo1"
                className="social-link"
                title="Facebook Pemkab Sidoarjo"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/pemkabsidoarjo"
                className="social-link"
                title="Instagram Pemkab Sidoarjo"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.youtube.com/@pemerintahkabupatensidoarj380"
                className="social-link"
                title="YouTube Pemkab Sidoarjo"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation (Saweria 3D Navbar) */}
      <nav className="main-navbar navbar navbar-expand-lg">
        <div className="container-fluid max-w-7xl mx-auto px-4">
          {/* Brand Logo */}
          <Link className="navbar-brand" to="/" onClick={closeMenu}>
            <div className="brand-icon-box">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <div>
              <div className="d-flex align-items-center">
                <span className="brand-text-main">Beasiswa Sidoarjo</span>
                <span className="brand-badge-year">Pemkab</span>
              </div>
              <span className="brand-subtext d-none d-sm-block">
                Pemerintah Kabupaten Sidoarjo
              </span>
            </div>
          </Link>

          {/* Mobile Toggle Button (Saweria 3D Style) */}
          <button
            className="navbar-toggler border-0 p-0"
            type="button"
            onClick={toggleMenu}
            aria-controls="navbarNav"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <div className="mobile-toggle-box">
              <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
          </button>

          {/* Navigation Menu */}
          <div
            className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto align-items-lg-center gap-1 my-2 my-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    activeRoute[1] === "" ? "active" : ""
                  }`}
                  to="/"
                  onClick={closeMenu}
                >
                  <i className="fas fa-home"></i>
                  Beranda
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    activeRoute[1] === "info" ? "active" : ""
                  }`}
                  to="/info"
                  onClick={closeMenu}
                >
                  <i className="fas fa-list-check"></i>
                  Persyaratan
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    activeRoute[1] === "registers" ? "active" : ""
                  }`}
                  to="/registers"
                  onClick={closeMenu}
                >
                  <i className="fas fa-id-card"></i>
                  Pendaftaran
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    activeRoute[1] === "login" ? "active" : ""
                  }`}
                  to="/login"
                  onClick={closeMenu}
                >
                  <i className="fas fa-right-to-bracket"></i>
                  Login Sign In
                </Link>
              </li>

              {/* Saweria 3D Tactile Button */}
              <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                <Link
                  to="/registers"
                  className="btn btn-danger font-black w-100 text-center justify-content-center text-xs py-2 px-3"
                  style={{ border: "2px solid #1e293b", boxShadow: "2px 2px 0px #1e293b", borderRadius: "8px", background: "#ef4444", color: "#ffffff" }}
                  onClick={closeMenu}
                >
                  <i className="fas fa-lock me-1"></i>
                  Pendaftaran Ditutup
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}