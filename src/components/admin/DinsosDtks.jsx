import React from "react";

export default function DinsosDtks({
  name,
  nik,
  kartuKeluarga,
  noHp,
  email,
  alamat,
  rt,
  rw,
  imageKtp,
  imagekk,
  imageAktifkampus,
  imageSuratpernyataan,
  imageAkrekampus,
  imageSuratBeasiswa,
}) {
  return (
    <>
      <div className="row mt-1 mb-2">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow-sm border-top-success">
            <div className="card-header text-dark">
              Data Beasiswa Dinsos
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-striped text-dark">
                  <tbody>
                    <tr>
                      <td
                        style={{ width: "25%" }}
                        className="fw-bold text-center"
                      >
                        Nama Lengkap
                      </td>
                      <td className="fw-bold text-center">{name}</td>
                    </tr>
                    <tr>
                      <td
                        style={{ width: "25%" }}
                        className="fw-bold text-center"
                      >
                        NIK (No Induk Kependudukan)
                      </td>
                      <td className="fw-bold text-center">{nik}</td>
                    </tr>
                    <tr>
                      <td
                        style={{ width: "25%" }}
                        className="fw-bold text-center"
                      >
                        No Kartu Keluarga
                      </td>
                      <td className="fw-bold text-center">{kartuKeluarga}</td>
                    </tr>
                    <tr>
                      <td
                        style={{ width: "25%" }}
                        className="fw-bold text-center"
                      >
                        No Handphone
                      </td>
                      <td className="fw-bold text-center">{noHp}</td>
                    </tr>
                    <tr>
                      <td
                        style={{ width: "25%" }}
                        className="fw-bold text-center"
                      >
                        Email
                      </td>
                      <td className="fw-bold text-center">{email}</td>
                    </tr>
                    <tr>
                      <td
                        style={{ width: "25%" }}
                        className="fw-bold text-center"
                      >
                        Alamat
                      </td>
                      <td className="fw-bold text-center">
                        {alamat}, RT: {rt}, RW: {rw}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 mt-3">
          <div className="card border-0 rounded shadow-sm border-top-success">
            <div className="card-header text-dark">
              Data Beasiswa Non Akademik
            </div>
            <div className="card-body">
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="card rounded">
                    <div className="text-center">File KTP</div>
                    <iframe
                      src={imageKtp}
                      title="Embedded Content"
                      className="embed-responsive-item"
                      height="400"
                      allowFullScreen
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card rounded">
                    <div className="text-center">File Kartu Keluarga</div>
                    <iframe
                      src={imagekk}
                      title="Embedded Content"
                      className="embed-responsive-item"
                      height="400"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
              <div className="row justify-content-center mt-3">
                <div className="col-md-6">
                  <div className="card rounded">
                    <div className="text-center">
                      File Surat Keterangan Aktif Kampus
                    </div>
                    <iframe
                      src={imageAktifkampus}
                      title="Embedded Content"
                      className="embed-responsive-item"
                      height="400"
                      allowFullScreen
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card rounded">
                    <div className="text-center">File Surat Pernyataan</div>
                    <iframe
                      src={imageSuratpernyataan}
                      title="Embedded Content"
                      className="embed-responsive-item"
                      height="400"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
              <div className="row justify-content-center mt-3">
                <div className="col-md-6">
                  <div className="card rounded">
                    <div className="text-center">File Akredetasi Kampus</div>
                    <iframe
                      src={imageAkrekampus}
                      title="Embedded Content"
                      className="embed-responsive-item"
                      height="400"
                      allowFullScreen
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card rounded">
                    <div className="text-center">
                      File Surat Tidak Menerima Beasiswa Lain
                    </div>
                    <iframe
                      src={imageSuratBeasiswa}
                      title="Embedded Content"
                      className="embed-responsive-item"
                      height="400"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
