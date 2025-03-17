//import layout
import LayoutWeb from "../../../layouts/Web";

export default function Info() {
  const fiqi = `https://wa.me/6289630324926`;
  const petirc = `https://wa.me/6281235949497`;
  const munip = `https://wa.me/6281234278662`;
  const dinsos = `https://wa.me/6285711404090`;
  return (
    <LayoutWeb>
      <div className="container mt-5">
        <div className="text-center">
          <img src="/sidoarjo.png" alt="Sidoarjo" className="img-fluid rounded mb-3" style={{ maxWidth: '100px' }} />
          <h4 className="font-weight-bold text-dark">Informasi Beasiswa</h4>
          <p className="text-dark" style={{ fontSize: "1.5rem" }}>
            PPersyaratan Administrasi Calon Penerima Beasiswa
            <b style={{ marginLeft: "5px" }}>Kabupaten Sidoarjo 2025</b>
          </p>
          <div className="divider-custom mx-auto mb-3"></div>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">1. Pengajuan Permohonan</h5>
            <p>
              Mahasiswa mengajukan permohonan dengan mengisi formulir pendaftaran secara online dan mengunggah dokumen yang dipersyaratkan.
            </p>

            <h5 className="card-title">2. Persyaratan Umum</h5>
            <ul>
              <li>Penduduk Kabupaten Sidoarjo yang dibuktikan dengan Kartu Keluarga (KK) dan Kartu Tanda Penduduk Elektronik (KTP-el).</li>
              <li>Terdaftar sebagai mahasiswa Perguruan Tinggi yang dibuktikan dengan surat keterangan aktif kuliah dan kartu identitas kemahasiswaan dari Perguruan Tinggi.</li>
              <li>Tidak sedang menerima beasiswa untuk tujuan serupa dari pihak manapun yang dibuktikan dengan surat pernyataan.</li>
            </ul>

            <h5 className="card-title">3. Persyaratan Khusus</h5>
            <h6>Beasiswa Prestasi bidang akademik</h6>
            <ul>
              <li><strong>Dalam Negeri:</strong> Memiliki IPK serendah-rendahnya 3,4 yang dibuktikan dengan transkrip nilai.</li>
              <li><strong>Luar Negeri:</strong> Memiliki IPK atau GPA yang dibuktikan dengan transkrip nilai.</li>
            </ul>

            <h6>Beasiswa Prestasi bidang non akademik</h6>
            <ul>
              <li>Prestasi di berbagai bidang dengan menunjukkan bukti prestasi dalam 4 tahun terakhir.</li>
            </ul>

            <h6>Beasiswa mahasiswa kurang mampu</h6>
            <ul>
              <li>Terdaftar dalam Data Terpadu Kesejahteraan Sosial (DTKS) atau melampirkan SKTM dari Desa.</li>
            </ul>

            <h6>Beasiswa bidang keagamaan</h6>
            <ul>
              <li>Hafal minimal 10 juz A1-Qur'an dan bukti prestasi di bidang keagamaan.</li>
              <li>Santriwan/Santriwati yang berkuliah dan menetap di Pondok Pesantren.</li>
              <li>Pengurus organisasi keagamaan tingkat Kabupaten/Kecamatan.</li>
              <li>Mahasiswa Non Muslim dengan bukti keaktifan di bidang keagamaan.</li>
            </ul>
          </div>
        </div>
      </div>
    </LayoutWeb>
  );
}
