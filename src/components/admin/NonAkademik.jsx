//import layout
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Api from "../../../src/services/Api";

export default function NonAkademik() {
  const [dataNonAkademik, setDataNonAkademik] = useState("");

  //token from cookies
  const token = Cookies.get("token");

  //hook useEffect
  useEffect(() => {
    //fetch api
    Api.get("/api/admin/users/byid", {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set data
      setDataNonAkademik(response.data.data);
    });
  }, []);

  return (
    <>
      <div className="row mt-1">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow-sm border-top-success">
            <div className="card-header text-dark">
              Bioadata Mahasiswa Regis
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-striped text-dark">
                  <tbody>
                    <tr>
                      <td
                        style={{ width: "15%" }}
                        className="fw-bold text-center"
                      >
                        Nama Lengkap
                      </td>
                      <td className="fw-bold text-center">
                        {dataNonAkademik.name}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{ width: "15%" }}
                        className="fw-bold text-center"
                      >
                        NIK
                      </td>
                      <td className="fw-bold text-center">
                        {dataNonAkademik.nik}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{ width: "15%" }}
                        className="fw-bold text-center"
                      >
                        No KK
                      </td>
                      <td className="fw-bold text-center">
                        {dataNonAkademik.nokk}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{ width: "15%" }}
                        className="fw-bold text-center"
                      >
                        Email
                      </td>
                      <td className="fw-bold text-center">
                        {dataNonAkademik.email}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{ width: "15%" }}
                        className="fw-bold text-center"
                      >
                        Nim
                      </td>
                      <td className="fw-bold text-center">
                        {dataNonAkademik.nim}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{ width: "15%" }}
                        className="fw-bold text-center"
                      >
                        Universitas
                      </td>
                      <td className="fw-bold text-center">
                        {dataNonAkademik.universitas}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{ width: "15%" }}
                        className="fw-bold text-center"
                      >
                        Terdaftar
                      </td>
                      <td className="fw-bold text-center">
                        Beasiswa {dataNonAkademik.nonakademik.name}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{ width: "15%" }}
                        className="fw-bold text-center"
                      >
                        Verifikasi User
                      </td>
                      <td className="fw-bold text-center">
                        
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row mt-1">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow-sm border-top-success">
            <div className="card-header text-dark">Document Terupload</div>
            <div className="card-body">
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="card rounded">
                    <div className="text-center">File Akredetasi</div>
                    <iframe
                      src={dataNonAkademik.imageakrekampus}
                      title="Embedded Content"
                      width="480"
                      height="400"
                      allowFullScreen
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card rounded">
                    <div className="text-center">File Surat Aktif Kampus</div>
                    <iframe
                      src={dataNonAkademik.imageaktifkampus}
                      title="Embedded Content"
                      width="480"
                      height="400"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
              <div className="row justify-content-center mt-3">
                <div className="col-md-6">
                  <div className="card rounded">
                    <div className="text-center">File Kartu Keluarga</div>
                    <iframe
                      src={dataNonAkademik.imagekk}
                      title="Embedded Content"
                      width="480"
                      height="400"
                      allowFullScreen
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card rounded">
                    <div className="text-center">File Kartu Tanda Penduduk</div>
                    <iframe
                      src={dataNonAkademik.imagektp}
                      title="Embedded Content"
                      width="480"
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
      <hr />
      <div className="row mt-1">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow-sm border-top-success">
            <div className="card-header text-dark">Document Terupload</div>
            <div className="card-body">
              <div className="row justify-content-center">
                <div className="col-md-12">
                  <div className="card rounded">
                    <div className="text-center">File Akredetasi</div>
                    <iframe
                      src={dataNonAkademik.nonakademik.imagesertifikat}
                      title="Embedded Content"
                      width="100%"
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
