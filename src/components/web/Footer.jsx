import React from "react";

export default function App() {
  return (
    <div id="root">
      <div className="main-content">
        {/* Konten utama di sini */}
      </div>

      <footer className="footer">
        {/* Footer Main Content */}
        <div className="footer-main">
          <div className="container">
            <div className="footer-content">
              <div className="footer-brand">
                <div className="footer-logo">
                  <i className="fas fa-graduation-cap"></i>
                  <span>Beasiswa Sidoarjo</span>
                </div>
                <p className="footer-description">
                  Program beasiswa Pemerintah Kabupaten Sidoarjo untuk mendukung
                  pendidikan generasi muda yang berprestasi dan berpotensi.
                </p>
                <div className="footer-social">
                  <a href="https://www.facebook.com/pemkabsidoarjo1" className="social-icon">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://www.instagram.com/pemkabsidoarjo" className="social-icon">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://www.youtube.com/@pemerintahkabupatensidoarj380" className="social-icon">
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a href="mailto:beasiswa@sidoarjo.go.id" className="social-icon">
                    <i className="fas fa-envelope"></i>
                  </a>
                </div>
              </div>

              <div className="footer-contact">
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <strong>Alamat</strong>
                    <span>Jl. Jenderal Sudirman No. 50, Sidoarjo</span>
                  </div>
                </div>
                {/* <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <div>
                    <strong>Telepon</strong>
                    <span>(031) 1234567</span>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <strong>Email</strong>
                    <span>beasiswa@sidoarjo.go.id</span>
                  </div>
                </div> */}
                <div className="contact-item">
                  <i className="fas fa-clock"></i>
                  <div>
                    <strong>Jam Operasional</strong>
                    <span>Senin - Jumat: 08:00 - 16:00 WIB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="container">
            <div className="footer-bottom-content">
              <div className="copyright">
                <i className="far fa-copyright"></i>
                <span>2026 Beasiswa Sidoarjo. All Rights Reserved.</span>
              </div>
              <div className="footer-credits">
                <span>Dikelola oleh Pemerintah Kabupaten Sidoarjo</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .footer {
          background: linear-gradient(135deg, #1a3364 0%, #1e3c72 100%);
          color: white;
          margin-top: auto;
        }

        .footer-main {
          padding: 50px 0 30px;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          align-items: start;
        }

        /* Brand Section */
        .footer-brand {
          display: flex;
          flex-direction: column;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 20px;
          color: white;
        }

        .footer-logo i {
          font-size: 32px;
          color: #ffd700;
          margin-right: 12px;
        }

        .footer-description {
          line-height: 1.7;
          margin-bottom: 30px;
          opacity: 0.9;
          font-size: 16px;
          max-width: 400px;
        }

        /* Social Media */
        .footer-social {
          display: flex;
          gap: 15px;
        }

        .social-icon {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .social-icon:hover {
          background: #ffd700;
          color: #1e3c72;
          transform: translateY(-3px) scale(1.1);
          box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
        }

        /* Contact Section */
        .footer-contact {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          padding: 15px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .contact-item:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(5px);
          border-color: rgba(255, 215, 0, 0.3);
        }

        .contact-item i {
          color: #ffd700;
          font-size: 18px;
          margin-top: 2px;
          width: 20px;
          text-align: center;
        }

        .contact-item div {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .contact-item strong {
          font-weight: 600;
          color: #ffd700;
          font-size: 14px;
        }

        .contact-item span {
          line-height: 1.4;
          opacity: 0.9;
          font-size: 14px;
        }

        /* Footer Bottom */
        .footer-bottom {
          background: rgba(0, 0, 0, 0.3);
          padding: 25px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .copyright {
          display: flex;
          align-items: center;
          gap: 8px;
          opacity: 0.8;
          font-size: 14px;
        }

        .copyright i {
          color: #ffd700;
        }

        .footer-credits {
          opacity: 0.7;
          font-size: 14px;
          font-style: italic;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .footer-main {
            padding: 40px 0 20px;
          }
          
          .footer-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .footer-logo {
            font-size: 24px;
            justify-content: center;
            text-align: center;
          }
          
          .footer-logo i {
            font-size: 28px;
          }
          
          .footer-description {
            text-align: center;
            margin-left: auto;
            margin-right: auto;
          }
          
          .footer-social {
            justify-content: center;
          }
          
          .footer-bottom-content {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }
        }

        @media (max-width: 576px) {
          .footer-main {
            padding: 30px 0 15px;
          }
          
          .footer-content {
            gap: 30px;
          }
          
          .footer-logo {
            font-size: 22px;
          }
          
          .footer-logo i {
            font-size: 26px;
          }
          
          .footer-description {
            font-size: 15px;
          }
          
          .social-icon {
            width: 40px;
            height: 40px;
          }
          
          .contact-item {
            padding: 12px;
            gap: 12px;
          }
          
          .contact-item i {
            font-size: 16px;
          }
          
          .contact-item strong,
          .contact-item span {
            font-size: 13px;
          }
        }

        @media (max-width: 375px) {
          .footer-logo {
            font-size: 20px;
          }
          
          .footer-logo i {
            font-size: 24px;
          }
          
          .footer-social {
            gap: 10px;
          }
          
          .social-icon {
            width: 38px;
            height: 38px;
          }
        }
      `}</style>
    </div>
  );
}