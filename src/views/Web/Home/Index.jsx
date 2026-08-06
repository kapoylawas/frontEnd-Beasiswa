import LayoutWeb from "../../../layouts/Web";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  // Helpdesk Links
  const dinsosYatim = `https://wa.me/6282230338338`;
  const diknasYatim = `https://wa.me/6281336766061`;
  const kesra1 = `https://wa.me/6285646151120`;
  const disporapar1 = `https://wa.me/6282332008658`;

  // State
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleCloseModal = () => {
    setShowAnnouncementModal(false);
  };

  return (
    <LayoutWeb>
      {/* HERO SECTION (SAWERIA 3D RETRO STYLE) */}
      <section className="saweria-hero-section text-center">
        <div className="container max-w-5xl mx-auto px-4">
          {/* Header Official Badge */}
          <div className="saweria-mascot-badge">
            <i className="fas fa-heart text-rose-500 me-1"></i>
            <span>Pemberitahuan Resmi Beasiswa Pemkab Sidoarjo</span>
          </div>

          <h1 className="hero-title-3d">
            Terima Kasih Atas Semangat & Perjuanganmu! <br />
            <span className="hero-title-highlight mt-3 d-inline-block">Terus Melangkah & Raih Impianmu</span>
          </h1>

          <p className="hero-subtitle-3d mx-auto">
            Masa pendaftaran Beasiswa Pemerintah Kabupaten Sidoarjo saat ini telah resmi ditutup. Setiap usaha dan kerja kerasmu adalah kebanggaan bagi Kabupaten Sidoarjo. Tetap semangat mengukir prestasi, dan nantikan informasi resmi pembukaan gelombang selanjutnya!
          </p>

          <div className="d-flex flex-wrap align-items-center justify-content-center gap-3 mb-5">
            <Link to="/registers" className="btn btn-danger font-black px-5 py-3 text-base border-2 border-slate-900" style={{ border: "2.5px solid #1e293b", boxShadow: "4px 4px 0px #1e293b", borderRadius: "12px", background: "#ef4444", color: "#ffffff" }}>
              <i className="fas fa-lock me-1"></i> Pendaftaran Ditutup
            </Link>
          </div>

          {/* SAWERIA 3D FULL-WIDTH BANNER PENGUMUMAN PENUTUPAN */}
          <div className="saweria-3d-card text-start p-3 p-md-4 mb-5" style={{ background: "#e6f4ec", border: "2.5px solid #1e293b", boxShadow: "7px 7px 0px #1e293b" }}>
            {/* Top Status Badges */}
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
              <span className="badge text-slate-900 px-3 py-1.5 font-black text-xs uppercase" style={{ backgroundColor: "#fbbf24", border: "2px solid #1e293b", boxShadow: "2px 2px 0px #1e293b", borderRadius: "8px", fontFamily: "var(--font-family-code)" }}>
                <i className="fas fa-lock me-1"></i> PENDAFTARAN BEASISWA DITUTUP
              </span>
              <span className="badge text-slate-900 px-3 py-1.5 font-black text-xs uppercase" style={{ backgroundColor: "#34d399", border: "2px solid #1e293b", boxShadow: "2px 2px 0px #1e293b", borderRadius: "8px", fontFamily: "var(--font-family-code)" }}>
                <i className="fas fa-bullhorn me-1"></i> PANTAU PENGUMUMAN BERKALA
              </span>
            </div>

            {/* Announcement Description & Action */}
            <div className="px-1">
              <h3 className="fw-black text-slate-900 text-2xl mb-2">
                Terima Kasih Atas Antusiasme Putra-Putri Terbaik Sidoarjo!
              </h3>
              <p className="text-slate-700 font-bold text-sm leading-relaxed mb-4">
                Pemerintah Kabupaten Sidoarjo mengapresiasi setinggi-tingginya semangat seluruh mahasiswa dan pelajar Sidoarjo. Seluruh pendaftaran yang telah masuk saat ini sedang dalam tahapan seleksi & verifikasi berkas oleh tim penilai. Informasi jadwal pembukaan gelombang pendaftaran berikutnya akan selalu disampaikan secara resmi melalui portal ini.
              </p>
              <div className="d-flex flex-wrap align-items-center gap-3">
                <button
                  className="btn btn-sm btn-white border-dark font-black px-4 py-2.5 text-sm"
                  style={{ border: "2px solid #1e293b", boxShadow: "3px 3px 0px #1e293b", borderRadius: "8px", background: "#ffffff" }}
                  onClick={() => setShowAnnouncementModal(true)}
                >
                  <i className="fas fa-info-circle me-1"></i> Detail Informasi Selengkapnya
                </button>
              </div>
            </div>
          </div>

          {/* SAWERIA 3D PRIMARY FEATURE BOX (SAWERIA EXACT STYLE) */}
          <div className="saweria-3d-card text-start p-4 p-md-5 mb-5" style={{ background: "#f0f5f1" }}>
            <p className="fw-extrabold text-lg text-slate-900 mb-4" style={{ fontFamily: "var(--font-family-code)" }}>
              Beasiswa Sidoarjo membantu kamu mendapatkan bantuan biaya pendidikan tinggi dengan saluran jalur resmi di bawah ini:
            </p>

            <div className="row gy-3 mb-4">
              <div className="col-md-6">
                <div className="fw-bold text-slate-800 mb-2">
                  <span className="me-2">🇮🇩</span> Jalur Utama Sidoarjo:
                </div>
                <ul className="saweria-steps-list ps-3">
                  <li>&bull; PRESTASI AKADEMIK</li>
                  <li>&bull; PRESTASI NON-AKADEMIK</li>
                  <li>&bull; MAHASISWA KURANG MAMPU (DTKS)</li>
                  <li>&bull; KEAGAMAAN & HAFIZ QUR'AN</li>
                  <li>&bull; BEASISWA YATIM</li>
                </ul>
              </div>

              <div className="col-md-6">
                <div className="fw-bold text-slate-800 mb-2">
                  <span className="me-2">🏛️</span> Kampus Mitra Terakreditasi:
                </div>
                <ul className="saweria-steps-list ps-3">
                  <li>&bull; PERGURUAN TINGGI NEGERI (PTN)</li>
                  <li>&bull; PERGURUAN TINGGI SWASTA (PTS)</li>
                  <li>&bull; KAMPUS DALAM & LUAR NEGERI</li>
                  <li>&bull; PONDOK PESANTREN & MADIN</li>
                </ul>
              </div>
            </div>
          </div>

          {/* SAWERIA 3D STEPS BOX ("alur & panduan pendaftaran") */}
          <div className="saweria-steps-box text-start mb-5">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
              <span className="saweria-corner-badge">alur & panduan pendaftaran</span>
              <span className="badge px-3 py-1.5 font-black text-xs uppercase" style={{ backgroundColor: "#fef3c7", color: "#1e293b", border: "2px solid #1e293b", boxShadow: "2px 2px 0px #1e293b", borderRadius: "8px", fontFamily: "var(--font-family-code)" }}>
                <i className="fas fa-bookmark me-1" style={{ color: "#d97706" }}></i> PERSIAPKAN BERKASMU DARI SEKARANG
              </span>
            </div>
            <ol className="saweria-steps-list">
              <li>
                <span className="step-num-badge">1</span>
                <span>Persiapkan berkas utama (KTP-El Sidoarjo, Kartu Keluarga, & Transkrip/Berkas Syarat)</span>
              </li>
              <li>
                <span className="step-num-badge">2</span>
                <span>Nantikan jadwal pengumuman resmi pembukaan gelombang pendaftaran selanjutnya</span>
              </li>
              <li>
                <span className="step-num-badge">3</span>
                <span>Buat akun baru & verifikasi NIK KTP-El pada portal resmi Beasiswa Sidoarjo</span>
              </li>
              <li>
                <span className="step-num-badge">4</span>
                <span>Pilih jalur beasiswa, unggah dokumen persyaratan, & lengkapi form pendaftaran</span>
              </li>
              <li>
                <span className="step-num-badge">5</span>
                <span>Pantau hasil verifikasi & status kelulusan secara real-time melalui akun milikmu</span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* SAWERIA 3D CATEGORY SELECTOR & CARDS */}
      <section className="py-5 bg-white border-bottom border-slate-900">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-4">
            <span className="badge bg-amber-300 text-slate-900 border border-slate-900 px-3 py-2 rounded-pill font-black text-xs uppercase" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
              KATEGORI PROGRAM BEASISWA
            </span>
            <h2 className="fw-black mt-3 text-3xl text-slate-900">
              Pilih Program Sesuai Potensimu
            </h2>
          </div>

          {/* Saweria 3D Chip Buttons */}
          <div className="category-chips-wrapper">
            <button
              className={`category-chip-btn ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              <i className="fas fa-border-all"></i> Semua Kategori
            </button>
            <button
              className={`category-chip-btn ${activeCategory === "akademik" ? "active" : ""}`}
              onClick={() => setActiveCategory("akademik")}
            >
              <i className="fas fa-graduation-cap"></i> Prestasi Akademik
            </button>
            <button
              className={`category-chip-btn ${activeCategory === "non-akademik" ? "active" : ""}`}
              onClick={() => setActiveCategory("non-akademik")}
            >
              <i className="fas fa-trophy"></i> Prestasi Non-Akademik
            </button>
            <button
              className={`category-chip-btn ${activeCategory === "dtks" ? "active" : ""}`}
              onClick={() => setActiveCategory("dtks")}
            >
              <i className="fas fa-hand-holding-heart"></i> Kurang Mampu (DTKS)
            </button>
            <button
              className={`category-chip-btn ${activeCategory === "keagamaan" ? "active" : ""}`}
              onClick={() => setActiveCategory("keagamaan")}
            >
              <i className="fas fa-mosque"></i> Keagamaan & Hafiz
            </button>
          </div>

          {/* Saweria 3D Feature Cards Grid */}
          <div className="row g-4">
            {(activeCategory === "all" || activeCategory === "akademik") && (
              <div className="col-lg-6">
                <div className="saweria-3d-card">
                  <span className="saweria-corner-badge yellow">program unggulan</span>
                  <div className="saweria-card-icon icon-yellow">
                    <i className="fas fa-award"></i>
                  </div>
                  <h3 className="saweria-card-title">Beasiswa Prestasi Akademik</h3>
                  <p className="saweria-card-desc">
                    Diperuntukkan bagi mahasiswa berprestasi tinggi IPK minimal 3.40 dari Perguruan Tinggi Dalam Negeri / Luar Negeri terakreditasi BAN-PT.
                  </p>
                  <div className="pt-3 border-top border-slate-900 d-flex justify-content-between align-items-center">
                    <span className="font-extrabold text-xs text-slate-800"><i className="fas fa-check text-emerald-600 me-1"></i> IPK Min 3.40</span>
                    <Link to="/info" className="btn-saweria-3d-teal text-xs py-2 px-3">Syarat & Detail &rarr;</Link>
                  </div>
                </div>
              </div>
            )}

            {(activeCategory === "all" || activeCategory === "non-akademik") && (
              <div className="col-lg-6">
                <div className="saweria-3d-card">
                  <span className="saweria-corner-badge teal">olahraga & seni</span>
                  <div className="saweria-card-icon icon-teal">
                    <i className="fas fa-trophy"></i>
                  </div>
                  <h3 className="saweria-card-title">Beasiswa Prestasi Non-Akademik</h3>
                  <p className="saweria-card-desc">
                    Penghargaan untuk mahasiswa juara kejuaraan bidang olahraga, kebudayaan, sains, teknologi, atau sosial minimal tingkat Kab/Prov/Nasional.
                  </p>
                  <div className="pt-3 border-top border-slate-900 d-flex justify-content-between align-items-center">
                    <span className="font-extrabold text-xs text-slate-800"><i className="fas fa-medal text-amber-500 me-1"></i> Piagam Resmi</span>
                    <Link to="/info" className="btn-saweria-3d-teal text-xs py-2 px-3">Syarat & Detail &rarr;</Link>
                  </div>
                </div>
              </div>
            )}

            {(activeCategory === "all" || activeCategory === "dtks") && (
              <div className="col-lg-6">
                <div className="saweria-3d-card">
                  <span className="saweria-corner-badge pink">bantuan dinsos</span>
                  <div className="saweria-card-icon icon-pink">
                    <i className="fas fa-hand-holding-heart"></i>
                  </div>
                  <h3 className="saweria-card-title">Beasiswa Kurang Mampu (DTKS)</h3>
                  <p className="saweria-card-desc">
                    Bantuan biaya pendidikan tinggi bagi mahasiswa ber-KTP Sidoarjo yang terdaftar dalam DTKS atau memiliki SKTM resmi Desa/Kelurahan.
                  </p>
                  <div className="pt-3 border-top border-slate-900 d-flex justify-content-between align-items-center">
                    <span className="font-extrabold text-xs text-slate-800"><i className="fas fa-heart text-rose-500 me-1"></i> Terdaftar DTKS</span>
                    <Link to="/info" className="btn-saweria-3d-teal text-xs py-2 px-3">Syarat & Detail &rarr;</Link>
                  </div>
                </div>
              </div>
            )}

            {(activeCategory === "all" || activeCategory === "keagamaan") && (
              <div className="col-lg-6">
                <div className="saweria-3d-card">
                  <span className="saweria-corner-badge green">kesra keagamaan</span>
                  <div className="saweria-card-icon icon-purple">
                    <i className="fas fa-mosque"></i>
                  </div>
                  <h3 className="saweria-card-title">Beasiswa Keagamaan & Hafiz</h3>
                  <p className="saweria-card-desc">
                    Apresiasi bagi Hafiz/Hafizah minimal 10 Juz Al-Qur'an, juara kejuaraan MTQ, santri ponpes, serta pengurus/aktifis keagamaan.
                  </p>
                  <div className="pt-3 border-top border-slate-900 d-flex justify-content-between align-items-center">
                    <span className="font-extrabold text-xs text-slate-800"><i className="fas fa-book-quran me-1"></i> Hafiz 10+ Juz</span>
                    <Link to="/info" className="btn-saweria-3d-teal text-xs py-2 px-3">Syarat & Detail &rarr;</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SAWERIA 3D PUSAT DOWNLOAD DOKUMEN */}
      <section className="py-5 bg-slate-50">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="saweria-3d-card bg-amber-300 p-4 p-md-5">
            <span className="saweria-corner-badge pink">dokumen resmi</span>
            <div className="row align-items-center gy-3">
              <div className="col-lg-8">
                <h3 className="fw-black text-slate-900 text-2xl mb-2">
                  Download Template SPTJM & SK Penerima Beasiswa
                </h3>
                <p className="fw-bold text-slate-800 text-sm mb-0">
                  Unduh Surat Pernyataan Tanggung Jawab Mutlak (SPTJM) bermaterai sesuai kategori beasiswa Anda.
                </p>
              </div>
              <div className="col-lg-4 text-lg-end">
                <a href="/penerima_beasiswa.pdf" download className="btn-saweria-3d-teal py-3 px-4 text-xs font-black">
                  <i className="fas fa-file-pdf me-2"></i> Download SK Penerima (PDF)
                </a>
              </div>
            </div>

            <hr className="my-4 border-slate-900" />

            <div className="row g-3">
              <div className="col-md-4">
                <div className="p-3 bg-white border-2 border-slate-900 rounded-3" style={{ boxShadow: "3px 3px 0px #1e293b" }}>
                  <div className="fw-black text-slate-900 text-sm mb-1">SPTJM Prestasi Akademik</div>
                  <p className="text-xs text-slate-600 font-bold mb-3">Untuk Mahasiswa PTN / PTS</p>
                  <a href="/spjmt_mahasiswa.docx" download className="btn-saweria-3d-yellow w-100 justify-content-center text-xs py-2">
                    <i className="fas fa-download me-1"></i> Download Template
                  </a>
                </div>
              </div>

              <div className="col-md-4">
                <div className="p-3 bg-white border-2 border-slate-900 rounded-3" style={{ boxShadow: "3px 3px 0px #1e293b" }}>
                  <div className="fw-black text-slate-900 text-sm mb-1">SPTJM Keagamaan & Hafiz</div>
                  <p className="text-xs text-slate-600 font-bold mb-3">Untuk Santri & Aktivis Agama</p>
                  <a href="/sptjm_kesra.docx" download className="btn-saweria-3d-yellow w-100 justify-content-center text-xs py-2">
                    <i className="fas fa-download me-1"></i> Download Template
                  </a>
                </div>
              </div>

              <div className="col-md-4">
                <div className="p-3 bg-white border-2 border-slate-900 rounded-3" style={{ boxShadow: "3px 3px 0px #1e293b" }}>
                  <div className="fw-black text-slate-900 text-sm mb-1">SPTJM Kurang Mampu</div>
                  <p className="text-xs text-slate-600 font-bold mb-3">Untuk Pendaftar DTKS / SKTM</p>
                  <a href="/SPTJMBEASISWA_KURANGMAMPU.docx" download className="btn-saweria-3d-yellow w-100 justify-content-center text-xs py-2">
                    <i className="fas fa-download me-1"></i> Download Template
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SAWERIA 3D FAQ ACCORDION SECTION */}
      <section className="py-5 bg-white border-bottom border-slate-900">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-5">
            <span className="badge bg-purple-300 text-slate-900 border border-slate-900 px-3 py-2 rounded-pill font-black text-xs uppercase" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
              TANYA JAWAB UMUM (FAQ)
            </span>
            <h2 className="fw-black mt-3 text-3xl text-slate-900">
              Pertanyaan Sering Diajukan
            </h2>
          </div>

          <div className="d-flex flex-column gap-3">
            {/* FAQ Item 1 */}
            <div className="saweria-3d-card p-3 p-md-4" style={{ background: "#ffffff", border: "2.5px solid #1e293b", boxShadow: "4px 4px 0px #1e293b", borderRadius: "14px", cursor: "pointer" }} onClick={() => toggleFaq(1)}>
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div className="d-flex align-items-center gap-3">
                  <span className="badge bg-amber-300 text-slate-900 border border-slate-900 px-2.5 py-1 font-black text-xs">01</span>
                  <h5 className="fw-black text-slate-900 text-base mb-0">Bagaimana status pendaftaran beasiswa saat ini?</h5>
                </div>
                <i className={`fas ${openFaq === 1 ? "fa-chevron-up text-rose-600" : "fa-chevron-down text-slate-700"} fs-6`}></i>
              </div>
              {openFaq === 1 && (
                <div className="mt-3 pt-3 border-top border-slate-200 text-slate-700 font-bold text-sm leading-relaxed">
                  Masa pendaftaran Beasiswa Pemerintah Kabupaten Sidoarjo saat ini telah <strong>RESMI DITUTUP</strong>. Seluruh pendaftaran yang telah dikirimkan sedang dalam tahapan evaluasi & verifikasi berkas oleh tim teknis penilai.
                </div>
              )}
            </div>

            {/* FAQ Item 2 */}
            <div className="saweria-3d-card p-3 p-md-4" style={{ background: "#ffffff", border: "2.5px solid #1e293b", boxShadow: "4px 4px 0px #1e293b", borderRadius: "14px", cursor: "pointer" }} onClick={() => toggleFaq(2)}>
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div className="d-flex align-items-center gap-3">
                  <span className="badge bg-teal-300 text-slate-900 border border-slate-900 px-2.5 py-1 font-black text-xs">02</span>
                  <h5 className="fw-black text-slate-900 text-base mb-0">Kapan pembukaan pendaftaran gelombang berikutnya?</h5>
                </div>
                <i className={`fas ${openFaq === 2 ? "fa-chevron-up text-rose-600" : "fa-chevron-down text-slate-700"} fs-6`}></i>
              </div>
              {openFaq === 2 && (
                <div className="mt-3 pt-3 border-top border-slate-200 text-slate-700 font-bold text-sm leading-relaxed">
                  Jadwal resmi pembukaan pendaftaran gelombang baru akan diumumkan secara terbuka oleh Pemerintah Kabupaten Sidoarjo melalui portal resmi ini. Masyarakat diimbau untuk memantau pengumuman secara berkala.
                </div>
              )}
            </div>

            {/* FAQ Item 3 */}
            <div className="saweria-3d-card p-3 p-md-4" style={{ background: "#ffffff", border: "2.5px solid #1e293b", boxShadow: "4px 4px 0px #1e293b", borderRadius: "14px", cursor: "pointer" }} onClick={() => toggleFaq(3)}>
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div className="d-flex align-items-center gap-3">
                  <span className="badge bg-rose-300 text-slate-900 border border-slate-900 px-2.5 py-1 font-black text-xs">03</span>
                  <h5 className="fw-black text-slate-900 text-base mb-0">Apakah pendaftar yang belum lolos bisa mendaftar kembali di gelombang berikutnya?</h5>
                </div>
                <i className={`fas ${openFaq === 3 ? "fa-chevron-up text-rose-600" : "fa-chevron-down text-slate-700"} fs-6`}></i>
              </div>
              {openFaq === 3 && (
                <div className="mt-3 pt-3 border-top border-slate-200 text-slate-700 font-bold text-sm leading-relaxed">
                  <strong>BISA.</strong> Calon penerima yang belum lolos seleksi diperbolehkan mendaftar kembali saat pendaftaran gelombang baru dibuka selama memenuhi seluruh kriteria kelayakan.
                </div>
              )}
            </div>

            {/* FAQ Item 4 */}
            <div className="saweria-3d-card p-3 p-md-4" style={{ background: "#ffffff", border: "2.5px solid #1e293b", boxShadow: "4px 4px 0px #1e293b", borderRadius: "14px", cursor: "pointer" }} onClick={() => toggleFaq(4)}>
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div className="d-flex align-items-center gap-3">
                  <span className="badge bg-purple-300 text-slate-900 border border-slate-900 px-2.5 py-1 font-black text-xs">04</span>
                  <h5 className="fw-black text-slate-900 text-base mb-0">Bagaimana cara memantau hasil pengumuman seleksi?</h5>
                </div>
                <i className={`fas ${openFaq === 4 ? "fa-chevron-up text-rose-600" : "fa-chevron-down text-slate-700"} fs-6`}></i>
              </div>
              {openFaq === 4 && (
                <div className="mt-3 pt-3 border-top border-slate-200 text-slate-700 font-bold text-sm leading-relaxed">
                  Pengumuman hasil verifikasi dan status kelulusan dapat dipantau melalui akun login masing-masing atau mengunduh dokumen Surat Keputusan (SK) resmi penerima beasiswa yang tersedia di portal ini.
                </div>
              )}
            </div>

            {/* FAQ Item 5 */}
            <div className="saweria-3d-card p-3 p-md-4" style={{ background: "#ffffff", border: "2.5px solid #1e293b", boxShadow: "4px 4px 0px #1e293b", borderRadius: "14px", cursor: "pointer" }} onClick={() => toggleFaq(5)}>
              <div className="d-flex align-items-center justify-content-between gap-3">
                <div className="d-flex align-items-center gap-3">
                  <span className="badge bg-emerald-300 text-slate-900 border border-slate-900 px-2.5 py-1 font-black text-xs">05</span>
                  <h5 className="fw-black text-slate-900 text-base mb-0">Apakah seluruh proses pendaftaran dan pencairan dipungut biaya?</h5>
                </div>
                <i className={`fas ${openFaq === 5 ? "fa-chevron-up text-rose-600" : "fa-chevron-down text-slate-700"} fs-6`}></i>
              </div>
              {openFaq === 5 && (
                <div className="mt-3 pt-3 border-top border-slate-200 text-slate-700 font-bold text-sm leading-relaxed">
                  <strong>TIDAK.</strong> Seluruh rangkaian pendaftaran, seleksi berkas, verifikasi data, hingga pencairan bantuan biaya pendidikan Beasiswa Pemkab Sidoarjo <strong>100% GRATIS tanpa biaya apapun</strong>.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SAWERIA 3D HELPDESK CONTACTS */}
      <section className="py-5 bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-5">
            <span className="badge bg-teal-300 text-slate-900 border border-slate-900 px-3 py-2 rounded-pill font-black text-xs uppercase" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
              LAYANAN HELPDESK OFFICIAL
            </span>
            <h2 className="fw-black mt-3 text-3xl text-slate-900">
              Kontak WhatsApp Helpdesk Instansi
            </h2>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="saweria-3d-card p-4">
                <div className="saweria-card-icon icon-yellow">
                  <i className="fas fa-hands-holding-child"></i>
                </div>
                <h5 className="fw-black text-slate-900 text-base mb-1">Dinas Sosial</h5>
                <p className="text-xs font-bold text-slate-600 mb-3">Kurang Mampu / Yatim</p>
                <a href={dinsosYatim} target="_blank" rel="noopener noreferrer" className="btn-saweria-3d-yellow w-100 justify-content-center text-xs py-2">
                  <i className="fab fa-whatsapp me-2"></i> WA Helpdesk
                </a>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="saweria-3d-card p-4">
                <div className="saweria-card-icon icon-teal">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <h5 className="fw-black text-slate-900 text-base mb-1">Dispendik</h5>
                <p className="text-xs font-bold text-slate-600 mb-3">Yatim SD & SMP</p>
                <a href={diknasYatim} target="_blank" rel="noopener noreferrer" className="btn-saweria-3d-teal w-100 justify-content-center text-xs py-2">
                  <i className="fab fa-whatsapp me-2"></i> WA Helpdesk
                </a>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="saweria-3d-card p-4">
                <div className="saweria-card-icon icon-pink">
                  <i className="fas fa-mosque"></i>
                </div>
                <h5 className="fw-black text-slate-900 text-base mb-1">Bagian Kesra</h5>
                <p className="text-xs font-bold text-slate-600 mb-3">Beasiswa Keagamaan</p>
                <a href={kesra1} target="_blank" rel="noopener noreferrer" className="btn-saweria-3d-yellow w-100 justify-content-center text-xs py-2">
                  <i className="fab fa-whatsapp me-2"></i> WA Helpdesk
                </a>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="saweria-3d-card p-4">
                <div className="saweria-card-icon icon-purple">
                  <i className="fas fa-running"></i>
                </div>
                <h5 className="fw-black text-slate-900 text-base mb-1">Disporapar</h5>
                <p className="text-xs font-bold text-slate-600 mb-3">Prestasi Non-Akademik</p>
                <a href={disporapar1} target="_blank" rel="noopener noreferrer" className="btn-saweria-3d-teal w-100 justify-content-center text-xs py-2">
                  <i className="fab fa-whatsapp me-2"></i> WA Helpdesk
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANNOUNCEMENT POPUP MODAL */}
      {showAnnouncementModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(15, 23, 42, 0.75)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-3 border-slate-900 rounded-4 overflow-hidden" style={{ boxShadow: "10px 10px 0px #1e293b" }}>
              <div className="modal-header p-4 bg-amber-300 border-bottom border-slate-900">
                <div className="d-flex align-items-center gap-3">
                  <div className="brand-icon-box bg-white">
                    <i className="fas fa-bell text-slate-900"></i>
                  </div>
                  <div>
                    <h5 className="modal-title font-black text-slate-900 mb-0">Informasi Beasiswa Sidoarjo</h5>
                    <span className="text-xs font-bold text-slate-800">Pengumuman Resmi Pemerintah Kabupaten Sidoarjo</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body p-4 text-slate-800 fw-bold">
                {/* Banner Image inside Modal */}
                <div className="mb-4 text-center">
                  <div className="position-relative overflow-hidden inline-block w-100" style={{ border: "2.5px solid #1e293b", borderRadius: "14px", boxShadow: "4px 4px 0px #1e293b", background: "#ffffff" }}>
                    <img
                      src="/banner2026.jpg"
                      alt="Banner Pengumuman Beasiswa Sidoarjo"
                      className="img-fluid w-100"
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </div>
                </div>

                <div className="p-3 mb-4 text-xs font-bold text-slate-900" style={{ background: "#fef3c7", border: "2.5px solid #1e293b", boxShadow: "4px 4px 0px #1e293b", borderRadius: "12px" }}>
                  <i className="fas fa-heart text-rose-600 me-2 fs-6"></i>
                  <strong>TERIMA KASIH ATAS PERJUANGANMU:</strong> Pendaftaran Beasiswa Pendidikan Kabupaten Sidoarjo <strong>Resmi Ditutup</strong>. Terima kasih atas partisipasi seluruh calon penerima beasiswa. Seluruh berkas pendaftaran saat ini dalam proses verifikasi tim teknis.
                </div>

                <div className="row gy-3 text-xs">
                  <div className="col-md-6">
                    <div className="p-3 h-100" style={{ background: "#e6f4ec", border: "2.5px solid #1e293b", boxShadow: "4px 4px 0px #1e293b", borderRadius: "12px" }}>
                      <h6 className="font-black text-slate-900 text-sm mb-2">&bull; Informasi Hasil Seleksi</h6>
                      <ul className="ps-3 mb-0 space-y-1">
                        <li>Pengumuman kelulusan dapat dipantau di portal resmi</li>
                        <li>Proses verifikasi dilakukan transparan & akuntabel</li>
                        <li>100% Bebas Biaya (Tanpa Dipungut Biaya Apapun)</li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="p-3 h-100" style={{ background: "#f3e8ff", border: "2.5px solid #1e293b", boxShadow: "4px 4px 0px #1e293b", borderRadius: "12px" }}>
                      <h6 className="font-black text-slate-900 text-sm mb-2">&bull; Informasi Gelombang Berikutnya</h6>
                      <ul className="ps-3 mb-0 space-y-1">
                        <li>Jadwal pembukaan gelombang pendaftaran baru</li>
                        <li>Akan disampaikan resmi melalui website Pemkab</li>
                        <li>Tetap bersemangat dalam meraih cita-citamu</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer p-3 bg-slate-100 border-top border-slate-900 d-flex justify-content-between">
                <span className="text-xs font-extrabold text-slate-700">Beasiswa Pemkab Sidoarjo</span>
                <button
                  type="button"
                  className="btn-saweria-3d-yellow text-xs py-2 px-4 font-black"
                  onClick={handleCloseModal}
                >
                  Saya Mengerti & Lanjutkan &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </LayoutWeb>
  );
}
