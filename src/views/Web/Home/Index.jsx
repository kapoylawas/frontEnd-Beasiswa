import { useEffect } from 'react';
import LayoutWeb from "../../../layouts/Web";

export default function Home() {
  const fiqi = `https://wa.me/6289630324926`;
  const petirc = `https://wa.me/6281235949497`;
  const munip = `https://wa.me/6281234278662`;
  const dinsos = `https://wa.me/6285711404090`;

  useEffect(() => {
    const showModal = async () => {
      const { Modal } = await import('bootstrap');
      const modalElement = document.getElementById('announcementModal');
      if (modalElement) {
        new Modal(modalElement).show();
      }
    };

    const timer = setTimeout(showModal, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LayoutWeb>
      <div className="modal fade" id="announcementModal" tabIndex="-1" aria-labelledby="announcementModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title font-weight-bold">PENGUMUMAN BEASISWA SIDOARJO 2025</h5>
              <button type="button" className="close text-black" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">X</span>
              </button>
            </div>
            <div className="modal-body text-center">
              <img
                src="/2025.jpeg"
                alt="Pengumuman Beasiswa Sidoarjo 2025"
                className="img-fluid rounded mb-3"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              <p className="text-muted">Informasi lengkap dapat diunduh dalam bentuk PDF</p>
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <a
                href="/pengumuman_penerima.pdf"
                className="btn btn-danger mr-3"
                download="pengumuman_penerima.pdf"
              >
                <i className="fas fa-file-pdf mr-2"></i> Download PDF
              </a>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4 mb-1">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="text-center">
              <img src="/sidoarjo.png" alt="Sidoarjo" className="img-fluid rounded mb-3" style={{ maxWidth: '100px' }} />
              <h4 className="font-weight-bold text-dark">Informasi Beasiswa</h4>
              <p className="text-dark" style={{ fontSize: "1.5rem" }}>
                Pemerintah Kabupaten Sidoarjo menyambut para mahasiswa Kabupaten
                <b style={{ marginLeft: "5px" }}>Sidoarjo 2025</b>
              </p>
              <div className="divider-custom mx-auto"></div>
            </div>
            <div className="card-body mt-1"></div>
          </div>
          <div className="col-md-12 mt-1 mb-1">
            <div className="col-md-12 mb-2">
              <div className="card border-0 shadow-sm rounded-3 text-center text-uppercase">
                <div className="card-body mt-1">
                  <h4 className="font-weight-bold text-dark">Kontak Person</h4>
                  <hr />
                  <h6>
                    <div className="list-group my-3">
                      <ul className="list-group">
                        <li className="list-group-item">
                          <span
                            style={{ fontSize: "1.2rem" }}
                            className="text-dark mt-2"
                          >
                            Helpdesk Beasiswa Akademik, Non Akademik, Luar Negeri:{" "}
                            {""}
                            <i className="fa-brands fa-whatsapp"></i>
                            <a target="_blank" href={fiqi}>
                              {" "}
                              {""} Hp.089630324926
                            </a>
                            , <i className="fa-brands fa-whatsapp"></i>{" "}
                            <a target="_blank" href={petirc}>
                              {" "}
                              {""} Hp.081235949497
                            </a>
                          </span>
                        </li>
                        <li className="list-group-item">
                          <span
                            style={{ fontSize: "1.2rem" }}
                            className="text-dark mt-2"
                          >
                            Heldesk Beasiswa Bidang Keagamaan:{" "}
                            <i className="fa-brands fa-whatsapp"></i>
                            <a target="_blank" href={munip}>
                              {" "}
                              {""} Hp.081234278662
                            </a>
                          </span>
                        </li>
                        <li className="list-group-item">
                          <span
                            style={{ fontSize: "1.2rem" }}
                            className="text-dark mt-2"
                          >
                            Helpdesk Beasiswa Kurang Mampu:{" "}
                            <i className="fa-brands fa-whatsapp"></i>
                            <a target="_blank" href={dinsos}>
                              {" "}
                              {""} Hp.085711404090
                            </a>{" "}
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
                    </div>
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 mt-1">
            <div className="col-md-12">
              <div className="card border-0 shadow-sm rounded-3 text-center text-uppercase">
                <div className="card-body mt-1">
                  <h4 className="font-weight-bold text-dark">Pengumuman</h4>
                  <hr />
                  {/* <div className="mt-3">
                    <button
                      className="btn btn-primary mr-3"
                      onClick={() => {
                        const modal = new window.bootstrap.Modal(document.getElementById('announcementModal'));
                        modal.show();
                      }}
                    >
                      <i className="fas fa-eye mr-2"></i> Lihat Pengumuman
                    </button>
                    <a
                      href="/2025.pdf"
                      className="btn btn-success"
                      download="Beasiswa_Sidoarjo_2025.pdf"
                    >
                      <i className="fas fa-download mr-2"></i> Download PDF
                    </a>
                  </div> */}
                  <div className="d-flex justify-content-center">
                    <img
                      src="/2025.jpeg"
                      alt="Pengumuman Beasiswa Sidoarjo"
                      className="img-fluid rounded mb-3"
                      style={{ maxWidth: '80%', height: 'auto' }}
                      data-toggle="modal"
                      data-target="#announcementModal"
                      onClick={() => {
                        const modal = new window.bootstrap.Modal(document.getElementById('announcementModal'));
                        modal.show();
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutWeb>
  );
}