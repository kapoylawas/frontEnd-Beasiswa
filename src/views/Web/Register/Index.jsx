import { useEffect, useState } from "react";
import LayoutWeb from "../../../layouts/Web";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Api from "../../../services/Api";
import Logo from "../../../../public/images/lock.svg";
import Select from "react-select";

export default function Register() {
  document.title = "Pendaftaran Beasiswa - Beasiswa Sidoarjo";

  const navigate = useNavigate();

  // Helpdesk Penerimaan Beasiswa Yatim
  const dinsosYatim = `https://wa.me/6282230338338`;
  const diknasYatim = `https://wa.me/6281336766061`;

  const [showPersyaratan, setShowPersyaratan] = useState(false);

  return (
    <LayoutWeb>
      <div className="register-container">
        {/* Hero Section */}
        <div className="home-hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-logo">
                <div className="logo-container">
                  <img
                    src="/sidoarjo.png"
                    alt="Logo Sidoarjo"
                    className="logo-image"
                  />
                </div>
              </div>
              <h1 className="hero-title">
                Beasiswa <span className="highlight">Sidoarjo 2025</span>
              </h1>
              <p className="hero-subtitle">
                Program Beasiswa Sidoarjo 2025 telah
                <span className="highlight-text"> berhasil diselenggarakan</span>
              </p>
              <div className="completion-badge">
                <i className="fas fa-check-circle"></i>
                <span>Program Telah Selesai</span>
              </div>
              <div className="hero-divider"></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container main-container mt-5 mb-5">
          <div className="transition-notice">
            <div className="transition-card">
              <div className="transition-icon">
                <i className="fas fa-info-circle"></i>
              </div>
              <div className="transition-content">
                <h2>Informasi Perubahan Program Beasiswa</h2>
                <p>
                  <strong>Pendaftaran Beasiswa Universitas/Mahasiswa telah ditutup.</strong> 
                  Saat ini program beasiswa difokuskan untuk jenjang pendidikan SD, SMP, dan SMA.
                </p>
              </div>
            </div>
          </div>

          {/* Maintenance Section - Updated */}
          <div className="maintenance-section">
            <div className="maintenance-card">
              <div className="maintenance-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h2>Pendaftaran Beasiswa Universitas Telah Ditutup</h2>
              <p className="maintenance-description">
                Masa pendaftaran beasiswa untuk jenjang universitas/perguruan tinggi telah berakhir. 
                Program saat ini berfokus pada beasiswa pendidikan dasar dan menengah.
              </p>
              
              <div className="current-program-info">
                <div className="program-badge">
                  <i className="fas fa-arrow-right"></i>
                  <span>Program Aktif Saat Ini</span>
                </div>
                <h3>Beasiswa SD, SMP, SMA Sidoarjo</h3>
                <p>Bantuan pendidikan bagi siswa berprestasi dan kurang mampu di Kabupaten Sidoarjo</p>
              </div>

              <div className="maintenance-image">
                <img src={Logo} alt="Pendaftaran Ditutup" />
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="contact-info-section">
            <div className="contact-header">
              <i className="fas fa-headset contact-main-icon"></i>
              <h2>Informasi dan Bantuan</h2>
            </div>
            <p className="contact-description">
              Untuk informasi mengenai beasiswa SD, SMP, SMA, silakan hubungi helpdesk resmi atau koordinator di sekolah masing-masing
            </p>
            
            <div className="contact-info-grid">
              <div className="contact-info-card">
                <div className="contact-card-header">
                  <div className="contact-icon dinsos">
                    <i className="fas fa-hands-helping"></i>
                  </div>
                  <div className="contact-card-info">
                    <h3>Dinas Sosial (DINSOS)</h3>
                    <p>Beasiswa Yatim & Kurang Mampu</p>
                    <div className="contact-badge">
                      <i className="fas fa-child"></i>
                      SD, SMP, SMA
                    </div>
                  </div>
                </div>
                <div className="contact-card-content">
                  <div className="contact-item">
                    <div className="contact-details">
                      <span className="contact-name">Byamoga Dinsos</span>
                      <span className="contact-role">Helpdesk Yatim Dinas Sosial</span>
                    </div>
                    <a target="_blank" href={dinsosYatim} className="whatsapp-btn">
                      <i className="fab fa-whatsapp"></i>
                      0822-3303-8338
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-card-header">
                  <div className="contact-icon diknas">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                  <div className="contact-card-info">
                    <h3>Dinas Pendidikan (DIKNAS)</h3>
                    <p>Beasiswa Prestasi & Akademik</p>
                    <div className="contact-badge">
                      <i className="fas fa-child"></i>
                      SD, SMP, SMA
                    </div>
                  </div>
                </div>
                <div className="contact-card-content">
                  <div className="contact-item">
                    <div className="contact-details">
                      <span className="contact-name">Helpdesk Diknas</span>
                      <span className="contact-role">Helpdesk Dinas Pendidikan</span>
                    </div>
                    <a target="_blank" href={diknasYatim} className="whatsapp-btn">
                      <i className="fab fa-whatsapp"></i>
                      0813-3676-6061
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-info-card school">
                <div className="contact-card-header">
                  <div className="contact-icon school">
                    <i className="fas fa-school"></i>
                  </div>
                  <div className="contact-card-info">
                    <h3>Admin Sekolah</h3>
                    <p>Koordinasi Langsung</p>
                  </div>
                </div>
                <div className="contact-card-content">
                  <div className="school-info">
                    <p>Hubungi admin atau wali kelas di sekolah masing-masing untuk informasi:</p>
                    <ul className="school-list">
                      <li>
                        <i className="fas fa-check"></i>
                        Jadwal pendaftaran
                      </li>
                      <li>
                        <i className="fas fa-check"></i>
                        Persyaratan dokumen
                      </li>
                      <li>
                        <i className="fas fa-check"></i>
                        Proses seleksi
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="additional-info">
              <div className="info-box">
                <div className="info-icon">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <div className="info-text">
                  <h4>Penting!</h4>
                  <p>Pastikan berkoordinasi dengan pihak sekolah terlebih dahulu sebelum menghubungi helpdesk.</p>
                </div>
              </div>
            </div>
          </div>          
        </div>
      </div>

      <style jsx>{`
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
          margin-bottom: 20px;
          opacity: 0.9;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-subtitle .highlight-text {
          color: #ffd700;
          font-weight: 600;
        }

        .completion-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 215, 0, 0.2);
          color: #ffd700;
          padding: 10px 20px;
          border-radius: 25px;
          font-weight: 600;
          margin-bottom: 25px;
          border: 2px solid #ffd700;
        }

        .completion-badge i {
          font-size: 1.2rem;
        }

        .hero-divider {
          width: 100px;
          height: 4px;
          background: #ffd700;
          margin: 0 auto;
          border-radius: 2px;
        }

        /* ===== MAIN CONTAINER ===== */
        .main-container {
          padding: 40px 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ===== TRANSITION NOTICE ===== */
        .transition-notice {
          margin-bottom: 30px;
        }

        .transition-card {
          display: flex;
          align-items: center;
          gap: 20px;
          background: linear-gradient(135deg, #fff3e0, #fff8e1);
          border: 2px solid #ffa000;
          border-radius: 15px;
          padding: 25px;
        }

        .transition-icon {
          width: 60px;
          height: 60px;
          background: #ffa000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .transition-content h2 {
          color: #e65100;
          margin: 0 0 10px 0;
          font-size: 1.4rem;
        }

        .transition-content p {
          color: #555;
          margin: 0;
          line-height: 1.5;
        }

        /* ===== MAINTENANCE SECTION ===== */
        .maintenance-section {
          margin-bottom: 50px;
        }

        .maintenance-card {
          background: white;
          border-radius: 20px;
          padding: 50px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          border: 2px solid #e8f0ff;
        }

        .maintenance-icon {
          font-size: 4rem;
          color: #dc3545;
          margin-bottom: 20px;
        }

        .maintenance-card h2 {
          color: #dc3545;
          margin-bottom: 15px;
          font-size: 1.8rem;
        }

        .maintenance-description {
          color: #666;
          margin-bottom: 30px;
          font-size: 1.1rem;
          line-height: 1.6;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .current-program-info {
          background: #f8faff;
          border-radius: 15px;
          padding: 25px;
          margin: 30px 0;
          border-left: 5px solid #1e3c72;
        }

        .program-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #1e3c72;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
          margin-bottom: 15px;
          font-size: 0.9rem;
        }

        .current-program-info h3 {
          color: #1e3c72;
          margin: 0 0 10px 0;
          font-size: 1.4rem;
        }

        .current-program-info p {
          color: #555;
          margin: 0;
          line-height: 1.5;
        }

        .maintenance-image img {
          max-width: 200px;
          height: auto;
          opacity: 0.7;
        }

        /* ===== CONTACT INFO SECTION ===== */
        .contact-info-section {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(30, 60, 114, 0.1);
          border: 1px solid #e8f0ff;
          margin-bottom: 50px;
        }

        .contact-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-bottom: 15px;
          padding-bottom: 20px;
          border-bottom: 3px solid #1e3c72;
        }

        .contact-header .contact-main-icon {
          font-size: 2rem;
          color: #1e3c72;
        }

        .contact-header h2 {
          margin: 0;
          font-size: 2rem;
          color: #1e3c72;
        }

        .contact-description {
          font-size: 1.1rem;
          margin-bottom: 30px;
          color: #555;
          text-align: center;
          line-height: 1.6;
        }

        .contact-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
          margin-bottom: 30px;
        }

        .contact-info-card {
          background: #f8faff;
          border-radius: 16px;
          padding: 25px;
          border: 1px solid #e1e8ff;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .contact-info-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(30, 60, 114, 0.15);
        }

        .contact-info-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 5px;
          height: 100%;
          background: linear-gradient(135deg, #1e3c72, #2a5298);
        }

        .contact-info-card.school {
          background: linear-gradient(135deg, #f0fff4, #f0fff8);
        }

        .contact-card-header {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          margin-bottom: 20px;
        }

        .contact-icon {
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

        .contact-icon.dinsos {
          background: linear-gradient(135deg, #ef6c00, #ff9800);
        }

        .contact-icon.diknas {
          background: linear-gradient(135deg, #2e7d32, #4caf50);
        }

        .contact-icon.school {
          background: linear-gradient(135deg, #7b1fa2, #9c27b0);
        }

        .contact-card-info h3 {
          color: #1e3c72;
          font-weight: 700;
          font-size: 1.2rem;
          margin: 0 0 8px 0;
          line-height: 1.3;
        }

        .contact-card-info p {
          color: #666;
          font-size: 0.9rem;
          margin: 0 0 8px 0;
        }

        .contact-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #ffeb3b;
          color: #8d6e00;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .contact-card-content {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .contact-item {
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
          transition: all 0.3s ease;
        }

        .whatsapp-btn:hover {
          background: #128C7E;
          transform: translateY(-2px);
        }

        .school-info p {
          color: #666;
          margin-bottom: 15px;
          line-height: 1.5;
        }

        .school-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .school-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
          color: #555;
        }

        .school-list li i {
          color: #10b981;
        }

        .additional-info {
          margin-top: 30px;
        }

        .info-box {
          display: flex;
          align-items: center;
          gap: 15px;
          background: #fff3e0;
          border: 1px solid #ffb74d;
          border-radius: 12px;
          padding: 20px;
        }

        .info-icon {
          width: 40px;
          height: 40px;
          background: #ff9800;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .info-text h4 {
          color: #e65100;
          margin: 0 0 5px 0;
          font-size: 1.1rem;
        }

        .info-text p {
          color: #555;
          margin: 0;
          line-height: 1.5;
        }

        /* ===== PROGRAM INFO SECTION ===== */
        .program-info-section {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(30, 60, 114, 0.1);
          border: 1px solid #e8f0ff;
        }

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
        }

        .section-header h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #1e3c72;
          margin: 0;
        }

        .program-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
        }

        .program-card {
          background: #f8faff;
          border-radius: 15px;
          padding: 30px;
          text-align: center;
          border: 1px solid #e1e8ff;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .program-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(30, 60, 114, 0.15);
        }

        .program-icon {
          width: 80px;
          height: 80px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 2rem;
          color: white;
        }

        .program-icon.sd {
          background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
        }

        .program-icon.smp {
          background: linear-gradient(135deg, #4ecdc4, #44a08d);
        }

        .program-icon.sma {
          background: linear-gradient(135deg, #45b7d1, #96c93d);
        }

        .program-card h3 {
          color: #1e3c72;
          margin: 0 0 15px 0;
          font-size: 1.4rem;
        }

        .program-card p {
          color: #666;
          margin-bottom: 20px;
          line-height: 1.5;
        }

        .program-features {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .program-features span {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #555;
          font-size: 0.9rem;
        }

        .program-features i {
          color: #10b981;
        }

        /* ===== RESPONSIVE DESIGN ===== */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }

          .main-container {
            padding: 20px 15px;
          }

          .transition-card {
            flex-direction: column;
            text-align: center;
            padding: 20px;
          }

          .maintenance-card {
            padding: 30px 20px;
          }

          .contact-info-section {
            padding: 25px 20px;
          }

          .contact-info-grid {
            grid-template-columns: 1fr;
          }

          .contact-item {
            flex-direction: column;
            gap: 10px;
            text-align: center;
          }

          .program-info-section {
            padding: 25px 20px;
          }

          .program-grid {
            grid-template-columns: 1fr;
          }

          .section-header {
            flex-direction: column;
            text-align: center;
            gap: 10px;
          }

          .section-header h2 {
            font-size: 1.5rem;
          }

          .info-box {
            flex-direction: column;
            text-align: center;
          }
        }

        @media (max-width: 576px) {
          .hero-title {
            font-size: 1.8rem;
          }

          .logo-image {
            width: 120px;
            height: 120px;
          }

          .contact-header {
            flex-direction: column;
            text-align: center;
            gap: 10px;
          }

          .contact-header h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </LayoutWeb>
  );
}