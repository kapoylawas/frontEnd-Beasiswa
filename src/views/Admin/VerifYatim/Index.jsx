import { useEffect, useState, useCallback } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Api from "../../../services/Api";
import Swal from "sweetalert2";

export default function VerifYatimIndex() {
    document.title = "Verif Yatim - Beasiswa Sidoarjo";

    const [yatim, setYatim] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);
    const [loading, setLoading] = useState(true);
    const [verifyingId, setVerifyingId] = useState(null);
    const [userData, setUserData] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedJenjang, setSelectedJenjang] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterKetrima, setFilterKetrima] = useState("");

    // State untuk modal detail
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [detailData, setDetailData] = useState(null);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [activePdf, setActivePdf] = useState(null);

    // State untuk modal alasan verifikasi
    const [showAlasanModal, setShowAlasanModal] = useState(false);
    const [alasanVerif, setAlasanVerif] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [savingAlasan, setSavingAlasan] = useState(false);

    // State untuk modal lihat data tabungan
    const [showViewTabunganModal, setShowViewTabunganModal] = useState(false);
    const [viewTabunganData, setViewTabunganData] = useState(null);
    const [loadingTabungan, setLoadingTabungan] = useState(false);

    const navigate = useNavigate();

    // Get user data from cookies
    useEffect(() => {
        const userCookie = Cookies.get("user");
        if (userCookie) {
            try {
                const user = JSON.parse(userCookie);
                setUserData(user);
            } catch (error) {
                console.error("Error parsing user cookie:", error);
                toast.error("Gagal memuat data user");
            }
        }
    }, []);

    const fetchYatim = useCallback(async (page = 1, search = "", jenjang = "", status = "", ketrima = "") => {
        setLoading(true);
        try {
            let url = `/api/admin/yatim?page=${page}`;
            if (search) {
                url += `&search=${encodeURIComponent(search)}`;
            }
            if (jenjang) {
                url += `&jenjang=${encodeURIComponent(jenjang)}`;
            }
            if (status) {
                url += `&status=${encodeURIComponent(status)}`;
            }
            if (ketrima !== "") {
                url += `&status_ketrima=${encodeURIComponent(ketrima)}`;
            }

            const response = await Api.get(url, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });

            if (response.data.success) {
                const data = response.data.data.data || [];
                const pagination = response.data.data;

                setYatim(data);
                setCurrentPage(pagination.current_page || 1);
                setLastPage(pagination.last_page || 1);
                setTotal(pagination.total || 0);
                setPerPage(pagination.per_page || 10);
                setFrom(pagination.from || 0);
                setTo(pagination.to || 0);
            } else {
                toast.error(response.data.message || "Gagal mengambil data yatim");
                setYatim([]);
                setTotal(0);
            }
        } catch (error) {
            console.error("Error fetching yatim:", error);
            if (error.response?.status === 404 ||
                error.response?.data?.message?.includes('tidak ditemukan') ||
                error.response?.data?.message?.includes('kosong')) {
                setYatim([]);
                setTotal(0);
            } else {
                toast.error("Terjadi kesalahan saat mengambil data");
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchYatim();
    }, [fetchYatim]);

    const searchData = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        setCurrentPage(1);
        const timeoutId = setTimeout(() => {
            fetchYatim(1, query, selectedJenjang, filterStatus, filterKetrima);
        }, 500);
        return () => clearTimeout(timeoutId);
    };

    const handleJenjangChange = (e) => {
        const jenjang = e.target.value;
        setSelectedJenjang(jenjang);
        setCurrentPage(1);
        fetchYatim(1, searchQuery, jenjang, filterStatus, filterKetrima);
    };

    const handleStatusChange = (e) => {
        const status = e.target.value;
        setFilterStatus(status);
        setCurrentPage(1);
        fetchYatim(1, searchQuery, selectedJenjang, status, filterKetrima);
    };

    const handleKetrimaChange = (e) => {
        const ketrima = e.target.value;
        setFilterKetrima(ketrima);
        setCurrentPage(1);
        fetchYatim(1, searchQuery, selectedJenjang, filterStatus, ketrima);
    };

    const clearSearch = () => {
        setSearchQuery("");
        setSelectedJenjang("");
        setFilterStatus("");
        setFilterKetrima("");
        setCurrentPage(1);
        fetchYatim(1);
    };

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedJenjang("");
        setFilterStatus("");
        setFilterKetrima("");
        setCurrentPage(1);
        fetchYatim(1);
    };

    // ... (fungsi-fungsi lainnya tetap sama: handleViewDetail, handleVerif, dll.)

    const handleViewDetail = async (id) => {
        setLoadingDetail(true);
        try {
            const response = await Api.get(`/api/admin/yatim/${id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });

            if (response.data.success) {
                setDetailData(response.data.data);
                if (response.data.data.imageskartukeluarga) {
                    setActivePdf({
                        url: response.data.data.imageskartukeluarga,
                        title: 'Kartu Keluarga'
                    });
                }
                setShowDetailModal(true);
            } else {
                toast.error(response.data.message || 'Gagal mengambil detail data');
            }
        } catch (error) {
            console.error('Error fetching detail:', error);
            toast.error('Terjadi kesalahan saat mengambil detail data');
        } finally {
            setLoadingDetail(false);
        }
    };

    const handleCloseDetailModal = () => {
        setShowDetailModal(false);
        setTimeout(() => {
            setDetailData(null);
            setActivePdf(null);
        }, 300);
    };

    const handlePdfSelect = (pdfUrl, title) => {
        setActivePdf({ url: pdfUrl, title });
    };

    const handleVerif = async (item) => {
        setVerifyingId(item.id);
        try {
            const response = await Api.post(`/api/admin/yatim/${item.id}/verif`, {}, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });

            if (response.data.success) {
                toast.success('Data berhasil diverifikasi');
                setYatim(prev => prev.map(y =>
                    y.id === item.id ? { ...y, status_data: 'verif' } : y
                ));
                if (detailData && detailData.id === item.id) {
                    setDetailData(prev => ({ ...prev, status_data: 'verif' }));
                }
            } else {
                toast.error(response.data.message || 'Gagal memverifikasi data');
            }
        } catch (error) {
            console.error('Error verifying data:', error);
            toast.error(error.response?.data?.message || 'Terjadi kesalahan saat memverifikasi data');
        } finally {
            setVerifyingId(null);
        }
    };

    const handleUnverif = async (item) => {
        setVerifyingId(item.id);
        try {
            const response = await Api.post(`/api/admin/yatim/${item.id}/unverif`, {}, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });

            if (response.data.success) {
                toast.success('Verifikasi berhasil dibatalkan');
                setYatim(prev => prev.map(y =>
                    y.id === item.id ? { ...y, status_data: null } : y
                ));
                if (detailData && detailData.id === item.id) {
                    setDetailData(prev => ({ ...prev, status_data: null }));
                }
            } else {
                toast.error(response.data.message || 'Gagal membatalkan verifikasi');
            }
        } catch (error) {
            console.error('Error unverifying data:', error);
            toast.error(error.response?.data?.message || 'Terjadi kesalahan saat membatalkan verifikasi');
        } finally {
            setVerifyingId(null);
        }
    };

    const handleReject = async (item) => {
        const result = await Swal.fire({
            title: 'Tolak Data?',
            html: `
                <div class="text-start">
                    <p>Apakah Anda yakin ingin menolak data ini?</p>
                    <div class="alert alert-warning mt-3 p-2">
                        <small>
                            <strong>Data yang akan ditolak:</strong><br/>
                            <strong>${item.name}</strong><br/>
                            NIK: ${item.nik}<br/>
                            NISN: ${item.nisn}
                        </small>
                    </div>
                </div>
            `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Ya, Tolak!',
            cancelButtonText: 'Batal',
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            setVerifyingId(item.id);
            try {
                const response = await Api.post(`/api/admin/yatim/${item.id}/reject`, {}, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`,
                    },
                });

                if (response.data.success) {
                    toast.success('Data berhasil ditolak');
                    setYatim(prev => prev.map(y =>
                        y.id === item.id ? { ...y, status_data: 'ditolak' } : y
                    ));
                    if (detailData && detailData.id === item.id) {
                        setDetailData(prev => ({ ...prev, status_data: 'ditolak' }));
                    }
                } else {
                    toast.error(response.data.message || 'Gagal menolak data');
                }
            } catch (error) {
                console.error('Error rejecting data:', error);
                toast.error(error.response?.data?.message || 'Terjadi kesalahan saat menolak data');
            } finally {
                setVerifyingId(null);
            }
        }
    };

    const handleCancelReject = async (item) => {
        const result = await Swal.fire({
            title: 'Batalkan Penolakan?',
            html: `
            <div class="text-start">
                <p>Apakah Anda yakin ingin membatalkan status ditolak untuk data ini?</p>
                <div class="alert alert-info mt-3 p-2">
                    <small>
                        <strong>Data yang akan dibatalkan penolakannya:</strong><br/>
                        <strong>${item.name}</strong><br/>
                        NIK: ${item.nik}<br/>
                        NISN: ${item.nisn}
                    </small>
                </div>
            </div>
        `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Ya, Batalkan!',
            cancelButtonText: 'Batal',
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            setVerifyingId(item.id);
            try {
                const response = await Api.post(`/api/admin/yatim/${item.id}/unverif`, {}, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`,
                    },
                });

                if (response.data.success) {
                    toast.success('Status ditolak berhasil dibatalkan');
                    setYatim(prev => prev.map(y =>
                        y.id === item.id ? { ...y, status_data: null } : y
                    ));
                    if (detailData && detailData.id === item.id) {
                        setDetailData(prev => ({ ...prev, status_data: null }));
                    }
                } else {
                    toast.error(response.data.message || 'Gagal membatalkan penolakan');
                }
            } catch (error) {
                console.error('Error canceling rejection:', error);
                toast.error(error.response?.data?.message || 'Terjadi kesalahan saat membatalkan penolakan');
            } finally {
                setVerifyingId(null);
            }
        }
    };

    // Handler untuk membuka modal lihat data tabungan
    const handleViewTabunganData = async (item) => {
        setLoadingTabungan(true);
        try {
            const response = await Api.get(`/api/admin/yatim/${item.id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });

            if (response.data.success) {
                const data = response.data.data;
                
                // Check if imageketrima has actual file (not just base path)
                const hasActualFile = data.imageketrima && 
                    (data.imageketrima.match(/\.(pdf|jpg|jpeg|png|gif)$/i) || 
                     !data.imageketrima.endsWith('/dokumen/yatim'));
                
                // Check if imagespjmt has actual file (not just base path)
                const hasSpjmtFile = data.imagespjmt && 
                    (data.imagespjmt.match(/\.(pdf|jpg|jpeg|png|gif)$/i) || 
                     !data.imagespjmt.endsWith('/dokumen/yatim'));
                
                // Update the data to reflect actual file status
                data._hasFile = hasActualFile;
                data._hasSpjmtFile = hasSpjmtFile;
                
                setViewTabunganData(data);
                setShowViewTabunganModal(true);
            } else {
                toast.error("Gagal mengambil data tabungan");
            }
        } catch (error) {
            console.error("Error fetching tabungan data:", error);
            toast.error("Terjadi kesalahan saat mengambil data");
        } finally {
            setLoadingTabungan(false);
        }
    };

    // Handler untuk menutup modal lihat tabungan
    const handleCloseViewTabunganModal = () => {
        setShowViewTabunganModal(false);
        setTimeout(() => {
            setViewTabunganData(null);
        }, 300);
    };

    const handleOpenAlasanModal = (item) => {
        setSelectedItem(item);
        setAlasanVerif(item.alasan_verif || "");
        setShowAlasanModal(true);
    };

    const handleCloseAlasanModal = () => {
        setShowAlasanModal(false);
        setTimeout(() => {
            setSelectedItem(null);
            setAlasanVerif("");
            setSavingAlasan(false);
        }, 300);
    };

    const handleSaveAlasanVerif = async () => {
        if (!selectedItem) return;

        if (alasanVerif.length > 1000) {
            toast.error('Alasan verifikasi maksimal 1000 karakter');
            return;
        }

        setSavingAlasan(true);
        try {
            const response = await Api.post(`/api/admin/yatim/${selectedItem.id}/update-alasan-verif`, {
                alasan_verif: alasanVerif
            }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });

            if (response.data.success) {
                toast.success('Alasan verifikasi berhasil disimpan');
                setYatim(prev => prev.map(y =>
                    y.id === selectedItem.id ? { ...y, alasan_verif: alasanVerif } : y
                ));
                if (detailData && detailData.id === selectedItem.id) {
                    setDetailData(prev => ({ ...prev, alasan_verif: alasanVerif }));
                }
                handleCloseAlasanModal();
            } else {
                toast.error(response.data.message || 'Gagal menyimpan alasan verifikasi');
            }
        } catch (error) {
            console.error('Error saving alasan verif:', error);
            toast.error(error.response?.data?.message || 'Terjadi kesalahan saat menyimpan alasan verifikasi');
        } finally {
            setSavingAlasan(false);
        }
    };

    const handlePageChange = (page) => {
        if (page < 1 || page > lastPage) return;
        setCurrentPage(page);
        fetchYatim(page, searchQuery, selectedJenjang, filterStatus, filterKetrima);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

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

    // Fungsi untuk mendapatkan badge status keterimaan
    const getStatusKetrimaBadge = (status) => {
        if (status === "1" || status === 1 || status === true) {
            return (
                <span className="badge bg-success">
                    <i className="fa fa-check-circle me-1"></i>
                    Diterima Beasiswa
                </span>
            );
        }
        return (
            <span className="badge bg-secondary">
                <i className="fa fa-times-circle me-1"></i>
                Tidak Lolos
            </span>
        );
    };

    const generatePaginationNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (lastPage <= maxVisiblePages) {
            for (let i = 1; i <= lastPage; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(lastPage);
            } else if (currentPage >= lastPage - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = lastPage - 3; i <= lastPage; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(lastPage);
            }
        }

        return pages;
    };

    return (
        <LayoutAdmin>
            <div className="container-fluid mb-5 mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card border-0 rounded shadow-sm">
                            <div className="card-body">
                                <div className="row mb-3">
                                    <div className="col-md-7">
                                        <h5 className="mb-0">Data Yatim - Verifikasi</h5>
                                    </div>
                                    <div className="col-md-5 text-end">
                                        <div className="text-muted">
                                            {total > 0 && `Total: ${total} data`}
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-5 col-12 mb-2">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control border-1 shadow-sm"
                                                value={searchQuery}
                                                onChange={searchData}
                                                placeholder="Masukkan NIK atau Nama Peserta"
                                            />
                                            <span className="input-group-text border-0 shadow-sm">
                                                <i className="fa fa-search"></i>
                                            </span>
                                            {(searchQuery || selectedJenjang || filterStatus || filterKetrima) && (
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
                                            Cari berdasarkan NIK atau Nama peserta
                                        </small>
                                    </div>
                                    <div className="col-md-3 col-12 mb-2">
                                        <select
                                            className="form-select border-1 shadow-sm"
                                            value={selectedJenjang}
                                            onChange={handleJenjangChange}
                                        >
                                            <option value="">Semua Jenjang</option>
                                            <option value="SD">SD</option>
                                            <option value="SMP">SMP</option>
                                            <option value="SMA">SMA</option>
                                        </select>
                                        <small className="text-muted mt-1">
                                            Filter berdasarkan jenjang
                                        </small>
                                    </div>
                                    <div className="col-md-3 col-12 mb-2">
                                        <select
                                            className="form-select border-1 shadow-sm"
                                            value={filterStatus}
                                            onChange={handleStatusChange}
                                        >
                                            <option value="">Semua Status</option>
                                            <option value="verif">Terverifikasi</option>
                                            <option value="ditolak">Ditolak</option>
                                            <option value="null">Belum Diverifikasi</option>
                                        </select>
                                        <small className="text-muted mt-1">
                                            Filter berdasarkan status verifikasi
                                        </small>
                                    </div>
                                    <div className="col-md-3 col-12 mb-2">
                                        <select
                                            className="form-select border-1 shadow-sm"
                                            value={filterKetrima}
                                            onChange={handleKetrimaChange}
                                        >
                                            <option value="">Semua Status Beasiswa</option>
                                            <option value="1">Diterima Beasiswa</option>
                                            <option value="null">Tidak Lolos</option>
                                        </select>
                                        <small className="text-muted mt-1">
                                            Filter berdasarkan status penerimaan beasiswa
                                        </small>
                                    </div>
                                </div>

                                {userData && (
                                    <div className="alert alert-info mb-4">
                                        <strong>Info Admin:</strong> {userData.name}
                                        {userData.role && ` (Role: ${userData.role})`}
                                    </div>
                                )}

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

                                {loading ? (
                                    <div className="text-center py-4">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <p className="mt-2">Memuat data yatim...</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="table-responsive">
                                            <table className="table table-bordered table-striped">
                                                <thead className="bg-primary text-white">
                                                    <tr>
                                                        <th scope="col">No</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Status verif KK</th>
                                                        <th scope="col">Nama</th>
                                                        <th scope="col">NIK</th>
                                                        <th scope="col">NISN</th>
                                                        <th scope="col">Jenjang</th>
                                                        <th scope="col">Asal Sekolah</th>
                                                        <th scope="col">Status Beasiswa</th>
                                                        <th scope="col">Status Upload Rekening</th>
                                                        <th scope="col" width="100">Lihat File Rekening dan SPJMT</th>
                                                        <th scope="col">Alasan Verifikasi</th>
                                                        <th scope="col">Alasan Verif KK</th>
                                                        <th scope="col" width="150">Aksi</th>
                                                        <th scope="col" width="100">Alasan</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {yatim && yatim.length > 0 ? (
                                                        yatim.map((item, index) => (
                                                            <tr key={item.id} className={getStatusClass(item.status_data)}>
                                                                <td>{from + index}</td>
                                                                <td>{getStatusBadge(item.status_data)}</td>
                                                                <td>{getStatusBadge(item.verif_kk)}</td>
                                                                <td>{item.name}</td>
                                                                <td>{item.nik}</td>
                                                                <td>{item.nisn}</td>
                                                                <td>
                                                                    <span className="badge bg-info">{item.jenjang}</span>
                                                                </td>
                                                                <td>{item.asal_sekolah}</td>
                                                                <td className="text-center">
                                                                    {getStatusKetrimaBadge(item.status_ketrima)}
                                                                </td>
                                                                <td className="text-center">
                                                                    {(() => {
                                                                        const hasFile = item.imageketrima && 
                                                                            (item.imageketrima.match(/\.(pdf|jpg|jpeg|png|gif)$/i) || 
                                                                             !item.imageketrima.endsWith('/dokumen/yatim'));
                                                                        
                                                                        if ((item.status_ketrima === "1" || item.status_ketrima === 1 || item.status_ketrima === true)) {
                                                                            return hasFile ? (
                                                                                <span className="badge bg-success">
                                                                                    <i className="fa fa-check-circle me-1"></i>
                                                                                    Sudah Upload
                                                                                </span>
                                                                            ) : (
                                                                                <span className="badge bg-warning text-dark">
                                                                                    <i className="fa fa-exclamation-triangle me-1"></i>
                                                                                    Belum Upload
                                                                                </span>
                                                                            );
                                                                        }
                                                                        return <span className="text-muted">-</span>;
                                                                    })()}
                                                                </td>
                                                                <td className="text-center">
                                                                    {(item.status_ketrima === "1" || item.status_ketrima === 1 || item.status_ketrima === true) ? (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => handleViewTabunganData(item)}
                                                                            className="btn btn-sm btn-info"
                                                                            title="Lihat Data Tabungan"
                                                                        >
                                                                            <i className="fa fa-eye"></i> Lihat
                                                                        </button>
                                                                    ) : (
                                                                        <span className="text-muted">-</span>
                                                                    )}
                                                                </td>
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
                                                                <td>{item.alasan_kk}</td>
                                                                <td>
                                                                    <div className="btn-group-vertical btn-group-sm" role="group">
                                                                        <div className="btn-group">
                                                                            <button
                                                                                onClick={() => handleViewDetail(item.id)}
                                                                                className="btn btn-primary btn-sm"
                                                                                title="Lihat Detail"
                                                                            >
                                                                                <i className="fa fa-eye"></i> Detail
                                                                            </button>
                                                                        </div>
                                                                        <div className="btn-group mt-1">
                                                                            {item.status_data === 'verif' ? (
                                                                                <button
                                                                                    onClick={() => handleUnverif(item)}
                                                                                    className="btn btn-warning btn-sm"
                                                                                    disabled={verifyingId === item.id}
                                                                                >
                                                                                    {verifyingId === item.id ? (
                                                                                        <span className="spinner-border spinner-border-sm" role="status"></span>
                                                                                    ) : (
                                                                                        'Batal Verif'
                                                                                    )}
                                                                                </button>
                                                                            ) : item.status_data === 'ditolak' ? (
                                                                                <button
                                                                                    onClick={() => handleCancelReject(item)}
                                                                                    className="btn btn-info btn-sm"
                                                                                    disabled={verifyingId === item.id}
                                                                                >
                                                                                    {verifyingId === item.id ? (
                                                                                        <span className="spinner-border spinner-border-sm" role="status"></span>
                                                                                    ) : (
                                                                                        'Batal Tolak'
                                                                                    )}
                                                                                </button>
                                                                            ) : (
                                                                                <>
                                                                                    <button
                                                                                        onClick={() => handleVerif(item)}
                                                                                        className="btn btn-success btn-sm"
                                                                                        disabled={verifyingId === item.id}
                                                                                    >
                                                                                        {verifyingId === item.id ? (
                                                                                            <span className="spinner-border spinner-border-sm" role="status"></span>
                                                                                        ) : (
                                                                                            'Verif'
                                                                                        )}
                                                                                    </button>
                                                                                    <button
                                                                                        onClick={() => handleReject(item)}
                                                                                        className="btn btn-danger btn-sm"
                                                                                        disabled={verifyingId === item.id}
                                                                                    >
                                                                                        {verifyingId === item.id ? (
                                                                                            <span className="spinner-border spinner-border-sm" role="status"></span>
                                                                                        ) : (
                                                                                            'Tolak'
                                                                                        )}
                                                                                    </button>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <button
                                                                        onClick={() => handleOpenAlasanModal(item)}
                                                                        className="btn btn-info btn-sm w-100"
                                                                        title={
                                                                            item.status_data === 'verif' ? 'Edit Alasan Verifikasi' :
                                                                                item.status_data === 'ditolak' ? 'Edit Alasan Penolakan' :
                                                                                    'Tambah Alasan Verifikasi'
                                                                        }
                                                                    >
                                                                        <i className="fa fa-edit me-1"></i>
                                                                        {item.alasan_verif ? 'Edit' : 'Tambah'}
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="15" className="text-center py-4">
                                                                <div className="text-muted">
                                                                    <i className="fa fa-inbox fa-3x mb-3"></i>
                                                                    <p>
                                                                        {searchQuery || selectedJenjang || filterStatus || filterKetrima
                                                                            ? `Tidak ditemukan data dengan filter yang dipilih`
                                                                            : "Tidak ada data yatim untuk diverifikasi"
                                                                        }
                                                                    </p>
                                                                    {(searchQuery || selectedJenjang || filterStatus || filterKetrima) && (
                                                                        <button
                                                                            className="btn btn-primary btn-sm mt-2"
                                                                            onClick={clearFilters}
                                                                        >
                                                                            Tampilkan Semua Data
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>

                                        {total > 0 && lastPage > 1 && (
                                            <div className="d-flex justify-content-between align-items-center mt-4">
                                                <div>
                                                    <small className="text-muted">
                                                        Menampilkan {from} sampai {to} dari {total} data
                                                        {searchQuery && ` untuk pencarian "${searchQuery}"`}
                                                        {selectedJenjang && ` dengan jenjang ${selectedJenjang}`}
                                                        {filterStatus && ` dengan status ${filterStatus === 'verif' ? 'Terverifikasi' : filterStatus === 'ditolak' ? 'Ditolak' : 'Belum Diverifikasi'}`}
                                                        {filterKetrima !== "" && ` dengan status beasiswa ${filterKetrima === '1' ? 'Diterima' : 'Tidak Lolos'}`}
                                                    </small>
                                                </div>
                                                <nav>
                                                    <ul className="pagination mb-0">
                                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                            <button
                                                                className="page-link"
                                                                onClick={() => handlePageChange(currentPage - 1)}
                                                                disabled={currentPage === 1}
                                                            >
                                                                &laquo;
                                                            </button>
                                                        </li>
                                                        {generatePaginationNumbers().map((page, index) => (
                                                            <li
                                                                key={index}
                                                                className={`page-item ${page === currentPage ? 'active' : ''
                                                                    } ${page === '...' ? 'disabled' : ''}`}
                                                            >
                                                                {page === '...' ? (
                                                                    <span className="page-link">...</span>
                                                                ) : (
                                                                    <button
                                                                        className="page-link"
                                                                        onClick={() => handlePageChange(page)}
                                                                    >
                                                                        {page}
                                                                    </button>
                                                                )}
                                                            </li>
                                                        ))}
                                                        <li className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}>
                                                            <button
                                                                className="page-link"
                                                                onClick={() => handlePageChange(currentPage + 1)}
                                                                disabled={currentPage === lastPage}
                                                            >
                                                                &raquo;
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Detail */}
            {showDetailModal && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-xl" style={{ maxWidth: '95%' }}>
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">
                                    Detail Data Yatim
                                    {detailData && (
                                        <span className="ms-2">
                                            {getStatusBadge(detailData.status_data)}
                                        </span>
                                    )}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={handleCloseDetailModal}
                                ></button>
                            </div>
                            <div className="modal-body" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                                {loadingDetail ? (
                                    <div className="text-center py-4">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <p className="mt-2">Memuat detail data...</p>
                                    </div>
                                ) : detailData ? (
                                    <div className="row">
                                        {/* Data Pribadi & Dokumen List */}
                                        <div className="col-md-4">
                                            {/* Data Pribadi */}
                                            <div className="card mb-3">
                                                <div className="card-header bg-light">
                                                    <h6 className="mb-0">Data Pribadi</h6>
                                                </div>
                                                <div className="card-body">
                                                    <table className="table table-sm table-borderless">
                                                        <tbody>
                                                            <tr>
                                                                <td width="40%"><strong>Nama</strong></td>
                                                                <td>{detailData.name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><strong>NIK</strong></td>
                                                                <td>{detailData.nik}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><strong>NISN</strong></td>
                                                                <td>{detailData.nisn}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><strong>NPSN</strong></td>
                                                                <td>{detailData.npsn}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><strong>Jenjang</strong></td>
                                                                <td>
                                                                    <span className="badge bg-info">{detailData.jenjang}</span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td><strong>Asal Sekolah</strong></td>
                                                                <td>{detailData.asal_sekolah}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                            {/* Alasan Verifikasi */}
                                            <div className="card mb-3">
                                                <div className="card-header bg-light d-flex justify-content-between align-items-center">
                                                    <h6 className="mb-0">
                                                        {detailData.status_data === 'verif' ? 'Alasan Verifikasi' :
                                                            detailData.status_data === 'ditolak' ? 'Alasan Penolakan' :
                                                                'Alasan Verifikasi'}
                                                    </h6>
                                                    <button
                                                        onClick={() => handleOpenAlasanModal(detailData)}
                                                        className="btn btn-sm btn-outline-primary"
                                                        title="Edit Alasan Verifikasi"
                                                    >
                                                        <i className="fa fa-edit"></i> Edit
                                                    </button>
                                                </div>
                                                <div className="card-body">
                                                    {detailData.alasan_verif ? (
                                                        <div className="alert alert-info mb-0">
                                                            {detailData.alasan_verif}
                                                        </div>
                                                    ) : (
                                                        <div className="text-muted">
                                                            <i>Belum ada alasan verifikasi</i>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Data Kelahiran & Alamat */}
                                            <div className="card mb-3">
                                                <div className="card-header bg-light">
                                                    <h6 className="mb-0">Data Kelahiran & Alamat</h6>
                                                </div>
                                                <div className="card-body">
                                                    <table className="table table-sm table-borderless">
                                                        <tbody>
                                                            <tr>
                                                                <td width="40%"><strong>Tempat Lahir</strong></td>
                                                                <td>{detailData.tempat_lahir}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><strong>Tanggal Lahir</strong></td>
                                                                <td>{formatDate(detailData.tanggal_lahir)}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><strong>Umur</strong></td>
                                                                <td>
                                                                    <span className="badge bg-secondary">
                                                                        {calculateAge(detailData.tanggal_lahir)} Tahun
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td><strong>Alamat</strong></td>
                                                                <td>{detailData.alamat}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                            {/* Data Sekolah/Pengirim */}
                                            {detailData.user && (
                                                <div className="card mb-3">
                                                    <div className="card-header bg-light">
                                                        <h6 className="mb-0">Data Sekolah/Pengirim</h6>
                                                    </div>
                                                    <div className="card-body">
                                                        <table className="table table-sm table-borderless">
                                                            <tbody>
                                                                <tr>
                                                                    <td width="40%"><strong>Nama Sekolah</strong></td>
                                                                    <td>{detailData.user.name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><strong>NPSN Sekolah</strong></td>
                                                                    <td>{detailData.user.nik}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><strong>Email</strong></td>
                                                                    <td>{detailData.user.email}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><strong>No. HP</strong></td>
                                                                    <td>{detailData.user.nohp}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><strong>Alamat Sekolah</strong></td>
                                                                    <td>{detailData.user.alamat}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            )}

                                            {/* List Dokumen */}
                                            <div className="card">
                                                <div className="card-header bg-light">
                                                    <h6 className="mb-0">Dokumen</h6>
                                                </div>
                                                <div className="card-body p-0">
                                                    <div className="list-group list-group-flush">
                                                        <button
                                                            className={`list-group-item list-group-item-action ${activePdf?.title === 'Kartu Keluarga' ? 'active' : ''}`}
                                                            onClick={() => handlePdfSelect(detailData.imageskartukeluarga, 'Kartu Keluarga')}
                                                        >
                                                            Kartu Keluarga
                                                        </button>
                                                        {/* <button
                                                            className={`list-group-item list-group-item-action ${activePdf?.title === 'KTP Wali' ? 'active' : ''}`}
                                                            onClick={() => handlePdfSelect(detailData.imagesktpwali, 'KTP Wali')}
                                                        >
                                                            KTP Wali
                                                        </button> */}
                                                        <button
                                                            className={`list-group-item list-group-item-action ${activePdf?.title === 'Keterangan Siswa Aktif' ? 'active' : ''}`}
                                                            onClick={() => handlePdfSelect(detailData.imagesketerangansiswaaktif, 'Keterangan Siswa Aktif')}
                                                        >
                                                            Keterangan Siswa Aktif
                                                        </button>
                                                        <button
                                                            className={`list-group-item list-group-item-action ${activePdf?.title === 'Surat Kematian' ? 'active' : ''}`}
                                                            onClick={() => handlePdfSelect(detailData.imagessuratkematian, 'Surat Kematian')}
                                                        >
                                                            Surat Kematian
                                                        </button>
                                                        <button
                                                            className={`list-group-item list-group-item-action ${activePdf?.title === 'Surat Tidak Menerima Beasiswa' ? 'active' : ''}`}
                                                            onClick={() => handlePdfSelect(detailData.imagessurattidakmenerimabeasiswa, 'Surat Tidak Menerima Beasiswa')}
                                                        >
                                                            Surat Tidak Menerima Beasiswa
                                                        </button>
                                                        <button
                                                            className={`list-group-item list-group-item-action ${activePdf?.title === 'Surat SKTM' ? 'active' : ''}`}
                                                            onClick={() => handlePdfSelect(detailData.imagesuratsktm, 'Surat SKTM')}
                                                        >
                                                            Surat SKTM
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* PDF Viewer */}
                                        <div className="col-md-8">
                                            <div className="card h-100">
                                                <div className="card-header bg-light d-flex justify-content-between align-items-center">
                                                    <h6 className="mb-0">
                                                        {activePdf ? activePdf.title : 'Pilih Dokumen'}
                                                    </h6>
                                                    {activePdf && (
                                                        <a
                                                            href={activePdf.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="btn btn-sm btn-outline-primary"
                                                        >
                                                            Buka di Tab Baru
                                                        </a>
                                                    )}
                                                </div>
                                                <div className="card-body p-0">
                                                    {activePdf ? (
                                                        <iframe
                                                            src={activePdf.url}
                                                            width="100%"
                                                            height="600"
                                                            style={{ border: 'none' }}
                                                            title={activePdf.title}
                                                        >
                                                            <p>Browser Anda tidak mendukung iframe.
                                                                <a href={activePdf.url} target="_blank" rel="noopener noreferrer">
                                                                    Klik di sini untuk membuka PDF
                                                                </a>
                                                            </p>
                                                        </iframe>
                                                    ) : (
                                                        <div className="text-center py-5">
                                                            <i className="fa fa-file-pdf-o fa-3x text-muted mb-3"></i>
                                                            <p className="text-muted">Pilih dokumen dari menu sebelah kiri untuk melihat preview</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-4">
                                        <div className="text-danger">
                                            <i className="fa fa-exclamation-triangle fa-2x mb-3"></i>
                                            <p>Gagal memuat detail data</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCloseDetailModal}
                                >
                                    Tutup
                                </button>
                                {detailData && (
                                    <div className="btn-group">
                                        {detailData.status_data === 'verif' ? (
                                            <button
                                                onClick={() => handleUnverif(detailData)}
                                                className="btn btn-warning"
                                                disabled={verifyingId === detailData.id}
                                            >
                                                {verifyingId === detailData.id ? (
                                                    <span className="spinner-border spinner-border-sm" role="status"></span>
                                                ) : (
                                                    'Batal Verif'
                                                )}
                                            </button>
                                        ) : detailData.status_data === 'ditolak' ? (
                                            <button
                                                onClick={() => handleCancelReject(detailData)}
                                                className="btn btn-info"
                                                disabled={verifyingId === detailData.id}
                                            >
                                                {verifyingId === detailData.id ? (
                                                    <span className="spinner-border spinner-border-sm" role="status"></span>
                                                ) : (
                                                    'Batal Tolak'
                                                )}
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => handleVerif(detailData)}
                                                    className="btn btn-success"
                                                    disabled={verifyingId === detailData.id}
                                                >
                                                    {verifyingId === detailData.id ? (
                                                        <span className="spinner-border spinner-border-sm" role="status"></span>
                                                    ) : (
                                                        'Verif'
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => handleReject(detailData)}
                                                    className="btn btn-danger"
                                                    disabled={verifyingId === detailData.id}
                                                >
                                                    {verifyingId === detailData.id ? (
                                                        <span className="spinner-border spinner-border-sm" role="status"></span>
                                                    ) : (
                                                        'Tolak'
                                                    )}
                                                </button>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Alasan Verifikasi */}
            {showAlasanModal && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">
                                    {selectedItem?.status_data === 'verif' ? 'Alasan Verifikasi' :
                                        selectedItem?.status_data === 'ditolak' ? 'Alasan Penolakan' :
                                            'Alasan Verifikasi'}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={handleCloseAlasanModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                {selectedItem && (
                                    <div className="mb-3">
                                        <div className="alert alert-light">
                                            <strong>Data Peserta:</strong><br />
                                            Nama: <strong>{selectedItem.name}</strong><br />
                                            NIK: {selectedItem.nik} | NISN: {selectedItem.nisn}<br />
                                            Status: {getStatusBadge(selectedItem.status_data)}
                                        </div>
                                    </div>
                                )}

                                <div className="mb-3">
                                    <label htmlFor="alasanVerif" className="form-label">
                                        {selectedItem?.status_data === 'verif' ? 'Alasan Verifikasi' :
                                            selectedItem?.status_data === 'ditolak' ? 'Alasan Penolakan' :
                                                'Alasan Verifikasi'}
                                        <span className="text-danger">*</span>
                                    </label>
                                    <textarea
                                        id="alasanVerif"
                                        className="form-control"
                                        rows="6"
                                        value={alasanVerif}
                                        onChange={(e) => setAlasanVerif(e.target.value)}
                                        placeholder="Masukkan alasan verifikasi atau penolakan data ini..."
                                        maxLength={1000}
                                    />
                                    <div className="form-text">
                                        {alasanVerif.length}/1000 karakter
                                        {alasanVerif.length >= 1000 && (
                                            <span className="text-danger"> - Maksimal 1000 karakter</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCloseAlasanModal}
                                    disabled={savingAlasan}
                                >
                                    Batal
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleSaveAlasanVerif}
                                    disabled={savingAlasan || alasanVerif.length > 1000}
                                >
                                    {savingAlasan ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                            Menyimpan...
                                        </>
                                    ) : (
                                        'Simpan Alasan'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Modal Lihat Data Tabungan */}
            {showViewTabunganModal && viewTabunganData && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-info text-white">
                                <h5 className="modal-title">
                                    <i className="fa fa-eye me-2"></i>Data Tabungan - {viewTabunganData?.name || ''}
                                </h5>
                                <button 
                                    type="button" 
                                    className="btn-close btn-close-white" 
                                    onClick={handleCloseViewTabunganModal}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                                {loadingTabungan ? (
                                    <div className="text-center py-4">
                                        <div className="spinner-border text-primary mb-3" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <p className="text-muted">Memuat data...</p>
                                    </div>
                                ) : (
                                    <div className="row g-3">
                                        {/* Info Siswa */}
                                        <div className="col-12">
                                            <div className="alert alert-info mb-3">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <strong>Nama:</strong> {viewTabunganData?.name || '-'}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <strong>NIK:</strong> {viewTabunganData?.nik || '-'}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <strong>NISN:</strong> {viewTabunganData?.nisn || '-'}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <strong>Asal Sekolah:</strong> {viewTabunganData?.asal_sekolah || '-'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Nomor Rekening */}
                                        <div className="col-md-6">
                                            <div className="info-box bg-light rounded-3 p-3 h-100">
                                                <div className="d-flex align-items-start">
                                                    <div className="info-icon bg-primary text-white rounded-circle me-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                                                        <i className="fa fa-credit-card"></i>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <div className="fw-semibold text-muted small mb-1">Nomor Rekening</div>
                                                        <div className="text-dark fw-bold fs-5">
                                                            {viewTabunganData?.no_rekening || <span className="text-muted fs-6 fw-normal">Belum diisi</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* NIK Orang Tua */}
                                        <div className="col-md-6">
                                            <div className="info-box bg-light rounded-3 p-3 h-100">
                                                <div className="d-flex align-items-start">
                                                    <div className="info-icon bg-info text-white rounded-circle me-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                                                        <i className="fa fa-id-card"></i>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <div className="fw-semibold text-muted small mb-1">NIK Orang Tua / Wali</div>
                                                        <div className="text-dark fw-bold fs-5">
                                                            {viewTabunganData?.nik_ortu || <span className="text-muted fs-6 fw-normal">Belum diisi</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Nama Orang Tua */}
                                        <div className="col-md-12">
                                            <div className="info-box bg-light rounded-3 p-3">
                                                <div className="d-flex align-items-start">
                                                    <div className="info-icon bg-warning text-white rounded-circle me-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                                                        <i className="fa fa-user-tie"></i>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <div className="fw-semibold text-muted small mb-1">Nama Orang Tua / Wali</div>
                                                        <div className="text-dark fw-bold fs-5">
                                                            {viewTabunganData?.nama_ortu || <span className="text-muted fs-6 fw-normal">Belum diisi</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* File Buku Tabungan */}
                                        <div className="col-md-12">
                                            <div className="info-box bg-light rounded-3 p-3">
                                                <div className="d-flex align-items-start mb-3">
                                                    <div className="info-icon bg-danger text-white rounded-circle me-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                                                        <i className="fa fa-file-alt"></i>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <div className="fw-semibold text-muted small mb-1">File Buku Tabungan / No. Rekening</div>
                                                        <div className="text-dark fw-bold">
                                                            {viewTabunganData?._hasFile ? (
                                                                <span className="badge bg-success-subtle text-success fs-6 px-3 py-2">
                                                                    <i className="fa fa-check-circle me-1"></i>
                                                                    File sudah diupload
                                                                </span>
                                                            ) : (
                                                                <span className="badge bg-warning-subtle text-warning fs-6 px-3 py-2">
                                                                    <i className="fa fa-exclamation-triangle me-1"></i>
                                                                    Belum diupload
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {viewTabunganData?._hasFile ? (
                                                    <div className="mt-3">
                                                        <div className="border rounded-3 overflow-hidden bg-white">
                                                            <iframe
                                                                src={viewTabunganData.imageketrima}
                                                                title="Preview Buku Tabungan"
                                                                style={{
                                                                    width: '100%',
                                                                    height: '500px',
                                                                    border: 'none'
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="mt-2 text-center">
                                                            <a
                                                                href={viewTabunganData.imageketrima}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="btn btn-success btn-sm"
                                                            >
                                                                <i className="fa fa-external-link me-1"></i>
                                                                Buka di Tab Baru
                                                            </a>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="mt-3 text-center p-4 bg-warning bg-opacity-10 rounded-3 border border-warning">
                                                        <i className="fa fa-exclamation-circle fa-3x text-warning mb-3"></i>
                                                        <h6 className="text-muted mb-2">File Belum Diupload</h6>
                                                        <p className="text-muted small mb-0">
                                                            File buku tabungan belum diupload.
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* File Surat SPJMT */}
                                        <div className="col-md-12">
                                            <div className="info-box bg-light rounded-3 p-3">
                                                <div className="d-flex align-items-start mb-3">
                                                    <div className="info-icon bg-primary text-white rounded-circle me-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                                                        <i className="fa fa-file-contract"></i>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <div className="fw-semibold text-muted small mb-1">Surat SPJMT</div>
                                                        <div className="text-dark fw-bold">
                                                            {viewTabunganData?._hasSpjmtFile ? (
                                                                <span className="badge bg-success-subtle text-success fs-6 px-3 py-2">
                                                                    <i className="fa fa-check-circle me-1"></i>
                                                                    File sudah diupload
                                                                </span>
                                                            ) : (
                                                                <span className="badge bg-warning-subtle text-warning fs-6 px-3 py-2">
                                                                    <i className="fa fa-exclamation-triangle me-1"></i>
                                                                    Belum diupload
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {viewTabunganData?._hasSpjmtFile ? (
                                                    <div className="mt-3">
                                                        <div className="border rounded-3 overflow-hidden bg-white">
                                                            <iframe
                                                                src={viewTabunganData.imagespjmt}
                                                                title="Preview Surat SPJMT"
                                                                style={{
                                                                    width: '100%',
                                                                    height: '500px',
                                                                    border: 'none'
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="mt-2 text-center">
                                                            <a
                                                                href={viewTabunganData.imagespjmt}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="btn btn-primary btn-sm"
                                                            >
                                                                <i className="fa fa-external-link me-1"></i>
                                                                Buka di Tab Baru
                                                            </a>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="mt-3 text-center p-4 bg-warning bg-opacity-10 rounded-3 border border-warning">
                                                        <i className="fa fa-exclamation-circle fa-3x text-warning mb-3"></i>
                                                        <h6 className="text-muted mb-2">File Belum Diupload</h6>
                                                        <p className="text-muted small mb-0">
                                                            Surat SPJMT belum diupload.
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseViewTabunganModal}>
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </LayoutAdmin>
    );
}