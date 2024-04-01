import React from "react";

export default function Akademik({
  name,
  nik,
  kartuKeluarga,
  noHp,
  email,
  alamat,
  rt,
  rw,
  imageKtp,
  imageKartuKeluarga,
  imageAktifkampus,
  imageSuratpernyataan,
  imageAkrekampus,
  imageSuratBeasiswa,
  ipk,
  semester,
  akredetasi_kampus,
  imagebanpt,
  imagetranskrip,
}) {
  return (
    <>
      <div className="row mt-1 mb-2">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow-sm border-top-success">
            <div className="card-header text-dark">Data Beasiswa Akademik</div>
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
                        No Hanphone
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
                    <tr>
                      <td
                        style={{ width: "25%" }}
                        className="fw-bold text-center"
                      >
                        IPK
                      </td>
                      <td className="fw-bold text-center">{ipk}</td>
                    </tr>
                    <tr>
                      <td
                        style={{ width: "25%" }}
                        className="fw-bold text-center"
                      >
                        Semester
                      </td>
                      <td className="fw-bold text-center">{semester}</td>
                    </tr>
                    <tr>
                      <td
                        style={{ width: "25%" }}
                        className="fw-bold text-center"
                      >
                        Akredetasi
                      </td>
                      <td className="fw-bold text-center">
                        {akredetasi_kampus}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <hr />
          <div className="card border-0 rounded shadow-sm border-top-success">
            <div className="card-header text-dark">File Beasiswa Akademik</div>
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
                      src={imageKartuKeluarga}
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
          <hr />
          <div className="card border-0 rounded shadow-sm border-top-success">
            <div className="card-header text-dark">File Beasiswa Akademik</div>
            <div className="card-body">
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="card rounded">
                    <div className="text-center">Bukti Akredetasi Dari BANPT</div>
                    <iframe
                      src={imagebanpt}
                      title="Embedded Content"
                      className="embed-responsive-item"
                      height="400"
                      allowFullScreen
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card rounded">
                    <div className="text-center">Transkrip Nilai Pada Semester Akhir</div>
                    <iframe
                      src={imagetranskrip}
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
