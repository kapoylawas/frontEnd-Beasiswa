//import layout
import { Link } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Api from "../../../services/Api";

export default function RiwayatIndex() {
  document.title = "Dashboard - Riwayat Pendaftar Beasiswa";

  const [tipebeasiswa, setTipebeasiswa] = useState("");
  const [dataAkademik, setDataAkademik] = useState("");
  const [dataNonAkademik, setDataNonAkademik] = useState("");
  console.log(dataNonAkademik);

  let jenisBeasiswa;

  switch (tipebeasiswa) {
    case 1:
      jenisBeasiswa = "Akademik";
      break;
    case 2:
      jenisBeasiswa = "Non Akademik";
      break;
    case 3:
      jenisBeasiswa = "Kesra";
      break;
    case 4:
      jenisBeasiswa = "Dinsos";
      break;
    default:
      jenisBeasiswa = "Tipe Beasiswa Tidak Diketahui";
  }

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
      setTipebeasiswa(response.data.data.tipe_beasiswa);
      setDataAkademik(response.data.data);
      setDataNonAkademik(response.data.data);
    });
  }, []);

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <p>Tipe Beasiswa: {jenisBeasiswa}</p>
          {tipebeasiswa === 1 ? (
            <>
              <div className="row mt-1">
                <div className="col-md-12">
                  <div className="card border-0 rounded shadow-sm border-top-success">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-bordered table-centered mb-0 rounded">
                          <thead className="thead-dark">
                            <tr className="border-0">
                              <th className="border-0" style={{ width: "5%" }}>
                                No.
                              </th>
                              <th className="border-0">Full Name</th>
                              <th className="border-0">Email Address</th>
                              <th className="border-0">NIK</th>
                              <th className="border-0">Terdaftar</th>
                              <th className="border-0">Sertifikat</th>
                              <th className="border-0" style={{ width: "15%" }}>
                                Actions
                              </th>
                            </tr>
                          </thead>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
          {tipebeasiswa === 2 ? (
            <>
              <div>non akademik data</div>
              <div className="row mt-1">
                <div className="col-md-12">
                  <div className="card border-0 rounded shadow-sm border-top-success">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-bordered table-centered mb-0 rounded">
                          <thead className="thead-dark">
                            <tr className="border-0">
                              <th className="border-0">Full Name</th>
                              <th className="border-0">Email Address</th>
                              <th className="border-0">NIK</th>
                              <th className="border-0">No KK</th>
                              <th className="border-0">Universitas</th>
                              <th className="border-0" style={{ width: "15%" }}>
                                No Hp / WA
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="fw-bold text-center">
                                {dataAkademik.name}
                              </td>
                              <td className="fw-bold text-center">
                                {dataAkademik.email}
                              </td>
                              <td className="fw-bold text-center">
                                {dataAkademik.nik}
                              </td>
                              <td className="fw-bold text-center">
                                {dataAkademik.nokk}
                              </td>
                              <td className="fw-bold text-center">
                                {dataAkademik.universitas}
                              </td>
                              <td className="fw-bold text-center">
                                {dataAkademik.nohp}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </main>
    </LayoutAdmin>
  );
}
