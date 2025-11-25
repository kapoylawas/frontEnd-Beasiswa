import { useEffect, useState, useCallback } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Api from "../../../services/Api";
import Swal from "sweetalert2";

export default function YatimIndex() {
    document.title = "Yatim - Beasiswa Sidoarjo";

    const [yatim, setYatim] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [userData, setUserData] = useState(null);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    // Form state
    const [formData, setFormData] = useState({
        user_id: "",
        nik: "",
        nisn: "",
        npsn: "",
        jenjang: "",
        name: "",
        asal_sekolah: "",
        alamat: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        imageskartukeluarga: null,
        imagesktpwali: null,
        imagesketerangansiswaaktif: null,
        imagessuratkematian: null,
        imagessurattidakmenerimabeasiswa: null,
        imagesuratsktm: null
    });

    // Get user data from cookies
    useEffect(() => {
        const userCookie = Cookies.get("user");
        if (userCookie) {
            try {
                const user = JSON.parse(userCookie);
                setUserData(user);
                setUserId(user.id);
                setFormData(prev => ({
                    ...prev,
                    user_id: user.id,
                    npsn: user.nik || "", // Set NPSN dari user.nik
                    asal_sekolah: user.name || "" // Set Asal Sekolah dari user.name
                }));
            } catch (error) {
                console.error("Error parsing user cookie:", error);
                toast.error("Gagal memuat data user");
            }
        }
    }, []);

    const fetchYatim = useCallback(async (page = 1) => {
        if (!userId) {
            return;
        }

        setLoading(true);
        try {
            const response = await Api.get(`/api/admin/yatim-byidsekolah/${userId}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });

            if (response.data.success) {
                // Handle response structure yang baru
                const data = response.data.data;
                const count = response.data.count;

                setYatim(data || []);
                setTotal(count || 0);

                // Karena endpoint baru tidak support pagination, set default values
                setCurrentPage(1);
                setLastPage(1);

            } else {
                // Jika success false tapi bukan karena data kosong
                if (response.data.message && response.data.message.includes('tidak ditemukan') ||
                    response.data.message && response.data.message.includes('kosong')) {
                    // Data kosong, tidak perlu show error
                    setYatim([]);
                    setTotal(0);
                } else {
                    toast.error(response.data.message || "Gagal mengambil data yatim");
                }
            }
        } catch (error) {
            console.error("Error fetching yatim:", error);

            // Cek jika error karena data tidak ditemukan (404) atau array kosong
            if (error.response?.status === 404 ||
                error.response?.data?.message?.includes('tidak ditemukan') ||
                error.response?.data?.message?.includes('kosong')) {
                // Data kosong, tidak perlu show error
                setYatim([]);
                setTotal(0);
            } else {
                toast.error("Terjadi kesalahan saat mengambil data");
            }
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            fetchYatim();
        }
    }, [fetchYatim, userId]);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        if (files && files[0]) {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validasi user_id
        if (!formData.user_id) {
            toast.error("User ID tidak ditemukan. Silakan login ulang.");
            return;
        }

        setSubmitting(true);

        try {
            const formDataToSend = new FormData();

            // Append all form data to FormData object
            Object.keys(formData).forEach(key => {
                if (formData[key] !== null && formData[key] !== "") {
                    formDataToSend.append(key, formData[key]);
                }
            });

            const response = await Api.post("/api/admin/yatim", formDataToSend, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.success) {
                toast.success(response.data.message);

                // Reset form (kecuali user_id, npsn, dan asal_sekolah)
                setFormData({
                    user_id: userId || "",
                    nik: "",
                    nisn: "",
                    npsn: userData?.nik || "", // Tetap set NPSN dari user.nik
                    jenjang: "",
                    name: "",
                    asal_sekolah: userData?.name || "", // Tetap set Asal Sekolah dari user.name
                    alamat: "",
                    tempat_lahir: "",
                    tanggal_lahir: "",
                    imageskartukeluarga: null,
                    imagesktpwali: null,
                    imagesketerangansiswaaktif: null,
                    imagessuratkematian: null,
                    imagessurattidakmenerimabeasiswa: null,
                    imagesuratsktm: null
                });

                setShowForm(false);

                // Refresh data setelah menambah data baru
                fetchYatim();
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            if (error.response && error.response.data) {
                toast.error(error.response.data.message || "Terjadi kesalahan saat menyimpan data");
            } else {
                toast.error("Terjadi kesalahan saat menyimpan data");
            }
        } finally {
            setSubmitting(false);
        }
    };

    // Fungsi untuk menghapus data yatim dengan SweetAlert2
    const handleDelete = async (item) => {
        const result = await Swal.fire({
            title: 'Apakah Anda yakin?',
            html: `
                <div class="text-start">
                    <p>Data yang dihapus tidak dapat dikembalikan!</p>
                    <div class="alert alert-warning mt-3 p-2">
                        <small>
                            <strong>Data yang akan dihapus:</strong><br/>
                            <strong>${item.name}</strong><br/>
                            NIK: ${item.nik}<br/>
                            NISN: ${item.nisn}<br/>
                            Asal Sekolah: ${item.asal_sekolah}
                        </small>
                    </div>
                </div>
            `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal',
            reverseButtons: true,
            customClass: {
                popup: 'sweet-alert-custom',
                confirmButton: 'btn btn-danger mx-1',
                cancelButton: 'btn btn-secondary mx-1',
                actions: 'swal2-actions-custom'
            },
            buttonsStyling: false,
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    setDeletingId(item.id);
                    const response = await Api.delete(`/api/admin/yatim/${item.id}`, {
                        headers: {
                            Authorization: `Bearer ${Cookies.get("token")}`,
                        },
                    });

                    if (!response.data.success) {
                        throw new Error(response.data.message || 'Gagal menghapus data');
                    }

                    return response.data;
                } catch (error) {
                    Swal.showValidationMessage(
                        `Gagal menghapus: ${error.response?.data?.message || error.message}`
                    );
                } finally {
                    setDeletingId(null);
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        });

        if (result.isConfirmed) {
            // Refresh data setelah berhasil menghapus
            fetchYatim();

            Swal.fire({
                title: 'Terhapus!',
                text: 'Data yatim telah berhasil dihapus.',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'btn btn-success'
                },
                buttonsStyling: false
            });
        }
    };

    const handlePageChange = (page) => {
        // Karena endpoint baru tidak support pagination, kita tidak bisa pindah halaman
        console.log("Pagination tidak didukung oleh endpoint ini");
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    // Fungsi untuk menghitung umur berdasarkan tanggal lahir
    const calculateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    };

    // Fungsi untuk mendapatkan badge status
    const getStatusBadge = (status) => {
        switch (status) {
            case 'verif':
                return <span className="badge bg-success">Terverifikasi</span>;
            case 'ditolak':
                return <span className="badge bg-danger">Ditolak</span>;
            default:
                return <span className="badge bg-warning">Belum Diverifikasi</span>;
        }
    };

    // Fungsi untuk mendapatkan class berdasarkan status
    const getStatusClass = (status) => {
        switch (status) {
            case 'verif':
                return 'table-success';
            case 'ditolak':
                return 'table-danger';
            default:
                return '';
        }
    };

    const handleViewDetail = (id) => {
        navigate(`/admin/adminYatim/${id}`);
    };

    // Karena endpoint baru tidak support pagination, selalu return false
    const shouldShowPagination = false;

    return (
        <LayoutAdmin>
            <div className="container-fluid mb-5 mt-5">
                <div className="row">
                    <div className="col-md-12">
                        {/* Form Tambah Data Yatim */}
                        <div className="card border-0 rounded shadow-sm mb-4">
                            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Tambah Data Yatim</h5>
                                <button
                                    type="button"
                                    className="btn btn-light btn-sm"
                                    onClick={() => setShowForm(!showForm)}
                                >
                                    {showForm ? 'Sembunyikan' : 'Tampilkan'} Form
                                </button>
                            </div>

                            {showForm && (
                                <div className="card-body">
                                    {/* Info User */}
                                    {userData && (
                                        <div className="alert alert-info">
                                            <strong>Info User:</strong> {userData.name} (NPSN: {userData.nik})
                                        </div>
                                    )}

                                    {!userId && (
                                        <div className="alert alert-warning">
                                            User ID tidak ditemukan. Silakan login ulang.
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                {/* Hidden user_id field */}
                                                <input
                                                    type="hidden"
                                                    name="user_id"
                                                    value={formData.user_id}
                                                />

                                                <div className="mb-3">
                                                    <label className="form-label">NIK *</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="nik"
                                                        value={formData.nik}
                                                        onChange={handleInputChange}
                                                        maxLength={16}
                                                        required
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label">NISN *</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="nisn"
                                                        value={formData.nisn}
                                                        onChange={handleInputChange}
                                                        maxLength={10}
                                                        required
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label">NPSN</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="npsn"
                                                        value={formData.npsn}
                                                        onChange={handleInputChange}
                                                        maxLength={8}
                                                        readOnly
                                                        style={{ backgroundColor: '#f8f9fa' }}
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label">Jenjang *</label>
                                                    <select
                                                        className="form-select"
                                                        name="jenjang"
                                                        value={formData.jenjang}
                                                        onChange={handleInputChange}
                                                        required
                                                    >
                                                        <option value="">Pilih Jenjang</option>
                                                        <option value="SD">SD</option>
                                                        <option value="SMP">SMP</option>
                                                        <option value="SMA">SMA</option>
                                                    </select>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label">Nama Lengkap *</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Asal Sekolah *</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="asal_sekolah"
                                                        value={formData.asal_sekolah}
                                                        onChange={handleInputChange}
                                                        readOnly
                                                        style={{ backgroundColor: '#f8f9fa' }}
                                                        required
                                                    />
                                                    <div className="form-text text-muted">
                                                        Asal sekolah diambil otomatis dari data login Anda
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label">Alamat *</label>
                                                    <textarea
                                                        className="form-control"
                                                        name="alamat"
                                                        value={formData.alamat}
                                                        onChange={handleInputChange}
                                                        rows="3"
                                                        required
                                                    ></textarea>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label">Tempat Lahir *</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="tempat_lahir"
                                                        value={formData.tempat_lahir}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label">Tanggal Lahir *</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        name="tanggal_lahir"
                                                        value={formData.tanggal_lahir}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* File Uploads */}
                                        <div className="row mt-3">
                                            <div className="col-12">
                                                <h6>Upload Dokumen (PDF, maksimal 5MB)</h6>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Kartu Keluarga *</label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        name="imageskartukeluarga"
                                                        onChange={handleInputChange}
                                                        accept=".pdf"
                                                        required
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label">KTP Wali *</label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        name="imagesktpwali"
                                                        onChange={handleInputChange}
                                                        accept=".pdf"
                                                        required
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label">Keterangan Siswa Aktif *</label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        name="imagesketerangansiswaaktif"
                                                        onChange={handleInputChange}
                                                        accept=".pdf"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Surat Kematian *</label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        name="imagessuratkematian"
                                                        onChange={handleInputChange}
                                                        accept=".pdf"
                                                        required
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label">Surat Tidak Menerima Beasiswa *</label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        name="imagessurattidakmenerimabeasiswa"
                                                        onChange={handleInputChange}
                                                        accept=".pdf"
                                                        required
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label">Surat SKTM *</label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        name="imagesuratsktm"
                                                        onChange={handleInputChange}
                                                        accept=".pdf"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-end gap-2 mt-4">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => setShowForm(false)}
                                                disabled={submitting}
                                            >
                                                Batal
                                            </button>
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                disabled={submitting || !userId}
                                            >
                                                {submitting ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                        Menyimpan...
                                                    </>
                                                ) : (
                                                    'Simpan Data'
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>

                        {/* Tabel Data Yatim */}
                        <div className="card border-0 rounded shadow-sm">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className="mb-0">Data Yatim</h5>
                                    <div className="text-muted">
                                        {total > 0 && `Total: ${total} data`}
                                    </div>
                                </div>

                                {/* Legend Status */}
                                <div className="row mb-3">
                                    <div className="col-md-12">
                                        <div className="d-flex flex-wrap gap-3">
                                            <div className="d-flex align-items-center">
                                                <div className="status-indicator bg-success me-2" style={{ width: '15px', height: '15px', borderRadius: '3px' }}></div>
                                                <small>Terverifikasi</small>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="status-indicator bg-danger me-2" style={{ width: '15px', height: '15px', borderRadius: '3px' }}></div>
                                                <small>Ditolak</small>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="status-indicator bg-warning me-2" style={{ width: '15px', height: '15px', borderRadius: '3px' }}></div>
                                                <small>Belum Diverifikasi</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {!userId ? (
                                    <div className="text-center py-4">
                                        <div className="alert alert-warning">
                                            User ID tidak ditemukan. Silakan login ulang.
                                        </div>
                                    </div>
                                ) : loading ? (
                                    <div className="text-center py-4">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <p className="mt-2">Memuat data...</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="table-responsive">
                                            <table className="table table-bordered table-striped">
                                                <thead className="bg-primary text-white">
                                                    <tr>
                                                        <th scope="col">No</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Nama</th>
                                                        <th scope="col">NIK</th>
                                                        <th scope="col">NISN</th>
                                                        <th scope="col">Jenjang</th>
                                                        <th scope="col">Asal Sekolah</th>
                                                        <th scope="col">Alasan Verifikasi</th>
                                                        <th scope="col" width="150">Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {yatim && yatim.length > 0 ? (
                                                        yatim.map((item, index) => (
                                                            <tr key={item.id} className={getStatusClass(item.status_data)}>
                                                                <td>{index + 1}</td>
                                                                <td>{getStatusBadge(item.status_data)}</td>
                                                                <td>{item.name}</td>
                                                                <td>{item.nik}</td>
                                                                <td>{item.nisn}</td>
                                                                <td>
                                                                    <span className="badge bg-info">{item.jenjang}</span>
                                                                </td>
                                                                <td>{item.asal_sekolah}</td>
                                                                <td>
                                                                    {item.alasan_verif ? (
                                                                        <div
                                                                            className="text-truncate"
                                                                            style={{ maxWidth: '200px' }}
                                                                            title={item.alasan_verif}
                                                                        >
                                                                            {item.alasan_verif}
                                                                        </div>
                                                                    ) : (
                                                                        <span className="text-muted">-</span>
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    <div className="btn-group" role="group">
                                                                        <button
                                                                            onClick={() => handleViewDetail(item.id)}
                                                                            className="btn btn-sm btn-primary"
                                                                        >
                                                                            Detail
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleDelete(item)}
                                                                            className="btn btn-sm btn-danger"
                                                                            disabled={deletingId === item.id}
                                                                        >
                                                                            {deletingId === item.id ? (
                                                                                <span className="spinner-border spinner-border-sm" role="status"></span>
                                                                            ) : (
                                                                                'Hapus'
                                                                            )}
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="9" className="text-center py-4">
                                                                <div className="text-muted">
                                                                    <i className="fa fa-inbox fa-3x mb-3"></i>
                                                                    <p>Tidak ada data yatim</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Info bahwa pagination tidak tersedia */}
                                        {total > 10 && (
                                            <div className="alert alert-info mt-3">
                                                <small>
                                                    <i className="fa fa-info-circle me-2"></i>
                                                    Menampilkan semua data. Pagination tidak tersedia untuk endpoint ini.
                                                </small>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tambahkan style untuk SweetAlert */}
            <style jsx>{`
                .sweet-alert-custom {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
                }
                .swal2-popup .alert {
                    margin-bottom: 0;
                }
                .swal2-actions-custom {
                    gap: 10px !important;
                }
                .btn.mx-1 {
                    margin-left: 0.5rem !important;
                    margin-right: 0.5rem !important;
                }
                .table-success {
                    background-color: #d1e7dd !important;
                }
                .table-danger {
                    background-color: #f8d7da !important;
                }
                .table-warning {
                    background-color: #fff3cd !important;
                }
            `}</style>
        </LayoutAdmin>
    );
}