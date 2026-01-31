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
              Persyaratan Beasiswa Kabupaten Sidoarjo
            </h1>
            <p className="hero-subtitle">
              Program Beasiswa Sidoarjo telah
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
              <h3>Program Beasiswa 2026 Telah Berakhir</h3>
              <p>Berikut adalah dokumentasi persyaratan yang digunakan dalam seleksi beasiswa tahun 2026. Informasi ini disimpan untuk referensi dan arsip.</p>
            </div>
          </div>

          {/* ============= BAGIAN BEASISWA YATIM ============= */}
          <div className="requirements-section yatim-section">
            <div className="program-header">
              <div className="program-icon yatim">
                <i className="fas fa-child"></i>
              </div>
              <div className="program-title">
                <h2>Beasiswa Anak Yatim</h2>
                <p>Untuk siswa SD Negeri, SMP Negeri, dan SMA Negeri di Kabupaten Sidoarjo</p>
              </div>
              <div className="program-badge yatim-badge">
                <i className="fas fa-graduation-cap"></i>
                Siswa
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
                        <span>Tidak sedang menerima beasiswa untuk tujuan serupa dari pihak manapun dibuktikan dengan <strong>surat pernyataan tidak menerima beasiswa</strong> dari Lembaga/Donatur lainnya yang diketahui oleh sekolah</span>
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
            <div className="archive-notice yatim-archive">
              <div className="archive-icon">
                <i className="fas fa-archive"></i>
              </div>
              <div className="archive-content">
                <h3>Dokumentasi Beasiswa Yatim 2026</h3>
                <p>Halaman ini merupakan arsip resmi persyaratan beasiswa yatim Sidoarjo tahun 2026. Program telah berakhir dan semua persyaratan telah diverifikasi.</p>
              </div>
            </div>
          </div>

          {/* ============= BAGIAN BEASISWA PRESTASI ============= */}
          <div className="requirements-section prestasi-section">
            <div className="program-header">
              <div className="program-icon prestasi">
                <i className="fas fa-trophy"></i>
              </div>
              <div className="program-title">
                <h2>Beasiswa Prestasi</h2>
                <p>Untuk mahasiswa berprestasi di Perguruan Tinggi Kabupaten Sidoarjo</p>
              </div>
              <div className="program-badge prestasi-badge">
                <i className="fas fa-user-graduate"></i>
                Mahasiswa
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
                  <p>Mahasiswa mengajukan permohonan dengan mengisi formulir pendaftaran secara online dan mengunggah dokumen yang dipersyaratkan.</p>
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
                        <span>Penduduk Kabupaten Sidoarjo yang dibuktikan dengan <strong>Kartu Keluarga (KK)</strong> dan <strong>KTP Elektronik (KTP-EL)</strong></span>
                      </div>
                    </div>
                    <div className="requirement-item">
                      <div className="requirement-check">
                        <i className="fas fa-check-circle"></i>
                      </div>
                      <div className="requirement-text">
                        <span>Terdaftar sebagai mahasiswa aktif di Perguruan Tinggi yang dibuktikan dengan <strong>Surat Keterangan Aktif Kuliah</strong> dan <strong>Kartu Identitas Kemahasiswaan</strong></span>
                      </div>
                    </div>
                    <div className="requirement-item">
                      <div className="requirement-check">
                        <i className="fas fa-check-circle"></i>
                      </div>
                      <div className="requirement-text">
                        <span>Tidak sedang menerima beasiswa untuk tujuan serupa/sejenis dari pihak manapun dibuktikan dengan <strong>Surat Pernyataan</strong> yang diketahui oleh Perguruan Tinggi</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Persyaratan Khusus */}
              <div className="requirement-card special">
                <div className="card-header">
                  <div className="card-icon">
                    <i className="fas fa-medal"></i>
                  </div>
                  <h3>Persyaratan Prestasi</h3>
                  <div className="card-number">03</div>
                </div>
                <div className="card-content">
                  
                  {/* Prestasi Akademik */}
                  <div className="achievement-section akademik">
                    <div className="achievement-header">
                      <i className="fas fa-graduation-cap"></i>
                      <div>
                        <h4>Prestasi Akademik</h4>
                        <p>IPK minimum 3.40</p>
                      </div>
                      <span className="achievement-badge">Wajib</span>
                    </div>
                    <div className="achievement-details">
                      <div className="detail-item">
                        <i className="fas fa-file-alt"></i>
                        <div>
                          <strong>Transkrip Nilai</strong>
                          <p>Transkrip nilai pada semester terakhir yang telah ditempuh</p>
                        </div>
                      </div>
                      <div className="detail-item">
                        <i className="fas fa-university"></i>
                        <div>
                          <strong>Akreditasi</strong>
                          <p>Program studi/Perguruan Tinggi harus memiliki akreditasi</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Prestasi Non-Akademik */}
                  <div className="achievement-section non-akademik">
                    <div className="achievement-header">
                      <i className="fas fa-trophy"></i>
                      <div>
                        <h4>Prestasi Non-Akademik</h4>
                        <p>Prestasi dalam 4 tahun terakhir</p>
                      </div>
                      <span className="achievement-badge">Optional</span>
                    </div>
                    <div className="achievement-details">
                      <div className="detail-item">
                        <i className="fas fa-certificate"></i>
                        <div>
                          <strong>Bukti Prestasi</strong>
                          <p>Sertifikat, piagam, surat keterangan, atau dokumen lain yang dipersamakan</p>
                        </div>
                      </div>
                      <div className="detail-item">
                        <i className="fas fa-calendar-alt"></i>
                        <div>
                          <strong>Waktu Pencapaian</strong>
                          <p>Prestasi diperoleh dalam kurun waktu 4 tahun terakhir</p>
                        </div>
                      </div>
                    </div>
                    <div className="achievement-fields">
                      <strong>Bidang Prestasi:</strong>
                      <div className="field-tags">
                        <span className="field-tag">Ilmu Pengetahuan</span>
                        <span className="field-tag">Teknologi</span>
                        <span className="field-tag">Kebudayaan</span>
                        <span className="field-tag">Olahraga</span>
                        <span className="field-tag">Sosial</span>
                        <span className="field-tag">Kemanusiaan</span>
                        <span className="field-tag">Lingkungan</span>
                        <span className="field-tag">Nasionalisme</span>
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
                  <h3>Catatan Penting</h3>
                  <div className="card-number">04</div>
                </div>
                <div className="card-content">
                  <div className="info-items">
                    <div className="info-item">
                      <div className="info-icon">
                        <i className="fas fa-file-signature"></i>
                      </div>
                      <div className="info-text">
                        <h4>Dokumen Resmi</h4>
                        <p>Semua dokumen harus asli atau legalisir dari pihak berwenang</p>
                      </div>
                    </div>
                    <div className="info-item">
                      <div className="info-icon">
                        <i className="fas fa-university"></i>
                      </div>
                      <div className="info-text">
                        <h4>Validasi Kampus</h4>
                        <p>Surat pernyataan dan keterangan aktif kuliah harus diketahui/dilegalisir oleh perguruan tinggi</p>
                      </div>
                    </div>
                    <div className="info-item">
                      <div className="info-icon">
                        <i className="fas fa-clock"></i>
                      </div>
                      <div className="info-text">
                        <h4>Masa Berlaku</h4>
                        <p>Prestasi non-akademik maksimal 4 tahun terakhir dari tanggal pendaftaran</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Archive Notice */}
            <div className="archive-notice prestasi-archive">
              <div className="archive-icon">
                <i className="fas fa-archive"></i>
              </div>
              <div className="archive-content">
                <h3>Dokumentasi Beasiswa Prestasi 2026</h3>
                <p>Halaman ini merupakan arsip resmi persyaratan beasiswa prestasi Sidoarjo tahun 2026. Program telah berakhir dan semua persyaratan telah diverifikasi.</p>
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
                    <div className="contact-badge">
                      <i className="fas fa-graduation-cap"></i>
                      Semua Jenjang
                    </div>
                  </div>
                </div>
                <div className="contact-card-content">
                  <p className="website-description">
                    Untuk informasi terbaru dan pendaftaran online semua jenis beasiswa:
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

        /* Requirements Section */
        .requirements-section {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(30, 60, 114, 0.1);
          border: 1px solid #e8f0ff;
          margin-bottom: 40px;
          position: relative;
          overflow: hidden;
        }

        .yatim-section {
          border-top: 5px solid #2196F3;
        }

        .prestasi-section {
          border-top: 5px solid #FF9800;
        }

        /* Program Header */
        .program-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 3px solid;
          position: relative;
        }

        .yatim-section .program-header {
          border-bottom-color: #2196F3;
        }

        .prestasi-section .program-header {
          border-bottom-color: #FF9800;
        }

        .program-icon {
          width: 80px;
          height: 80px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 2rem;
          flex-shrink: 0;
        }

        .program-icon.yatim {
          background: linear-gradient(135deg, #2196F3, #21CBF3);
          box-shadow: 0 10px 20px rgba(33, 150, 243, 0.3);
        }

        .program-icon.prestasi {
          background: linear-gradient(135deg, #FF9800, #FF5722);
          box-shadow: 0 10px 20px rgba(255, 152, 0, 0.3);
        }

        .program-title {
          flex: 1;
        }

        .program-title h2 {
          font-size: 2.2rem;
          font-weight: 700;
          margin: 0 0 10px 0;
          color: #1e3c72;
        }

        .yatim-section .program-title h2 {
          color: #1565c0;
        }

        .prestasi-section .program-title h2 {
          color: #e65100;
        }

        .program-title p {
          font-size: 1.1rem;
          color: #666;
          margin: 0;
        }

        .program-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 25px;
          font-weight: 600;
          font-size: 0.95rem;
          white-space: nowrap;
        }

        .yatim-badge {
          background: linear-gradient(135deg, #e3f2fd, #bbdefb);
          color: #1565c0;
          border: 2px solid #90caf9;
        }

        .prestasi-badge {
          background: linear-gradient(135deg, #fff3e0, #ffe0b2);
          color: #e65100;
          border: 2px solid #ffcc80;
        }

        /* Requirements Grid */
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

        /* Process Steps */
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

        /* Requirements List */
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

        /* Achievement Sections */
        .achievement-section {
          background: #f9f9f9;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
          border: 1px solid #e8f0ff;
        }

        .achievement-section:last-child {
          margin-bottom: 0;
        }

        .achievement-section.akademik {
          border-left: 4px solid #4CAF50;
        }

        .achievement-section.non-akademik {
          border-left: 4px solid #FF9800;
        }

        .achievement-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
        }

        .achievement-header i {
          font-size: 1.5rem;
          color: #1e3c72;
        }

        .achievement-header > div {
          flex: 1;
        }

        .achievement-header h4 {
          color: #1e3c72;
          margin: 0 0 5px 0;
          font-size: 1.1rem;
        }

        .achievement-header p {
          color: #666;
          margin: 0;
          font-size: 0.9rem;
        }

        .achievement-badge {
          background: #ffd700;
          color: #8d6e00;
          padding: 5px 12px;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .achievement-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 15px;
        }

        @media (max-width: 576px) {
          .achievement-details {
            grid-template-columns: 1fr;
          }
        }

        .detail-item {
          display: flex;
          gap: 12px;
          padding: 12px;
          background: white;
          border-radius: 8px;
          border: 1px solid #e8f0ff;
        }

        .detail-item i {
          color: #1e3c72;
          font-size: 1rem;
          margin-top: 3px;
        }

        .detail-item div {
          flex: 1;
        }

        .detail-item strong {
          display: block;
          color: #1e3c72;
          margin-bottom: 4px;
          font-size: 0.95rem;
        }

        .detail-item p {
          color: #666;
          margin: 0;
          font-size: 0.85rem;
          line-height: 1.4;
        }

        .achievement-fields {
          background: white;
          padding: 15px;
          border-radius: 8px;
          border: 1px solid #e8f0ff;
        }

        .achievement-fields strong {
          display: block;
          color: #1e3c72;
          margin-bottom: 10px;
          font-size: 0.95rem;
        }

        .field-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .field-tag {
          background: #e3f2fd;
          color: #1565c0;
          padding: 5px 10px;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        /* Info Items */
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

        .yatim-archive {
          border-color: #2196F3;
          background: linear-gradient(135deg, #e8f5e8, #f0f8f0);
        }

        .prestasi-archive {
          border-color: #FF9800;
          background: linear-gradient(135deg, #fff3e0, #fff8e1);
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

        .yatim-archive .archive-icon {
          background: #2196F3;
        }

        .prestasi-archive .archive-icon {
          background: #FF9800;
        }

        .archive-content h3 {
          color: #e65100;
          margin: 0 0 10px 0;
          font-size: 1.3rem;
        }

        .yatim-archive .archive-content h3 {
          color: #1565c0;
        }

        .prestasi-archive .archive-content h3 {
          color: #e65100;
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
          .program-header {
            flex-direction: column;
            text-align: center;
            gap: 15px;
          }
          
          .requirements-section {
            padding: 30px 25px;
          }
          
          .program-icon {
            width: 70px;
            height: 70px;
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
          
          .program-title h2 {
            font-size: 1.8rem;
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