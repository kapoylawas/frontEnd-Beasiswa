import LayoutWeb from "../../../layouts/Web";

export default function Home() {
  const fiqi = `https://wa.me/6289630324926`;
  const petirc = `https://wa.me/6281235949497`;
  const munip = `https://wa.me/6281234278662`;
  const dinsos = `https://wa.me/6285711404090`;

  return (
    <LayoutWeb>
      {/* Hero Section */}
      <div className="home-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-logo">
              <div className="logo-container">
                <img src="/sidoarjo.png" alt="Logo Sidoarjo" className="logo-image" />
              </div>
            </div>

            <h1 className="hero-title">
              Beasiswa <span className="highlight">Sidoarjo 2025</span>
            </h1>

            <p className="hero-subtitle">
              Program Beasiswa Sidoarjo 2025 telah
              <span className="highlight-text"> berhasil diselenggarakan</span>
            </p>

            {/* Stats Section */}
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Penerima Beasiswa</div>
              </div>
            </div>

            <div className="hero-divider"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container home-container mt-5 mb-5">
        <div className="home-vertical-layout">

          {/* Pengumuman Section */}
          <div className="section-top">
            <div className="section-header">
              <i className="fas fa-bullhorn"></i>
              <h2>Pengumuman</h2>
            </div>
            <div className="announcement-content-vertical">
              <div className="announcement-card-vertical">
                <div className="achievement-badge">
                  <i className="fas fa-star"></i>
                  <span>Program Selesai</span>
                </div>
                <div className="announcement-image-preview-vertical">
                  <img src="/2025.jpeg" alt="Pengumuman Beasiswa" className="img-fluid" />
                </div>
                <div className="announcement-actions-vertical">
                  <a href="/pengumuman_penerima.pdf" className="btn btn-download-announcement" download>
                    <i className="fas fa-download"></i>
                    Download PDF
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Kontak Section */}
          <div className="section-bottom">
            <div className="section-header">
              <i className="fas fa-headset"></i>
              <h2>Kontak Person</h2>
            </div>
            <div className="contact-grid-vertical">

              {/* Card 1: Akademik */}
              <div className="contact-card-vertical">
                <div className="contact-card-header-vertical">
                  <div className="contact-icon-vertical academic">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                  <div className="contact-card-info">
                    <h3>Beasiswa Akademik & Non Akademik</h3>
                    <p>Dalam dan Luar Negeri</p>
                  </div>
                </div>
                <div className="contact-card-content">
                  <div className="contact-item-vertical">
                    <div className="contact-details">
                      <span className="contact-name">Helpdesk 1</span>
                      <span className="contact-role">Customer Service</span>
                    </div>
                    <a target="_blank" href={fiqi} className="whatsapp-btn">
                      <i className="fab fa-whatsapp"></i>
                      0896-3032-4926
                    </a>
                  </div>
                  <div className="contact-item-vertical">
                    <div className="contact-details">
                      <span className="contact-name">Helpdesk 2</span>
                      <span className="contact-role">Customer Service</span>
                    </div>
                    <a target="_blank" href={petirc} className="whatsapp-btn">
                      <i className="fab fa-whatsapp"></i>
                      0812-3594-9497
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 2: Keagamaan */}
              <div className="contact-card-vertical">
                <div className="contact-card-header-vertical">
                  <div className="contact-icon-vertical religion">
                    <i className="fas fa-mosque"></i>
                  </div>
                  <div className="contact-card-info">
                    <h3>Beasiswa Bidang Keagamaan</h3>
                    <p>Spesialis Keagamaan</p>
                  </div>
                </div>
                <div className="contact-card-content">
                  <div className="contact-item-vertical">
                    <div className="contact-details">
                      <span className="contact-name">Helpdesk Keagamaan</span>
                      <span className="contact-role">Spesialis Keagamaan</span>
                    </div>
                    <a target="_blank" href={munip} className="whatsapp-btn">
                      <i className="fab fa-whatsapp"></i>
                      0812-3427-8662
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 3: Kurang Mampu */}
              <div className="contact-card-vertical">
                <div className="contact-card-header-vertical">
                  <div className="contact-icon-vertical social">
                    <i className="fas fa-hands-helping"></i>
                  </div>
                  <div className="contact-card-info">
                    <h3>Beasiswa Kurang Mampu</h3>
                    <p>Dinas Sosial</p>
                  </div>
                </div>
                <div className="contact-card-content">
                  <div className="contact-item-vertical">
                    <div className="contact-details">
                      <span className="contact-name">Helpdesk Sosial</span>
                      <span className="contact-role">Dinas Sosial</span>
                    </div>
                    <a target="_blank" href={dinsos} className="whatsapp-btn">
                      <i className="fab fa-whatsapp"></i>
                      0857-1140-4090
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 4: Website */}
              <div className="contact-card-vertical website">
                <div className="contact-card-header-vertical">
                  <div className="contact-icon-vertical website">
                    <i className="fas fa-globe"></i>
                  </div>
                  <div className="contact-card-info">
                    <h3>Pendaftaran Online</h3>
                    <p>Website Resmi</p>
                  </div>
                </div>
                <div className="contact-card-content">
                  <p className="website-description-vertical">
                    Mengisi form dan mengunggah file persyaratan melalui:
                  </p>
                  <a href="https://beasiswa.sidoarjokab.go.id/" className="website-link-vertical">
                    <i className="fas fa-external-link-alt"></i>
                    https://beasiswa.sidoarjokab.go.id/
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        /* ===== VARIABLES & RESET ===== */
        :global(*) {
          box-sizing: border-box;
        }

        /* ===== LAYOUT & CONTAINER ===== */
        .home-container {
          padding: 40px 20px;
        }

        .home-vertical-layout {
          display: flex;
          flex-direction: column;
          gap: 50px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-top, .section-bottom {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(30, 60, 114, 0.1);
          border: 1px solid #e8f0ff;
        }

        /* ===== HERO SECTION ===== */
        .home-hero {
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          color: white;
          padding: 60px 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .home-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        /* ===== HERO COMPONENTS ===== */
        .hero-logo {
          margin-bottom: 25px;
        }

        .logo-container {
          display: inline-block;
          position: relative;
        }

        .logo-image {
          width: 150px;
          height: 150px;
          object-fit: contain;
          background: white;
          border-radius: 20px;
          padding: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          border: 3px solid #ffd700;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 15px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .hero-title .highlight {
          color: #ffd700;
        }

        .hero-subtitle {
          font-size: 1.3rem;
          margin-bottom: 25px;
          opacity: 0.9;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-subtitle .highlight-text {
          color: #ffd700;
          font-weight: 600;
        }

        .hero-divider {
          width: 100px;
          height: 4px;
          background: #ffd700;
          margin: 0 auto;
          border-radius: 2px;
        }

        /* ===== HERO STATS ===== */
        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin: 30px 0;
          flex-wrap: wrap;
        }

        .stat-item {
          text-align: center;
          background: rgba(255, 255, 255, 0.1);
          padding: 20px;
          border-radius: 15px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: #ffd700;
          margin-bottom: 5px;
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.9;
        }

        /* ===== SECTION HEADERS ===== */
        .section-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 30px;
          padding-bottom: 15px;
          border-bottom: 3px solid #1e3c72;
        }

        .section-header i {
          font-size: 2rem;
          color: #1e3c72;
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .section-header h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #1e3c72;
          margin: 0;
        }

        /* ===== ANNOUNCEMENT SECTION ===== */
        .announcement-content-vertical {
          display: flex;
          justify-content: center;
        }

        .announcement-card-vertical {
          text-align: center;
          max-width: 600px;
          width: 100%;
          position: relative;
        }

        .achievement-badge {
          position: absolute;
          top: -15px;
          right: -15px;
          background: linear-gradient(135deg, #ffd700, #ff6b00);
          color: white;
          padding: 8px 15px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 5px;
          z-index: 10;
        }

        .announcement-image-preview-vertical {
          position: relative;
          border-radius: 15px;
          overflow: hidden;
          margin-bottom: 25px;
        }

        .announcement-image-preview-vertical img {
          width: 100%;
          height: auto;
          border-radius: 15px;
        }

        .announcement-actions-vertical {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* ===== CONTACT SECTION ===== */
        .contact-grid-vertical {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
        }

        .contact-card-vertical {
          background: #f8faff;
          border-radius: 16px;
          padding: 25px;
          border: 1px solid #e1e8ff;
          position: relative;
          overflow: hidden;
        }

        .contact-card-vertical::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 5px;
          height: 100%;
          background: linear-gradient(135deg, #1e3c72, #2a5298);
        }

        .contact-card-vertical.website {
          background: linear-gradient(135deg, #f8faff 0%, #e8f0ff 100%);
        }

        .contact-card-header-vertical {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .contact-icon-vertical {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .contact-icon-vertical.academic {
          background: linear-gradient(135deg, #1e3c72, #2a5298);
        }

        .contact-icon-vertical.religion {
          background: linear-gradient(135deg, #2e7d32, #4caf50);
        }

        .contact-icon-vertical.social {
          background: linear-gradient(135deg, #ef6c00, #ff9800);
        }

        .contact-icon-vertical.website {
          background: linear-gradient(135deg, #7b1fa2, #9c27b0);
        }

        .contact-card-info h3 {
          color: #1e3c72;
          font-weight: 700;
          font-size: 1.2rem;
          margin: 0 0 5px 0;
          line-height: 1.3;
        }

        .contact-card-info p {
          color: #666;
          font-size: 0.9rem;
          margin: 0;
        }

        .contact-card-content {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .contact-item-vertical {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 15px;
          background: white;
          border-radius: 10px;
          border: 1px solid #e8f0ff;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
        }

        .contact-name {
          font-weight: 600;
          color: #1e3c72;
          font-size: 0.95rem;
        }

        .contact-role {
          font-size: 0.8rem;
          color: #666;
          margin-top: 2px;
        }

        /* ===== BUTTON STYLES ===== */
        .btn {
          padding: 12px 24px;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .btn-download-announcement {
          background: linear-gradient(135deg, #dc3545, #c82333);
          color: white;
        }

        .whatsapp-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #25D366;
          color: white;
          text-decoration: none;
          padding: 8px 14px;
          border-radius: 8px;
          font-weight: 600;
          white-space: nowrap;
          font-size: 0.9rem;
        }

        .website-description-vertical {
          color: #666;
          margin-bottom: 15px;
          line-height: 1.5;
          font-size: 0.95rem;
        }

        .website-link-vertical {
          display: flex;
          align-items: center;
          gap: 10px;
          background: white;
          color: #1e3c72;
          text-decoration: none;
          padding: 12px 18px;
          border-radius: 10px;
          font-weight: 600;
          border: 2px solid #e8f0ff;
          font-size: 0.9rem;
        }

        /* ===== RESPONSIVE DESIGN ===== */
        @media (max-width: 1024px) {
          .contact-grid-vertical {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .home-hero {
            padding: 40px 0;
          }
          
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
          }
          
          .hero-stats {
            gap: 20px;
          }
          
          .stat-item {
            padding: 15px;
          }
          
          .stat-number {
            font-size: 2rem;
          }
          
          .section-top, .section-bottom {
            padding: 30px 25px;
          }
          
          .contact-grid-vertical {
            grid-template-columns: 1fr;
          }
          
          .contact-item-vertical {
            flex-direction: column;
            gap: 10px;
            text-align: center;
          }
          
          .announcement-actions-vertical {
            flex-direction: column;
            align-items: center;
          }
          
          .btn {
            width: 200px;
            justify-content: center;
          }
        }

        @media (max-width: 576px) {
          .home-container {
            padding: 20px 15px;
          }
          
          .home-hero {
            padding: 30px 0;
          }
          
          .hero-title {
            font-size: 1.8rem;
          }
          
          .section-header {
            flex-direction: column;
            text-align: center;
            gap: 10px;
          }
          
          .section-header h2 {
            font-size: 1.5rem;
          }
          
          .section-top, .section-bottom {
            padding: 25px 20px;
          }
          
          .contact-card-vertical {
            padding: 20px;
          }
          
          .contact-card-header-vertical {
            flex-direction: column;
            text-align: center;
            gap: 10px;
          }
          
          .logo-image {
            width: 120px;
            height: 120px;
          }
        }
      `}</style>
    </LayoutWeb>
  );
}