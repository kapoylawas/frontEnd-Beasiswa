import { useEffect, useState, useCallback } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Api from "../../../services/Api";
import Swal from "sweetalert2";

export default function AdminDispendukYatim() {
    document.title = "Verif KK Yatim - Beasiswa Sidoarjo";

    const [yatim, setYatim] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);
    const [loading, setLoading] = useState(true);
    const [verifyingKkId, setVerifyingKkId] = useState(null);
    const [userData, setUserData] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedJenjang, setSelectedJenjang] = useState("");

    // State untuk modal detail KK
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [detailData, setDetailData] = useState(null);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [activePdf, setActivePdf] = useState(null);
    const [pdfLoaded, setPdfLoaded] = useState(false);

    // State untuk modal alasan verifikasi KK
    const [showAlasanKkModal, setShowAlasanKkModal] = useState(false);
    const [alasanVerifKk, setAlasanVerifKk] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [savingAlasanKk, setSavingAlasanKk] = useState(false);

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

    const fetchYatim = useCallback(async (page = 1, search = "", jenjang = "") => {
        setLoading(true);
        try {
            let url = `/api/admin/yatim?page=${page}`;
            if (search) {
                url += `&search=${encodeURIComponent(search)}`;
            }
            if (jenjang) {
                url += `&jenjang=${encodeURIComponent(jenjang)}`;
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
            fetchYatim(1, query, selectedJenjang);
        }, 500);
        return () => clearTimeout(timeoutId);
    };

    const handleJenjangChange = (e) => {
        const jenjang = e.target.value;
        setSelectedJenjang(jenjang);
        setCurrentPage(1);
        fetchYatim(1, searchQuery, jenjang);
    };

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedJenjang("");
        setCurrentPage(1);
        fetchYatim(1);
    };

    // ==============================================
    // FUNGSI UNTUK KK SAJA
    // ==============================================

    // View detail KK (hanya file KK)
    const handleViewDetail = async (item) => {
        setLoadingDetail(true);
        setPdfLoaded(false);
        try {
            const response = await Api.get(`/api/admin/yatim/${item.id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });

            if (response.data.success) {
                const data = response.data.data;
                setDetailData(data);
                
                // Tampilkan langsung file KK
                if (data.imageskartukeluarga) {
                    setActivePdf({
                        url: data.imageskartukeluarga,
                        title: 'KARTU KELUARGA',
                        type: 'kk'
                    });
                } else {
                    toast.error('File Kartu Keluarga tidak tersedia');
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
        setPdfLoaded(false);
        setTimeout(() => {
            setDetailData(null);
            setActivePdf(null);
        }, 300);
    };

    const handlePdfLoad = () => {
        setPdfLoaded(true);
    };

    // Verifikasi Kartu Keluarga
    const handleVerifKk = async (item) => {
        setVerifyingKkId(item.id);
        try {
            const response = await Api.post(`/api/admin/yatim/${item.id}/verif-kk`, {}, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });

            if (response.data.success) {
                toast.success('Kartu Keluarga berhasil diverifikasi');
                setYatim(prev => prev.map(y =>
                    y.id === item.id ? { ...y, verif_kk: 'verif' } : y
                ));
                if (detailData && detailData.id === item.id) {
                    setDetailData(prev => ({ ...prev, verif_kk: 'verif' }));
                }
            } else {
                toast.error(response.data.message || 'Gagal memverifikasi Kartu Keluarga');
            }
        } catch (error) {
            console.error('Error verifying KK:', error);
            toast.error(error.response?.data?.message || 'Terjadi kesalahan saat memverifikasi Kartu Keluarga');
        } finally {
            setVerifyingKkId(null);
        }
    };

    // Batalkan Verifikasi KK
    const handleUnverifKk = async (item) => {
        setVerifyingKkId(item.id);
        try {
            const response = await Api.post(`/api/admin/yatim/${item.id}/unverif-kk`, {}, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });

            if (response.data.success) {
                toast.success('Verifikasi Kartu Keluarga berhasil dibatalkan');
                setYatim(prev => prev.map(y =>
                    y.id === item.id ? { ...y, verif_kk: null } : y
                ));
                if (detailData && detailData.id === item.id) {
                    setDetailData(prev => ({ ...prev, verif_kk: null }));
                }
            } else {
                toast.error(response.data.message || 'Gagal membatalkan verifikasi Kartu Keluarga');
            }
        } catch (error) {
            console.error('Error unverifying KK:', error);
            toast.error(error.response?.data?.message || 'Terjadi kesalahan saat membatalkan verifikasi Kartu Keluarga');
        } finally {
            setVerifyingKkId(null);
        }
    };

    // Tolak KK
    const handleRejectKk = async (item) => {
        const result = await Swal.fire({
            title: 'Tolak Kartu Keluarga?',
            html: `
                <div class="text-start">
                    <p>Apakah Anda yakin ingin menolak Kartu Keluarga ini?</p>
                    <div class="alert alert-warning mt-3 p-2">
                        <small>
                            <strong>Data yang akan ditolak:</strong><br/>
                            <strong>${item.name}</strong><br/>
                            File: Kartu Keluarga<br/>
                            NIK: ${item.nik}
                        </small>
                    </div>
                </div>
            `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Ya, Tolak KK!',
            cancelButtonText: 'Batal',
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            setVerifyingKkId(item.id);
            try {
                const response = await Api.post(`/api/admin/yatim/${item.id}/reject-kk`, {}, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`,
                    },
                });

                if (response.data.success) {
                    toast.success('Kartu Keluarga berhasil ditolak');
                    setYatim(prev => prev.map(y =>
                        y.id === item.id ? { ...y, verif_kk: 'ditolak' } : y
                    ));
                    if (detailData && detailData.id === item.id) {
                        setDetailData(prev => ({ ...prev, verif_kk: 'ditolak' }));
                    }
                } else {
                    toast.error(response.data.message || 'Gagal menolak Kartu Keluarga');
                }
            } catch (error) {
                console.error('Error rejecting KK:', error);
                toast.error(error.response?.data?.message || 'Terjadi kesalahan saat menolak Kartu Keluarga');
            } finally {
                setVerifyingKkId(null);
            }
        }
    };

    // Download file KK
    const handleDownloadKk = async (item) => {
        try {
            // Menggunakan route download yang sudah ada
            window.open(`/api/admin/yatim/${item.id}/download/imageskartukeluarga`, '_blank');
        } catch (error) {
            console.error('Error downloading KK:', error);
            toast.error('Gagal mendownload file Kartu Keluarga');
        }
    };

    // Modal Alasan Verifikasi KK
    const handleOpenAlasanKkModal = (item) => {
        setSelectedItem(item);
        setAlasanVerifKk(item.alasan_verif_kk || "");
        setShowAlasanKkModal(true);
    };

    const handleCloseAlasanKkModal = () => {
        setShowAlasanKkModal(false);
        setTimeout(() => {
            setSelectedItem(null);
            setAlasanVerifKk("");
            setSavingAlasanKk(false);
        }, 300);
    };

    const handleSaveAlasanVerifKk = async () => {
        if (!selectedItem) return;

        if (alasanVerifKk.length > 1000) {
            toast.error('Alasan verifikasi KK maksimal 1000 karakter');
            return;
        }

        setSavingAlasanKk(true);
        try {
            const response = await Api.put(`/api/admin/yatim/${selectedItem.id}/alasan-verif-kk`, {
                alasan_verif_kk: alasanVerifKk
            }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });

            if (response.data.success) {
                toast.success('Alasan verifikasi KK berhasil disimpan');
                setYatim(prev => prev.map(y =>
                    y.id === selectedItem.id ? { ...y, alasan_verif_kk: alasanVerifKk } : y
                ));
                if (detailData && detailData.id === selectedItem.id) {
                    setDetailData(prev => ({ ...prev, alasan_verif_kk: alasanVerifKk }));
                }
                handleCloseAlasanKkModal();
            } else {
                toast.error(response.data.message || 'Gagal menyimpan alasan verifikasi KK');
            }
        } catch (error) {
            console.error('Error saving alasan verif KK:', error);
            toast.error(error.response?.data?.message || 'Terjadi kesalahan saat menyimpan alasan verifikasi KK');
        } finally {
            setSavingAlasanKk(false);
        }
    };

    // Helper functions untuk KK
    const getKkStatusClass = (status) => {
        switch (status) {
            case 'verif':
                return 'table-success';
            case 'ditolak':
                return 'table-danger';
            default:
                return '';
        }
    };

    const getKkStatusBadge = (status) => {
        switch (status) {
            case 'verif':
                return <span className="badge bg-success"><i className="fa fa-check-circle me-1"></i>KK Terverifikasi</span>;
            case 'ditolak':
                return <span className="badge bg-danger"><i className="fa fa-times-circle me-1"></i>KK Ditolak</span>;
            default:
                return <span className="badge bg-warning"><i className="fa fa-clock me-1"></i>KK Belum Diverifikasi</span>;
        }
    };

    const getStatusDataBadge = (status) => {
        switch (status) {
            case 'verif':
                return <span className="badge bg-success">Terverifikasi</span>;
            case 'ditolak':
                return <span className="badge bg-danger">Ditolak</span>;
            default:
                return <span className="badge bg-secondary">Belum</span>;
        }
    };

    // Pagination
    const handlePageChange = (page) => {
        if (page < 1 || page > lastPage) return;
        setCurrentPage(page);
        fetchYatim(page, searchQuery, selectedJenjang);
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
                                        <h5 className="mb-0">Verifikasi Kartu Keluarga (KK) - Yatim Piatu</h5>
                                        <small className="text-muted">Verifikasi dokumen Kartu Keluarga peserta yatim piatu</small>
                                    </div>
                                    <div className="col-md-5 text-end">
                                        <div className="text-muted">
                                            {total > 0 && `Total: ${total} data`}
                                        </div>
                                    </div>
                                </div>

                                {/* Search Filters */}
                                <div className="row mb-3">
                                    <div className="col-md-5 col-12 mb-2">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control border-1 shadow-sm"
                                                value={searchQuery}
                                                onChange={searchData}
                                                placeholder="Cari NIK, Nama, atau NISN..."
                                            />
                                            <span className="input-group-text border-0 shadow-sm">
                                                <i className="fa fa-search"></i>
                                            </span>
                                            {(searchQuery || selectedJenjang) && (
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
                                            Cari berdasarkan NIK, Nama, atau NISN peserta
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
                                            <option value="SMK">SMK</option>
                                        </select>
                                        <small className="text-muted mt-1">
                                            Filter berdasarkan jenjang
                                        </small>
                                    </div>
                                    <div className="col-md-4 col-12 mb-2">
                                        <div className="d-flex gap-2">
                                            <button
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => fetchYatim(currentPage)}
                                                title="Refresh data"
                                            >
                                                <i className="fa fa-refresh"></i> Refresh
                                            </button>
                                            <div className="flex-grow-1"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* User Info */}
                                {userData && (
                                    <div className="alert alert-info mb-4">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong><i className="fa fa-user me-1"></i> Admin:</strong> {userData.name}
                                                {userData.role && ` (${userData.role})`}
                                            </div>
                                            <small>Halaman khusus verifikasi Kartu Keluarga</small>
                                        </div>
                                    </div>
                                )}

                                {/* Status Legend */}
                                <div className="row mb-3">
                                    <div className="col-md-12">
                                        <div className="d-flex flex-wrap gap-3 mb-2">
                                            <div className="d-flex align-items-center">
                                                <div className="status-indicator bg-success me-2" style={{ width: '15px', height: '15px', borderRadius: '3px' }}></div>
                                                <small>KK Terverifikasi</small>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="status-indicator bg-danger me-2" style={{ width: '15px', height: '15px', borderRadius: '3px' }}></div>
                                                <small>KK Ditolak</small>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="status-indicator bg-warning me-2" style={{ width: '15px', height: '15px', borderRadius: '3px' }}></div>
                                                <small>KK Belum Diverifikasi</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Main Table */}
                                {loading ? (
                                    <div className="text-center py-4">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <p className="mt-2">Memuat data Kartu Keluarga...</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="table-responsive">
                                            <table className="table table-bordered table-striped table-hover">
                                                <thead className="bg-warning text-white">
                                                    <tr>
                                                        <th scope="col" width="50">No</th>
                                                        <th scope="col">Nama Peserta</th>
                                                        <th scope="col" width="120">NIK</th>
                                                        <th scope="col" width="100">Jenjang</th>
                                                        <th scope="col" width="120">Status Data</th>
                                                        <th scope="col" width="150">Status KK</th>
                                                        <th scope="col">Alasan Verifikasi KK</th>
                                                        <th scope="col" width="200">Aksi</th>
                                                        {/* <th scope="col" width="100">Alasan KK</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {yatim && yatim.length > 0 ? (
                                                        yatim.map((item, index) => (
                                                            <tr key={item.id} className={getKkStatusClass(item.verif_kk)}>
                                                                <td className="text-center">{from + index + 1}</td>
                                                                <td>
                                                                    <div>
                                                                        <strong>{item.name}</strong>
                                                                        <div className="small text-muted">
                                                                            {item.asal_sekolah}
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <code>{item.nik}</code>
                                                                </td>
                                                                <td className="text-center">
                                                                    <span className="badge bg-info">{item.jenjang}</span>
                                                                </td>
                                                                <td className="text-center">
                                                                    {getStatusDataBadge(item.status_data)}
                                                                </td>
                                                                <td className="text-center">
                                                                    {getKkStatusBadge(item.verif_kk)}
                                                                </td>
                                                                <td>
                                                                    {item.alasan_verif_kk ? (
                                                                        <div
                                                                            className="text-truncate"
                                                                            style={{ maxWidth: '250px' }}
                                                                            title={item.alasan_verif_kk}
                                                                        >
                                                                            <i className="fa fa-file-text-o me-1 text-muted"></i>
                                                                            {item.alasan_verif_kk}
                                                                        </div>
                                                                    ) : (
                                                                        <span className="text-muted fst-italic">Belum ada alasan</span>
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex flex-wrap gap-1">
                                                                        {/* Tombol Lihat KK */}
                                                                        <button
                                                                            onClick={() => handleViewDetail(item)}
                                                                            className="btn btn-primary btn-sm"
                                                                            title="Lihat Kartu Keluarga"
                                                                        >
                                                                            <i className="fa fa-eye me-1"></i> Lihat KK
                                                                        </button>

                                                                        {/* Tombol Download KK */}
                                                                        <button
                                                                            onClick={() => handleDownloadKk(item)}
                                                                            className="btn btn-info btn-sm"
                                                                            title="Download Kartu Keluarga"
                                                                        >
                                                                            <i className="fa fa-download me-1"></i> Download
                                                                        </button>

                                                                        {/* Tombol Aksi Verifikasi KK */}
                                                                        <div className="btn-group">
                                                                            {item.verif_kk === 'verif' ? (
                                                                                <button
                                                                                    onClick={() => handleUnverifKk(item)}
                                                                                    className="btn btn-warning btn-sm"
                                                                                    disabled={verifyingKkId === item.id}
                                                                                    title="Batalkan Verifikasi KK"
                                                                                >
                                                                                    {verifyingKkId === item.id ? (
                                                                                        <span className="spinner-border spinner-border-sm" role="status"></span>
                                                                                    ) : (
                                                                                        'Batal'
                                                                                    )}
                                                                                </button>
                                                                            ) : item.verif_kk === 'ditolak' ? (
                                                                                <button
                                                                                    onClick={() => handleUnverifKk(item)}
                                                                                    className="btn btn-info btn-sm"
                                                                                    disabled={verifyingKkId === item.id}
                                                                                    title="Batalkan Penolakan KK"
                                                                                >
                                                                                    {verifyingKkId === item.id ? (
                                                                                        <span className="spinner-border spinner-border-sm" role="status"></span>
                                                                                    ) : (
                                                                                        'Batal'
                                                                                    )}
                                                                                </button>
                                                                            ) : (
                                                                                <>
                                                                                    <button
                                                                                        onClick={() => handleVerifKk(item)}
                                                                                        className="btn btn-success btn-sm"
                                                                                        disabled={verifyingKkId === item.id}
                                                                                        title="Verifikasi Kartu Keluarga"
                                                                                    >
                                                                                        {verifyingKkId === item.id ? (
                                                                                            <span className="spinner-border spinner-border-sm" role="status"></span>
                                                                                        ) : (
                                                                                            'Verif'
                                                                                        )}
                                                                                    </button>
                                                                                    <button
                                                                                        onClick={() => handleRejectKk(item)}
                                                                                        className="btn btn-danger btn-sm"
                                                                                        disabled={verifyingKkId === item.id}
                                                                                        title="Tolak Kartu Keluarga"
                                                                                    >
                                                                                        {verifyingKkId === item.id ? (
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
                                                                {/* <td>
                                                                    <button
                                                                        onClick={() => handleOpenAlasanKkModal(item)}
                                                                        className="btn btn-outline-danger btn-sm w-100"
                                                                        title={
                                                                            item.verif_kk === 'verif' ? 'Edit Alasan Verifikasi KK' :
                                                                            item.verif_kk === 'ditolak' ? 'Edit Alasan Penolakan KK' :
                                                                            'Tambah Alasan Verifikasi KK'
                                                                        }
                                                                    >
                                                                        <i className="fa fa-edit me-1"></i>
                                                                        {item.alasan_verif_kk ? 'Edit' : 'Tambah'}
                                                                    </button>
                                                                </td> */}
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="9" className="text-center py-5">
                                                                <div className="text-muted">
                                                                    <i className="fa fa-file-pdf-o fa-3x mb-3"></i>
                                                                    <h5>Tidak Ada Data Kartu Keluarga</h5>
                                                                    <p>
                                                                        {searchQuery || selectedJenjang
                                                                            ? `Tidak ditemukan data dengan filter yang dipilih`
                                                                            : "Belum ada data Kartu Keluarga untuk diverifikasi"
                                                                        }
                                                                    </p>
                                                                    {(searchQuery || selectedJenjang) && (
                                                                        <button
                                                                            className="btn btn-primary btn-sm mt-2"
                                                                            onClick={clearFilters}
                                                                        >
                                                                            <i className="fa fa-filter me-1"></i> Tampilkan Semua Data
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Pagination */}
                                        {total > 0 && lastPage > 1 && (
                                            <div className="d-flex justify-content-between align-items-center mt-4">
                                                <div>
                                                    <small className="text-muted">
                                                        Menampilkan {from} sampai {to} dari {total} data
                                                        {searchQuery && ` untuk pencarian "${searchQuery}"`}
                                                        {selectedJenjang && ` dengan jenjang ${selectedJenjang}`}
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

            {/* MODAL BESAR UNTUK KK - SEPERTI VERSI AWAL */}
            {showDetailModal && (
                <div className="modal fade show" style={{ 
                    display: 'block', 
                    backgroundColor: 'rgba(0,0,0,0.7)' 
                }}>
                    {/* Modal XL Besar dengan custom styling */}
                    <div className="modal-dialog modal-xl" style={{
                        maxWidth: '95%',
                        width: '95%',
                        height: '90vh',
                        margin: '5vh auto',
                        maxHeight: '90vh'
                    }}>
                        <div className="modal-content h-100" style={{
                            borderRadius: '10px',
                            border: '3px solid #ffc107',
                            boxShadow: '0 10px 50px rgba(0,0,0,0.3)'
                        }}>
                            {/* Header Modal */}
                            <div className="modal-header bg-warning text-white" style={{
                                padding: '20px 30px',
                                borderBottom: '2px solid #e0a800',
                                borderTopLeftRadius: '7px',
                                borderTopRightRadius: '7px'
                            }}>
                                <div className="d-flex align-items-center w-100">
                                    <div className="flex-grow-1">
                                        <h3 className="modal-title mb-2">
                                            <i className="fa fa-id-card me-3"></i>
                                            <strong>KARTU KELUARGA</strong> - {detailData?.name || 'Peserta'}
                                            <span className="ms-4">
                                                {detailData && getKkStatusBadge(detailData.verif_kk)}
                                            </span>
                                        </h3>
                                        <div className="d-flex align-items-center">
                                            <div className="me-4">
                                                <small className="d-block">
                                                    <strong>NIK:</strong> <code className="fs-6">{detailData?.nik}</code>
                                                </small>
                                            </div>
                                            <div className="me-4">
                                                <small className="d-block">
                                                    <strong>Jenjang:</strong> <span className="badge bg-info ms-1">{detailData?.jenjang}</span>
                                                </small>
                                            </div>
                                            <div>
                                                <small className="d-block">
                                                    <strong>Sekolah:</strong> {detailData?.asal_sekolah}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn-close btn-close-white"
                                        onClick={handleCloseDetailModal}
                                        style={{
                                            fontSize: '1.5rem',
                                            opacity: 1,
                                            width: '40px',
                                            height: '40px'
                                        }}
                                    ></button>
                                </div>
                            </div>

                            {/* Body Modal */}
                            <div className="modal-body p-0" style={{
                                height: 'calc(100% - 120px)',
                                overflow: 'hidden'
                            }}>
                                {loadingDetail ? (
                                    <div className="d-flex justify-content-center align-items-center h-100">
                                        <div className="text-center">
                                            <div className="spinner-border text-warning" style={{ width: '4rem', height: '4rem' }} role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            <h4 className="mt-4 text-warning">Memuat Kartu Keluarga...</h4>
                                            <p className="text-muted">Mohon tunggu sebentar</p>
                                        </div>
                                    </div>
                                ) : detailData ? (
                                    <div className="row h-100 m-0">
                                        {/* Sidebar Info */}
                                        <div className="col-md-4 p-4" style={{
                                            backgroundColor: '#fffaf0',
                                            height: '100%',
                                            overflowY: 'auto',
                                            borderRight: '2px solid #ffc107'
                                        }}>
                                            {/* Info Peserta Card */}
                                            <div className="card border-warning mb-4 shadow">
                                                <div className="card-header bg-warning text-white py-3">
                                                    <h5 className="mb-0">
                                                        <i className="fa fa-user-circle me-2"></i>
                                                        INFORMASI PESERTA
                                                    </h5>
                                                </div>
                                                <div className="card-body">
                                                    <div className="mb-3">
                                                        <label className="form-label fw-bold mb-2 text-warning">
                                                            <i className="fa fa-user me-2"></i>
                                                            Nama Lengkap
                                                        </label>
                                                        <div className="fs-5 fw-bold">{detailData.name}</div>
                                                    </div>
                                                    
                                                    <div className="row g-3">
                                                        <div className="col-12">
                                                            <label className="form-label fw-bold mb-2">
                                                                <i className="fa fa-id-card me-2"></i>
                                                                NIK
                                                            </label>
                                                            <div className="alert alert-light">
                                                                <code className="fs-5">{detailData.nik}</code>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="col-6">
                                                            <label className="form-label fw-bold mb-2">
                                                                <i className="fa fa-graduation-cap me-2"></i>
                                                                NISN
                                                            </label>
                                                            <div className="fs-6">{detailData.nisn || '-'}</div>
                                                        </div>
                                                        
                                                        <div className="col-6">
                                                            <label className="form-label fw-bold mb-2">
                                                                <i className="fa fa-school me-2"></i>
                                                                Jenjang
                                                            </label>
                                                            <div>
                                                                <span className="badge bg-info fs-6 px-3 py-2">{detailData.jenjang}</span>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="col-12">
                                                            <label className="form-label fw-bold mb-2">
                                                                <i className="fa fa-university me-2"></i>
                                                                Asal Sekolah
                                                            </label>
                                                            <div className="fs-6">{detailData.asal_sekolah}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Alasan Verifikasi Card */}
                                            {/* <div className="card border-warning mb-4 shadow">
                                                <div className="card-header bg-warning text-white py-3 d-flex justify-content-between align-items-center">
                                                    <h5 className="mb-0">
                                                        <i className="fa fa-comment-dots me-2"></i>
                                                        ALASAN VERIFIKASI KK
                                                    </h5>
                                                    <button
                                                        onClick={() => handleOpenAlasanKkModal(detailData)}
                                                        className="btn btn-sm btn-outline-light"
                                                        title="Edit Alasan"
                                                    >
                                                        <i className="fa fa-edit"></i>
                                                    </button>
                                                </div>
                                                <div className="card-body" style={{ minHeight: '150px' }}>
                                                    {detailData.alasan_verif_kk ? (
                                                        <div className="alert alert-warning mb-0">
                                                            <div className="d-flex">
                                                                <i className="fa fa-quote-left me-3 mt-1 text-warning fs-4"></i>
                                                                <div className="flex-grow-1">
                                                                    <p className="mb-0" style={{ lineHeight: '1.6' }}>
                                                                        {detailData.alasan_verif_kk}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="text-center py-4">
                                                            <i className="fa fa-comment-slash fa-3x text-muted mb-3"></i>
                                                            <p className="text-muted mb-0 fs-5">Belum ada alasan verifikasi KK</p>
                                                            <button
                                                                onClick={() => handleOpenAlasanKkModal(detailData)}
                                                                className="btn btn-outline-warning mt-3"
                                                            >
                                                                <i className="fa fa-plus me-2"></i>
                                                                Tambah Alasan
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div> */}

                                            {/* Aksi Card */}
                                            {/* <div className="card border-warning shadow">
                                                <div className="card-header bg-warning text-white py-3">
                                                    <h5 className="mb-0">
                                                        <i className="fa fa-cogs me-2"></i>
                                                        AKSI VERIFIKASI
                                                    </h5>
                                                </div>
                                                <div className="card-body">
                                                    <div className="d-grid gap-3">
                                                        {detailData.verif_kk === 'verif' ? (
                                                            <button
                                                                onClick={() => handleUnverifKk(detailData)}
                                                                className="btn btn-warning btn-lg py-3"
                                                                disabled={verifyingKkId === detailData.id}
                                                                style={{ fontSize: '1.1rem' }}
                                                            >
                                                                {verifyingKkId === detailData.id ? (
                                                                    <>
                                                                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                                        MEMPROSES...
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <i className="fa fa-ban me-2"></i>
                                                                        BATALKAN VERIFIKASI KK
                                                                    </>
                                                                )}
                                                            </button>
                                                        ) : detailData.verif_kk === 'ditolak' ? (
                                                            <button
                                                                onClick={() => handleUnverifKk(detailData)}
                                                                className="btn btn-info btn-lg py-3"
                                                                disabled={verifyingKkId === detailData.id}
                                                                style={{ fontSize: '1.1rem' }}
                                                            >
                                                                {verifyingKkId === detailData.id ? (
                                                                    <>
                                                                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                                        MEMPROSES...
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <i className="fa fa-undo me-2"></i>
                                                                        BATALKAN PENOLAKAN KK
                                                                    </>
                                                                )}
                                                            </button>
                                                        ) : (
                                                            // <>
                                                            //     <button
                                                            //         onClick={() => handleVerifKk(detailData)}
                                                            //         className="btn btn-success btn-lg py-3"
                                                            //         disabled={verifyingKkId === detailData.id}
                                                            //         style={{ fontSize: '1.1rem' }}
                                                            //     >
                                                            //         {verifyingKkId === detailData.id ? (
                                                            //             <>
                                                            //                 <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                            //                 MEMPROSES...
                                                            //             </>
                                                            //         ) : (
                                                            //             <>
                                                            //                 <i className="fa fa-check-circle me-2"></i>
                                                            //                 VERIFIKASI KARTU KELUARGA
                                                            //             </>
                                                            //         )}
                                                            //     </button>
                                                            //     <button
                                                            //         onClick={() => handleRejectKk(detailData)}
                                                            //         className="btn btn-danger btn-lg py-3"
                                                            //         disabled={verifyingKkId === detailData.id}
                                                            //         style={{ fontSize: '1.1rem' }}
                                                            //     >
                                                            //         {verifyingKkId === detailData.id ? (
                                                            //             <>
                                                            //                 <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                            //                 MEMPROSES...
                                                            //             </>
                                                            //         ) : (
                                                            //             <>
                                                            //                 <i className="fa fa-times-circle me-2"></i>
                                                            //                 TOLAK KARTU KELUARGA
                                                            //             </>
                                                            //         )}
                                                            //     </button>
                                                            // </>
                                                        )}
                                                        
                                                        <div className="row g-2">
                                                            <div className="col-6">
                                                                <button
                                                                    onClick={() => handleDownloadKk(detailData)}
                                                                    className="btn btn-outline-primary btn-lg w-100 py-3"
                                                                    style={{ fontSize: '1rem' }}
                                                                >
                                                                    <i className="fa fa-download me-2"></i>
                                                                    DOWNLOAD
                                                                </button>
                                                            </div>
                                                            <div className="col-6">
                                                                <a
                                                                    href={activePdf?.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="btn btn-outline-secondary btn-lg w-100 py-3"
                                                                    style={{ fontSize: '1rem' }}
                                                                >
                                                                    <i className="fa fa-external-link me-2"></i>
                                                                    TAB BARU
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>

                                        {/* PDF Viewer Area */}
                                        <div className="col-md-8 p-0" style={{ height: '100%' }}>
                                            <div className="d-flex flex-column h-100">
                                                {/* PDF Viewer Header */}
                                                <div className="bg-light p-4 border-bottom d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <h4 className="mb-1 text-warning">
                                                            <i className="fa fa-file-pdf-o me-3 text-danger"></i>
                                                            <strong>PREVIEW DOKUMEN KARTU KELUARGA</strong>
                                                        </h4>
                                                        <small className="text-muted">
                                                            <i className="fa fa-info-circle me-1"></i>
                                                            Gunakan scroll mouse untuk zoom in/out
                                                        </small>
                                                    </div>
                                                    <div>
                                                        <span className="badge bg-warning me-3 fs-6 px-3 py-2">
                                                            <i className="fa fa-eye me-1"></i>
                                                            PDF VIEWER
                                                        </span>
                                                        <button
                                                            className="btn btn-outline-secondary me-2"
                                                            onClick={() => {
                                                                const iframe = document.querySelector('iframe');
                                                                if (iframe && iframe.contentWindow) {
                                                                    iframe.contentWindow.postMessage({ type: 'zoom', value: 'in' }, '*');
                                                                }
                                                            }}
                                                            title="Zoom In"
                                                        >
                                                            <i className="fa fa-search-plus"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-outline-secondary"
                                                            onClick={() => {
                                                                const iframe = document.querySelector('iframe');
                                                                if (iframe && iframe.contentWindow) {
                                                                    iframe.contentWindow.postMessage({ type: 'zoom', value: 'out' }, '*');
                                                                }
                                                            }}
                                                            title="Zoom Out"
                                                        >
                                                            <i className="fa fa-search-minus"></i>
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* PDF Container */}
                                                <div className="flex-grow-1 position-relative bg-dark">
                                                    {!pdfLoaded && (
                                                        <div className="position-absolute top-50 start-50 translate-middle text-center">
                                                            <div className="spinner-border text-warning" style={{ width: '5rem', height: '5rem' }} role="status">
                                                                <span className="visually-hidden">Memuat PDF...</span>
                                                            </div>
                                                            <h4 className="mt-4 text-white">Memuat dokumen Kartu Keluarga...</h4>
                                                            <p className="text-light">Mohon tunggu sebentar</p>
                                                        </div>
                                                    )}
                                                    
                                                    {activePdf?.url ? (
                                                        <iframe
                                                            src={activePdf.url}
                                                            width="100%"
                                                            height="100%"
                                                            style={{ 
                                                                border: 'none',
                                                                display: pdfLoaded ? 'block' : 'none'
                                                            }}
                                                            title="Kartu Keluarga"
                                                            onLoad={handlePdfLoad}
                                                            allowFullScreen
                                                        />
                                                    ) : (
                                                        <div className="d-flex justify-content-center align-items-center h-100">
                                                            <div className="text-center text-white">
                                                                <i className="fa fa-file-pdf-o fa-6x text-muted mb-4"></i>
                                                                <h3 className="text-muted">Dokumen Kartu Keluarga Tidak Tersedia</h3>
                                                                <p className="text-muted">File tidak dapat ditampilkan</p>
                                                                <button 
                                                                    className="btn btn-warning mt-3"
                                                                    onClick={handleCloseDetailModal}
                                                                >
                                                                    <i className="fa fa-times me-2"></i> Tutup
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* PDF Controls Footer */}
                                                <div className="bg-light p-3 border-top">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <small className="text-muted">
                                                                <i className="fa fa-clock me-1"></i>
                                                                Dokumen diproses: {new Date().toLocaleTimeString('id-ID')}
                                                            </small>
                                                        </div>
                                                        <div className="btn-group">
                                                            <button 
                                                                className="btn btn-sm btn-outline-primary"
                                                                onClick={() => window.open(activePdf?.url, '_blank')}
                                                                disabled={!activePdf?.url}
                                                            >
                                                                <i className="fa fa-expand me-1"></i> Fullscreen
                                                            </button>
                                                            <button 
                                                                className="btn btn-sm btn-outline-success"
                                                                onClick={() => handleDownloadKk(detailData)}
                                                                disabled={!activePdf?.url}
                                                            >
                                                                <i className="fa fa-save me-1"></i> Simpan
                                                            </button>
                                                            <button 
                                                                className="btn btn-sm btn-outline-warning"
                                                                onClick={() => window.print()}
                                                            >
                                                                <i className="fa fa-print me-1"></i> Print
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="d-flex justify-content-center align-items-center h-100">
                                        <div className="text-center">
                                            <i className="fa fa-exclamation-triangle fa-6x text-danger mb-4"></i>
                                            <h3 className="text-danger">Gagal Memuat Data</h3>
                                            <p className="text-muted">Data Kartu Keluarga tidak dapat ditampilkan</p>
                                            <button 
                                                className="btn btn-warning btn-lg mt-3"
                                                onClick={handleCloseDetailModal}
                                            >
                                                <i className="fa fa-times me-2"></i> Tutup
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer Modal */}
                            <div className="modal-footer py-3 bg-light" style={{ borderTop: '2px solid #ffc107' }}>
                                <div className="d-flex justify-content-between w-100 align-items-center">
                                    <div>
                                        <small className="text-muted">| 
                                            <i className="fa fa-calendar ms-3 me-2"></i>
                                            Dibuat: {detailData?.created_at ? 
                                                new Date(detailData.created_at).toLocaleDateString('id-ID') : 
                                                '-'} | 
                                            <i className="fa fa-sync ms-3 me-2"></i>
                                            Update: {detailData?.updated_at ? 
                                                new Date(detailData.updated_at).toLocaleDateString('id-ID') : 
                                                '-'}
                                        </small>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            className="btn btn-secondary btn-lg"
                                            onClick={handleCloseDetailModal}
                                        >
                                            <i className="fa fa-times me-2"></i> TUTUP
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Alasan Verifikasi KK */}
            {showAlasanKkModal && (
                <div className="modal fade show" style={{ 
                    display: 'block', 
                    backgroundColor: 'rgba(0,0,0,0.7)' 
                }}>
                    <div className="modal-dialog modal-lg" style={{ maxWidth: '800px' }}>
                        <div className="modal-content">
                            <div className="modal-header bg-warning text-white">
                                <h4 className="modal-title">
                                    <i className="fa fa-comment me-2"></i>
                                    {selectedItem?.verif_kk === 'verif' ? 'Alasan Verifikasi Kartu Keluarga' :
                                        selectedItem?.verif_kk === 'ditolak' ? 'Alasan Penolakan Kartu Keluarga' :
                                            'Alasan Verifikasi Kartu Keluarga'}
                                </h4>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={handleCloseAlasanKkModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                {selectedItem && (
                                    <div className="mb-3">
                                        <div className="alert alert-light">
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <strong>Data Peserta:</strong><br />
                                                    <strong>{selectedItem.name}</strong><br />
                                                    NIK: {selectedItem.nik} | Jenjang: {selectedItem.jenjang}
                                                </div>
                                                <div className="col-md-4 text-end">
                                                    {getKkStatusBadge(selectedItem.verif_kk)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="mb-3">
                                    <label htmlFor="alasanVerifKk" className="form-label fw-bold">
                                        {selectedItem?.verif_kk === 'verif' ? 'Alasan Verifikasi:' :
                                            selectedItem?.verif_kk === 'ditolak' ? 'Alasan Penolakan:' :
                                                'Alasan Verifikasi:'}
                                        <span className="text-danger">*</span>
                                    </label>
                                    <textarea
                                        id="alasanVerifKk"
                                        className="form-control"
                                        rows="6"
                                        value={alasanVerifKk}
                                        onChange={(e) => setAlasanVerifKk(e.target.value)}
                                        placeholder="Masukkan alasan verifikasi atau penolakan Kartu Keluarga..."
                                        maxLength={1000}
                                        style={{ resize: 'vertical' }}
                                    />
                                    <div className="form-text d-flex justify-content-between">
                                        <span>
                                            {alasanVerifKk.length}/1000 karakter
                                            {alasanVerifKk.length >= 1000 && (
                                                <span className="text-danger ms-2"> - Maksimal karakter tercapai</span>
                                            )}
                                        </span>
                                        <span className="text-muted">Wajib diisi</span>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCloseAlasanKkModal}
                                    disabled={savingAlasanKk}
                                >
                                    <i className="fa fa-times me-2"></i> Batal
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-warning"
                                    onClick={handleSaveAlasanVerifKk}
                                    disabled={savingAlasanKk || alasanVerifKk.length > 1000 || !alasanVerifKk.trim()}
                                >
                                    {savingAlasanKk ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                            Menyimpan...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fa fa-save me-2"></i>
                                            Simpan Alasan KK
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </LayoutAdmin>
    );
}