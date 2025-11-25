import LayoutWeb from "../../../layouts/Web";

export default function Info() {
  const fiqi = `https://wa.me/6289630324926`;
  const petirc = `https://wa.me/6281235949497`;
  const munip = `https://wa.me/6281234278662`;
  const dinsos = `https://wa.me/6285711404090`;

  return (
    <LayoutWeb>
      {/* Hero Section */}
      <div className="info-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-logo">
              <div className="logo-container">
                <img
                  src="/sidoarjo.png"
                  alt="Logo Kabupaten Sidoarjo"
                  className="logo-image"
                />
              </div>
            </div>
            <h1 className="hero-title">
              Persyaratan Beasiswa 2025
            </h1>
            <p className="hero-subtitle">
              Program Beasiswa Sidoarjo 2025 telah
              <span className="highlight"> berhasil diselenggarakan</span>
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
      <div className="container info-container mt-3 mb-2">
        <div className="info-content">

          {/* Quick Navigation */}
          {/* <div className="quick-nav">
            <h3>Informasi Program 2025</h3>
            <div className="nav-buttons">
              <a href="#pengajuan" className="nav-btn">
                <i className="fas fa-file-contract"></i>
                Proses Pengajuan
              </a>
              <a href="#umum" className="nav-btn">
                <i className="fas fa-clipboard-list"></i>
                Persyaratan Umum
              </a>
              <a href="#khusus" className="nav-btn">
                <i className="fas fa-tasks"></i>
                Persyaratan Khusus
              </a>
            </div>
          </div> */}

          {/* Completion Notice */}
          <div className="completion-notice">
            <div className="notice-icon">
              <i className="fas fa-flag-checkered"></i>
            </div>
            <div className="notice-content">
              <h3>Program Beasiswa 2025 Telah Berakhir</h3>
              <p>Berikut adalah dokumentasi persyaratan yang digunakan dalam seleksi beasiswa tahun 2025. Informasi ini disimpan untuk referensi dan arsip.</p>
            </div>
          </div>

          <div className="requirements-grid">

            {/* Card 1: Pengajuan Permohonan */}
            {/* <div className="requirement-card completed-card" id="pengajuan">
              <div className="card-header">
                <div className="card-icon application">
                  <i className="fas fa-file-signature"></i>
                </div>
                <div className="card-title">
                  <h2>1. Proses Pengajuan Permohonan</h2>
                  <span className="card-badge completed">Selesai</span>
                </div>
              </div>
              <div className="card-content">
                <p className="card-description">
                  Mahasiswa telah mengajukan permohonan melalui formulir pendaftaran online dengan mengunggah dokumen yang dipersyaratkan.
                </p>
                <div className="process-steps">
                  <div className="process-step completed-step">
                    <div className="step-number">
                      <i className="fas fa-check"></i>
                    </div>
                    <div className="step-content">
                      <strong>Formulir Online Terisi</strong>
                      <span>Melalui website resmi beasiswa</span>
                    </div>
                  </div>
                  <div className="process-step completed-step">
                    <div className="step-number">
                      <i className="fas fa-check"></i>
                    </div>
                    <div className="step-content">
                      <strong>Dokumen Terunggah</strong>
                      <span>Semua persyaratan telah dikumpulkan</span>
                    </div>
                  </div>
                  <div className="process-step completed-step">
                    <div className="step-number">
                      <i className="fas fa-check"></i>
                    </div>
                    <div className="step-content">
                      <strong>Permohonan Tersubmit</strong>
                      <span>Proses seleksi telah dilakukan</span>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Card 2: Persyaratan Umum */}
            {/* <div className="requirement-card completed-card" id="umum">
              <div className="card-header">
                <div className="card-icon general">
                  <i className="fas fa-user-check"></i>
                </div>
                <div className="card-title">
                  <h2>2. Persyaratan Umum</h2>
                  <span className="card-badge completed">Terpenuhi</span>
                </div>
              </div>
              <div className="card-content">
                <div className="requirements-list">
                  <div className="requirement-item completed-item">
                    <div className="requirement-icon population">
                      <i className="fas fa-id-card-alt"></i>
                    </div>
                    <div className="requirement-details">
                      <h4>Kependudukan Sidoarjo</h4>
                      <p>Penduduk Kabupaten Sidoarjo dengan Kartu Keluarga (KK) dan KTP-el yang valid</p>
                      <div className="completion-tag">
                        <i className="fas fa-check"></i>
                        Telah diverifikasi
                      </div>
                    </div>
                  </div>

                  <div className="requirement-item completed-item">
                    <div className="requirement-icon student">
                      <i className="fas fa-user-graduate"></i>
                    </div>
                    <div className="requirement-details">
                      <h4>Status Mahasiswa Aktif</h4>
                      <p>Terdaftar sebagai mahasiswa aktif di Perguruan Tinggi terakreditasi</p>
                      <div className="completion-tag">
                        <i className="fas fa-check"></i>
                        Telah diverifikasi
                      </div>
                    </div>
                  </div>

                  <div className="requirement-item completed-item">
                    <div className="requirement-icon exclusive">
                      <i className="fas fa-hand-holding-usd"></i>
                    </div>
                    <div className="requirement-details">
                      <h4>Tidak Menerima Beasiswa Lain</h4>
                      <p>Tidak sedang menerima beasiswa lain selama periode program</p>
                      <div className="completion-tag">
                        <i className="fas fa-check"></i>
                        Telah diverifikasi
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Card 3: Persyaratan Khusus */}
            {/* <div className="requirement-card completed-card" id="khusus">
              <div className="card-header">
                <div className="card-icon special">
                  <i className="fas fa-award"></i>
                </div>
                <div className="card-title">
                  <h2>3. Persyaratan Khusus</h2>
                  <span className="card-badge completed">Terverifikasi</span>
                </div>
              </div>
              <div className="card-content">

                <div className="special-requirement completed-special">
                  <div className="special-header">
                    <div className="special-icon academic">
                      <i className="fas fa-brain"></i>
                    </div>
                    <h3>Beasiswa Prestasi Bidang Akademik</h3>
                  </div>
                  <div className="completion-status">
                    <i className="fas fa-check-circle"></i>
                    Kriteria telah diterapkan dalam seleksi
                  </div>
                  <div className="requirement-variants">
                    <div className="variant-card completed-variant">
                      <div className="variant-header">
                        <i className="fas fa-university domestic"></i>
                        <h4>Dalam Negeri</h4>
                      </div>
                      <div className="variant-content">
                        <div className="criteria">
                          <i className="fas fa-check success"></i>
                          <span>IPK minimal <strong>3.4</strong></span>
                        </div>
                        <p>Telah diverifikasi melalui transkrip nilai</p>
                      </div>
                    </div>

                    <div className="variant-card completed-variant">
                      <div className="variant-header">
                        <i className="fas fa-globe-americas international"></i>
                        <h4>Luar Negeri</h4>
                      </div>
                      <div className="variant-content">
                        <div className="criteria">
                          <i className="fas fa-check success"></i>
                          <span>IPK/GPA memenuhi syarat</span>
                        </div>
                        <p>Telah diverifikasi melalui transkrip resmi</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="special-requirement completed-special">
                  <div className="special-header">
                    <div className="special-icon non-academic">
                      <i className="fas fa-trophy"></i>
                    </div>
                    <h3>Beasiswa Prestasi Bidang Non Akademik</h3>
                  </div>
                  <div className="completion-status">
                    <i className="fas fa-check-circle"></i>
                    Prestasi telah dinilai dan diverifikasi
                  </div>
                  <div className="requirement-single completed-single">
                    <div className="criteria">
                      <i className="fas fa-check success"></i>
                      <span>Prestasi di berbagai bidang</span>
                    </div>
                    <p>Bukti prestasi dalam <strong>4 tahun terakhir</strong> telah dinilai</p>
                  </div>
                </div>

                <div className="special-requirement completed-special">
                  <div className="special-header">
                    <div className="special-icon social">
                      <i className="fas fa-hands-helping"></i>
                    </div>
                    <h3>Beasiswa Mahasiswa Kurang Mampu</h3>
                  </div>
                  <div className="completion-status">
                    <i className="fas fa-check-circle"></i>
                    Verifikasi kondisi ekonomi telah dilakukan
                  </div>
                  <div className="requirement-single completed-single">
                    <div className="criteria-options">
                      <div className="option completed-option">
                        <i className="fas fa-database dtks"></i>
                        <span>Terdaftar dalam DTKS</span>
                      </div>
                      <div className="option-divider">ATAU</div>
                      <div className="option completed-option">
                        <i className="fas fa-file-certificate sktm"></i>
                        <span>SKTM dari Desa</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="special-requirement completed-special">
                  <div className="special-header">
                    <div className="special-icon religion">
                      <i className="fas fa-praying-hands"></i>
                    </div>
                    <h3>Beasiswa Bidang Keagamaan</h3>
                  </div>
                  <div className="completion-status">
                    <i className="fas fa-check-circle"></i>
                    Kriteria keagamaan telah dinilai
                  </div>
                  <div className="religion-requirements">
                    <div className="religion-grid">
                      <div className="religion-item completed-religion">
                        <i className="fas fa-quran quran"></i>
                        <span>Hafal minimal 10 juz Al-Qur'an</span>
                      </div>
                      <div className="religion-item completed-religion">
                        <i className="fas fa-medal mtq"></i>
                        <span>Pernah mengikuti MTQ</span>
                      </div>
                      <div className="religion-item completed-religion">
                        <i className="fas fa-mosque pesantren"></i>
                        <span>Santri di Pondok Pesantren</span>
                      </div>
                      <div className="religion-item completed-religion">
                        <i className="fas fa-users-cog organization"></i>
                        <span>Pengurus organisasi keagamaan</span>
                      </div>
                      <div className="religion-item completed-religion">
                        <i className="fas fa-star achievement"></i>
                        <span>Prestasi bidang keagamaan</span>
                      </div>
                      <div className="religion-item completed-religion">
                        <i className="fas fa-chalkboard-teacher teacher"></i>
                        <span>Guru ngaji TPA/TPQ/Madin</span>
                      </div>
                      <div className="religion-item completed-religion full-width">
                        <i className="fas fa-hands non-muslim"></i>
                        <span>Mahasiswa Non Muslim dengan bukti keaktifan di bidang keagamaan</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div> */}

          </div>

          {/* Archive Notice */}
          <div className="archive-notice">
            <div className="archive-icon">
              <i className="fas fa-archive"></i>
            </div>
            <div className="archive-content">
              <h3>Dokumentasi Program 2025</h3>
              <p>Halaman ini merupakan arsip resmi persyaratan beasiswa Sidoarjo tahun 2025. Program telah berakhir dan semua persyaratan telah diverifikasi.</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="contact-info-section">
            <div className="contact-header">
              <i className="fas fa-headset contact-main-icon"></i>
              <h2>Informasi Lebih Lanjut</h2>
            </div>
            <p className="contact-description">
              Untuk informasi mengenai program beasiswa di masa mendatang, silakan hubungi helpdesk kami
            </p>
            <div className="contact-buttons">
              <a target="_blank" href={fiqi} className="contact-btn whatsapp-btn">
                <i className="fab fa-whatsapp"></i>
                Helpdesk Akademik & Non Akademik
              </a>
              <a target="_blank" href={munip} className="contact-btn religion-btn">
                <i className="fab fa-whatsapp"></i>
                Helpdesk Keagamaan
              </a>
              <a target="_blank" href={dinsos} className="contact-btn social-btn">
                <i className="fab fa-whatsapp"></i>
                Helpdesk Kurang Mampu
              </a>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        /* Hero Section */
        .info-hero {
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          color: white;
          padding: 60px 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .info-hero::before {
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

        /* Logo Styles */
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
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 15px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .hero-subtitle {
          font-size: 1.2rem;
          margin-bottom: 20px;
          opacity: 0.9;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-subtitle .highlight {
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

        /* Main Container */
        .info-container {
          padding: 40px 20px;
        }

        .info-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Quick Navigation */
        .quick-nav {
          background: white;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 5px 20px rgba(30, 60, 114, 0.1);
          margin-bottom: 30px;
          border: 1px solid #e8f0ff;
        }

        .quick-nav h3 {
          color: #1e3c72;
          margin-bottom: 15px;
          font-size: 1.3rem;
        }

        .nav-buttons {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .nav-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #f8faff;
          color: #1e3c72;
          text-decoration: none;
          padding: 12px 20px;
          border-radius: 10px;
          font-weight: 600;
          border: 2px solid transparent;
        }

        .nav-btn:hover {
          background: #1e3c72;
          color: white;
        }

        .nav-btn i {
          font-size: 1.1rem;
        }

        /* Completion Notice */
        .completion-notice {
          display: flex;
          align-items: center;
          gap: 20px;
          background: linear-gradient(135deg, #e8f5e8, #f0f8f0);
          border: 2px solid #4caf50;
          border-radius: 15px;
          padding: 25px;
          margin-bottom: 30px;
        }

        .notice-icon {
          width: 60px;
          height: 60px;
          background: #4caf50;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .notice-content h3 {
          color: #2e7d32;
          margin: 0 0 10px 0;
          font-size: 1.3rem;
        }

        .notice-content p {
          color: #555;
          margin: 0;
          line-height: 1.5;
        }

        /* Requirements Grid */
        .requirements-grid {
          display: flex;
          flex-direction: column;
          gap: 30px;
          margin-bottom: 50px;
        }

        /* Completed Card Styles */
        .requirement-card.completed-card {
          background: white;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 5px 20px rgba(30, 60, 114, 0.1);
          border: 2px solid #e8f5e8;
          position: relative;
        }

        .requirement-card.completed-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 5px;
          height: 100%;
          background: #4caf50;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 25px;
          padding-bottom: 20px;
          border-bottom: 2px solid #f0f5ff;
        }

        /* Card Icons */
        .card-icon {
          width: 70px;
          height: 70px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.8rem;
        }

        .card-icon.application {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .card-icon.general {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        .card-icon.special {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }

        .card-title h2 {
          color: #1e3c72;
          font-size: 1.8rem;
          font-weight: 700;
          margin: 0 0 5px 0;
        }

        .card-badge.completed {
          background: #4caf50;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        /* Process Steps - Completed */
        .process-steps {
          display: flex;
          gap: 20px;
          margin-top: 20px;
        }

        .process-step.completed-step {
          display: flex;
          align-items: center;
          gap: 15px;
          flex: 1;
          opacity: 0.8;
        }

        .step-number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #4caf50;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .step-content {
          display: flex;
          flex-direction: column;
        }

        .step-content strong {
          color: #1e3c72;
          font-size: 1rem;
        }

        .step-content span {
          color: #666;
          font-size: 0.9rem;
        }

        /* Requirements List - Completed */
        .requirements-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .requirement-item.completed-item {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          padding: 20px;
          background: #f8faff;
          border-radius: 12px;
          border-left: 4px solid #4caf50;
          opacity: 0.9;
        }

        .requirement-icon {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.3rem;
          flex-shrink: 0;
        }

        .requirement-icon.population {
          background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
        }

        .requirement-icon.student {
          background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%);
        }

        .requirement-icon.exclusive {
          background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
        }

        .requirement-details h4 {
          color: #1e3c72;
          margin: 0 0 8px 0;
          font-size: 1.1rem;
        }

        .requirement-details p {
          color: #555;
          margin: 0 0 10px 0;
          line-height: 1.5;
        }

        .completion-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #e8f5e8;
          color: #2e7d32;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        /* Special Requirements - Completed */
        .special-requirement.completed-special {
          margin-bottom: 30px;
          padding-bottom: 25px;
          border-bottom: 1px solid #e8f0ff;
          opacity: 0.9;
        }

        .special-requirement.completed-special:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }

        .special-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
        }

        .special-icon {
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

        .special-icon.academic {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .special-icon.non-academic {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        .special-icon.social {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }

        .special-icon.religion {
          background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
        }

        .special-header h3 {
          color: #1e3c72;
          font-size: 1.4rem;
          margin: 0;
        }

        .completion-status {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #e8f5e8;
          color: #2e7d32;
          padding: 8px 15px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 15px;
          width: fit-content;
        }

        /* Requirement Variants - Completed */
        .requirement-variants {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 15px;
        }

        .variant-card.completed-variant {
          background: #f8faff;
          border-radius: 12px;
          padding: 20px;
          border: 1px solid #e1e8ff;
          opacity: 0.9;
        }

        .variant-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }

        .variant-header i {
          font-size: 1.3rem;
        }

        .variant-header .domestic {
          color: #667eea;
        }

        .variant-header .international {
          color: #00f2fe;
        }

        .variant-header h4 {
          color: #1e3c72;
          margin: 0;
          font-size: 1.1rem;
        }

        .variant-content .criteria {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }

        .variant-content .criteria i.success {
          color: #4caf50;
        }

        .variant-content p {
          color: #666;
          margin: 0;
          font-size: 0.9rem;
        }

        /* Single Requirement - Completed */
        .requirement-single.completed-single {
          background: #f8faff;
          border-radius: 12px;
          padding: 20px;
          margin-top: 15px;
          opacity: 0.9;
        }

        .criteria-options {
          display: flex;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .option.completed-option {
          display: flex;
          align-items: center;
          gap: 8px;
          background: white;
          padding: 10px 15px;
          border-radius: 8px;
          border: 1px solid #e1e8ff;
          opacity: 0.9;
        }

        .option i.dtks {
          color: #4facfe;
        }

        .option i.sktm {
          color: #f5576c;
        }

        .option-divider {
          color: #666;
          font-weight: 600;
          font-size: 0.9rem;
        }

        /* Religion Requirements - Completed */
        .religion-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
          margin-top: 15px;
        }

        .religion-item.completed-religion {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px;
          background: #f8faff;
          border-radius: 10px;
          border-left: 3px solid #7b1fa2;
          opacity: 0.9;
        }

        .religion-item.full-width {
          grid-column: 1 / -1;
        }

        .religion-item i {
          font-size: 1.1rem;
          width: 20px;
          text-align: center;
        }

        .religion-item .quran { color: #ff6b6b; }
        .religion-item .mtq { color: #4ecdc4; }
        .religion-item .pesantren { color: #45b7d1; }
        .religion-item .organization { color: #96ceb4; }
        .religion-item .achievement { color: #feca57; }
        .religion-item .teacher { color: #ff9ff3; }
        .religion-item .non-muslim { color: #54a0ff; }

        .religion-item span {
          color: #555;
          font-size: 0.95rem;
        }

        /* Archive Notice */
        .archive-notice {
          display: flex;
          align-items: center;
          gap: 20px;
          background: linear-gradient(135deg, #fff3e0, #fff8e1);
          border: 2px solid #ffa000;
          border-radius: 15px;
          padding: 25px;
          margin-bottom: 30px;
        }

        .archive-icon {
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

        .archive-content h3 {
          color: #e65100;
          margin: 0 0 10px 0;
          font-size: 1.3rem;
        }

        .archive-content p {
          color: #555;
          margin: 0;
          line-height: 1.5;
        }

        /* Contact Info Section */
        .contact-info-section {
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          border-radius: 20px;
          padding: 40px;
          text-align: center;
          color: white;
        }

        .contact-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-bottom: 15px;
        }

        .contact-header .contact-main-icon {
          font-size: 2rem;
          color: #ffd700;
        }

        .contact-header h2 {
          margin: 0;
          font-size: 2rem;
        }

        .contact-description {
          font-size: 1.1rem;
          margin-bottom: 25px;
          opacity: 0.9;
        }

        .contact-buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .contact-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          text-decoration: none;
          padding: 15px 25px;
          border-radius: 10px;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .contact-btn:hover {
          background: white;
        }

        .contact-btn.whatsapp-btn:hover { color: #25D366; }
        .contact-btn.religion-btn:hover { color: #7b1fa2; }
        .contact-btn.social-btn:hover { color: #4facfe; }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
          }
          
          .nav-buttons {
            flex-direction: column;
          }
          
          .process-steps {
            flex-direction: column;
            gap: 15px;
          }
          
          .requirement-variants {
            grid-template-columns: 1fr;
          }
          
          .criteria-options {
            flex-direction: column;
            align-items: stretch;
          }
          
          .option-divider {
            text-align: center;
          }
          
          .contact-buttons {
            flex-direction: column;
          }
          
          .contact-btn {
            justify-content: center;
          }
          
          .completion-notice,
          .archive-notice {
            flex-direction: column;
            text-align: center;
          }
        }

        @media (max-width: 576px) {
          .info-container {
            padding: 20px 15px;
          }
          
          .requirement-card {
            padding: 20px;
          }
          
          .card-header {
            flex-direction: column;
            text-align: center;
            gap: 15px;
          }
          
          .special-header {
            flex-direction: column;
            text-align: center;
            gap: 10px;
          }
          
          .religion-grid {
            grid-template-columns: 1fr;
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