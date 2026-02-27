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
    const [filterStatusKk, setFilterStatusKk] = useState("");

    // State untuk counts dari backend
    const [counts, setCounts] = useState({
        total: 0,
        verif: 0,
        ditolak: 0,
        belum: 0
    });

    // State untuk modal detail KK
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [detailData, setDetailData] = useState(null);
    
    const [loadingDetail, setLoadingDetail] = useState(false);

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

    const fetchYatim = useCallback(async (page = 1, search = "", jenjang = "", statusKk = "") => {
        setLoading(true);
        try {
            let url = `/api/admin/yatim?page=${page}`;
            if (search) {
                url += `&search=${encodeURIComponent(search)}`;
            }
            if (jenjang) {
                url += `&jenjang=${encodeURIComponent(jenjang)}`;
            }
            if (statusKk) {
                url += `&status_kk=${encodeURIComponent(statusKk)}`;
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

                // Set counts dari response jika tersedia
                if (pagination.counts) {
                    setCounts({
                        total: pagination.counts.total || 0,
                        verif: pagination.counts.verif || 0,
                        ditolak: pagination.counts.ditolak || 0,
                        belum: pagination.counts.belum || 0
                    });
                }
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
            fetchYatim(1, query, selectedJenjang, filterStatusKk);
        }, 500);
        return () => clearTimeout(timeoutId);
    };

    const handleJenjangChange = (e) => {
        const jenjang = e.target.value;
        setSelectedJenjang(jenjang);
        setCurrentPage(1);
        fetchYatim(1, searchQuery, jenjang, filterStatusKk);
    };

    const handleStatusKkChange = (e) => {
        const status = e.target.value;
        setFilterStatusKk(status);
        setCurrentPage(1);
        fetchYatim(1, searchQuery, selectedJenjang, status);
    };

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedJenjang("");
        setFilterStatusKk("");
        setCurrentPage(1);
        fetchYatim(1);
    };

    // ==============================================
    // FUNGSI UNTUK KK SAJA - DISESUAIKAN DENGAN POLA VerifYatimIndex
    // ==============================================

    // View detail KK dengan Surat Kematian
    const handleViewDetail = async (item) => {
        setLoadingDetail(true);
        try {
            const response = await Api.get(`/api/admin/yatim/${item.id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });

            if (response.data.success) {
                const data = response.data.data;
                setDetailData(data);
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
        }, 300);
    };

    // Verifikasi Kartu Keluarga - SEDERHANA SEPERTI handleVerif
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

    // Batalkan Verifikasi KK - SEDERHANA SEPERTI handleUnverif
    const handleUnverifKk = async (item) => {
        setVerifyingKkId(item.id);
        try {
            const response = await Api.post(`/api/admin/yatim/${item.id}/unverif-kk`, {}, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });

            if (response.data.success) {
                toast.success('Status Kartu Keluarga berhasil dibatalkan');
                setYatim(prev => prev.map(y =>
                    y.id === item.id ? { ...y, verif_kk: null } : y
                ));
                if (detailData && detailData.id === item.id) {
                    setDetailData(prev => ({ ...prev, verif_kk: null }));
                }
            } else {
                toast.error(response.data.message || 'Gagal membatalkan status Kartu Keluarga');
            }
        } catch (error) {
            console.error('Error unverifying KK:', error);
            toast.error(error.response?.data?.message || 'Terjadi kesalahan saat membatalkan status Kartu Keluarga');
        } finally {
            setVerifyingKkId(null);
        }
    };

    // Tolak KK - SEDERHANA SEPERTI handleReject
    const handleRejectKk = async (item) => {
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
    };

    // Download file KK
    const handleDownloadKk = async (item) => {
        try {
            window.open(`/api/admin/yatim/${item.id}/download/imageskartukeluarga`, '_blank');
        } catch (error) {
            console.error('Error downloading KK:', error);
            toast.error('Gagal mendownload file Kartu Keluarga');
        }
    };

    // Download file Surat Kematian
    const handleDownloadSk = async (item) => {
        try {
            window.open(`/api/admin/yatim/${item.id}/download/imagesuratkematian`, '_blank');
        } catch (error) {
            console.error('Error downloading SK:', error);
            toast.error('Gagal mendownload file Surat Kematian');
        }
    };

    // Modal Alasan Verifikasi KK - SEDERHANA SEPERTI handleOpenAlasanModal
    const handleOpenAlasanKkModal = (item) => {
        setSelectedItem(item);
        setAlasanVerifKk(item.alasan_kk || "");
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
            const response = await Api.put(`/api/admin/${selectedItem.id}/update-alasan-kk`, {
                alasan_kk: alasanVerifKk
            }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });

            if (response.data.success) {
                toast.success('Alasan verifikasi KK berhasil disimpan');
                setYatim(prev => prev.map(y =>
                    y.id === selectedItem.id ? { ...y, alasan_kk: alasanVerifKk } : y
                ));
                if (detailData && detailData.id === selectedItem.id) {
                    setDetailData(prev => ({ ...prev, alasan_kk: alasanVerifKk }));
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

    // Helper functions untuk KK - DIPERBAIKI SEPERTI DI VerifYatimIndex
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
                return <span className="badge bg-success">Terverifikasi</span>;
            case 'ditolak':
                return <span className="badge bg-danger">Ditolak</span>;
            default:
                return <span className="badge bg-warning text-dark">Belum Diverifikasi</span>;
        }
    };

    // Helper function untuk Status Data
    const getStatusDataClass = (status) => {
        switch (status) {
            case 'verif':
                return 'table-success';
            case 'ditolak':
                return 'table-danger';
            default:
                return '';
        }
    };

    const getStatusDataBadge = (status) => {
        switch (status) {
            case 'verif':
                return <span className="badge bg-success">Terverifikasi</span>;
            case 'ditolak':
                return <span className="badge bg-danger">Ditolak</span>;
            default:
                return <span className="badge bg-warning text-dark">Belum</span>;
        }
    };

    // Pagination - SAMA DENGAN VerifYatimIndex
    const handlePageChange = (page) => {
        if (page < 1 || page > lastPage) return;
        setCurrentPage(page);
        fetchYatim(page, searchQuery, selectedJenjang, filterStatusKk);
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    // JSX - DISESUAIKAN DENGAN POLA VerifYatimIndex TAPI FOKUS KE KK SAJA
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
                                                placeholder="Cari NIK, Nama, atau NISN..."
                                            />
                                            <span className="input-group-text border-0 shadow-sm">
                                                <i className="fa fa-search"></i>
                                            </span>
                                            {(searchQuery || selectedJenjang || filterStatusKk) && (
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
                                        </select>
                                        <small className="text-muted mt-1">
                                            Filter berdasarkan jenjang
                                        </small>
                                    </div>
                                    <div className="col-md-3 col-12 mb-2">
                                        <select
                                            className="form-select border-1 shadow-sm"
                                            value={filterStatusKk}
                                            onChange={handleStatusKkChange}
                                        >
                                            <option value="">Semua Status KK</option>
                                            <option value="verif">Terverifikasi</option>
                                            <option value="ditolak">Ditolak</option>
                                            <option value="null">Belum Diverifikasi</option>
                                        </select>
                                        <small className="text-muted mt-1">
                                            Filter berdasarkan status KK
                                        </small>
                                    </div>
                                </div>

                                {userData && (
                                    <div className="alert alert-info mb-4">
                                        <strong>Info Admin:</strong> {userData.name}
                                        {userData.role && ` (${userData.role})`}
                                    </div>
                                )}

                                {/* Status Cards dengan Jumlah TOTAL */}
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
                                                                <h3 className="mt-2 mb-0">{counts.total}</h3>
                                                                <small>Semua data</small>
                                                            </div>
                                                            <i className="fa fa-users fa-2x opacity-50"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Card Terverifikasi */}
                                            <div className="col-md-3 col-6 mb-3">
                                                <div className="card border-0 bg-success text-white shadow-sm">
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <h6 className="mb-0">Terverifikasi</h6>
                                                                <h3 className="mt-2 mb-0">{counts.verif}</h3>
                                                                <small>
                                                                    {counts.total > 0
                                                                        ? `${((counts.verif / counts.total) * 100).toFixed(1)}%`
                                                                        : '0%'}
                                                                </small>
                                                            </div>
                                                            <i className="fa fa-check-circle fa-2x opacity-50"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Card Ditolak */}
                                            <div className="col-md-3 col-6 mb-3">
                                                <div className="card border-0 bg-danger text-white shadow-sm">
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <h6 className="mb-0">Ditolak</h6>
                                                                <h3 className="mt-2 mb-0">{counts.ditolak}</h3>
                                                                <small>
                                                                    {counts.total > 0
                                                                        ? `${((counts.ditolak / counts.total) * 100).toFixed(1)}%`
                                                                        : '0%'}
                                                                </small>
                                                            </div>
                                                            <i className="fa fa-times-circle fa-2x opacity-50"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Card Belum Verifikasi */}
                                            <div className="col-md-3 col-6 mb-3">
                                                <div className="card border-0 bg-warning text-white shadow-sm">
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <h6 className="mb-0">Belum Verifikasi</h6>
                                                                <h3 className="mt-2 mb-0">{counts.belum}</h3>
                                                                <small>
                                                                    {counts.total > 0
                                                                        ? `${((counts.belum / counts.total) * 100).toFixed(1)}%`
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

                                {/* Status Indicators dengan jumlah TOTAL dan Per Halaman */}
                                <div className="row mb-3">
                                    <div className="col-md-12">
                                        <div className="d-flex flex-wrap gap-4">
                                            <div className="d-flex align-items-center">
                                                <div className="status-indicator bg-success me-2" style={{ width: '15px', height: '15px', borderRadius: '3px' }}></div>
                                                <small>
                                                    KK Terverifikasi: <strong>{counts.verif}</strong> total
                                                    <span className="text-muted ms-2">({yatim.filter(y => y.verif_kk === 'verif').length} di halaman ini)</span>
                                                </small>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="status-indicator bg-danger me-2" style={{ width: '15px', height: '15px', borderRadius: '3px' }}></div>
                                                <small>
                                                    KK Ditolak: <strong>{counts.ditolak}</strong> total
                                                    <span className="text-muted ms-2">({yatim.filter(y => y.verif_kk === 'ditolak').length} di halaman ini)</span>
                                                </small>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="status-indicator bg-warning me-2" style={{ width: '15px', height: '15px', borderRadius: '3px' }}></div>
                                                <small>
                                                    KK Belum Diverifikasi: <strong>{counts.belum}</strong> total
                                                    <span className="text-muted ms-2">({yatim.filter(y => !y.verif_kk).length} di halaman ini)</span>
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>

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
                                            <table className="table table-bordered table-striped">
                                                <thead className="bg-warning text-white">
                                                    <tr>
                                                        <th scope="col">No</th>
                                                        <th scope="col">Status Data</th>
                                                        <th scope="col">Status KK</th>
                                                        <th scope="col">Nama</th>
                                                        <th scope="col">NIK</th>
                                                        <th scope="col">NISN</th>
                                                        <th scope="col">Jenjang</th>
                                                        <th scope="col">Asal Sekolah</th>
                                                        <th scope="col">Alasan Verifikasi KK</th>
                                                        <th scope="col" width="250">Aksi Dokumen</th>
                                                        <th scope="col" width="100">Alasan</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {yatim && yatim.length > 0 ? (
                                                        yatim.map((item, index) => (
                                                            <tr key={item.id} className={getKkStatusClass(item.verif_kk)}>
                                                                <td>{from + index}</td>
                                                                <td>{getStatusDataBadge(item.status_data)}</td>
                                                                <td>{getKkStatusBadge(item.verif_kk)}</td>
                                                                <td>{item.name}</td>
                                                                <td>{item.nik}</td>
                                                                <td>{item.nisn}</td>
                                                                <td>
                                                                    <span className="badge bg-info">{item.jenjang}</span>
                                                                </td>
                                                                <td>{item.asal_sekolah}</td>
                                                                <td>
                                                                    {item.alasan_kk ? (
                                                                        <div
                                                                            className="text-truncate"
                                                                            style={{ maxWidth: '200px' }}
                                                                            title={item.alasan_kk}
                                                                        >
                                                                            {item.alasan_kk}
                                                                        </div>
                                                                    ) : (
                                                                        <span className="text-muted">-</span>
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    <div className="btn-group-vertical btn-group-sm" role="group">
                                                                        <div className="btn-group">
                                                                            <button
                                                                                onClick={() => handleViewDetail(item)}
                                                                                className="btn btn-primary btn-sm"
                                                                                title="Lihat Dokumen (KK & Surat Kematian)"
                                                                            >
                                                                                <i className="fa fa-eye me-1"></i> Lihat Dokumen
                                                                            </button>
                                                                            
                                                                        </div>
                                                                        <div className="btn-group mt-1">
                                                                            {item.verif_kk === 'verif' ? (
                                                                                <button
                                                                                    onClick={() => handleUnverifKk(item)}
                                                                                    className="btn btn-warning btn-sm"
                                                                                    disabled={verifyingKkId === item.id}
                                                                                >
                                                                                    {verifyingKkId === item.id ? (
                                                                                        <span className="spinner-border spinner-border-sm" role="status"></span>
                                                                                    ) : (
                                                                                        'Batal Verif'
                                                                                    )}
                                                                                </button>
                                                                            ) : item.verif_kk === 'ditolak' ? (
                                                                                <button
                                                                                    onClick={() => handleUnverifKk(item)}
                                                                                    className="btn btn-info btn-sm"
                                                                                    disabled={verifyingKkId === item.id}
                                                                                >
                                                                                    {verifyingKkId === item.id ? (
                                                                                        <span className="spinner-border spinner-border-sm" role="status"></span>
                                                                                    ) : (
                                                                                        'Batal Tolak'
                                                                                    )}
                                                                                </button>
                                                                            ) : (
                                                                                <>
                                                                                    <button
                                                                                        onClick={() => handleVerifKk(item)}
                                                                                        className="btn btn-success btn-sm"
                                                                                        disabled={verifyingKkId === item.id}
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
                                                                <td>
                                                                    <button
                                                                        onClick={() => handleOpenAlasanKkModal(item)}
                                                                        className="btn btn-info btn-sm w-100"
                                                                        title={
                                                                            item.verif_kk === 'verif' ? 'Edit Alasan Verifikasi KK' :
                                                                                item.verif_kk === 'ditolak' ? 'Edit Alasan Penolakan KK' :
                                                                                    'Tambah Alasan Verifikasi KK'
                                                                        }
                                                                    >
                                                                        <i className="fa fa-edit me-1"></i>
                                                                        {item.alasan_kk ? 'Edit' : 'Tambah'}
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="10" className="text-center py-4">
                                                                <div className="text-muted">
                                                                    <i className="fa fa-file-pdf-o fa-3x mb-3"></i>
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

            {/* Modal Detail KK dengan Surat Kematian - MODIFIKASI */}
            {showDetailModal && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-xl" style={{ maxWidth: '95%' }}>
                        <div className="modal-content">
                            <div className="modal-header bg-warning text-white">
                                <h5 className="modal-title">
                                    <i className="fa fa-id-card me-2"></i>
                                    Dokumen Peserta - {detailData?.name || 'Peserta'}
                                    <span className="ms-2">
                                        {detailData && getKkStatusBadge(detailData.verif_kk)}
                                    </span>
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
                                        <div className="spinner-border text-warning" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <p className="mt-2">Memuat dokumen peserta...</p>
                                    </div>
                                ) : detailData ? (
                                    <div className="row">
                                        {/* Data Pribadi & Info */}
                                        <div className="col-md-4">
                                            {/* Data Pribadi */}
                                            <div className="card mb-3">
                                                <div className="card-header bg-light">
                                                    <h6 className="mb-0">Data Peserta</h6>
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
                                                                <td><strong>Jenjang</strong></td>
                                                                <td>
                                                                    <span className="badge bg-info">{detailData.jenjang}</span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td><strong>Asal Sekolah</strong></td>
                                                                <td>{detailData.asal_sekolah}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><strong>Status Data</strong></td>
                                                                <td>{getStatusDataBadge(detailData.status_data)}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><strong>Status KK</strong></td>
                                                                <td>{getKkStatusBadge(detailData.verif_kk)}</td>
                                                            </tr>
                                                            {/* Tambah info ketersediaan dokumen */}
                                                            <tr>
                                                                <td><strong>Dokumen Tersedia</strong></td>
                                                                <td>
                                                                    <div className="d-flex flex-wrap gap-2">
                                                                        {detailData.imageskartukeluarga && (
                                                                            <span className="badge bg-success">
                                                                                <i className="fa fa-id-card me-1"></i> Kartu Keluarga
                                                                            </span>
                                                                        )}
                                                                        {detailData.imagesuratkematian && (
                                                                            <span className="badge bg-info">
                                                                                <i className="fa fa-file-text me-1"></i> Surat Kematian
                                                                            </span>
                                                                        )}
                                                                        {!detailData.imageskartukeluarga && !detailData.imagesuratkematian && (
                                                                            <span className="badge bg-warning">Tidak ada dokumen</span>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            
                                            {/* Alasan Verifikasi */}
                                            <div className="card mb-3">
                                                <div className="card-header bg-light">
                                                    <h6 className="mb-0">Alasan Verifikasi KK</h6>
                                                </div>
                                                <div className="card-body">
                                                    {detailData.alasan_kk ? (
                                                        <div className="alert alert-light">
                                                            {detailData.alasan_kk}
                                                        </div>
                                                    ) : (
                                                        <p className="text-muted mb-0">Belum ada alasan verifikasi</p>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            {/* Tombol Download */}
                                            <div className="card mb-3">
                                                <div className="card-header bg-light">
                                                    <h6 className="mb-0">Download Dokumen</h6>
                                                </div>
                                                <div className="card-body">
                                                    <div className="d-grid gap-2">
                                                        <button
                                                            onClick={() => handleDownloadKk(detailData)}
                                                            className={`btn ${detailData.imageskartukeluarga ? 'btn-success' : 'btn-secondary disabled'}`}
                                                            disabled={!detailData.imageskartukeluarga}
                                                        >
                                                            <i className="fa fa-download me-2"></i>
                                                            Download Kartu Keluarga
                                                        </button>
                                                        <button
                                                            onClick={() => handleDownloadSk(detailData)}
                                                            className={`btn ${detailData.imagesuratkematian ? 'btn-info' : 'btn-secondary disabled'}`}
                                                            disabled={!detailData.imagesuratkematian}
                                                        >
                                                            <i className="fa fa-download me-2"></i>
                                                            Download Surat Kematian
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Preview Dokumen Berdampingan */}
                                        <div className="col-md-8">
                                            <div className="card h-100">
                                                <div className="card-header bg-light">
                                                    <h6 className="mb-0">Preview Dokumen</h6>
                                                </div>
                                                <div className="card-body p-0">
                                                    <div className="row g-0" style={{ height: '600px' }}>
                                                        {/* Kartu Keluarga - Kiri */}
                                                        <div className="col-md-6 border-end">
                                                            <div className="h-100 d-flex flex-column">
                                                                <div className="p-3 border-bottom bg-success text-white">
                                                                    <h6 className="mb-0">
                                                                        <i className="fa fa-id-card me-2"></i>
                                                                        Kartu Keluarga
                                                                        <span className="ms-2">
                                                                            {getKkStatusBadge(detailData.verif_kk)}
                                                                        </span>
                                                                    </h6>
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    {detailData.imageskartukeluarga ? (
                                                                        <iframe
                                                                            src={detailData.imageskartukeluarga}
                                                                            width="100%"
                                                                            height="100%"
                                                                            style={{ border: 'none' }}
                                                                            title="Kartu Keluarga"
                                                                        />
                                                                    ) : (
                                                                        <div className="h-100 d-flex flex-column justify-content-center align-items-center p-4">
                                                                            <i className="fa fa-file-pdf-o fa-3x text-muted mb-3"></i>
                                                                            <p className="text-muted text-center">
                                                                                Dokumen Kartu Keluarga Tidak Tersedia
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                {detailData.imageskartukeluarga && (
                                                                    <div className="p-2 border-top">
                                                                        <a
                                                                            href={detailData.imageskartukeluarga}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="btn btn-sm btn-outline-success w-100"
                                                                        >
                                                                            <i className="fa fa-external-link me-1"></i> Buka di Tab Baru
                                                                        </a>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Surat Kematian - Kanan */}
                                                        <div className="col-md-6">
                                                            <div className="h-100 d-flex flex-column">
                                                                <div className="p-3 border-bottom bg-info text-white">
                                                                    <h6 className="mb-0">
                                                                        <i className="fa fa-file-text me-2"></i>
                                                                        Surat Kematian
                                                                    </h6>
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    {detailData.imagessuratkematian ? (
                                                                        <iframe
                                                                            src={detailData.imagessuratkematian}
                                                                            width="100%"
                                                                            height="100%"
                                                                            style={{ border: 'none' }}
                                                                            title="Surat Kematian"
                                                                        />
                                                                    ) : (
                                                                        <div className="h-100 d-flex flex-column justify-content-center align-items-center p-4">
                                                                            <i className="fa fa-file-pdf-o fa-3x text-muted mb-3"></i>
                                                                            <p className="text-muted text-center">
                                                                                Dokumen Surat Kematian Tidak Tersedia
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                {detailData.imagessuratkematian && (
                                                                    <div className="p-2 border-top">
                                                                        <a
                                                                            href={detailData.imagessuratkematian}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="btn btn-sm btn-outline-info w-100"
                                                                        >
                                                                            <i className="fa fa-external-link me-1"></i> Buka di Tab Baru
                                                                        </a>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-footer">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="d-flex justify-content-between">
                                                                <div>
                                                                    <small className="text-muted">
                                                                        <strong>Status KK:</strong> {detailData.verif_kk === 'verif' ? 'Terverifikasi' : 
                                                                         detailData.verif_kk === 'ditolak' ? 'Ditolak' : 'Belum Diverifikasi'}
                                                                    </small>
                                                                </div>
                                                                <div>
                                                                    <small className="text-muted">
                                                                        <strong>Total Dokumen:</strong> 
                                                                        {(detailData.imageskartukeluarga ? 1 : 0) + (detailData.imagesuratkematian ? 1 : 0)}/2
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
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
                                    <i className="fa fa-times me-1"></i> Tutup
                                </button>
                                {detailData && (
                                    <button
                                        onClick={() => handleOpenAlasanKkModal(detailData)}
                                        className="btn btn-warning"
                                    >
                                        <i className="fa fa-edit me-1"></i> Edit Alasan Verifikasi
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Alasan Verifikasi KK */}
            {showAlasanKkModal && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">
                                    {selectedItem?.verif_kk === 'verif' ? 'Alasan Verifikasi KK' :
                                     selectedItem?.verif_kk === 'ditolak' ? 'Alasan Penolakan KK' :
                                     'Alasan Verifikasi KK'}
                                </h5>
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
                                            <strong>Data Peserta:</strong><br />
                                            Nama: <strong>{selectedItem.name}</strong><br />
                                            NIK: {selectedItem.nik} | NISN: {selectedItem.nisn}<br />
                                            Status KK: {getKkStatusBadge(selectedItem.verif_kk)}
                                        </div>
                                    </div>
                                )}

                                <div className="mb-3">
                                    <label htmlFor="alasanVerifKk" className="form-label">
                                        {selectedItem?.verif_kk === 'verif' ? 'Alasan Verifikasi' :
                                         selectedItem?.verif_kk === 'ditolak' ? 'Alasan Penolakan' :
                                         'Alasan Verifikasi'}
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
                                    />
                                    <div className="form-text">
                                        {alasanVerifKk.length}/1000 karakter
                                        {alasanVerifKk.length >= 1000 && (
                                            <span className="text-danger"> - Maksimal 1000 karakter</span>
                                        )}
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
                                    Batal
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-warning"
                                    onClick={handleSaveAlasanVerifKk}
                                    disabled={savingAlasanKk || alasanVerifKk.length > 1000}
                                >
                                    {savingAlasanKk ? (
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
        </LayoutAdmin>
    );
}