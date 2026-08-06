import React from "react";

export default function Footer() {
  return (
    <footer className="kofi-footer" style={{ background: "var(--saweria-green-bright)", borderTop: "3px solid #1e293b", padding: "60px 0 30px 0", marginTop: "80px" }}>
      <div className="container max-w-7xl mx-auto px-4">
        <div className="row gy-5 align-items-stretch">
          {/* Brand & Deskripsi 3D Card */}
          <div className="col-lg-6">
            <div className="footer-3d-card p-4 p-md-5" style={{ background: "#ffffff", border: "2.5px solid #1e293b", boxShadow: "6px 6px 0px #1e293b", borderRadius: "18px", position: "relative" }}>
              <span className="saweria-corner-badge teal" style={{ position: "absolute", top: "-14px", right: "24px", background: "#70e4ef", color: "#1e293b", fontWeight: 800, fontSize: "0.8rem", padding: "4px 14px", borderRadius: "12px", border: "2px solid #1e293b", boxShadow: "2px 2px 0px #1e293b", fontFamily: "var(--font-family-code)" }}>
                pemkab sidoarjo
              </span>

              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="brand-icon-box" style={{ width: 52, height: 52, borderRadius: 14, background: "var(--saweria-green-bright)", border: "2px solid #1e293b", boxShadow: "3px 3px 0px #1e293b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.35rem", color: "#1e293b" }}>
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <div>
                  <h4 className="m-0 font-black text-slate-900" style={{ fontSize: "1.5rem", letterSpacing: "-0.5px" }}>Beasiswa Sidoarjo</h4>
                  <span className="font-extrabold text-slate-700" style={{ fontSize: "0.875rem" }}>Diskominfo Kabupaten Sidoarjo</span>
                </div>
              </div>

              <p className="mb-4 text-slate-800 font-extrabold" style={{ fontSize: "1rem", lineHeight: "1.6" }}>
                Program beasiswa Pemerintah Kabupaten Sidoarjo untuk mendukung pendidikan generasi muda yang berprestasi dan berpotensi.
              </p>

              {/* Social Links 3D */}
              <div className="d-flex align-items-center gap-3">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/pemkabsidoarjo1"
                  className="social-link-3d"
                  title="Facebook Pemkab Sidoarjo"
                  style={{ width: 42, height: 42, borderRadius: "50%", background: "#ffffff", border: "2px solid #1e293b", boxShadow: "3px 3px 0px #1e293b", display: "flex", alignItems: "center", justifyContent: "center", color: "#1e293b", textDecoration: "none", transition: "all 0.15s ease", fontSize: "1.1rem" }}
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/pemkabsidoarjo"
                  className="social-link-3d"
                  title="Instagram Pemkab Sidoarjo"
                  style={{ width: 42, height: 42, borderRadius: "50%", background: "#ffffff", border: "2px solid #1e293b", boxShadow: "3px 3px 0px #1e293b", display: "flex", alignItems: "center", justifyContent: "center", color: "#1e293b", textDecoration: "none", transition: "all 0.15s ease", fontSize: "1.1rem" }}
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.youtube.com/@pemerintahkabupatensidoarj380"
                  className="social-link-3d"
                  title="YouTube Pemkab Sidoarjo"
                  style={{ width: 42, height: 42, borderRadius: "50%", background: "#ffffff", border: "2px solid #1e293b", boxShadow: "3px 3px 0px #1e293b", display: "flex", alignItems: "center", justifyContent: "center", color: "#1e293b", textDecoration: "none", transition: "all 0.15s ease", fontSize: "1.1rem" }}
                >
                  <i className="fab fa-youtube"></i>
                </a>
                <a
                  href="mailto:beasiswa@sidoarjo.go.id"
                  className="social-link-3d"
                  title="Email Beasiswa"
                  style={{ width: 42, height: 42, borderRadius: "50%", background: "#ffffff", border: "2px solid #1e293b", boxShadow: "3px 3px 0px #1e293b", display: "flex", alignItems: "center", justifyContent: "center", color: "#1e293b", textDecoration: "none", transition: "all 0.15s ease", fontSize: "1.1rem" }}
                >
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Alamat & Jam Operasional 3D Card */}
          <div className="col-lg-6">
            <div className="footer-3d-card p-4 p-md-5" style={{ background: "#ffffff", border: "2.5px solid #1e293b", boxShadow: "6px 6px 0px #1e293b", borderRadius: "18px", position: "relative" }}>
              <span className="saweria-corner-badge green" style={{ position: "absolute", top: "-14px", right: "24px", background: "var(--saweria-green-bright)", color: "#1e293b", fontWeight: 800, fontSize: "0.8rem", padding: "4px 14px", borderRadius: "12px", border: "2px solid #1e293b", boxShadow: "2px 2px 0px #1e293b", fontFamily: "var(--font-family-code)" }}>
                kontak & layanan
              </span>
              <h5 className="font-black text-slate-900 mb-4" style={{ fontSize: "1.25rem" }}>Informasi Sekretariat</h5>

              <div className="d-flex flex-column gap-3">
                <div className="p-3 bg-slate-50 border-2 border-slate-900 rounded-3 d-flex align-items-center gap-3" style={{ boxShadow: "3px 3px 0px #1e293b", border: "2px solid #1e293b" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--saweria-green-bright)", border: "2px solid #1e293b", boxShadow: "2px 2px 0px #1e293b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", color: "#1e293b", flexShrink: 0 }}>
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <strong className="text-slate-900 text-base font-black d-block mb-1">Alamat</strong>
                    <span className="text-slate-900 text-sm font-extrabold">Jl. Jenderal Sudirman No. 50, Sidoarjo</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border-2 border-slate-900 rounded-3 d-flex align-items-center gap-3" style={{ boxShadow: "3px 3px 0px #1e293b", border: "2px solid #1e293b" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--saweria-teal)", border: "2px solid #1e293b", boxShadow: "2px 2px 0px #1e293b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", color: "#1e293b", flexShrink: 0 }}>
                    <i className="fas fa-clock"></i>
                  </div>
                  <div>
                    <strong className="text-slate-900 text-base font-black d-block mb-1">Jam Operasional</strong>
                    <span className="text-slate-900 text-sm font-extrabold">Senin - Jumat: 08:00 - 16:00 WIB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar 3D */}
        <div className="footer-bottom-bar pt-4 mt-5 d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3" style={{ borderTop: "2.5px solid #1e293b" }}>
          <div className="d-flex align-items-center gap-2 font-black text-slate-900" style={{ fontSize: "0.95rem" }}>
            <i className="far fa-copyright"></i>
            <span><strong>Beasiswa Sidoarjo</strong>. All Rights Reserved.</span>
          </div>
          <div>
            <span style={{ color: "#1e293b", backgroundColor: "#ffffff", border: "2px solid #1e293b", boxShadow: "3px 3px 0px #1e293b", fontWeight: 900, fontSize: "0.85rem", padding: "8px 18px", borderRadius: "10px", display: "inline-block" }}>
              <i className="fas fa-code me-2 text-emerald-600"></i>Dikembangkan oleh Diskominfo Kabupaten Sidoarjo
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}