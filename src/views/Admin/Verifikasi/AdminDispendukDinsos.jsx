//import layout
import { useEffect, useState, useCallback } from "react";
//import react router dom
import LayoutAdmin from "../../../layouts/Admin";
import { Link } from "react-router-dom";
import Api from "../../../services/Api";
//import js cookie
import Cookies from "js-cookie";
//import pagination component
import Pagination from "../../../components/general/Pagination";
import LoadingTable from "../../../components/general/LoadingTable";

export default function AdminDispendukDinsos() {
  document.title = "Disporapar - Beasiswa Sidoarjo";

  //token from cookies
  const token = Cookies.get("token");

  //define state
  const [users, setUsers] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
  });

  // State untuk menyimpan total counts dari backend
  const [totalCounts, setTotalCounts] = useState({
    lolos: 0,
    tidak: 0,
    belum: 0,
    total: 0
  });

  const [isLoading, setLoading] = useState(false);

  const fetchData = useCallback(async (pageNumber = 1, search = "", status = "") => {
    setLoading(true);

    try {
      // Build URL dengan parameter yang lengkap
      let url = `/api/admin/beasiswa/usersDinsos?page=${pageNumber}`;

      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }

      if (status) {
        url += `&status=${encodeURIComponent(status)}`;
      }

      const response = await Api.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const responseData = response.data.data;

        // Set data users
        setUsers(responseData.data || []);

        // Set pagination untuk react-js-pagination
        setPagination({
          currentPage: responseData.current_page || 1,
          perPage: responseData.per_page || 10,
          total: responseData.total || 0,
        });

        // Set total counts dari response (jika ada)
        if (responseData.counts) {
          setTotalCounts({
            lolos: responseData.counts.lolos || 0,
            tidak: responseData.counts.tidak || 0,
            belum: responseData.counts.belum || 0,
            total: responseData.counts.total || responseData.total || 0
          });
        }
      } else {
        console.error("Response not success:", response.data);
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  //useEffect untuk initial load
  useEffect(() => {
    fetchData(1, keywords, filterStatus);
  }, []); // Kosongkan dependency array untuk initial load saja

  //function "searchData"
  const searchData = (e) => {
    const query = e.target.value;
    setKeywords(query);
    // Reset ke halaman 1 saat mencari
    fetchData(1, query, filterStatus);
  };

  //function "handleStatusChange" untuk filter status
  const handleStatusChange = (e) => {
    const status = e.target.value;
    setFilterStatus(status);
    // Reset ke halaman 1 saat mengubah filter
    fetchData(1, keywords, status);
  };

  //function "clearFilters" untuk menghapus semua filter
  const clearFilters = () => {
    setKeywords("");
    setFilterStatus("");
    // Reset ke halaman 1 saat menghapus filter
    fetchData(1, "", "");
  };

  //function untuk handle page change - untuk react-js-pagination
  const handlePageChange = (pageNumber) => {
    // Panggil fetchData dengan page number yang baru
    fetchData(pageNumber, keywords, filterStatus);
  };

  // Hitung jumlah status di halaman ini (untuk tampilan per halaman)
  const pageCounts = {
    lolos: users.filter(user => user.jenis_verif_nik === "lolos").length,
    tidak: users.filter(user => user.jenis_verif_nik === "tidak").length,
    belum: users.filter(user => user.jenis_verif_nik === null).length,
    total: users.length
  };

  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid px-4 mb-4 mt-4">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-6 col-12 mb-2">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control border-0 shadow-sm"
                      value={keywords}
                      onChange={searchData}
                      placeholder="Masukkan NIK Peserta Yang Terdaftar Di Dinsos"
                    />
                    <span className="input-group-text border-0 shadow-sm">
                      <i className="fa fa-search"></i>
                    </span>
                    {(keywords || filterStatus) && (
                      <button
                        className="btn btn-outline-secondary border-0 shadow-sm"
                        type="button"
                        onClick={clearFilters}
                        title="Clear semua filter"
                      >
                        <i className="fa fa-times"></i>
                      </button>
                    )}
                  </div>
                  <small className="text-muted mt-1">
                    Cari berdasarkan NIK peserta
                  </small>
                </div>
                {/* Filter Status Verifikasi */}
                <div className="col-md-3 col-12 mb-2">
                  <select
                    className="form-select border-1 shadow-sm"
                    value={filterStatus}
                    onChange={handleStatusChange}
                  >
                    <option value="">Semua Status</option>
                    <option value="lolos">Lolos Verifikasi</option>
                    <option value="tidak">Tidak Lolos Verifikasi</option>
                    <option value="null">Belum Verifikasi</option>
                  </select>
                  <small className="text-muted mt-1">
                    Filter berdasarkan status verifikasi NIK
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Status Cards dengan Jumlah TOTAL (dari backend) */}
          <div className="row mt-3">
            <div className="col-md-12">
              <div className="row">
                {/* Card Total Semua Data */}
                <div className="col-md-3 col-6 mb-3">
                  <div className="card border-0 bg-primary text-white shadow-sm">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-0">Total Peserta</h6>
                          <h3 className="mt-2 mb-0">{totalCounts.total}</h3>
                          <small>Semua data</small>
                        </div>
                        <i className="fa fa-users fa-2x opacity-50"></i>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Lolos Verifikasi (total) */}
                <div className="col-md-3 col-6 mb-3">
                  <div className="card border-0 bg-success text-white shadow-sm">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-0">Lolos Verifikasi</h6>
                          <h3 className="mt-2 mb-0">{totalCounts.lolos}</h3>
                          <small>
                            {totalCounts.total > 0
                              ? `${((totalCounts.lolos / totalCounts.total) * 100).toFixed(1)}%`
                              : '0%'}
                          </small>
                        </div>
                        <i className="fa fa-check-circle fa-2x opacity-50"></i>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Tidak Lolos (total) */}
                <div className="col-md-3 col-6 mb-3">
                  <div className="card border-0 bg-danger text-white shadow-sm">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-0">Tidak Lolos</h6>
                          <h3 className="mt-2 mb-0">{totalCounts.tidak}</h3>
                          <small>
                            {totalCounts.total > 0
                              ? `${((totalCounts.tidak / totalCounts.total) * 100).toFixed(1)}%`
                              : '0%'}
                          </small>
                        </div>
                        <i className="fa fa-times-circle fa-2x opacity-50"></i>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Belum Verifikasi (total) */}
                <div className="col-md-3 col-6 mb-3">
                  <div className="card border-0 bg-warning text-white shadow-sm">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-0">Belum Verifikasi</h6>
                          <h3 className="mt-2 mb-0">{totalCounts.belum}</h3>
                          <small>
                            {totalCounts.total > 0
                              ? `${((totalCounts.belum / totalCounts.total) * 100).toFixed(1)}%`
                              : '0%'}
                          </small>
                        </div>
                        <i className="fa fa-clock-o fa-2x opacity-50"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Data yang Ditampilkan */}
          <div className="row mt-2">
            <div className="col-md-12">
              <div className="alert alert-light border">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <i className="fa fa-info-circle me-2"></i>
                    <strong>Info:</strong> Menampilkan halaman {pagination.currentPage} dari {Math.ceil(pagination.total / pagination.perPage)} halaman
                  </div>
                  <div>
                    <small className="text-muted">
                      <span className="badge bg-secondary me-1">{users.length}</span> data di halaman ini dari total <span className="badge bg-primary">{pagination.total}</span> data
                      {filterStatus && ` (difilter berdasarkan status)`}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status Indicators dengan jumlah TOTAL dan Per Halaman */}
          <div className="row mt-2">
            <div className="col-md-12">
              <div className="d-flex flex-wrap gap-4">
                <div className="d-flex align-items-center">
                  <div className="status-indicator bg-success me-2" style={{ width: '15px', height: '15px', borderRadius: '3px' }}></div>
                  <small>
                    Lolos Verifikasi: <strong>{totalCounts.lolos}</strong> total
                    <span className="text-muted ms-2">({pageCounts.lolos} di halaman ini)</span>
                  </small>
                </div>
                <div className="d-flex align-items-center">
                  <div className="status-indicator bg-danger me-2" style={{ width: '15px', height: '15px', borderRadius: '3px' }}></div>
                  <small>
                    Tidak Lolos: <strong>{totalCounts.tidak}</strong> total
                    <span className="text-muted ms-2">({pageCounts.tidak} di halaman ini)</span>
                  </small>
                </div>
                <div className="d-flex align-items-center">
                  <div className="status-indicator bg-warning me-2" style={{ width: '15px', height: '15px', borderRadius: '3px' }}></div>
                  <small>
                    Belum Verifikasi: <strong>{totalCounts.belum}</strong> total
                    <span className="text-muted ms-2">({pageCounts.belum} di halaman ini)</span>
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Info filter aktif */}
          {filterStatus && (
            <div className="row mt-2">
              <div className="col-md-12">
                <div className="alert alert-info py-2">
                  <i className="fa fa-filter me-2"></i>
                  Sedang menampilkan data dengan status:{' '}
                  <strong>
                    {filterStatus === 'lolos' ? 'Lolos Verifikasi' :
                     filterStatus === 'tidak' ? 'Tidak Lolos Verifikasi' :
                     'Belum Verifikasi'}
                  </strong>
                </div>
              </div>
            </div>
          )}

          <div className="row mt-3">
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
                        <tbody>
                          <tr>
                            <td colSpan={8}>
                              <LoadingTable />
                            </td>
                          </tr>
                        </tbody>
                      ) : (
                        <tbody>
                          {users.length > 0 ? (
                            users.map((user, index) => {
                              // Hitung nomor urut berdasarkan halaman
                              const rowNumber = (pagination.currentPage - 1) * pagination.perPage + index + 1;

                              return (
                                <tr key={user.id}>
                                  <td className="fw-bold text-center">
                                    {rowNumber}
                                  </td>
                                  <td>{user.name}</td>
                                  <td>{user.nik}</td>
                                  <td>{user.nokk}</td>
                                  <td>{user.nohp}</td>
                                  <td>{user.email}</td>
                                  <td>
                                    {user.jenis_verif_nik === "tidak" && (
                                      <span className="badge bg-danger">
                                        Tidak Lolos verifikasi
                                        {user.verifikator_nik ? ` oleh ${user.verifikator_nik}` : ''}
                                      </span>
                                    )}
                                    {user.jenis_verif_nik === null && (
                                      <span className="badge bg-warning">
                                        Belum verifikasi
                                      </span>
                                    )}
                                    {user.jenis_verif_nik === "lolos" && (
                                      <span className="badge bg-success">
                                        Lolos verifikasi
                                        {user.verifikator_nik ? ` oleh ${user.verifikator_nik}` : ''}
                                      </span>
                                    )}
                                  </td>
                                  <td className="text-center">
                                    <Link
                                      to={`/admin/editDispendukDinsos/${user.id}`}
                                      className="btn btn-primary btn-sm"
                                    >
                                      DETAIL
                                    </Link>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan={8}>
                                <div
                                  className="alert alert-danger border-0 rounded shadow-sm w-100 text-center"
                                  role="alert"
                                >
                                  {keywords || filterStatus ? (
                                    <>
                                      <i className="fa fa-filter me-2"></i>
                                      Data tidak ditemukan dengan filter yang diterapkan.
                                      <button
                                        className="btn btn-sm btn-link text-danger"
                                        onClick={clearFilters}
                                      >
                                        Klik di sini untuk menghapus filter
                                      </button>
                                    </>
                                  ) : (
                                    "Data Belum Tersedia!."
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      )}
                    </table>
                  </div>

                  {/* Info Pagination */}
                  {users.length > 0 && (
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <div className="text-muted">
                          <small>
                            Menampilkan {((pagination.currentPage - 1) * pagination.perPage) + 1} - {Math.min(pagination.currentPage * pagination.perPage, pagination.total)} dari total {pagination.total} data
                            {keywords && ` dengan pencarian "${keywords}"`}
                            {filterStatus && ` dengan status ${
                              filterStatus === 'lolos' ? 'Lolos Verifikasi' :
                              filterStatus === 'tidak' ? 'Tidak Lolos Verifikasi' :
                              'Belum Verifikasi'
                            }`}
                          </small>
                        </div>
                      </div>
                      <div className="col-md-6">
                        {/* Pagination menggunakan react-js-pagination */}
                        <Pagination
                          currentPage={pagination.currentPage}
                          perPage={pagination.perPage}
                          total={pagination.total}
                          onChange={handlePageChange}
                          position="end"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}
