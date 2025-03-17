import React from "react";

import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  //assigning location variable
  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const activeRoute = pathname.split("/");

  return (
    <>
      {/* <nav className="navbar navbar-expand-md navbar-light navbar-top d-none d-md-block d-lg-block">
        <div className="container">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item me-4">
                <i className="fa fa-envelope"></i> beasiswa@sidoarjo.go.id
              </li>
            </ul>
            <div>
              IKUTI KAMI :
              <a target="_blank" href="https://www.facebook.com/pemkabsidoarjo1" className="ms-2 me-2">
                <i className="fab fa-facebook-square text-white fa-lg"></i>
              </a>
              <a target="_blank" href="https://www.instagram.com/pemkabsidoarjo" className="ms-2 me-2">
                <i className="fab fa-instagram text-white fa-lg"></i>
              </a>
              <a target="_blank" href="https://www.youtube.com/@pemerintahkabupatensidoarj380" className="ms-2 me-2">
                <i className="fab fa-youtube text-white fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </nav> */}


      <nav className="navbar navbar-expand-md navbar-light navbar-blue nav-web">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mt-2 mb-2 mb-md-0">
              <li className="nav-item ms-2">
                <Link
                  className={
                    activeRoute[1] === ""
                      ? "nav-link active text-uppercase"
                      : "nav-link text-uppercase"
                  }
                  to="/"
                >
                  <i className="fa fa-home"></i> Home
                </Link>
              </li>

              <li className="nav-item ms-2">
                <Link
                  className={
                    activeRoute[1] === "info"
                      ? "nav-link active text-uppercase"
                      : "nav-link text-uppercase"
                  }
                  to="/info"
                >
                  <i className="fa fa-info-circle"></i> PERSYARATAN
                </Link>
              </li>
              <li className="nav-item ms-2">
                <Link
                  className={
                    activeRoute[1] === "registers"
                      ? "nav-link active text-uppercase"
                      : "nav-link text-uppercase"
                  }
                  to="/registers"
                >
                  <i className="fa fa-circle-user"></i> PENDAFTARAN
                </Link>
              </li>
              <li className="nav-item ms-2">
                <Link
                  className={
                    activeRoute[1] === "login"
                      ? "nav-link active text-uppercase"
                      : "nav-link text-uppercase"
                  }
                  to="/login"
                >
                  <i className="fa fa-user-lock"></i> LOGIN
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
