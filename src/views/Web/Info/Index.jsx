import LayoutWeb from "../../../layouts/Web";
import { useState } from "react";

export default function Info() {
  // Helpdesk Links
  const dinsosYatim = `https://wa.me/6282230338338`;
  const diknasYatim = `https://wa.me/6281336766061`;
  const kesra1 = `https://wa.me/6285646151120`;
  const disporapar1 = `https://wa.me/6282332008658`;

  // Active Tab State
  const [activeTab, setActiveTab] = useState("prestasi");

  return (
    <LayoutWeb>
      {/* HERO SECTION (SAWERIA 3D RETRO STYLE) */}
      <section className="saweria-hero-section text-center">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="saweria-mascot-badge">
            <i className="fas fa-list-check"></i>
            <span>Panduan Resmi Beasiswa Sidoarjo</span>
          </div>

          <h1 className="hero-title-3d">
            Persyaratan & Ketentuan Lengkap <br />
            <span className="hero-title-highlight mt-3 d-inline-block">Beasiswa Pemkab Sidoarjo</span>
          </h1>

          <p className="hero-subtitle-3d mx-auto">
            Pahami kriteria kelayakan, berkas administrasi wajib, serta petunjuk pengisian Surat Pernyataan Tanggung Jawab Mutlak (SPTJM) untuk setiap jalur pendaftaran.
          </p>

          {/* Saweria 3D Category Chip Selector */}
          <div className="category-chips-wrapper mt-4">
            <button
              className={`category-chip-btn ${activeTab === "prestasi" ? "active" : ""}`}
              onClick={() => setActiveTab("prestasi")}
            >
              <i className="fas fa-trophy"></i> Beasiswa Prestasi (Mahasiswa)
            </button>
            <button
              className={`category-chip-btn ${activeTab === "kurang-mampu" ? "active" : ""}`}
              onClick={() => setActiveTab("kurang-mampu")}
            >
              <i className="fas fa-hand-holding-heart"></i> Kurang Mampu (DTKS / SKTM)
            </button>
            <button
              className={`category-chip-btn ${activeTab === "keagamaan" ? "active" : ""}`}
              onClick={() => setActiveTab("keagamaan")}
            >
              <i className="fas fa-mosque"></i> Keagamaan & Hafiz
            </button>
            <button
              className={`category-chip-btn ${activeTab === "yatim" ? "active" : ""}`}
              onClick={() => setActiveTab("yatim")}
            >
              <i className="fas fa-child"></i> Beasiswa Yatim (SD/SMP/SMA)
            </button>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="py-5 bg-white border-bottom border-slate-900">
        <div className="container max-w-6xl mx-auto px-4">

          {/* ===================== TAB 1: PRESTASI ===================== */}
          {activeTab === "prestasi" && (
            <div className="space-y-4">
              <div className="text-center max-w-2xl mx-auto mb-5">
                <span className="badge bg-emerald-300 text-slate-900 border border-slate-900 px-3 py-2 rounded-pill font-black text-xs uppercase" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                  JALUR PRESTASI BEASISWA
                </span>
                <h2 className="fw-black mt-3 text-3xl text-slate-900">
                  Persyaratan Beasiswa Prestasi Akademik & Non-Akademik
                </h2>
              </div>

              <div className="row g-4">
                {/* Card 1: Prestasi Akademik */}
                <div className="col-lg-6">
                  <div className="saweria-3d-card">
                    <span className="saweria-corner-badge yellow">akademik pt</span>
                    <div className="saweria-card-icon icon-yellow">
                      <i className="fas fa-graduation-cap"></i>
                    </div>
                    <h3 className="saweria-card-title">Beasiswa Prestasi Akademik</h3>
                    <p className="saweria-card-desc">
                      Diperuntukkan bagi mahasiswa Perguruan Tinggi Negeri (PTN) / Perguruan Tinggi Swasta (PTS) terakreditasi BAN-PT minimal B / Sangat Baik.
                    </p>

                    <div className="p-3 bg-white border-2 border-slate-900 rounded-3 mb-4" style={{ boxShadow: "3px 3px 0px #1e293b" }}>
                      <div className="font-black text-xs uppercase text-slate-500 mb-3 me-2">Kriteria Utama:</div>
                      <ul className="d-flex flex-column gap-2 p-0 m-0 list-unstyled">
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-emerald-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>IPK Minimal 3.40 (Skala 4.00)</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-emerald-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>KTP-El & Kartu Keluarga Kabupaten Sidoarjo</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-emerald-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>Mahasiswa Aktif (Semester 2 s.d 12)</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-emerald-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>Bukti Akreditasi BAN-PT / Kemendikbud</span>
                        </li>
                      </ul>
                    </div>

                    <a href="/spjmt_mahasiswa.docx" download className="btn-saweria-3d-yellow w-100 justify-content-center text-xs py-2">
                      <i className="fas fa-download me-1"></i> Download Template SPTJM Prestasi
                    </a>
                  </div>
                </div>

                {/* Card 2: Prestasi Non-Akademik */}
                <div className="col-lg-6">
                  <div className="saweria-3d-card">
                    <span className="saweria-corner-badge teal">non-akademik</span>
                    <div className="saweria-card-icon icon-teal">
                      <i className="fas fa-trophy"></i>
                    </div>
                    <h3 className="saweria-card-title">Beasiswa Prestasi Non-Akademik</h3>
                    <p className="saweria-card-desc">
                      Penghargaan untuk mahasiswa yang memiliki piagam kejuaraan resmi di bidang olahraga, kebudayaan, teknologi, sains, atau sosial kemanusiaan.
                    </p>

                    <div className="p-3 bg-white border-2 border-slate-900 rounded-3 mb-4" style={{ boxShadow: "3px 3px 0px #1e293b" }}>
                      <div className="font-black text-xs uppercase text-slate-500 mb-3 me-2">Kriteria Utama:</div>
                      <ul className="d-flex flex-column gap-2 p-0 m-0 list-unstyled">
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-teal-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>Juara 1, 2, atau 3 Resmi</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-teal-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>Tingkat Kab / Prov / Nasional / Internasional</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-teal-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>Sertifikat Disahkan Penyelenggara Resmi</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-teal-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>Surat Rekomendasi Instansi / Kampus</span>
                        </li>
                      </ul>
                    </div>

                    <a href="/spjmt_mahasiswa.docx" download className="btn-saweria-3d-teal w-100 justify-content-center text-xs py-2">
                      <i className="fas fa-download me-1"></i> Download Template SPTJM Non-Akademik
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================== TAB 2: KURANG MAMPU ===================== */}
          {activeTab === "kurang-mampu" && (
            <div className="space-y-4">
              <div className="text-center max-w-2xl mx-auto mb-5">
                <span className="badge bg-rose-300 text-slate-900 border border-slate-900 px-3 py-2 rounded-pill font-black text-xs uppercase" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                  BANTUAN DINSOS SIDOARJO
                </span>
                <h2 className="fw-black mt-3 text-3xl text-slate-900">
                  Persyaratan Beasiswa Kurang Mampu (DTKS / SKTM)
                </h2>
              </div>

              <div className="row g-4">
                <div className="col-lg-6">
                  <div className="saweria-3d-card">
                    <span className="saweria-corner-badge pink">terdaftar dtks</span>
                    <div className="saweria-card-icon icon-pink">
                      <i className="fas fa-hand-holding-heart"></i>
                    </div>
                    <h3 className="saweria-card-title">Jalur Terdaftar DTKS</h3>
                    <p className="saweria-card-desc">
                      Bantuan untuk mahasiswa dari keluarga yang sudah terdaftar dalam Data Terpadu Kesejahteraan Sosial (DTKS) KemenSos / Dinas Sosial.
                    </p>

                    <div className="p-3 bg-white border-2 border-slate-900 rounded-3 mb-4" style={{ boxShadow: "3px 3px 0px #1e293b" }}>
                      <ul className="d-flex flex-column gap-2 p-0 m-0 list-unstyled">
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-rose-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>Terdaftar di DTKS Kementerian Sosial</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-rose-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>KTP-El & KK Asli Kabupaten Sidoarjo</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-rose-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>Surat Keterangan Mahasiswa Aktif</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-rose-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>Survey Lapangan Petugas Dinsos</span>
                        </li>
                      </ul>
                    </div>

                    <a href="/SPTJMBEASISWA_KURANGMAMPU.docx" download className="btn-saweria-3d-yellow w-100 justify-content-center text-xs py-2">
                      <i className="fas fa-download me-1"></i> Download Template SPTJM Kurang Mampu
                    </a>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="saweria-3d-card">
                    <span className="saweria-corner-badge yellow">sktm desa</span>
                    <div className="saweria-card-icon icon-yellow">
                      <i className="fas fa-file-signature"></i>
                    </div>
                    <h3 className="saweria-card-title">Jalur Non-DTKS (SKTM)</h3>
                    <p className="saweria-card-desc">
                      Bantuan bagi mahasiswa belum masuk DTKS, dibuktikan dengan Surat Keterangan Tidak Mampu (SKTM) resmi dari Desa/Kelurahan setempat.
                    </p>

                    <div className="p-3 bg-white border-2 border-slate-900 rounded-3 mb-4" style={{ boxShadow: "3px 3px 0px #1e293b" }}>
                      <ul className="d-flex flex-column gap-2 p-0 m-0 list-unstyled">
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-amber-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>SKTM Asli dari Kepala Desa / Lurah</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-amber-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>Surat Bebas Beasiswa Lain</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-amber-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>KTP-El Sidoarjo & Foto Kondisi Rumah</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-amber-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>Penilaian Tim Survey Dinsos Sidoarjo</span>
                        </li>
                      </ul>
                    </div>

                    <a href="/SPTJMBEASISWA_KURANGMAMPU.docx" download className="btn-saweria-3d-teal w-100 justify-content-center text-xs py-2">
                      <i className="fas fa-download me-1"></i> Download Template SPTJM SKTM
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================== TAB 3: KEAGAMAAN ===================== */}
          {activeTab === "keagamaan" && (
            <div className="space-y-4">
              <div className="text-center max-w-2xl mx-auto mb-5">
                <span className="badge bg-purple-300 text-slate-900 border border-slate-900 px-3 py-2 rounded-pill font-black text-xs uppercase" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                  PROGRAM BAGIAN KESRA
                </span>
                <h2 className="fw-black mt-3 text-3xl text-slate-900">
                  Persyaratan Beasiswa Keagamaan & Hafiz Qur'an
                </h2>
              </div>

              <div className="row g-4">
                <div className="col-lg-6">
                  <div className="saweria-3d-card">
                    <span className="saweria-corner-badge green">hafiz & mtq</span>
                    <div className="saweria-card-icon icon-purple">
                      <i className="fas fa-book-quran"></i>
                    </div>
                    <h3 className="saweria-card-title">Hafiz 10 Juz & Kejuaraan MTQ</h3>
                    <p className="saweria-card-desc">
                      Penghargaan untuk mahasiswa Hafiz/Hafizah minimal 10 Juz Al-Qur'an atau pemenang kejuaraan Musabaqah Tilawatil Qur'an (MTQ).
                    </p>

                    <div className="p-3 bg-white border-2 border-slate-900 rounded-3 mb-4" style={{ boxShadow: "3px 3px 0px #1e293b" }}>
                      <ul className="d-flex flex-column gap-2 p-0 m-0 list-unstyled">
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-purple-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>Sertifikat / SK Hafiz Minimal 10 Juz</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-purple-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>Piagam Kejuaraan MTQ Kab/Prov/Nasional</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-purple-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>Uji Petik / Tes Hafalan Kesra</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-purple-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>KTP-El & KK Kabupaten Sidoarjo</span>
                        </li>
                      </ul>
                    </div>

                    <a href="/sptjm_kesra.docx" download className="btn-saweria-3d-yellow w-100 justify-content-center text-xs py-2">
                      <i className="fas fa-download me-1"></i> Download Template SPTJM Kesra
                    </a>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="saweria-3d-card">
                    <span className="saweria-corner-badge teal">santri & pengurus</span>
                    <div className="saweria-card-icon icon-teal">
                      <i className="fas fa-mosque"></i>
                    </div>
                    <h3 className="saweria-card-title">Santri, Guru Ngaji, & Aktivis</h3>
                    <p className="saweria-card-desc">
                      Bantuan untuk santri menetap di Pondok Pesantren, Guru Ngaji TPQ/Madin, pengurus aktifis Ormas Keagamaan (Muslim & Non-Muslim).
                    </p>

                    <div className="p-3 bg-white border-2 border-slate-900 rounded-3 mb-4" style={{ boxShadow: "3px 3px 0px #1e293b" }}>
                      <ul className="d-flex flex-column gap-2 p-0 m-0 list-unstyled">
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-teal-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>Surat Keterangan Santri Aktif Ponpes</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-teal-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>Rekomendasi Kepala TPQ / Madin</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-teal-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>SK Pengurus Harian Aktivis Organisasi</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-teal-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>Piagam / SK Keagamaan Non-Muslim</span>
                        </li>
                      </ul>
                    </div>

                    <a href="/sptjm_kesra.docx" download className="btn-saweria-3d-teal w-100 justify-content-center text-xs py-2">
                      <i className="fas fa-download me-1"></i> Download Template SPTJM Kesra
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================== TAB 4: BEASISWA YATIM ===================== */}
          {activeTab === "yatim" && (
            <div className="space-y-4">
              <div className="text-center max-w-2xl mx-auto mb-5">
                <span className="badge bg-teal-300 text-slate-900 border border-slate-900 px-3 py-2 rounded-pill font-black text-xs uppercase" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                  PROGRAM DISPENDIK & DINSOS
                </span>
                <h2 className="fw-black mt-3 text-3xl text-slate-900">
                  Persyaratan Beasiswa Anak Yatim (SD / SMP / SMA)
                </h2>
              </div>

              <div className="row g-4">
                <div className="col-lg-6">
                  <div className="saweria-3d-card">
                    <span className="saweria-corner-badge yellow">sd & smp</span>
                    <div className="saweria-card-icon icon-yellow">
                      <i className="fas fa-child"></i>
                    </div>
                    <h3 className="saweria-card-title">Beasiswa Yatim SD & SMP</h3>
                    <p className="saweria-card-desc">
                      Diperuntukkan bagi siswa yatim / piatu terdaftar pada SD dan SMP Negeri / Swasta di Kabupaten Sidoarjo.
                    </p>

                    <div className="p-3 bg-white border-2 border-slate-900 rounded-3 mb-4" style={{ boxShadow: "3px 3px 0px #1e293b" }}>
                      <ul className="d-flex flex-column gap-2 p-0 m-0 list-unstyled">
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-amber-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>Surat Keterangan Kematian Orang Tua</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-amber-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>Kolektif Diusulkan Pihak Sekolah</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-amber-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>Terdaftar NPSN Sekolah di Sidoarjo</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-amber-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>Kartu Keluarga (KK) Kabupaten Sidoarjo</span>
                        </li>
                      </ul>
                    </div>

                    <a href="/spjmt_yatimsdsmp.docx" download className="btn-saweria-3d-yellow w-100 justify-content-center text-xs py-2">
                      <i className="fas fa-download me-1"></i> Download Template SPTJM Yatim SD/SMP
                    </a>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="saweria-3d-card">
                    <span className="saweria-corner-badge pink">sma sederajat</span>
                    <div className="saweria-card-icon icon-pink">
                      <i className="fas fa-graduation-cap"></i>
                    </div>
                    <h3 className="saweria-card-title">Beasiswa Yatim SMA / SMK</h3>
                    <p className="saweria-card-desc">
                      Diperuntukkan bagi siswa yatim / piatu jenjang SMA, SMK, dan MA Negeri maupun Swasta sederajat di Kabupaten Sidoarjo.
                    </p>

                    <div className="p-3 bg-white border-2 border-slate-900 rounded-3 mb-4" style={{ boxShadow: "3px 3px 0px #1e293b" }}>
                      <ul className="d-flex flex-column gap-2 p-0 m-0 list-unstyled">
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-pink-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>Akta Kematian Orang Tua / Surat Desa</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-pink-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>Surat Aktif Siswa dari Kepala Sekolah</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-pink-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>Rekomendasi Dinas Sosial Sidoarjo</span>
                        </li>
                        <li className="d-flex align-items-center gap-2 font-bold text-slate-800 text-sm">
                          <span className="badge bg-pink-300 text-slate-900 border border-slate-900 rounded-2 p-1 shrink-0" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
                            <i className="fas fa-check text-xs"></i>
                          </span>
                          <span>Dokumen Kartu Keluarga Sidoarjo</span>
                        </li>
                      </ul>
                    </div>

                    <a href="/SPTJMYATIM_SMA.docx" download className="btn-saweria-3d-teal w-100 justify-content-center text-xs py-2">
                      <i className="fas fa-download me-1"></i> Download Template SPTJM Yatim SMA
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SAWERIA 3D STEPS BOX ("petunjuk pengisian & upload") */}
          <div className="saweria-steps-box text-start my-5">
            <span className="saweria-corner-badge">petunjuk pengisian</span>
            <ol className="saweria-steps-list">
              <li>
                <span className="step-num-badge">1</span>
                <span>Download template Surat Pernyataan Tanggung Jawab Mutlak (SPTJM) sesuai kategori beasiswa Anda</span>
              </li>
              <li>
                <span className="step-num-badge">2</span>
                <span>Cetak dan isi formulir SPTJM secara lengkap, kemudian bubuhi materai Rp 10.000 dan tanda tangan</span>
              </li>
              <li>
                <span className="step-num-badge">3</span>
                <span>Scan berkas SPTJM dan dokumen persyaratan dalam bentuk format PDF (Ukuran Maksimal 2MB per file)</span>
              </li>
              <li>
                <span className="step-num-badge">4</span>
                <span>Login ke portal sistem dan unggah seluruh dokumen persyaratan sebelum batas akhir pendaftaran</span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* SAWERIA 3D HELPDESK CONTACTS */}
      <section className="py-5 bg-slate-50">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-5">
            <span className="badge bg-teal-300 text-slate-900 border border-slate-900 px-3 py-2 rounded-pill font-black text-xs uppercase" style={{ boxShadow: "2px 2px 0px #1e293b" }}>
              LAYANAN KONSULTASI HELPDESK
            </span>
            <h2 className="fw-black mt-3 text-3xl text-slate-900">
              Butuh Bantuan Seputar Persyaratan?
            </h2>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="saweria-3d-card p-4">
                <div className="saweria-card-icon icon-yellow">
                  <i className="fas fa-hands-holding-child"></i>
                </div>
                <h5 className="fw-black text-slate-900 text-base mb-1">Dinas Sosial</h5>
                <p className="text-xs font-bold text-slate-600 mb-3">DTKS & Yatim Mahasiswa</p>
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
                <p className="text-xs font-bold text-slate-600 mb-3">Beasiswa Yatim SD/SMP</p>
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
                <p className="text-xs font-bold text-slate-600 mb-3">Keagamaan & Hafiz</p>
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
    </LayoutWeb>
  );
}