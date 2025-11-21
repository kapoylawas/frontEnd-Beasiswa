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

    const openDocument = (docUrl, docName) => {
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
                        <div className="col-md-8">
                            <div className="card border-0 rounded-3 shadow-sm">
                                <div className="card-body text-center py-5">
                                    <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <p className="mt-3 fs-5 text-muted">Memuat data detail yatim...</p>
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
                        <div className="col-md-8">
                            <div className="card border-0 rounded-3 shadow-sm">
                                <div className="card-body text-center py-5">
                                    <div className="text-muted">
                                        <i className="fas fa-exclamation-triangle fa-4x mb-4 text-warning"></i>
                                        <h4 className="mb-3">Data tidak ditemukan</h4>
                                        <p className="mb-4">Data yatim yang Anda cari tidak ditemukan atau telah dihapus.</p>
                                        <Link to="/admin/yatim" className="btn btn-primary px-4 py-2">
                                            <i className="fas fa-arrow-left me-2"></i>
                                            Kembali ke Data Yatim
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAdmin>
        );
    }

    return (
        <LayoutAdmin>
            <div className="container-fluid mb-5 mt-3">
                {/* Header */}
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h2 className="h3 mb-1 text-dark">Detail Data Yatim</h2>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb mb-0">
                                        <li className="breadcrumb-item"><Link to="/admin/dashboard" className="text-decoration-none">Dashboard</Link></li>
                                        <li className="breadcrumb-item"><Link to="/admin/yatim" className="text-decoration-none">Data Yatim</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Detail</li>
                                    </ol>
                                </nav>
                            </div>
                            <Link to="/admin/adminYatim" className="btn btn-outline-primary">
                                <i className="fas fa-arrow-left me-2"></i>
                                Kembali
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-8">
                        {/* Data Pribadi */}
                        <div className="card border-0 rounded-3 shadow-sm mb-4">
                            <div className="card-header bg-primary text-white py-3 rounded-top">
                                <h5 className="mb-0 d-flex align-items-center">
                                    <i className="fas fa-user-circle me-2"></i>
                                    Data Pribadi
                                </h5>
                            </div>
                            <div className="card-body p-4">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold text-muted small">Nama Lengkap</label>
                                            <div className="fs-6">{yatim.name}</div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold text-muted small">NIK</label>
                                            <div className="fs-6">{yatim.nik}</div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold text-muted small">NISN</label>
                                            <div className="fs-6">{yatim.nisn}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold text-muted small">NPSN</label>
                                            <div className="fs-6">{yatim.npsn || "-"}</div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold text-muted small">Jenjang</label>
                                            <div>
                                                <span className="badge bg-primary">{yatim.jenjang}</span>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold text-muted small">Umur</label>
                                            <div>
                                                <span className="badge bg-success">
                                                    {calculateAge(yatim.tanggal_lahir)} Tahun
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold text-muted small">Asal Sekolah</label>
                                            <div className="fs-6">{yatim.asal_sekolah}</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold text-muted small">Tempat, Tanggal Lahir</label>
                                            <div className="fs-6">{yatim.tempat_lahir}, {formatDate(yatim.tanggal_lahir)}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-0">
                                    <label className="form-label fw-semibold text-muted small">Alamat Lengkap</label>
                                    <div className="fs-6">{yatim.alamat}</div>
                                </div>
                            </div>
                        </div>

                        {/* Data User */}
                        {yatim.user && (
                            <div className="card border-0 rounded-3 shadow-sm mb-4">
                                <div className="card-header bg-secondary text-white py-3 rounded-top">
                                    <h5 className="mb-0 d-flex align-items-center">
                                        <i className="fas fa-user me-2"></i>
                                        Data User (Pendaftar)
                                    </h5>
                                </div>
                                <div className="card-body p-4">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold text-muted small">Nama User</label>
                                                <div className="fs-6">{yatim.user.name}</div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold text-muted small">NIK User</label>
                                                <div className="fs-6">{yatim.user.nik}</div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold text-muted small">Email</label>
                                                <div className="fs-6">{yatim.user.email}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold text-muted small">No. HP</label>
                                                <div className="fs-6">{yatim.user.nohp}</div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold text-muted small">Jenis Kelamin</label>
                                                <div className="fs-6">{yatim.user.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold text-muted small">Status</label>
                                                <div>
                                                    <span className={`badge ${yatim.user.status === 1 ? 'bg-success' : 'bg-warning'}`}>
                                                        {yatim.user.status === 1 ? 'Aktif' : 'Tidak Aktif'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold text-muted small">Alamat</label>
                                                <div className="fs-6">{yatim.user.alamat}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold text-muted small">RT/RW</label>
                                                <div className="fs-6">{yatim.user.rt}/{yatim.user.rw}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-0">
                                                <label className="form-label fw-semibold text-muted small">Kode Pos</label>
                                                <div className="fs-6">{yatim.user.codepos}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-0">
                                                <label className="form-label fw-semibold text-muted small">Tanggal Daftar</label>
                                                <div className="fs-6">{formatDate(yatim.user.created_at)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="col-lg-4">
                        {/* Dokumen Pendukung */}
                        <div className="card border-0 rounded-3 shadow-sm mb-4">
                            <div className="card-header bg-warning text-dark py-3 rounded-top">
                                <h5 className="mb-0 d-flex align-items-center">
                                    <i className="fas fa-file-alt me-2"></i>
                                    Dokumen Pendukung
                                </h5>
                            </div>
                            <div className="card-body p-3">
                                <div className="d-grid gap-2">
                                    <button
                                        className="btn btn-outline-primary text-start d-flex justify-content-between align-items-center"
                                        onClick={() => openDocument(yatim.imageskartukeluarga, "Kartu Keluarga")}
                                    >
                                        <span>
                                            <i className="fas fa-id-card me-2"></i>
                                            Kartu Keluarga
                                        </span>
                                        <i className="fas fa-external-link-alt"></i>
                                    </button>

                                    <button
                                        className="btn btn-outline-primary text-start d-flex justify-content-between align-items-center"
                                        onClick={() => openDocument(yatim.imagesktpwali, "KTP Wali")}
                                    >
                                        <span>
                                            <i className="fas fa-address-card me-2"></i>
                                            KTP Wali
                                        </span>
                                        <i className="fas fa-external-link-alt"></i>
                                    </button>

                                    <button
                                        className="btn btn-outline-primary text-start d-flex justify-content-between align-items-center"
                                        onClick={() => openDocument(yatim.imagesketerangansiswaaktif, "Keterangan Siswa Aktif")}
                                    >
                                        <span>
                                            <i className="fas fa-school me-2"></i>
                                            Keterangan Siswa Aktif
                                        </span>
                                        <i className="fas fa-external-link-alt"></i>
                                    </button>

                                    <button
                                        className="btn btn-outline-primary text-start d-flex justify-content-between align-items-center"
                                        onClick={() => openDocument(yatim.imagessuratkematian, "Surat Kematian")}
                                    >
                                        <span>
                                            <i className="fas fa-file-medical me-2"></i>
                                            Surat Kematian
                                        </span>
                                        <i className="fas fa-external-link-alt"></i>
                                    </button>

                                    <button
                                        className="btn btn-outline-primary text-start d-flex justify-content-between align-items-center"
                                        onClick={() => openDocument(yatim.imagessurattidakmenerimabeasiswa, "Surat Tidak Menerima Beasiswa")}
                                    >
                                        <span>
                                            <i className="fas fa-file-contract me-2"></i>
                                            Surat Tidak Menerima Beasiswa
                                        </span>
                                        <i className="fas fa-external-link-alt"></i>
                                    </button>

                                    <button
                                        className="btn btn-outline-primary text-start d-flex justify-content-between align-items-center"
                                        onClick={() => openDocument(yatim.imagesuratsktm, "Surat SKTM")}
                                    >
                                        <span>
                                            <i className="fas fa-file-invoice me-2"></i>
                                            Surat SKTM
                                        </span>
                                        <i className="fas fa-external-link-alt"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Informasi Tambahan */}
                        <div className="card border-0 rounded-3 shadow-sm">
                            <div className="card-header bg-light py-3 rounded-top">
                                <h5 className="mb-0 d-flex align-items-center">
                                    <i className="fas fa-info-circle me-2"></i>
                                    Informasi Tambahan
                                </h5>
                            </div>
                            <div className="card-body p-3">
                                <div className="mb-3">
                                    <label className="form-label fw-semibold text-muted small">Dibuat Pada</label>
                                    <div className="fs-6">{formatDate(yatim.created_at)}</div>
                                </div>
                                <div className="mb-0">
                                    <label className="form-label fw-semibold text-muted small">Diupdate Pada</label>
                                    <div className="fs-6">{formatDate(yatim.updated_at)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal untuk menampilkan dokumen */}
            {activeDoc && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-xl modal-dialog-centered">
                        <div className="modal-content rounded-3 shadow">
                            <div className="modal-header">
                                <h5 className="modal-title">{activeDoc.name}</h5>
                                <button type="button" className="btn-close" onClick={closeDocument}></button>
                            </div>
                            <div className="modal-body p-0" style={{ minHeight: '70vh' }}>
                                <iframe
                                    src={activeDoc.url}
                                    title={activeDoc.name}
                                    className="w-100 h-100 border-0"
                                    style={{ minHeight: '70vh' }}
                                ></iframe>
                            </div>
                            <div className="modal-footer">
                                <a
                                    href={activeDoc.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                >
                                    <i className="fas fa-external-link-alt me-2"></i>
                                    Buka di Tab Baru
                                </a>
                                <button type="button" className="btn btn-secondary" onClick={closeDocument}>
                                    <i className="fas fa-times me-2"></i>
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