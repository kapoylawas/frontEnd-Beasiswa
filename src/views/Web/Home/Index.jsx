import LayoutWeb from "../../../layouts/Web";
import { useState, useEffect } from "react";

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

  // Modal state
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);

  useEffect(() => {
    // Show modal automatically when page loads
    setShowAnnouncementModal(true);
  }, []);

  const handleCloseModal = () => {
    setShowAnnouncementModal(false);
  };

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
          {/* Download Section */}
          <div className="section-download" id="download">
            <div className="section-header">
              <i className="fas fa-download"></i>
              <h2>Pengumuman Beasiswa 2026</h2>
            </div>

            {/* Banner Image */}
            <div className="page-banner-wrapper">
              <img src="/banner2026.jpg" alt="Banner Beasiswa 2026" className="page-banner-image" />
            </div>

            {/* SK Download Banner */}
            <div className="sk-download-banner-page">
              <div className="sk-banner-content">
                <div className="sk-banner-icon">
                  <i className="fas fa-file-pdf"></i>
                </div>
                <div className="sk-banner-text">
                  <h3>Pengumuman Penerima Beasiswa 2026</h3>
                  <p>Download pengumuman penerima beasiswa Pemerintah Kabupaten Sidoarjo</p>
                </div>
              </div>
              <a
                href="/penerima_beasiswa.pdf"
                download
                className="btn-download-sk-page"
              >
                <i className="fas fa-download"></i>
                <span>Download Pengumuman</span>
              </a>
            </div>

            {/* Section Divider */}
            <div className="section-divider-page">
              <div className="divider-icon-wrapper-page">
                <i className="fas fa-file-word"></i>
              </div>
              <h3>Template SPTJM</h3>
              <p>Download dan isi formulir SPTJM sesuai kategori beasiswa Anda</p>
            </div>

            {/* SPJMT Download Cards */}
            <div className="download-grid-page">
              <div className="download-card-page">
                <div className="card-badge-page prestasi">Prestasi & Keagamaan</div>
                <div className="download-icon-page prestasi">
                  <i className="fas fa-trophy"></i>
                </div>
                <div className="download-content-page">
                  <h4>Beasiswa Prestasi & Keagamaan</h4>
                  <p className="download-category-page">Mahasiswa</p>
                  <a
                    href="/spjmt_mahasiswa.docx"
                    download
                    className="btn-download-file-page"
                  >
                    <i className="fas fa-download"></i>
                    <span>Download Template</span>
                  </a>
                </div>
              </div>

              <div className="download-card-page">
                <div className="card-badge-page yatim-sd">Yatim SD & SMP</div>
                <div className="download-icon-page yatim-sd">
                  <i className="fas fa-child"></i>
                </div>
                <div className="download-content-page">
                  <h4>Beasiswa Yatim SD & SMP</h4>
                  <p className="download-category-page">SD / SMP</p>
                  <a
                    href="/spjmt_yatimsdsmp.docx"
                    download
                    className="btn-download-file-page"
                  >
                    <i className="fas fa-download"></i>
                    <span>Download Template</span>
                  </a>
                </div>
              </div>

              <div className="download-card-page">
                <div className="card-badge-page kurang-mampu">Kurang Mampu</div>
                <div className="download-icon-page kurang-mampu">
                  <i className="fas fa-hand-holding-heart"></i>
                </div>
                <div className="download-content-page">
                  <h4>Beasiswa Kurang Mampu</h4>
                  <p className="download-category-page">Mahasiswa</p>
                  <a
                    href="/SPTJMBEASISWA_KURANGMAMPU.docx"
                    download
                    className="btn-download-file-page"
                  >
                    <i className="fas fa-download"></i>
                    <span>Download Template</span>
                  </a>
                </div>
              </div>

              <div className="download-card-page">
                <div className="card-badge-page yatim-sma">Yatim SMA</div>
                <div className="download-icon-page yatim-sma">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <div className="download-content-page">
                  <h4>Beasiswa Yatim SMA</h4>
                  <p className="download-category-page">SMA</p>
                  <a
                    href="/SPTJMYATIM_SMA.docx"
                    download
                    className="btn-download-file-page"
                  >
                    <i className="fas fa-download"></i>
                    <span>Download Template</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="download-note-page">
              <i className="fas fa-lightbulb"></i>
              <div>
                <p className="note-title-page">
                  <i className="fas fa-info-circle"></i>
                  Petunjuk Pengisian
                </p>
                <ul className="note-steps-page">
                  <li>
                    <span className="step-icon-page">1</span>
                    <span>Download template SPTJM sesuai kategori beasiswa Anda</span>
                  </li>
                  <li>
                    <span className="step-icon-page">2</span>
                    <span>Isi formulir SPTJM dengan lengkap dan benar</span>
                  </li>
                  <li>
                    <span className="step-icon-page">3</span>
                    <span>Login ke sistem dan upload file SPTJM yang sudah diisi</span>
                  </li>
                  <li>
                    <span className="step-icon-page">4</span>
                    <span>Pastikan upload dilakukan sebelum <strong>18 Mei 2026</strong></span>
                  </li>
                </ul>
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

      {/* Modal Pengumuman Penerima Beasiswa */}
      {showAnnouncementModal && (
        <div
          className="announcement-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseModal();
            }
          }}
        >
          <div className="announcement-modal-container">
            <div className="announcement-modal-header">
              <div className="header-icon">
                <i className="fas fa-bullhorn"></i>
              </div>
              <div className="header-content">
                <h2>Pengumuman Penerima Beasiswa Tahun 2026</h2>
                <p>Pemerintah Kabupaten Sidoarjo</p>
              </div>
              <button className="modal-close-btn" onClick={handleCloseModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="announcement-modal-info">
              <div className="info-section-title">
                <i className="fas fa-bell"></i>
                <h3>Petunjuk Penting</h3>
              </div>
              
              <div className="info-card-grid">
                <div className="info-card-item primary">
                  <div className="info-card-icon">
                    <i className="fas fa-user-check"></i>
                  </div>
                  <div className="info-card-content">
                    <h4>Untuk Penerima Beasiswa Umum</h4>
                    <p className="info-highlight">
                      Jika nama Anda tercantum dalam penerima beasiswa, segera lakukan:
                    </p>
                    <ul className="info-steps">
                      <li>
                        <span className="step-badge">1</span>
                        <span>Login ke akun Anda di sistem</span>
                      </li>
                      <li>
                        <span className="step-badge">2</span>
                        <span>Upload file SPTJM yang telah diisi</span>
                      </li>
                      <li>
                        <span className="step-badge">3</span>
                        <span>Contoh format SPTJM tersedia di dashboard setelah login</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="info-card-item yatim">
                  <div className="info-card-icon">
                    <i className="fas fa-school"></i>
                  </div>
                  <div className="info-card-content">
                    <h4>Untuk Penerima Beasiswa Yatim</h4>
                    <p className="info-highlight">
                      Bagi penerima beasiswa yatim yang namanya tercantum, harap:
                    </p>
                    <div className="info-highlight-box">
                      <i className="fas fa-phone-alt"></i>
                      <p>
                        <strong>Hubungi admin sekolah masing-masing</strong> untuk melakukan upload SPTJM dan kelengkapan berkas lainnya.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="info-note">
                <i className="fas fa-exclamation-triangle"></i>
                <div className="info-note-content">
                  <p className="info-note-title">
                    <strong>Perhatian:</strong> Batas Waktu Upload Berkas
                  </p>
                  <p className="info-note-deadline">
                    <i className="fas fa-calendar-alt"></i>
                    <span>Batas akhir upload SPTJM dan berkas kelengkapan:</span>
                    <strong>18 Mei 2026</strong>
                  </p>
                  <p className="info-note-warning">
                    Keterlambatan upload berkas dapat berpengaruh pada proses pencairan beasiswa.
                    Harap segera lengkapi berkas Anda sebelum batas waktu yang ditentukan.
                  </p>
                </div>
              </div>
            </div>

            <div className="announcement-modal-body">
              {/* SK Download Section - Top */}
              <div className="sk-download-banner">
                <div className="sk-banner-content">
                  <div className="sk-banner-icon">
                    <i className="fas fa-file-pdf"></i>
                  </div>
                  <div className="sk-banner-text">
                    <h3>Surat Keputusan Penerima Beasiswa 2026</h3>
                    <p>Download pengumuman penerima beasiswa Pemerintah Kabupaten Sidoarjo</p>
                  </div>
                </div>
                <a
                  href="/penerima_beasiswa.pdf"
                  download
                  className="btn-download-sk"
                >
                  <i className="fas fa-download"></i>
                  <span>Download Pengumuman</span>
                </a>
              </div>

              {/* Divider */}
              <div className="section-divider">
                <div className="divider-icon-wrapper">
                  <i className="fas fa-file-word"></i>
                </div>
                <h3>Template SPTJM</h3>
                <p>Download dan isi formulir SPTJM sesuai kategori beasiswa Anda</p>
              </div>

              {/* SPJMT Download Section */}
              <div className="download-section">
                <div className="download-grid">
                  <div className="download-card">
                    <div className="card-badge prestasi">Prestasi & Keagamaan</div>
                    <div className="download-icon prestasi">
                      <i className="fas fa-trophy"></i>
                    </div>
                    <div className="download-content">
                      <h4>Beasiswa Prestasi & Keagamaan</h4>
                      <p className="download-category">Mahasiswa</p>
                      <a
                        href="/spjmt_mahasiswa.docx"
                        download
                        className="btn-download-file"
                      >
                        <i className="fas fa-download"></i>
                        <span>Download Template</span>
                      </a>
                    </div>
                  </div>

                  <div className="download-card">
                    <div className="card-badge yatim-sd">Yatim SD & SMP</div>
                    <div className="download-icon yatim-sd">
                      <i className="fas fa-child"></i>
                    </div>
                    <div className="download-content">
                      <h4>Beasiswa Yatim SD & SMP</h4>
                      <p className="download-category">SD / SMP</p>
                      <a
                        href="/spjmt_yatimsdsmp.docx"
                        download
                        className="btn-download-file"
                      >
                        <i className="fas fa-download"></i>
                        <span>Download Template</span>
                      </a>
                    </div>
                  </div>

                  <div className="download-card">
                    <div className="card-badge kurang-mampu">Kurang Mampu</div>
                    <div className="download-icon kurang-mampu">
                      <i className="fas fa-hand-holding-heart"></i>
                    </div>
                    <div className="download-content">
                      <h4>Beasiswa Kurang Mampu</h4>
                      <p className="download-category">Mahasiswa</p>
                      <a
                        href="/SPTJMBEASISWA_KURANGMAMPU.docx"
                        download
                        className="btn-download-file"
                      >
                        <i className="fas fa-download"></i>
                        <span>Download Template</span>
                      </a>
                    </div>
                  </div>

                  <div className="download-card">
                    <div className="card-badge yatim-sma">Yatim SMA</div>
                    <div className="download-icon yatim-sma">
                      <i className="fas fa-graduation-cap"></i>
                    </div>
                    <div className="download-content">
                      <h4>Beasiswa Yatim SMA</h4>
                      <p className="download-category">SMA</p>
                      <a
                        href="/SPTJMYATIM_SMA.docx"
                        download
                        className="btn-download-file"
                      >
                        <i className="fas fa-download"></i>
                        <span>Download Template</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="download-note">
                  <i className="fas fa-lightbulb"></i>
                  <div>
                    <p className="note-title">
                      <i className="fas fa-info-circle"></i>
                      Petunjuk Pengisian
                    </p>
                    <ul className="note-steps">
                      <li>
                        <span className="step-icon">1</span>
                        <span>Download template SPTJM sesuai kategori beasiswa Anda</span>
                      </li>
                      <li>
                        <span className="step-icon">2</span>
                        <span>Isi formulir SPTJM dengan lengkap dan benar</span>
                      </li>
                      <li>
                        <span className="step-icon">3</span>
                        <span>Login ke sistem dan upload file SPTJM yang sudah diisi</span>
                      </li>
                      <li>
                        <span className="step-icon">4</span>
                        <span>Pastikan upload dilakukan sebelum <strong>18 Mei 2026</strong></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="announcement-modal-footer">
              <button className="btn-close-modal" onClick={handleCloseModal}>
                <i className="fas fa-times"></i>
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* ===== VARIABLES & RESET ===== */
        :global(*) {
          box-sizing: border-box;
        }

        /* ===== ANNOUNCEMENT MODAL ===== */
        .announcement-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(5px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .announcement-modal-container {
          background: white;
          border-radius: 20px;
          width: 100%;
          max-width: 1200px;
          max-height: 90vh;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
          animation: slideUp 0.4s ease;
          display: flex;
          flex-direction: column;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .announcement-modal-header {
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          color: white;
          padding: 25px 30px;
          display: flex;
          align-items: center;
          gap: 20px;
          position: relative;
        }

        .header-icon {
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          flex-shrink: 0;
        }

        .header-content {
          flex: 1;
        }

        .header-content h2 {
          font-size: 1.6rem;
          font-weight: 700;
          margin: 0 0 5px 0;
        }

        .header-content p {
          font-size: 0.95rem;
          opacity: 0.9;
          margin: 0;
        }

        .modal-close-btn {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 50%;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: rotate(90deg);
        }

        .announcement-modal-info {
          padding: 25px 30px;
          background: linear-gradient(135deg, #f8faff 0%, #e8f0ff 100%);
          border-bottom: 2px solid #e1e8ff;
        }

        .info-section-title {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 2px solid #1e3c72;
        }

        .info-section-title i {
          font-size: 1.5rem;
          color: #1e3c72;
          animation: ring 2s ease-in-out infinite;
        }

        @keyframes ring {
          0%, 100% { transform: rotate(0deg); }
          10%, 30% { transform: rotate(-10deg); }
          20%, 40% { transform: rotate(10deg); }
          50% { transform: rotate(0deg); }
        }

        .info-section-title h3 {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1e3c72;
          margin: 0;
        }

        .info-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .info-card-item {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 15px rgba(30, 60, 114, 0.08);
          border-left: 4px solid #2196f3;
          transition: all 0.3s ease;
        }

        .info-card-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(30, 60, 114, 0.15);
        }

        .info-card-item.yatim {
          border-left-color: #ff9800;
        }

        .info-card-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          margin-bottom: 15px;
          color: white;
        }

        .info-card-item.primary .info-card-icon {
          background: linear-gradient(135deg, #2196f3, #21cbf3);
        }

        .info-card-item.yatim .info-card-icon {
          background: linear-gradient(135deg, #ff9800, #ff5722);
        }

        .info-card-content h4 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1e3c72;
          margin: 0 0 12px 0;
        }

        .info-highlight {
          color: #555;
          font-size: 0.9rem;
          margin-bottom: 15px;
          line-height: 1.5;
        }

        .info-steps {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .info-steps li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          color: #444;
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .step-badge {
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #2196f3, #21cbf3);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .info-highlight-box {
          background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
          border: 2px solid #ffc107;
          border-radius: 10px;
          padding: 15px;
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .info-highlight-box i {
          font-size: 1.5rem;
          color: #ff9800;
          margin-top: 2px;
        }

        .info-highlight-box p {
          color: #856404;
          font-size: 0.9rem;
          line-height: 1.5;
          margin: 0;
        }

        .info-highlight-box strong {
          color: #856404;
          font-weight: 700;
        }

        .info-note {
          background: linear-gradient(135deg, #ffe5e5 0%, #ffcccc 100%);
          border: 2px solid #ff4444;
          border-radius: 10px;
          padding: 15px;
          display: flex;
          gap: 15px;
          align-items: flex-start;
        }

        .info-note i {
          font-size: 1.5rem;
          color: #ff4444;
          flex-shrink: 0;
          margin-top: 3px;
        }

        .info-note-content {
          flex: 1;
        }

        .info-note-title {
          color: #a00000;
          font-size: 1rem;
          font-weight: 700;
          margin: 0 0 10px 0;
        }

        .info-note-deadline {
          background: white;
          border: 2px solid #ff4444;
          border-radius: 8px;
          padding: 12px 15px;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .info-note-deadline i {
          font-size: 1.3rem;
          color: #ff4444;
        }

        .info-note-deadline span {
          color: #a00000;
          font-size: 0.95rem;
        }

        .info-note-deadline strong {
          color: #d00000;
          font-size: 1.1rem;
          font-weight: 800;
          background: linear-gradient(135deg, #ff4444, #d00000);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .info-note-warning {
          color: #a00000;
          font-size: 0.9rem;
          line-height: 1.5;
          margin: 0;
        }

        .announcement-modal-body {
          flex: 1;
          overflow: auto;
          padding: 0;
          background: linear-gradient(135deg, #f8faff 0%, #e8f0ff 100%);
        }

        /* SK Download Banner */
        .sk-download-banner {
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          color: white;
          padding: 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          box-shadow: 0 4px 15px rgba(30, 60, 114, 0.2);
        }

        .sk-banner-content {
          display: flex;
          align-items: center;
          gap: 20px;
          flex: 1;
        }

        .sk-banner-icon {
          width: 70px;
          height: 70px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          flex-shrink: 0;
        }

        .sk-banner-text h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 8px 0;
        }

        .sk-banner-text p {
          font-size: 0.95rem;
          opacity: 0.9;
          margin: 0;
          line-height: 1.5;
        }

        .btn-download-sk {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: white;
          color: #1e3c72;
          padding: 15px 30px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 700;
          font-size: 1rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          flex-shrink: 0;
        }

        .btn-download-sk:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          color: #1e3c72;
        }

        .btn-download-sk i {
          font-size: 1.2rem;
        }

        /* Section Divider */
        .section-divider {
          text-align: center;
          padding: 30px;
          background: white;
          border-bottom: 2px solid #e1e8ff;
          position: relative;
        }

        .divider-icon-wrapper {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #f8faff 0%, #e8f0ff 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
          border: 3px solid #1e3c72;
        }

        .divider-icon-wrapper i {
          font-size: 2.5rem;
          color: #1e3c72;
        }

        .section-divider h3 {
          font-size: 1.6rem;
          font-weight: 700;
          color: #1e3c72;
          margin: 0 0 8px 0;
        }

        .section-divider p {
          color: #666;
          font-size: 0.95rem;
          margin: 0;
        }

        .download-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 30px;
        }

        .download-section-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 3px solid #1e3c72;
        }

        .download-section-header i {
          font-size: 2rem;
          color: #1e3c72;
        }

        .download-section-header h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e3c72;
          margin: 0;
        }

        .download-description {
          color: #555;
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .download-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 25px;
        }

        .download-card {
          background: white;
          border-radius: 16px;
          padding: 25px;
          box-shadow: 0 4px 15px rgba(30, 60, 114, 0.08);
          border: 2px solid #e1e8ff;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 15px;
          position: relative;
          overflow: hidden;
        }

        .download-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
        }

        .download-card:nth-child(1)::before {
          background: linear-gradient(135deg, #9c27b0, #e91e63);
        }

        .download-card:nth-child(2)::before {
          background: linear-gradient(135deg, #4caf50, #8bc34a);
        }

        .download-card:nth-child(3)::before {
          background: linear-gradient(135deg, #2196f3, #21cbf3);
        }

        .download-card:nth-child(4)::before {
          background: linear-gradient(135deg, #ff9800, #ff5722);
        }

        .download-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(30, 60, 114, 0.18);
          border-color: #1e3c72;
        }

        .card-badge {
          position: absolute;
          top: 12px;
          right: -30px;
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          color: white;
          padding: 5px 40px;
          font-size: 0.75rem;
          font-weight: 700;
          transform: rotate(45deg);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .card-badge.prestasi {
          background: linear-gradient(135deg, #9c27b0, #e91e63);
        }

        .card-badge.yatim-sd {
          background: linear-gradient(135deg, #4caf50, #8bc34a);
        }

        .card-badge.kurang-mampu {
          background: linear-gradient(135deg, #2196f3, #21cbf3);
        }

        .card-badge.yatim-sma {
          background: linear-gradient(135deg, #ff9800, #ff5722);
        }

        .download-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: white;
        }

        .download-icon.prestasi {
          background: linear-gradient(135deg, #9c27b0, #e91e63);
        }

        .download-icon.yatim-sd {
          background: linear-gradient(135deg, #4caf50, #8bc34a);
        }

        .download-icon.kurang-mampu {
          background: linear-gradient(135deg, #2196f3, #21cbf3);
        }

        .download-icon.yatim-sma {
          background: linear-gradient(135deg, #ff9800, #ff5722);
        }

        .download-content h4 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1e3c72;
          margin: 0 0 8px 0;
          line-height: 1.3;
        }

        .download-category {
          color: #666;
          font-size: 0.9rem;
          margin: 0 0 15px 0;
          display: inline-block;
          background: #f8faff;
          padding: 4px 10px;
          border-radius: 6px;
          font-weight: 600;
        }

        .btn-download-file {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          color: white;
          padding: 12px 24px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          width: 100%;
          max-width: 250px;
        }

        .btn-download-file:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(30, 60, 114, 0.3);
          color: white;
        }

        .btn-download-file i {
          font-size: 1rem;
        }

        .download-note {
          background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
          border: 2px solid #ffc107;
          border-radius: 12px;
          padding: 25px;
          display: flex;
          gap: 15px;
          align-items: flex-start;
        }

        .download-note > i {
          font-size: 1.8rem;
          color: #ff9800;
          flex-shrink: 0;
          margin-top: 3px;
        }

        .note-title {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #856404;
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 15px 0;
        }

        .note-title i {
          color: #ff9800;
          font-size: 1.2rem;
        }

        .note-steps {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .note-steps li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          color: #856404;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .step-icon {
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, #ff9800, #ff5722);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .note-steps strong {
          color: #d00000;
          font-weight: 700;
        }

        .announcement-modal-footer {
          padding: 20px 30px;
          background: #f8faff;
          border-top: 1px solid #e1e8ff;
          display: flex;
          gap: 15px;
          justify-content: flex-end;
        }

        .btn-download,
        .btn-close-modal {
          padding: 12px 25px;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }

        .btn-download {
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          color: white;
        }

        .btn-download:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(30, 60, 114, 0.3);
        }

        .btn-close-modal {
          background: #6c757d;
          color: white;
        }

        .btn-close-modal:hover {
          background: #5a6268;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(108, 117, 125, 0.3);
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

        /* ===== DOWNLOAD SECTION (PAGE) ===== */
        .section-download {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(30, 60, 114, 0.1);
          border: 1px solid #e8f0ff;
        }

        /* Page Banner */
        .page-banner-wrapper {
          width: 100%;
          margin-bottom: 30px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(30, 60, 114, 0.15);
        }

        .page-banner-image {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.3s ease;
        }

        .page-banner-wrapper:hover .page-banner-image {
          transform: scale(1.02);
        }

        .sk-download-banner-page {
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          color: white;
          padding: 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          box-shadow: 0 4px 15px rgba(30, 60, 114, 0.2);
          border-radius: 16px;
          margin-bottom: 30px;
        }

        .sk-download-banner-page .sk-banner-content {
          display: flex;
          align-items: center;
          gap: 20px;
          flex: 1;
        }

        .sk-download-banner-page .sk-banner-icon {
          width: 70px;
          height: 70px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          flex-shrink: 0;
        }

        .sk-download-banner-page .sk-banner-text h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 8px 0;
        }

        .sk-download-banner-page .sk-banner-text p {
          font-size: 0.95rem;
          opacity: 0.9;
          margin: 0;
          line-height: 1.5;
        }

        .btn-download-sk-page {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: white;
          color: #1e3c72;
          padding: 15px 30px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 700;
          font-size: 1rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          flex-shrink: 0;
        }

        .btn-download-sk-page:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
          color: #1e3c72;
        }

        .section-divider-page {
          text-align: center;
          padding: 30px;
          background: linear-gradient(135deg, #f8faff 0%, #e8f0ff 100%);
          border-radius: 16px;
          margin-bottom: 30px;
        }

        .divider-icon-wrapper-page {
          width: 80px;
          height: 80px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
          border: 3px solid #1e3c72;
        }

        .divider-icon-wrapper-page i {
          font-size: 2.5rem;
          color: #1e3c72;
        }

        .section-divider-page h3 {
          font-size: 1.6rem;
          font-weight: 700;
          color: #1e3c72;
          margin: 0 0 8px 0;
        }

        .section-divider-page p {
          color: #666;
          font-size: 0.95rem;
          margin: 0;
        }

        .download-grid-page {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
          margin-bottom: 30px;
        }

        .download-card-page {
          background: white;
          border-radius: 16px;
          padding: 25px;
          box-shadow: 0 4px 15px rgba(30, 60, 114, 0.08);
          border: 2px solid #e1e8ff;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 15px;
          position: relative;
          overflow: hidden;
        }

        .download-card-page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
        }

        .download-card-page:nth-child(1)::before {
          background: linear-gradient(135deg, #9c27b0, #e91e63);
        }

        .download-card-page:nth-child(2)::before {
          background: linear-gradient(135deg, #4caf50, #8bc34a);
        }

        .download-card-page:nth-child(3)::before {
          background: linear-gradient(135deg, #2196f3, #21cbf3);
        }

        .download-card-page:nth-child(4)::before {
          background: linear-gradient(135deg, #ff9800, #ff5722);
        }

        .download-card-page:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(30, 60, 114, 0.18);
          border-color: #1e3c72;
        }

        .card-badge-page {
          position: absolute;
          top: 12px;
          right: -30px;
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          color: white;
          padding: 5px 40px;
          font-size: 0.75rem;
          font-weight: 700;
          transform: rotate(45deg);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .card-badge-page.prestasi {
          background: linear-gradient(135deg, #9c27b0, #e91e63);
        }

        .card-badge-page.yatim-sd {
          background: linear-gradient(135deg, #4caf50, #8bc34a);
        }

        .card-badge-page.kurang-mampu {
          background: linear-gradient(135deg, #2196f3, #21cbf3);
        }

        .card-badge-page.yatim-sma {
          background: linear-gradient(135deg, #ff9800, #ff5722);
        }

        .download-icon-page {
          width: 70px;
          height: 70px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          color: white;
        }

        .download-icon-page.prestasi {
          background: linear-gradient(135deg, #9c27b0, #e91e63);
        }

        .download-icon-page.yatim-sd {
          background: linear-gradient(135deg, #4caf50, #8bc34a);
        }

        .download-icon-page.kurang-mampu {
          background: linear-gradient(135deg, #2196f3, #21cbf3);
        }

        .download-icon-page.yatim-sma {
          background: linear-gradient(135deg, #ff9800, #ff5722);
        }

        .download-content-page h4 {
          font-size: 1.15rem;
          font-weight: 700;
          color: #1e3c72;
          margin: 0 0 10px 0;
          line-height: 1.3;
        }

        .download-category-page {
          color: #666;
          font-size: 0.9rem;
          margin: 0 0 20px 0;
          display: inline-block;
          background: #f8faff;
          padding: 6px 14px;
          border-radius: 8px;
          font-weight: 600;
        }

        .btn-download-file-page {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          color: white;
          padding: 14px 28px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          width: 100%;
          max-width: 280px;
        }

        .btn-download-file-page:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(30, 60, 114, 0.35);
          color: white;
        }

        .download-note-page {
          background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
          border: 2px solid #ffc107;
          border-radius: 16px;
          padding: 30px;
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }

        .download-note-page > i {
          font-size: 2rem;
          color: #ff9800;
          flex-shrink: 0;
          margin-top: 5px;
        }

        .note-title-page {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #856404;
          font-size: 1.2rem;
          font-weight: 700;
          margin: 0 0 18px 0;
        }

        .note-title-page i {
          color: #ff9800;
          font-size: 1.3rem;
        }

        .note-steps-page {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .note-steps-page li {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          color: #856404;
          font-size: 1rem;
          line-height: 1.5;
        }

        .step-icon-page {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #ff9800, #ff5722);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .note-steps-page strong {
          color: #d00000;
          font-weight: 700;
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
          .section-requirements,
          .section-download {
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

          /* Download Section Mobile */
          .sk-download-banner-page {
            flex-direction: column;
            text-align: center;
            padding: 25px 20px;
          }

          .sk-download-banner-page .sk-banner-content {
            flex-direction: column;
          }

          .sk-download-banner-page .sk-banner-icon {
            width: 60px;
            height: 60px;
            font-size: 1.7rem;
          }

          .sk-download-banner-page .sk-banner-text h3 {
            font-size: 1.3rem;
          }

          .sk-download-banner-page .sk-banner-text p {
            font-size: 0.9rem;
          }

          .btn-download-sk-page {
            width: 100%;
            justify-content: center;
            padding: 12px 20px;
          }

          .section-divider-page {
            padding: 25px 20px;
          }

          .divider-icon-wrapper-page {
            width: 70px;
            height: 70px;
          }

          .divider-icon-wrapper-page i {
            font-size: 2rem;
          }

          .section-divider-page h3 {
            font-size: 1.4rem;
          }

          .section-divider-page p {
            font-size: 0.9rem;
          }

          .download-grid-page {
            grid-template-columns: 1fr;
          }

          .download-card-page {
            padding: 20px;
          }

          .card-badge-page {
            font-size: 0.7rem;
            padding: 4px 35px;
            top: 10px;
            right: -32px;
          }

          .download-note-page {
            padding: 20px;
            flex-direction: column;
          }

          .download-note-page > i {
            font-size: 1.7rem;
          }

          .note-title-page {
            font-size: 1.1rem;
          }

          .note-steps-page li {
            font-size: 0.95rem;
          }

          .step-icon-page {
            width: 28px;
            height: 28px;
            font-size: 0.85rem;
          }

          /* Modal Responsive */
          .announcement-modal-container {
            max-height: 95vh;
            border-radius: 15px;
          }

          .announcement-modal-header {
            padding: 20px;
          }

          .header-icon {
            width: 50px;
            height: 50px;
            font-size: 1.5rem;
          }

          .header-content h2 {
            font-size: 1.3rem;
          }

          .header-content p {
            font-size: 0.85rem;
          }

          .announcement-modal-info {
            padding: 20px;
          }

          .info-card-grid {
            grid-template-columns: 1fr;
          }

          .download-grid {
            grid-template-columns: 1fr;
          }

          .download-section-header h3 {
            font-size: 1.3rem;
          }

          .download-card {
            padding: 20px;
          }

          .info-section-title h3 {
            font-size: 1.1rem;
          }

          .sk-download-banner {
            flex-direction: column;
            text-align: center;
            padding: 25px 20px;
          }

          .sk-banner-content {
            flex-direction: column;
          }

          .sk-banner-icon {
            width: 60px;
            height: 60px;
            font-size: 1.7rem;
          }

          .sk-banner-text h3 {
            font-size: 1.2rem;
          }

          .sk-banner-text p {
            font-size: 0.85rem;
          }

          .btn-download-sk {
            width: 100%;
            justify-content: center;
            padding: 12px 20px;
          }

          .section-divider {
            padding: 25px 20px;
          }

          .divider-icon-wrapper {
            width: 70px;
            height: 70px;
          }

          .divider-icon-wrapper i {
            font-size: 2rem;
          }

          .section-divider h3 {
            font-size: 1.3rem;
          }

          .section-divider p {
            font-size: 0.85rem;
          }

          .download-section {
            padding: 25px 20px;
          }

          .download-card {
            padding: 20px;
          }

          .card-badge {
            font-size: 0.7rem;
            padding: 4px 35px;
            top: 10px;
            right: -32px;
          }

          .announcement-modal-footer {
            flex-direction: column;
            padding: 15px 20px;
          }

          .btn-download,
          .btn-close-modal {
            width: 100%;
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
