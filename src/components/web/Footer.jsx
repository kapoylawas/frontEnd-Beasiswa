import React from "react";

export default function footer() {
  return (
    <footer className="mt-2">
      <div className="container-fluid footer-top">
        <div className="row p-4">
          <div className="col-md-4 mb-4 mt-3">
            <h5>
              TENTANG
              <strong style={{ color: "#ffd22e" }}> BEASISWA</strong>
            </h5>
            <hr />
            <div className="text-center">
              <img src="/images/sidoarjo-logo.png" width="70" />
            </div>
            <p className="text-justify mt-3">
              Beasiswa Sidoarjo Meliputi Dispora, Kesra, Dinsos 2024
            </p>
          </div>
          <div className="col-md-4 mb-4 mt-3">
            <h5>
              KONTAK <strong style={{ color: "#ffd22e" }}>BEASISWA</strong>
            </h5>
            <hr />
            <p>
              <i className="fa fa-map-marker"></i> Jln. Diponegoro No. 58,
              Sidoarjo, Jawa Timur, 61473
              <br />
              <br />
              <i className="fas fa-envelope"></i> info@beasiswa.sidoarjokab.go.id
              <br />
              <br />
              <i className="fas fa-phone"></i> +62 857-8585-2224
            </p>
          </div>
        </div>
      </div>
      <div className="container-fluid footer-bottom">
        <div className="row p-3">
          <div className="text-center text-white font-weight-bold">
            Copyright © 2024 BEASISWA SIDOARJO. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
