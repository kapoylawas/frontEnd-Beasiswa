import LayoutWeb from "../../../layouts/Web";

export default function Home() {
  // Helpdesk Penerimaan Beasiswa Yatim
  const dinsosYatim = `https://wa.me/6282230338338`;
  const diknasYatim = `https://wa.me/6281336766061`;

  // Helpdesk tambahan yang diminta
  const dinsos2 = `https://wa.me/6285711404090`;
  const kesra1 = `https://wa.me/6285646151120`;
  const kesra2 = `https://wa.me/6281230881999`;
  const disporapar1 = `https://wa.me/6282332008658`;
  const disporapar2 = `https://wa.me/6281235949497`;

  return (
    <LayoutWeb>
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
              Beasiswa <span className="highlight">Sidoarjo 2026 </span>
            </h1>

            <p className="hero-subtitle">
              Program Beasiswa Sidoarjo telah
              <span className="highlight-text"> diselenggarakan</span>
            </p>

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
                  <span>Program Diselenggarakan</span>
                </div>
                <div className="announcement-image-preview-vertical">
                  <img
                    src="/2026_fix.png"
                    alt="Pengumuman Beasiswa"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Persyaratan Administrasi Section */}

          {/* Informasi Helpdesk Section */}

          {/* Kontak Section */}
          <div className="section-bottom" id="helpdesk">
            <div className="section-header">
              <i className="fas fa-headset"></i>
              <h2>Kontak Helpdesk Resmi</h2>
            </div>
            <div className="contact-grid-vertical">
              {/* Card 1: Dinsos Yatim */}
              <div className="contact-card-vertical">
                <div className="contact-card-header-vertical">
                  <div className="contact-icon-vertical dinsos">
                    <i className="fas fa-hands-helping"></i>
                  </div>
                  <div className="contact-card-info">
                    <h3>Dinas Sosial (DINSOS)</h3>
                    <p>Beasiswa Pendidikan Tinggi Kurang Mampu</p>
                    <div className="contact-badge">
                      <i className="fas fa-child"></i>
                      SMA dan PERGURUAN TINGGI
                    </div>
                  </div>
                </div>
                <div className="contact-card-content">
                  <div className="contact-item-vertical">
                    <div className="contact-details">
                      <span className="contact-name">Byamoga Dinsos</span>
                      <span className="contact-role">
                        Helpdesk Yatim Dinas Sosial
                      </span>
                    </div>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={dinsosYatim}
                      className="whatsapp-btn"
                    >
                      <i className="fab fa-whatsapp"></i>
                      0822-3303-8338
                    </a>
                  </div>
                  <div className="contact-item-vertical">
                    <div className="contact-details">
                      <span className="contact-name">Dinsos 2</span>
                      <span className="contact-role">
                        Helpdesk Tambahan Dinsos
                      </span>
                    </div>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={dinsos2}
                      className="whatsapp-btn"
                    >
                      <i className="fab fa-whatsapp"></i>
                      0857-1140-4090
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 2: Diknas Yatim */}
              <div className="contact-card-vertical">
                <div className="contact-card-header-vertical">
                  <div className="contact-icon-vertical diknas">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                  <div className="contact-card-info">
                    <h3>Dinas Pendidikan dan Kebudayaan (DISPENDIK)</h3>
                    <p>Beasiswa Anak Yatim</p>
                    <div className="contact-badge">
                      <i className="fas fa-child"></i>
                      SD, SMP
                    </div>
                  </div>
                </div>
                <div className="contact-card-content">
                  <div className="contact-item-vertical">
                    <div className="contact-details">
                      <span className="contact-name">Helpdesk Diknas</span>
                      <span className="contact-role">
                        Helpdesk Yatim Dinas Pendidikan
                      </span>
                    </div>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={diknasYatim}
                      className="whatsapp-btn"
                    >
                      <i className="fab fa-whatsapp"></i>
                      0813-3676-6061
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 3: KESRA */}
              <div className="contact-card-vertical">
                <div className="contact-card-header-vertical">
                  <div className="contact-icon-vertical kesra">
                    <i className="fas fa-handshake"></i>
                  </div>
                  <div className="contact-card-info">
                    <h3>Kesra</h3>
                    <p>Beasiswa Bidang Keagamaan</p>
                    <div className="contact-badge">
                      <i className="fas fa-child"></i>
                      PERGURUAN TINGGI
                    </div>
                  </div>
                </div>
                <div className="contact-card-content">
                  <div className="contact-item-vertical">
                    <div className="contact-details">
                      <span className="contact-name">KESRA 1</span>
                      <span className="contact-role">Helpdesk Kesra</span>
                    </div>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={kesra1}
                      className="whatsapp-btn"
                    >
                      <i className="fab fa-whatsapp"></i>
                      0856-4615-1120
                    </a>
                  </div>
                  <div className="contact-item-vertical">
                    <div className="contact-details">
                      <span className="contact-name">KESRA 2</span>
                      <span className="contact-role">Helpdesk Kesra</span>
                    </div>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={kesra2}
                      className="whatsapp-btn"
                    >
                      <i className="fab fa-whatsapp"></i>
                      0812-3088-1999
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 4: Disporapar */}
              <div className="contact-card-vertical">
                <div className="contact-card-header-vertical">
                  <div className="contact-icon-vertical disporapar">
                    <i className="fas fa-running"></i>
                  </div>
                  <div className="contact-card-info">
                    <h3>Dinas Pemuda Olahraga dan Pariwisata(Disporapar)</h3>
                    <p>Beasiswa Prestasi</p>
                    <div className="contact-badge">
                      <i className="fas fa-child"></i>
                      PERGURUAN TINGGI
                    </div>
                  </div>
                </div>
                <div className="contact-card-content">
                  <div className="contact-item-vertical">
                    <div className="contact-details">
                      <span className="contact-name">Disporapar 1</span>
                      <span className="contact-role">Helpdesk Disporapar</span>
                    </div>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={disporapar1}
                      className="whatsapp-btn"
                    >
                      <i className="fab fa-whatsapp"></i>
                      0823-3200-8658
                    </a>
                  </div>
                  <div className="contact-item-vertical">
                    <div className="contact-details">
                      <span className="contact-name">Disporapar 2</span>
                      <span className="contact-role">Helpdesk Disporapar</span>
                    </div>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={disporapar2}
                      className="whatsapp-btn"
                    >
                      <i className="fab fa-whatsapp"></i>
                      0812-3594-9497
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 5: Website */}
              <div className="contact-card-vertical website">
                <div className="contact-card-header-vertical">
                  <div className="contact-icon-vertical website">
                    <i className="fas fa-globe"></i>
                  </div>
                  <div className="contact-card-info">
                    <h3>Pendaftaran Online</h3>
                    <p>Website Resmi Beasiswa</p>
                  </div>
                </div>
                <div className="contact-card-content">
                  <p className="website-description-vertical">
                    Untuk pendaftaran dan informasi lebih lanjut, kunjungi
                    website resmi:
                  </p>
                  <a
                    href="https://beasiswa.sidoarjokab.go.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="website-link-vertical"
                  >
                    <i className="fas fa-external-link-alt"></i>
                    https://beasiswa.sidoarjokab.go.id/
                  </a>
                  <div className="website-info">
                    <i className="fas fa-info-circle"></i>
                    <span>Form online dan upload persyaratan</span>
                  </div>
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

        .section-top,
        .section-bottom,
        .section-info,
        .section-requirements {
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
          content: "";
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
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
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

        /* ===== PERSYARATAN SECTION - DESAIN BARU ===== */
        .requirements-header {
          margin-bottom: 40px;
        }

        .requirements-intro-card {
          display: flex;
          align-items: center;
          gap: 20px;
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          color: white;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(30, 60, 114, 0.2);
          position: relative;
          overflow: hidden;
        }

        .requirements-intro-card::before {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 200px;
          height: 200px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          transform: translate(30%, -30%);
        }

        .intro-icon {
          width: 70px;
          height: 70px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          flex-shrink: 0;
        }

        .intro-content {
          flex: 1;
        }

        .intro-content h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 10px 0;
        }

        .intro-content p {
          font-size: 1.1rem;
          opacity: 0.9;
          margin: 0 0 15px 0;
        }

        .intro-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.2);
          padding: 8px 15px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .requirements-grid-new {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 25px;
          margin-bottom: 40px;
        }

        .requirement-card-new {
          background: white;
          border-radius: 16px;
          padding: 25px;
          box-shadow: 0 5px 20px rgba(30, 60, 114, 0.08);
          border: 1px solid #e8f0ff;
          position: relative;
          overflow: hidden;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .requirement-card-new:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(30, 60, 114, 0.15);
        }

        .requirement-card-new::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 5px;
          height: 100%;
        }

        .requirement-card-new.process::before {
          background: linear-gradient(135deg, #2196f3, #21cbf3);
        }

        .requirement-card-new.general::before {
          background: linear-gradient(135deg, #4caf50, #8bc34a);
        }

        .requirement-card-new.special::before {
          background: linear-gradient(135deg, #ff9800, #ff5722);
        }

        .requirement-card-new.info::before {
          background: linear-gradient(135deg, #9c27b0, #e91e63);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
          position: relative;
        }

        .card-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.3rem;
        }

        .requirement-card-new.process .card-icon {
          background: linear-gradient(135deg, #2196f3, #21cbf3);
        }

        .requirement-card-new.general .card-icon {
          background: linear-gradient(135deg, #4caf50, #8bc34a);
        }

        .requirement-card-new.special .card-icon {
          background: linear-gradient(135deg, #ff9800, #ff5722);
        }

        .requirement-card-new.info .card-icon {
          background: linear-gradient(135deg, #9c27b0, #e91e63);
        }

        .card-header h3 {
          color: #1e3c72;
          font-weight: 700;
          font-size: 1.2rem;
          margin: 0;
          flex: 1;
        }

        .card-number {
          position: absolute;
          top: -15px;
          right: -15px;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
          box-shadow: 0 4px 10px rgba(30, 60, 114, 0.3);
        }

        .card-content p {
          color: #555;
          line-height: 1.6;
          margin-bottom: 15px;
        }

        .process-steps {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .step {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px;
          background: #f8faff;
          border-radius: 8px;
        }

        .step-number {
          width: 25px;
          height: 25px;
          background: linear-gradient(135deg, #2196f3, #21cbf3);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .step span {
          color: #444;
          font-size: 0.9rem;
        }

        .requirements-list-new {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .requirement-item {
          display: flex;
          gap: 12px;
          padding: 15px;
          background: #f8faff;
          border-radius: 10px;
          border-left: 3px solid #1e3c72;
        }

        .requirement-check {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.8rem;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .requirement-card-new.general .requirement-check {
          background: linear-gradient(135deg, #4caf50, #8bc34a);
        }

        .requirement-card-new.special .requirement-check {
          background: linear-gradient(135deg, #ff9800, #ff5722);
        }

        .requirement-text {
          flex: 1;
        }

        .requirement-text span {
          color: #444;
          line-height: 1.5;
          font-size: 0.95rem;
        }

        .requirement-text strong {
          color: #1e3c72;
          font-weight: 600;
        }

        .info-items-new {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .info-item-new {
          display: flex;
          gap: 15px;
          padding: 15px;
          background: #fff8e1;
          border-radius: 10px;
          border-left: 3px solid #ff9800;
        }

        .info-icon {
          width: 40px;
          height: 40px;
          background: #ff9800;
          color: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
        }

        .info-text h4 {
          color: #1e3c72;
          font-weight: 600;
          font-size: 1rem;
          margin: 0 0 5px 0;
        }

        .info-text p {
          color: #666;
          font-size: 0.9rem;
          margin: 0;
          line-height: 1.4;
        }

        .requirements-cta {
          background: linear-gradient(135deg, #f8faff, #e8f0ff);
          border-radius: 16px;
          padding: 30px;
          text-align: center;
          border: 1px solid #e1e8ff;
        }

        .cta-content h3 {
          color: #1e3c72;
          font-weight: 700;
          font-size: 1.5rem;
          margin: 0 0 10px 0;
        }

        .cta-content p {
          color: #666;
          font-size: 1rem;
          margin: 0 0 20px 0;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* ===== INFORMASI SECTION ===== */
        .info-content {
          display: flex;
          justify-content: center;
        }

        .info-card {
          display: flex;
          align-items: center;
          gap: 20px;
          background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
          padding: 25px;
          border-radius: 15px;
          border-left: 5px solid #1e3c72;
          max-width: 800px;
          width: 100%;
        }

        .info-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .info-text h3 {
          color: #1e3c72;
          font-weight: 700;
          margin: 0 0 10px 0;
          font-size: 1.3rem;
        }

        .info-text p {
          color: #555;
          margin: 0;
          line-height: 1.6;
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

        /* ===== CONTACT SECTION ===== */
        .contact-grid-vertical {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
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
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 5px;
          height: 100%;
        }

        .contact-card-vertical:nth-child(1)::before {
          background: linear-gradient(135deg, #ef6c00, #ff9800);
        }
        .contact-card-vertical:nth-child(2)::before {
          background: linear-gradient(135deg, #2e7d32, #4caf50);
        }
        .contact-card-vertical:nth-child(3)::before {
          background: linear-gradient(135deg, #2196f3, #21cbf3);
        }
        .contact-card-vertical:nth-child(4)::before {
          background: linear-gradient(135deg, #9c27b0, #e91e63);
        }
        .contact-card-vertical.website::before {
          background: linear-gradient(135deg, #7b1fa2, #9c27b0);
        }

        .contact-card-vertical.website {
          background: linear-gradient(135deg, #f8faff 0%, #e8f0ff 100%);
        }

        .contact-card-header-vertical {
          display: flex;
          align-items: flex-start;
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

        .contact-icon-vertical.dinsos {
          background: linear-gradient(135deg, #ef6c00, #ff9800);
        }

        .contact-icon-vertical.diknas {
          background: linear-gradient(135deg, #2e7d32, #4caf50);
        }

        .contact-icon-vertical.kesra {
          background: linear-gradient(135deg, #2196f3, #21cbf3);
        }

        .contact-icon-vertical.disporapar {
          background: linear-gradient(135deg, #9c27b0, #e91e63);
        }

        .contact-icon-vertical.website {
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
          transition: all 0.3s ease;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .btn-primary {
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          color: white;
        }

        .btn-secondary {
          background: linear-gradient(135deg, #6c757d, #5a6268);
          color: white;
        }

        .whatsapp-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #25d366;
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
          background: #128c7e;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(37, 211, 102, 0.3);
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
          margin-bottom: 10px;
          transition: all 0.3s ease;
        }

        .website-link-vertical:hover {
          border-color: #1e3c72;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(30, 60, 114, 0.2);
        }

        .website-info {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #666;
          font-size: 0.85rem;
        }

        /* ===== RESPONSIVE DESIGN ===== */
        @media (max-width: 1024px) {
          .contact-grid-vertical {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          }

          .requirements-grid-new {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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

          .section-top,
          .section-bottom,
          .section-info,
          .section-requirements {
            padding: 30px 25px;
          }

          .contact-grid-vertical {
            grid-template-columns: 1fr;
          }

          .requirements-grid-new {
            grid-template-columns: 1fr;
          }

          .contact-item-vertical {
            flex-direction: column;
            gap: 10px;
            text-align: center;
          }

          .btn {
            width: 200px;
            justify-content: center;
          }

          .info-card {
            flex-direction: column;
            text-align: center;
            padding: 20px;
          }

          .requirement-card-new {
            padding: 20px;
          }

          .requirements-intro-card {
            flex-direction: column;
            text-align: center;
            padding: 25px;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
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

          .section-top,
          .section-bottom,
          .section-info,
          .section-requirements {
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

          .info-text h3 {
            font-size: 1.1rem;
          }

          .requirements-intro-card h3 {
            font-size: 1.3rem;
          }

          .requirement-item {
            padding: 12px;
          }

          .info-item-new {
            padding: 12px;
          }
        }
      `}</style>
    </LayoutWeb>
  );
}
