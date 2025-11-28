import LayoutWeb from "../../../layouts/Web";

export default function Info() {
  // Helpdesk Penerimaan Beasiswa Yatim
  const dinsosYatim = `https://wa.me/6282230338338`;
  const diknasYatim = `https://wa.me/6281336766061`;

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

          {/* PERSYARATAN ADMINISTRASI SECTION */}
          <div className="requirements-section">
            <div className="section-header">
              <i className="fas fa-file-alt"></i>
              <h2>Persyaratan Administrasi</h2>
            </div>
            
            <div className="requirements-header">
              <div className="requirements-intro-card">
                <div className="intro-icon">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <div className="intro-content">
                  <h3>Calon Penerima Beasiswa Anak Yatim</h3>
                  <p>Jenjang SD Negeri, SMP Negeri, dan SMA Negeri</p>
                  <div className="intro-badge">
                    <i className="fas fa-info-circle"></i>
                    Dokumentasi Persyaratan Tahun 2025
                  </div>
                </div>
              </div>
            </div>

            <div className="requirements-grid">
              {/* Proses Pendaftaran */}
              <div className="requirement-card process">
                <div className="card-header">
                  <div className="card-icon">
                    <i className="fas fa-laptop"></i>
                  </div>
                  <h3>Proses Pendaftaran</h3>
                  <div className="card-number">01</div>
                </div>
                <div className="card-content">
                  <p>Sekolah mengajukan permohonan dengan mengisi formulir pendaftaran secara online dan mengunggah dokumen yang dipersyaratkan.</p>
                  <div className="process-steps">
                    <div className="step">
                      <div className="step-number">1</div>
                      <span>Isi formulir online</span>
                    </div>
                    <div className="step">
                      <div className="step-number">2</div>
                      <span>Upload dokumen persyaratan</span>
                    </div>
                    <div className="step">
                      <div className="step-number">3</div>
                      <span>Submit pendaftaran</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Persyaratan Umum */}
              <div className="requirement-card general">
                <div className="card-header">
                  <div className="card-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <h3>Persyaratan Umum</h3>
                  <div className="card-number">02</div>
                </div>
                <div className="card-content">
                  <div className="requirements-list">
                    <div className="requirement-item">
                      <div className="requirement-check">
                        <i className="fas fa-check-circle"></i>
                      </div>
                      <div className="requirement-text">
                        <span>Penduduk Kabupaten Sidoarjo yang dibuktikan dengan <strong>Kartu Keluarga (KK)</strong></span>
                      </div>
                    </div>
                    <div className="requirement-item">
                      <div className="requirement-check">
                        <i className="fas fa-check-circle"></i>
                      </div>
                      <div className="requirement-text">
                        <span>Terdaftar sebagai siswa di sekolah <strong>SD Negeri, SMP Negeri, dan SMA Negeri</strong> yang dibuktikan dengan surat keterangan dari sekolah</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Persyaratan Khusus */}
              <div className="requirement-card special">
                <div className="card-header">
                  <div className="card-icon">
                    <i className="fas fa-user-check"></i>
                  </div>
                  <h3>Persyaratan Khusus</h3>
                  <div className="card-number">03</div>
                </div>
                <div className="card-content">
                  <div className="requirements-list">
                    <div className="requirement-item">
                      <div className="requirement-check">
                        <i className="fas fa-database"></i>
                      </div>
                      <div className="requirement-text">
                        <span>Terdaftar dalam <strong>Data Tunggal Sosial Ekonomi Nasional (DTSEN)</strong> desil 1, 2, 3, 4, dan 5 <strong>ATAU</strong> melampirkan <strong>Surat Keterangan Tidak Mampu (SKTM)</strong> dari Desa/Kelurahan</span>
                      </div>
                    </div>
                    <div className="requirement-item">
                      <div className="requirement-check">
                        <i className="fas fa-file-certificate"></i>
                      </div>
                      <div className="requirement-text">
                        <span><strong>Akte Kematian</strong> yang diterbitkan Dinas Kependudukan dan Pencatatan Sipil <strong>ATAU</strong> <strong>Surat Kematian</strong> yang diterbitkan Desa/Kelurahan</span>
                      </div>
                    </div>
                    <div className="requirement-item">
                      <div className="requirement-check">
                        <i className="fas fa-handshake"></i>
                      </div>
                      <div className="requirement-text">
                        <span>Tidak sedang menerima beasiswa untuk tujuan serupa dari pihak manapun dibuktikan dengan <strong>surat pernyataan tidak menerima beasiswa</strong> dari Lembaga/Donatur lainnya oleh orang tua/wali siswa yang diketahui oleh sekolah</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informasi Tambahan */}
              <div className="requirement-card info">
                <div className="card-header">
                  <div className="card-icon">
                    <i className="fas fa-info-circle"></i>
                  </div>
                  <h3>Informasi Penting</h3>
                  <div className="card-number">04</div>
                </div>
                <div className="card-content">
                  <div className="info-items">
                    <div className="info-item">
                      <div className="info-icon">
                        <i className="fas fa-exclamation-triangle"></i>
                      </div>
                      <div className="info-text">
                        <h4>Dokumen Lengkap</h4>
                        <p>Pastikan semua dokumen sudah lengkap dan valid sebelum mengajukan permohonan</p>
                      </div>
                    </div>
                    <div className="info-item">
                      <div className="info-icon">
                        <i className="fas fa-upload"></i>
                      </div>
                      <div className="info-text">
                        <h4>Format File</h4>
                        <p>Upload dokumen dalam format PDF dengan ukuran maksimal 2MB per file</p>
                      </div>
                    </div>
                    <div className="info-item">
                      <div className="info-icon">
                        <i className="fas fa-clock"></i>
                      </div>
                      <div className="info-text">
                        <h4>Periksa Kembali</h4>
                        <p>Periksa kembali semua persyaratan sebelum melakukan submit pendaftaran</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
          </div>

          {/* Contact Info */}
          <div className="contact-info-section mb-3">
            <div className="contact-header">
              <i className="fas fa-headset contact-main-icon"></i>
              <h2>Informasi Lebih Lanjut</h2>
            </div>
            <p className="contact-description">
              Untuk informasi mengenai program beasiswa di masa mendatang, silakan hubungi helpdesk resmi penerimaan beasiswa
            </p>
            <div className="contact-info-grid">
              <div className="contact-info-card">
                <div className="contact-card-header">
                  <div className="contact-icon dinsos">
                    <i className="fas fa-hands-helping"></i>
                  </div>
                  <div className="contact-card-info">
                    <h3>Dinas Sosial (DINSOS)</h3>
                    <p>Beasiswa Yatim - Byamoga Dinsos</p>
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
                    <p>Beasiswa Yatim - Dinas Pendidikan</p>
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
                      <span className="contact-role">Helpdesk Yatim Dinas Pendidikan</span>
                    </div>
                    <a target="_blank" href={diknasYatim} className="whatsapp-btn">
                      <i className="fab fa-whatsapp"></i>
                      0813-3676-6061
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-info-card website">
                <div className="contact-card-header">
                  <div className="contact-icon website">
                    <i className="fas fa-globe"></i>
                  </div>
                  <div className="contact-card-info">
                    <h3>Website Resmi</h3>
                    <p>Informasi dan Pendaftaran Online</p>
                  </div>
                </div>
                <div className="contact-card-content">
                  <p className="website-description">
                    Untuk informasi terbaru dan pendaftaran online:
                  </p>
                  <a href="https://beasiswa.sidoarjokab.go.id/" className="website-link">
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

        /* PERSYARATAN ADMINISTRASI SECTION */
        .requirements-section {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(30, 60, 114, 0.1);
          border: 1px solid #e8f0ff;
          margin-bottom: 30px;
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
          content: '';
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

        .requirements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 25px;
          margin-bottom: 40px;
        }

        .requirement-card {
          background: white;
          border-radius: 16px;
          padding: 25px;
          box-shadow: 0 5px 20px rgba(30, 60, 114, 0.08);
          border: 1px solid #e8f0ff;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .requirement-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(30, 60, 114, 0.15);
        }

        .requirement-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 5px;
          height: 100%;
        }

        .requirement-card.process::before {
          background: linear-gradient(135deg, #2196F3, #21CBF3);
        }

        .requirement-card.general::before {
          background: linear-gradient(135deg, #4CAF50, #8BC34A);
        }

        .requirement-card.special::before {
          background: linear-gradient(135deg, #FF9800, #FF5722);
        }

        .requirement-card.info::before {
          background: linear-gradient(135deg, #9C27B0, #E91E63);
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

        .requirement-card.process .card-icon {
          background: linear-gradient(135deg, #2196F3, #21CBF3);
        }

        .requirement-card.general .card-icon {
          background: linear-gradient(135deg, #4CAF50, #8BC34A);
        }

        .requirement-card.special .card-icon {
          background: linear-gradient(135deg, #FF9800, #FF5722);
        }

        .requirement-card.info .card-icon {
          background: linear-gradient(135deg, #9C27B0, #E91E63);
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
          background: linear-gradient(135deg, #2196F3, #21CBF3);
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

        .requirements-list {
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

        .requirement-card.general .requirement-check {
          background: linear-gradient(135deg, #4CAF50, #8BC34A);
        }

        .requirement-card.special .requirement-check {
          background: linear-gradient(135deg, #FF9800, #FF5722);
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

        .info-items {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .info-item {
          display: flex;
          gap: 15px;
          padding: 15px;
          background: #fff8e1;
          border-radius: 10px;
          border-left: 3px solid #FF9800;
        }

        .info-icon {
          width: 40px;
          height: 40px;
          background: #FF9800;
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

        /* Archive Notice */
        .archive-notice {
          display: flex;
          align-items: center;
          gap: 20px;
          background: linear-gradient(135deg, #fff3e0, #fff8e1);
          border: 2px solid #ffa000;
          border-radius: 15px;
          padding: 25px;
          margin-top: 30px;
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
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(30, 60, 114, 0.1);
          border: 1px solid #e8f0ff;
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
        }

        .contact-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
        }

        .contact-info-card {
          background: #f8faff;
          border-radius: 16px;
          padding: 25px;
          border: 1px solid #e1e8ff;
          position: relative;
          overflow: hidden;
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

        .contact-info-card.website {
          background: linear-gradient(135deg, #f8faff 0%, #e8f0ff 100%);
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

        .contact-icon.website {
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
          box-shadow: 0 5px 15px rgba(37, 211, 102, 0.3);
        }

        .website-description {
          color: #666;
          margin-bottom: 15px;
          line-height: 1.5;
          font-size: 0.95rem;
        }

        .website-link {
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
          transition: all 0.3s ease;
        }

        .website-link:hover {
          border-color: #1e3c72;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(30, 60, 114, 0.2);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
          }
          
          .requirements-grid {
            grid-template-columns: 1fr;
          }
          
          .contact-info-grid {
            grid-template-columns: 1fr;
          }
          
          .contact-item {
            flex-direction: column;
            gap: 10px;
            text-align: center;
          }
          
          .completion-notice,
          .archive-notice,
          .requirements-intro-card {
            flex-direction: column;
            text-align: center;
          }
          
          .requirements-section {
            padding: 30px 25px;
          }
        }

        @media (max-width: 576px) {
          .info-container {
            padding: 20px 15px;
          }
          
          .contact-info-section,
          .requirements-section {
            padding: 25px 20px;
          }
          
          .contact-info-card,
          .requirement-card {
            padding: 20px;
          }
          
          .contact-card-header,
          .card-header {
            flex-direction: column;
            text-align: center;
            gap: 10px;
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
          
          .section-header {
            flex-direction: column;
            text-align: center;
            gap: 10px;
          }
          
          .section-header h2 {
            font-size: 1.5rem;
          }
          
          .requirements-intro-card h3 {
            font-size: 1.3rem;
          }
          
          .requirement-item,
          .info-item {
            padding: 12px;
          }
        }
      `}</style>
    </LayoutWeb>
  );
}