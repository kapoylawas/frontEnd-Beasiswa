//import layout
import LayoutWeb from "../../../layouts/Web";

export default function Home() {
  return (
    <LayoutWeb>
      <div className="container mt-4 mb-3">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="text-center">
              <h4 className="font-weight-bold text-dark">Informasi Beasiswa</h4>
              <p className="text-dark" style={{ fontSize: "1.1rem" }}>
                Pemerintah Kabupaten Sidoarjo menyambut para mahasiswa Kabupaten
                Sidoarjo
              </p>
              <div className="divider-custom mx-auto"></div>
            </div>
            <div className="card-body mt-2"></div>
          </div>
          <div className="col-md-12 mt-3 mb-4">
            <div className="card border-0 shadow-sm rounded-3 text-center text-uppercase">
              <div className="card-body mt-2">
                <h4 className="font-weight-bold text-dark">
                  Penguman Penerima Beasiswa Pendidikan Tinggi Di Kabupaten
                  Sidoarjo Tahun Anggaran 2024
                </h4>
                <hr />
                <h6>
                  {/* <div className="list-group my-3">
                    <ul className="list-group">
                      <li className="list-group-item">
                        <span
                          style={{ fontSize: "1.2rem" }}
                          className="text-dark mt-2"
                        >
                          Kartu Tanda Penduduk (KTP) Sidoarjo
                        </span>
                      </li>
                      <li className="list-group-item">
                        <span
                          style={{ fontSize: "1.2rem" }}
                          className="text-dark mt-2"
                        >
                          Tidak sedang mendapat beasiswa dari instansi lain
                        </span>
                      </li>
                      <li className="list-group-item">
                        <span
                          style={{ fontSize: "1.2rem" }}
                          className="text-dark mt-2"
                        >
                          Diprioritaskan untuk mahasiswa dengan keterbatasan
                          ekonomi
                        </span>
                      </li>
                      <li className="list-group-item">
                        <span
                          style={{ fontSize: "1.2rem" }}
                          className="text-dark mt-2"
                        >
                          Mengisi form dan mengunggah file persyaratan melalui :{" "}
                          <a href="https://beasiswa.sidoarjokab.go.id/">
                            https://beasiswa.sidoarjokab.go.id/
                          </a>
                        </span>
                      </li>
                    </ul>
                  </div> */}
                  <div className="col-md-12">
                    <div className="card rounded">
                      <div className="text-center">30 Aug 2024</div>
                      <iframe
                        src='https://adminweb.sidoarjokab.go.id/upload/files/1724983712-Pengumuman%20Beasiswa.pdf'
                        title="Embedded Content"
                        className="embed-responsive-item"
                        height="700"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutWeb>
  );
}
