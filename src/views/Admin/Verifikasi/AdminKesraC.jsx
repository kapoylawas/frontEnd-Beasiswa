//import layout
import { useEffect, useState } from "react";
//import react router dom
import LayoutAdmin from "../../../layouts/Admin";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../../services/Api";
//import js cookie
import Cookies from "js-cookie";
import Pagination from "../../../components/general/Pagination";
import LoadingTable from "../../../components/general/LoadingTable";


export default function AdminKesraC() {
  document.title = "Kesra - Beasiswa Sidoarjo";

  //token from cookies
  const token = Cookies.get("token");

  //define state "keywords"
  const [keywords, setKeywords] = useState("");

  //define state "pagination"
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  const [kesraCs, setKesraCs] = useState("");

  const [isLoading, setLoading] = useState(false);

  const fetchData = async (pageNumber = 1, keywords = "") => {
    setLoading(true);
    //define variable "page"
    const page = pageNumber ? pageNumber : pagination.currentPage;
    await Api.get(`/api/admin/beasiswa/kesra3?search=${keywords}&page=${page}`, {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set data response to state "setProducts"
      setKesraCs(response.data.data.data);

      //set data pagination to state "pagination"
      setPagination(() => ({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      }));
      //loading
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  };

  //useEffect
  useEffect(() => {
    //call function "fetchData"
    fetchData();
    const handleBeforeUnload = (event) => {
      // Perform any necessary cleanup or actions here
      // This code should not explicitly disable caching

      // Optionally, you can provide a confirmation message
      event.returnValue = "Are you sure you want to leave this page?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  //function "searchData"
  const searchData = async (e) => {
    //set value to state "keywords"
    setKeywords(e.target.value);

    //call function "fetchData"
    fetchData(1, e.target.value);
  };

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid px-4 mb-4 mt-3">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-9 col-12 mb-2">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control border-0 shadow-sm"
                      onChange={(e) => searchData(e)}
                      placeholder="Masukkan NIK Peserta"
                    />
                    <span className="input-group-text border-0 shadow-sm">
                      <i className="fa fa-search"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                          <th className="border-0">Nama</th>
                          <th className="border-0">NIK</th>
                          <th className="border-0">No KK</th>
                          <th className="border-0">Nohp</th>
                          <th className="border-0">Email</th>
                          <th className="border-0">Status Verif</th>
                          <th className="border-0" style={{ width: "15%" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      {isLoading ? (
                        <div class="position-center">
                          <div className="mt-5 position-absolute top-20 start-50 translate-middle mt-1 bi bi-caret-down-fill">
                            <LoadingTable />
                          </div>
                        </div>
                      ) : (
                        <>
                          <tbody>
                            {
                              //cek apakah data ada
                              kesraCs.length > 0 ? (
                                kesraCs.map((kesraC, index) => (
                                  <tr
                                    className={`verif-${
                                      kesraC.user.jenis_verif === null
                                        ? "null"
                                        : kesraC.user.jenis_verif
                                    }`}
                                    key={index}
                                  >
                                    <td className="fw-bold text-center">
                                      {++index +
                                        (pagination.currentPage - 1) *
                                          pagination.perPage}
                                    </td>
                                    <td>{kesraC.user.name}</td>
                                    <td>{kesraC.user.nik}</td>
                                    <td>{kesraC.user.nokk}</td>
                                    <td>{kesraC.user.nohp}</td>
                                    <td>{kesraC.user.email}</td>
                                    <td>
                                      {kesraC.user.jenis_verif ===
                                        "tidak" && (
                                        <p>
                                          <button className="btn btn-md btn-danger me-2">
                                            Tidak Lolos verifikasi
                                          </button>
                                        </p>
                                      )}
                                      {kesraC.user.jenis_verif ===
                                        null && (
                                        <p>
                                          <button className="btn btn-md btn-warning me-2">
                                            Belum verifikasi
                                          </button>
                                        </p>
                                      )}
                                      {kesraC.user.jenis_verif ===
                                        "lolos" && (
                                        <button className="btn btn-md btn-success me-2">
                                          Lolos verifikasi
                                        </button>
                                      )}
                                    </td>
                                    <td className="text-center">
                                      <Link
                                        to={`/admin/editKesraC/${kesraC.id}`}
                                        className="btn btn-primary btn-sm me-2"
                                      >
                                        <a>DETAIL</a>
                                      </Link>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                //tampilkan pesan data belum tersedia
                                <tr>
                                  <td colSpan={8}>
                                    <div
                                      className="alert alert-danger border-0 rounded shadow-sm w-100 text-center"
                                      role="alert"
                                    >
                                      Data Belum Tersedia!.
                                    </div>
                                  </td>
                                </tr>
                              )
                            }
                          </tbody>
                        </>
                      )}
                    </table>
                  </div>
                  <Pagination
                    currentPage={pagination.currentPage}
                    perPage={pagination.perPage}
                    total={pagination.total}
                    onChange={(pageNumber) => fetchData(pageNumber, keywords)}
                    position="end"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}