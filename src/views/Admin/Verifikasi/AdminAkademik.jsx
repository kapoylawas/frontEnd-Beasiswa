//import layout
import { useEffect, useState } from "react";
//import react router dom
import LayoutAdmin from "../../../layouts/Admin";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../../services/Api";
//import js cookie
import Cookies from "js-cookie";
//import pagination component
import Pagination from "../../../components/general/Pagination";

export default function AdminAkademik() {
  document.title = "Disporapar - Beasiswa Sidoarjo";

  //token from cookies
  const token = Cookies.get("token");

  //define state "products"
  const [akademiks, setAkademiks] = useState([]);
  console.log(akademiks);

  //define state "keywords"
  const [keywords, setKeywords] = useState("");

  //define state "pagination"
  const [pagination, setPagination] = useState({
    currentPage: 0,
    perPage: 0,
    total: 0,
  });

  //function "searchData"
  const searchData = async (e) => {
    //set value to state "keywords"
    setKeywords(e.target.value);
  };

  const fetchData = async (pageNumber = 1, keywords = "") => {
    //define variable "page"
    const page = pageNumber ? pageNumber : pagination.currentPage;

    await Api.get(
      `/api/admin/beasiswa/akademiks?search=${keywords}&page=${page}`,
      {
        //header
        headers: {
          //header Bearer + Token
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      //set data response to state "setProducts"
      setAkademiks(response.data.data.data);

      //set data pagination to state "pagination"
      setPagination(() => ({
        currentPage: response.data.data.current_page,
        perPage: response.data.data.per_page,
        total: response.data.data.total,
      }));
    });
  };

  //useEffect
  useEffect(() => {
    //call function "fetchData"
    fetchData();
  }, []);

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid px-4 mb-4 mt-4">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-9 col-12 mb-2">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control border-0 shadow-sm"
                      onChange={(e) => searchData(e)}
                      placeholder="search here..."
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
                      <tbody>
                        {
                          //cek apakah data ada
                          akademiks.length > 0 ? (
                            akademiks.map((akademik, index) => (
                              <tr key={index}>
                                <td className="fw-bold text-center">
                                  {++index +
                                    (pagination.currentPage - 1) *
                                      pagination.perPage}
                                </td>
                                <td>{akademik.user.name}</td>
                                <td>{akademik.user.nik}</td>
                                <td>{akademik.user.nokk}</td>
                                <td>{akademik.user.nohp}</td>
                                <td>{akademik.user.email}</td>
                                <td>
                                  {akademik.user.status_verif === null && (
                                    <p>
                                      <button className="btn btn-md btn-danger me-2">
                                        Belum diverifikasi
                                      </button>
                                    </p>
                                  )}
                                  {akademik.user.status_verif === 1 && (
                                    <button className="btn btn-md btn-danger me-2">
                                      Sudah diverifikasi
                                    </button>
                                  )}
                                </td>
                                <td className="text-center">
                                  <Link
                                    to={`/admin/adminAkademik/edit/${akademik.id}`}
                                    className="btn btn-primary btn-sm me-2"
                                  >
                                    <i className="fa fa-pencil-alt"></i>
                                  </Link>
                                  <button className="btn btn-danger btn-sm">
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            //tampilkan pesan data belum tersedia
                            <tr>
                              <td colSpan={5}>
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
