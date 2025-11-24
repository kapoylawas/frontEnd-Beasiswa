import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import Api from "../../../services/Api";

export default function YatimDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [yatim, setYatim] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeDoc, setActiveDoc] = useState(null);

    document.title = `Detail Yatim - Beasiswa Sidoarjo`;

    useEffect(() => {
        fetchYatimDetail();
    }, [id]);

    const fetchYatimDetail = async () => {
        setLoading(true);
        try {
            const response = await Api.get(`/api/admin/yatim/${id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });

            if (response.data.success) {
                setYatim(response.data.data);
            } else {
                toast.error("Gagal mengambil data detail yatim");
                navigate("/admin/yatim");
            }
        } catch (error) {
            console.error("Error fetching yatim detail:", error);
            toast.error("Terjadi kesalahan saat mengambil data detail");
            navigate("/admin/yatim");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
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

    // Fungsi untuk mendapatkan badge status
    const getStatusBadge = (status) => {
        switch (status) {
            case 'verif':
                return <span className="badge bg-success fs-6 px-3 py-2">Terverifikasi</span>;
            case 'ditolak':
                return <span className="badge bg-danger fs-6 px-3 py-2">Ditolak</span>;
            default:
                return <span className="badge bg-warning fs-6 px-3 py-2">Belum Diverifikasi</span>;
        }
    };

    // Fungsi untuk mendapatkan icon status
    const getStatusIcon = (status) => {
        switch (status) {
            case 'verif':
                return "fa-check-circle text-success";
            case 'ditolak':
                return "fa-times-circle text-danger";
            default:
                return "fa-clock text-warning";
        }
    };

    const openDocument = (docUrl, docName) => {
        if (!docUrl) {
            toast.error(`Dokumen ${docName} tidak tersedia`);
            return;
        }
        setActiveDoc({ url: docUrl, name: docName });
    };

    const closeDocument = () => {
        setActiveDoc(null);
    };

    if (loading) {
        return (
            <LayoutAdmin>
                <div className="container-fluid mb-5 mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card border-0 rounded-4 shadow-lg">
                                <div className="card-body text-center py-5">
                                    <div className="loading-spinner mb-4">
                                        <div className="spinner-border text-primary" style={{ width: "4rem", height: "4rem" }} role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                    <h4 className="text-primary mb-3">Memuat Data Yatim</h4>
                                    <p className="text-muted">Sedang mengambil data detail siswa yatim...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAdmin>
        );
    }

    if (!yatim) {
        return (
            <LayoutAdmin>
                <div className="container-fluid mb-5 mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card border-0 rounded-4 shadow-lg">
                                <div className="card-body text-center py-5">
                                    <div className="error-icon mb-4">
                                        <i className="fas fa-exclamation-circle fa-4x text-warning"></i>
                                    </div>
                                    <h4 className="text-dark mb-3">Data Tidak Ditemukan</h4>
                                    <p className="text-muted mb-4">Data siswa yatim yang Anda cari tidak ditemukan atau telah dihapus.</p>
                                    <Link to="/admin/adminYatim" className="btn btn-primary btn-lg px-4 py-2 rounded-pill">
                                        <i className="fas fa-arrow-left me-2"></i>
                                        Kembali ke Data Yatim
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAdmin>
        );
    }

    // Data untuk tabel
    const studentData = [
        {
            title: "Informasi Pribadi",
            icon: "fa-user",
            color: "primary",
            rows: [
                { label: "Nama Lengkap", value: yatim.name, icon: "fa-signature" },
                { label: "NIK", value: yatim.nik, icon: "fa-id-card" },
                { label: "NISN", value: yatim.nisn, icon: "fa-address-card" },
                { label: "Tempat Lahir", value: yatim.tempat_lahir, icon: "fa-map-marker-alt" },
                { label: "Tanggal Lahir", value: formatDate(yatim.tanggal_lahir), icon: "fa-calendar" },
                { label: "Umur", value: `${calculateAge(yatim.tanggal_lahir)} Tahun`, icon: "fa-birthday-cake", badge: true }
            ]
        },
        {
            title: "Informasi Pendidikan",
            icon: "fa-graduation-cap",
            color: "success",
            rows: [
                { label: "Jenjang Pendidikan", value: yatim.jenjang, icon: "fa-school", badge: true },
                { label: "Asal Sekolah", value: yatim.asal_sekolah, icon: "fa-university" },
                { label: "NPSN Sekolah", value: yatim.npsn || "-", icon: "fa-hashtag" }
            ]
        },
        {
            title: "Informasi Alamat",
            icon: "fa-home",
            color: "info",
            rows: [
                { label: "Alamat Lengkap", value: yatim.alamat, icon: "fa-location-dot", fullWidth: true }
            ]
        }
    ];

    return (
        <LayoutAdmin>
            <div className="container-fluid mb-5 mt-4">
                {/* Header dengan Background Gradient */}
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="header-gradient rounded-4 p-4 text-white shadow-lg">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h1 className="h2 mb-2 fw-bold">
                                        <i className="fas fa-user-graduate me-3"></i>
                                        Detail Data Siswa Yatim
                                    </h1>
                                    <p className="mb-0 opacity-75">
                                        <i className="fas fa-info-circle me-2"></i>
                                        Informasi lengkap data siswa yatim
                                    </p>
                                </div>
                                <Link to="/admin/adminYatim" className="btn btn-light btn-lg rounded-pill px-4 shadow-sm">
                                    <i className="fas fa-arrow-left me-2"></i>
                                    Kembali
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* Kolom Kiri - Data Siswa dalam Tabel */}
                    <div className="col-lg-8">
                        {studentData.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="card border-0 rounded-4 shadow-sm mb-4">
                                <div className="card-header bg-white py-3 rounded-top-4 border-bottom">
                                    <div className="d-flex align-items-center">
                                        <div className={`icon-wrapper bg-${section.color} rounded-3 p-2 me-3`}>
                                            <i className={`fas ${section.icon} fa-lg text-white`}></i>
                                        </div>
                                        <div>
                                            <h3 className="h5 mb-0 text-dark fw-bold">{section.title}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <div className="table-responsive">
                                        <table className="table table-hover mb-0">
                                            <tbody>
                                                {section.rows.map((row, rowIndex) => (
                                                    <tr key={rowIndex} className="align-middle">
                                                        <td className="border-0 py-3 ps-4" style={{ width: '35%' }}>
                                                            <div className="d-flex align-items-center">
                                                                <i className={`fas ${row.icon} text-${section.color} me-3 fa-fw`}></i>
                                                                <span className="fw-semibold text-muted">{row.label}</span>
                                                            </div>
                                                        </td>
                                                        <td className="border-0 py-3" style={{ width: '65%' }}>
                                                            {row.fullWidth ? (
                                                                <div className="pe-4">
                                                                    {row.badge ? (
                                                                        <span className={`badge bg-${section.color}-subtle text-${section.color} fs-6 px-3 py-2`}>
                                                                            {row.value}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-dark">{row.value}</span>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <div className="d-flex justify-content-between align-items-center pe-4">
                                                                    {row.badge ? (
                                                                        <span className={`badge bg-${section.color}-subtle text-${section.color} fs-6 px-3 py-2`}>
                                                                            {row.value}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-dark">{row.value}</span>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Status & Alasan Verifikasi */}
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card border-0 rounded-4 shadow-sm">
                                    <div className="card-header bg-white py-3 rounded-top-4 border-bottom">
                                        <div className="d-flex align-items-center">
                                            <div className="icon-wrapper bg-warning rounded-3 p-2 me-3">
                                                <i className="fas fa-info-circle fa-lg text-white"></i>
                                            </div>
                                            <h3 className="h5 mb-0 text-dark fw-bold">Status Data</h3>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3">
                                            <div>
                                                <div className="fw-semibold text-muted small">Status Verifikasi</div>
                                                <div className="mt-1">
                                                    {getStatusBadge(yatim.status_data)}
                                                </div>
                                            </div>
                                            <i className={`fas ${getStatusIcon(yatim.status_data)} fa-2x`}></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card border-0 rounded-4 shadow-sm">
                                    <div className="card-header bg-white py-3 rounded-top-4 border-bottom">
                                        <div className="d-flex align-items-center">
                                            <div className="icon-wrapper bg-info rounded-3 p-2 me-3">
                                                <i className="fas fa-comment-alt fa-lg text-white"></i>
                                            </div>
                                            <h3 className="h5 mb-0 text-dark fw-bold">Alasan Verifikasi</h3>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        {yatim.alasan_verif ? (
                                            <div className="p-3 bg-light rounded-3">
                                                <div className="fw-semibold text-muted small mb-2">Catatan dari Admin:</div>
                                                <div className="text-dark fs-6">
                                                    {yatim.alasan_verif}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center p-4">
                                                <i className="fas fa-comment-slash fa-2x text-muted mb-3"></i>
                                                <div className="text-muted">
                                                    Belum ada alasan verifikasi
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="card border-0 rounded-4 shadow-sm mt-4">
                            <div className="card-header bg-white py-3 rounded-top-4 border-bottom">
                                <div className="d-flex align-items-center">
                                    <div className="icon-wrapper bg-secondary rounded-3 p-2 me-3">
                                        <i className="fas fa-clock fa-lg text-white"></i>
                                    </div>
                                    <h3 className="h5 mb-0 text-dark fw-bold">Timeline</h3>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="timeline-mini">
                                    <div className="timeline-item mb-3">
                                        <div className="d-flex">
                                            <div className="timeline-badge bg-success me-3">
                                                <i className="fas fa-plus text-white"></i>
                                            </div>
                                            <div>
                                                <div className="fw-semibold">Data Dibuat</div>
                                                <small className="text-muted">{formatDate(yatim.created_at)}</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="timeline-item">
                                        <div className="d-flex">
                                            <div className="timeline-badge bg-primary me-3">
                                                <i className="fas fa-edit text-white"></i>
                                            </div>
                                            <div>
                                                <div className="fw-semibold">Terakhir Diupdate</div>
                                                <small className="text-muted">{formatDate(yatim.updated_at)}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Kolom Kanan - Dokumen & Quick Actions */}
                    <div className="col-lg-4">
                        {/* Card Dokumen Pendukung */}
                        <div className="card border-0 rounded-4 shadow-sm mb-4">
                            <div className="card-header bg-white py-3 rounded-top-4 border-bottom">
                                <div className="d-flex align-items-center">
                                    <div className="icon-wrapper bg-danger rounded-3 p-2 me-3">
                                        <i className="fas fa-file-pdf fa-lg text-white"></i>
                                    </div>
                                    <div>
                                        <h3 className="h5 mb-0 text-dark fw-bold">Dokumen Pendukung</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body p-3">
                                <div className="d-grid gap-2">
                                    {[
                                        { key: 'imageskartukeluarga', name: 'Kartu Keluarga', desc: 'Dokumen KK', icon: 'fa-id-card', color: 'primary' },
                                        { key: 'imagesktpwali', name: 'KTP Wali', desc: 'Identitas Wali', icon: 'fa-address-card', color: 'info' },
                                        { key: 'imagesketerangansiswaaktif', name: 'Siswa Aktif', desc: 'Surat Keterangan', icon: 'fa-school', color: 'success' },
                                        { key: 'imagessuratkematian', name: 'Surat Kematian', desc: 'Akta Kematian', icon: 'fa-file-medical', color: 'danger' },
                                        { key: 'imagessurattidakmenerimabeasiswa', name: 'Tidak Menerima Beasiswa', desc: 'Surat Pernyataan', icon: 'fa-file-contract', color: 'warning' },
                                        { key: 'imagesuratsktm', name: 'Surat SKTM', desc: 'Keterangan Tidak Mampu', icon: 'fa-file-invoice', color: 'secondary' }
                                    ].map((doc, index) => (
                                        <button
                                            key={doc.key}
                                            className={`btn btn-outline-${doc.color} doc-btn p-3 rounded-3 text-start d-flex justify-content-between align-items-center`}
                                            onClick={() => openDocument(yatim[doc.key], doc.name)}
                                        >
                                            <span className="d-flex align-items-center">
                                                <i className={`fas ${doc.icon} me-3 text-${doc.color}`}></i>
                                                <div>
                                                    <div className="fw-semibold">{doc.name}</div>
                                                    <small className="text-muted">{doc.desc}</small>
                                                </div>
                                            </span>
                                            <i className="fas fa-external-link-alt fa-sm"></i>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Info Sekolah/Pengirim */}
                        {yatim.user && (
                            <div className="card border-0 rounded-4 shadow-sm">
                                <div className="card-header bg-white py-3 rounded-top-4 border-bottom">
                                    <div className="d-flex align-items-center">
                                        <div className="icon-wrapper bg-dark rounded-3 p-2 me-3">
                                            <i className="fas fa-school fa-lg text-white"></i>
                                        </div>
                                        <div>
                                            <h3 className="h5 mb-0 text-dark fw-bold">Data Sekolah</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="mb-3">
                                        <div className="fw-semibold text-muted small">Nama Sekolah</div>
                                        <div className="text-dark">{yatim.user.name}</div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="fw-semibold text-muted small">NPSN</div>
                                        <div className="text-dark">{yatim.user.nik || '-'}</div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="fw-semibold text-muted small">Email</div>
                                        <div className="text-dark">{yatim.user.email}</div>
                                    </div>
                                    <div>
                                        <div className="fw-semibold text-muted small">No. HP</div>
                                        <div className="text-dark">{yatim.user.nohp || '-'}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal untuk menampilkan dokumen */}
            {activeDoc && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
                    <div className="modal-dialog modal-xl modal-dialog-centered">
                        <div className="modal-content rounded-4 shadow border-0">
                            <div className="modal-header bg-primary text-white rounded-top-4">
                                <h5 className="modal-title fw-bold">
                                    <i className="fas fa-file-pdf me-2"></i>
                                    {activeDoc.name}
                                </h5>
                                <button type="button" className="btn-close btn-close-white" onClick={closeDocument}></button>
                            </div>
                            <div className="modal-body p-0" style={{ minHeight: '70vh' }}>
                                <iframe
                                    src={activeDoc.url}
                                    title={activeDoc.name}
                                    className="w-100 h-100 border-0 rounded-0"
                                    style={{ minHeight: '70vh' }}
                                ></iframe>
                            </div>
                            <div className="modal-footer bg-light rounded-bottom-4">
                                <a
                                    href={activeDoc.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary btn-lg rounded-pill px-4"
                                >
                                    <i className="fas fa-external-link-alt me-2"></i>
                                    Buka di Tab Baru
                                </a>
                                <button type="button" className="btn btn-outline-secondary btn-lg rounded-pill px-4" onClick={closeDocument}>
                                    <i className="fas fa-times me-2"></i>
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Styles */}
            <style jsx>{`
                .header-gradient {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                }
                .icon-wrapper {
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                }
                .doc-btn {
                    transition: all 0.3s ease;
                    border-width: 2px;
                }
                .doc-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                }
                .table-hover tbody tr:hover {
                    background-color: rgba(0, 123, 255, 0.05);
                }
                .timeline-mini .timeline-item {
                    position: relative;
                    padding-left: 0;
                }
                .timeline-badge {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .bg-primary-subtle {
                    background-color: rgba(13, 110, 253, 0.1) !important;
                }
                .bg-success-subtle {
                    background-color: rgba(25, 135, 84, 0.1) !important;
                }
                .bg-info-subtle {
                    background-color: rgba(13, 202, 240, 0.1) !important;
                }
                .loading-spinner {
                    animation: pulse 1.5s ease-in-out infinite alternate;
                }
                @keyframes pulse {
                    from { opacity: 0.6; }
                    to { opacity: 1; }
                }
            `}</style>
        </LayoutAdmin>
    );
}