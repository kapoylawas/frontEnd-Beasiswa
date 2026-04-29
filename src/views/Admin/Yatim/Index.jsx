import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
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
  const [pendaftaranDitutup, setPendaftaranDitutup] = useState(true); // Default true untuk ditutup
  
  // State untuk modal upload buku tabungan
  const [showTabunganModal, setShowTabunganModal] = useState(false);
  const [selectedYatim, setSelectedYatim] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [tabunganData, setTabunganData] = useState({
    yatim_id: "",
    buku_tabungan: null,
    spjmt: null,
    no_rekening: "",
    nik_ortu: "",
    nama_ortu: ""
  });
  const [tabunganErrors, setTabunganErrors] = useState({});
  
  // State untuk modal lihat data tabungan
  const [showViewTabunganModal, setShowViewTabunganModal] = useState(false);
  const [viewTabunganData, setViewTabunganData] = useState(null);
  const [loadingTabungan, setLoadingTabungan] = useState(false);
  
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
    imagesuratsktm: null,
  });

  // Get user data from cookies
  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        const user = JSON.parse(userCookie);
        setUserData(user);
        setUserId(user.id);
        setFormData((prev) => ({
          ...prev,
          user_id: user.id,
          npsn: user.nik || "", // Set NPSN dari user.nik
          asal_sekolah: user.name || "", // Set Asal Sekolah dari user.name
        }));
      } catch (error) {
        console.error("Error parsing user cookie:", error);
        toast.error("Gagal memuat data user");
      }
    }
  }, []);

  const fetchYatim = useCallback(
    async (page = 1) => {
      if (!userId) {
        return;
      }

      setLoading(true);
      try {
        const response = await Api.get(
          `/api/admin/yatim-byidsekolah/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );

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
          if (
            (response.data.message &&
              response.data.message.includes("tidak ditemukan")) ||
            (response.data.message && response.data.message.includes("kosong"))
          ) {
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
        if (
          error.response?.status === 404 ||
          error.response?.data?.message?.includes("tidak ditemukan") ||
          error.response?.data?.message?.includes("kosong")
        ) {
          // Data kosong, tidak perlu show error
          setYatim([]);
          setTotal(0);
        } else {
          toast.error("Terjadi kesalahan saat mengambil data");
        }
      } finally {
        setLoading(false);
      }
    },
    [userId]
  );

  useEffect(() => {
    if (userId) {
      fetchYatim();
    }
  }, [fetchYatim, userId]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi jika pendaftaran ditutup
    if (pendaftaranDitutup) {
      toast.error("Pendaftaran sudah ditutup. Tidak dapat menambah data baru.");
      return;
    }

    // Validasi user_id
    if (!formData.user_id) {
      toast.error("User ID tidak ditemukan. Silakan login ulang.");
      return;
    }

    setSubmitting(true);

    try {
      const formDataToSend = new FormData();

      // Append all form data to FormData object
      Object.keys(formData).forEach((key) => {
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
          imagesuratsktm: null,
        });

        setShowForm(false);

        // Refresh data setelah menambah data baru
        fetchYatim();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.message || "Terjadi kesalahan saat menyimpan data"
        );
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
      title: "Apakah Anda yakin?",
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
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
      reverseButtons: true,
      customClass: {
        popup: "sweet-alert-custom",
        confirmButton: "btn btn-danger mx-1",
        cancelButton: "btn btn-secondary mx-1",
        actions: "swal2-actions-custom",
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
            throw new Error(response.data.message || "Gagal menghapus data");
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
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (result.isConfirmed) {
      // Refresh data setelah berhasil menghapus
      fetchYatim();

      Swal.fire({
        title: "Terhapus!",
        text: "Data yatim telah berhasil dihapus.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "btn btn-success",
        },
        buttonsStyling: false,
      });
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

  // Fungsi untuk menghitung umur berdasarkan tanggal lahir
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  // Fungsi untuk mendapatkan badge status
  const getStatusBadge = (status) => {
    switch (status) {
      case "verif":
        return <span className="badge bg-success">Terverifikasi</span>;
      case "ditolak":
        return <span className="badge bg-danger">Ditolak</span>;
      default:
        return <span className="badge bg-warning">Belum Diverifikasi</span>;
    }
  };

  // Fungsi untuk mendapatkan badge status keterimaan
  const getStatusKetrimaBadge = (status) => {
    if (status === "1" || status === 1) {
      return (
        <span className="badge bg-success">
          <i className="fa fa-check-circle me-1"></i>
          Diterima
        </span>
      );
    }
    return (
      <span className="badge bg-secondary">
        <i className="fa fa-minus-circle me-1"></i>
        Belum
      </span>
    );
  };

  // Handler untuk membuka modal upload buku tabungan
  const handleOpenTabunganModal = (item) => {
    setSelectedYatim(item);
    setTabunganData({
      yatim_id: item.id,
      buku_tabungan: null,
      spjmt: null,
      no_rekening: item.no_rekening || "",
      nik_ortu: item.nik_ortu || "",
      nama_ortu: item.nama_ortu || ""
    });
    setTabunganErrors({});
    setShowTabunganModal(true);
  };

  // Handler untuk menutup modal
  const handleCloseTabunganModal = () => {
    // Close modal first - keep selectedYatim until unmounted
    setShowTabunganModal(false);
    
    // Reset other state after modal unmounts
    setTimeout(() => {
      setSelectedYatim(null);
      setTabunganData({
        yatim_id: "",
        buku_tabungan: null,
        spjmt: null,
        no_rekening: "",
        nik_ortu: "",
        nama_ortu: ""
      });
      setTabunganErrors({});
    }, 300);
  };

  // Handler input change untuk form tabungan
  const handleTabunganInputChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'nik_ortu') {
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue.length <= 16) {
        setTabunganData(prev => ({
          ...prev,
          [name]: numericValue
        }));
      }
    } else if (name === 'no_rekening') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setTabunganData(prev => ({
        ...prev,
        [name]: numericValue
      }));
    } else if (files && files[0]) {
      setTabunganData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setTabunganData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error saat user input
    if (tabunganErrors[name]) {
      setTabunganErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Handler submit form tabungan
  const handleSubmitTabungan = async (e) => {
    e.preventDefault();
    setUploading(true);
    setTabunganErrors({});

    try {
      const formDataToSend = new FormData();
      
      // Append file imageketrima (buku tabungan)
      if (tabunganData.buku_tabungan) {
        formDataToSend.append('imageketrima', tabunganData.buku_tabungan);
      }
      
      // Append file imagespjmt (surat SPJMT)
      if (tabunganData.spjmt) {
        formDataToSend.append('imagespjmt', tabunganData.spjmt);
      }
      
      // Append other fields
      formDataToSend.append('nik_ortu', tabunganData.nik_ortu);
      formDataToSend.append('nama_ortu', tabunganData.nama_ortu);
      formDataToSend.append('no_rekening', tabunganData.no_rekening);

      // Use yatim ID in the URL
      const response = await Api.post(
        `/api/admin/yatim/${tabunganData.yatim_id}/upload-imageketrima`, 
        formDataToSend, 
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        // Step 1: Show toast notification (non-blocking)
        toast.success(response.data.message || 'Data buku tabungan berhasil disimpan!', {
          duration: 3000,
          position: 'top-right',
          style: {
            background: '#10b981',
            color: '#fff',
            fontWeight: '500',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#10b981',
          },
        });
        
        // Step 2: Close modal ONLY (keep selectedYatim until modal is unmounted)
        setShowTabunganModal(false);
        setUploading(false);
        
        // Step 3: After modal unmounts, reset state and refresh data
        setTimeout(() => {
          setSelectedYatim(null);
          setTabunganData({
            yatim_id: "",
            buku_tabungan: null,
            spjmt: null,
            no_rekening: "",
            nik_ortu: "",
            nama_ortu: ""
          });
          setTabunganErrors({});
          fetchYatim();
        }, 800);
        return;
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setTabunganErrors(error.response.data.errors || {});
        toast.error('Validasi gagal, periksa form kembali', {
          duration: 4000,
          position: 'top-right',
        });
      } else {
        toast.error(error.response?.data?.message || 'Gagal menyimpan data', {
          duration: 4000,
          position: 'top-right',
        });
      }
    } finally {
      setUploading(false);
    }
  };

  // Fungsi untuk mendapatkan class berdasarkan status
  const getStatusClass = (status) => {
    switch (status) {
      case "verif":
        return "table-success";
      case "ditolak":
        return "table-danger";
      default:
        return "";
    }
  };

  const handleViewDetail = (id) => {
    navigate(`/admin/adminYatim/${id}`);
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
        // Valid file should have extension like .pdf, .jpg, .png, etc.
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

  // Karena endpoint baru tidak support pagination, selalu return false
  const shouldShowPagination = false;

  return (
    <LayoutAdmin>
      <div className="container-fluid mb-5 mt-5 notranslate" translate="no">
        <div className="row">
          <div className="col-md-12">
            {/* Form Tambah Data Yatim */}
            <div className="card border-0 rounded shadow-sm mb-4">
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <h5 className="mb-0">Tambah Data Yatim</h5>
                  {pendaftaranDitutup && (
                    <span className="badge bg-danger ms-3">
                      <i className="fa fa-lock me-1"></i>
                      Pendaftaran Ditutup
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  className="btn btn-light btn-sm"
                  onClick={() => {
                    if (pendaftaranDitutup) {
                      toast.error("Pendaftaran sudah ditutup");
                      return;
                    }
                    setShowForm(!showForm);
                  }}
                  disabled={pendaftaranDitutup}
                >
                  {showForm ? "Sembunyikan" : "Tampilkan"} Form
                </button>
              </div>

              {showForm && (
                <div className="card-body">
                  {/* Notifikasi Pendaftaran Ditutup */}
                  {pendaftaranDitutup && (
                    <div className="alert alert-danger alert-dismissible fade show mb-4" role="alert">
                      <div className="d-flex align-items-center">
                        <i className="fa fa-exclamation-triangle fa-2x me-3"></i>
                        <div>
                          <h5 className="alert-heading mb-1">PENDAFTARAN SUDAH DITUTUP</h5>
                          <p className="mb-0">
                            Masa pendaftaran beasiswa yatim telah berakhir. Anda tidak dapat menambah data baru.
                          </p>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        className="btn-close" 
                        onClick={() => setShowForm(false)}
                      ></button>
                    </div>
                  )}

                  {/* Info User dan Template Dokumen */}
                  {userData && (
                    <div className="mb-4">
                      <div className="alert alert-info d-flex justify-content-between align-items-center flex-wrap">
                        <div>
                          <strong>Info User:</strong> {userData.name} (NPSN:{" "}
                          {userData.nik})
                        </div>
                        <a
                          href="https://drive.google.com/drive/folders/1vJnPzpA_YEO5JCDawNuoEFwUGFloJ51u"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-success btn-sm"
                        >
                          <i className="fa fa-download me-1"></i>
                          Download Template Dokumen
                        </a>
                      </div>

                      {/* Informasi Detail Template Dokumen - TAMPIL LANGSUNG */}
                      <div className="template-info-section">
                        <div className="card border-0 shadow-sm">
                          <div className="card-header bg-warning text-dark">
                            <h6 className="mb-0">
                              <i className="fa fa-info-circle me-2"></i>
                              INFORMASI DOKUMEN YANG DIPERLUKAN
                            </h6>
                          </div>
                          <div className="card-body p-3">
                            <div className="row g-3">
                              {/* Kartu Keluarga */}
                              <div className="col-md-6">
                                <div className="d-flex align-items-start p-3 border rounded bg-light-blue">
                                  <div className="doc-icon me-3">
                                    <i className="fa fa-file-pdf text-danger fa-2x"></i>
                                  </div>
                                  <div className="doc-info flex-grow-1">
                                    <h6 className="text-primary mb-1">Kartu Keluarga</h6>
                                    <p className="small text-muted mb-1">
                                      Scan/foto kartu keluarga yang masih berlaku
                                    </p>
                                    <span className="badge bg-primary">Wajib</span>
                                  </div>
                                </div>
                              </div>

                              {/* Keterangan Siswa Aktif */}
                              <div className="col-md-6">
                                <div className="d-flex align-items-start p-3 border rounded bg-light-green">
                                  <div className="doc-icon me-3">
                                    <i className="fa fa-file-pdf text-success fa-2x"></i>
                                  </div>
                                  <div className="doc-info flex-grow-1">
                                    <h6 className="text-primary mb-1">Keterangan Siswa Aktif</h6>
                                    <p className="small text-muted mb-1">
                                      Surat dari sekolah yang menyatakan siswa masih aktif
                                    </p>
                                    <span className="badge bg-primary">Wajib</span>
                                  </div>
                                </div>
                              </div>

                              {/* Surat Kematian */}
                              <div className="col-md-6">
                                <div className="d-flex align-items-start p-3 border rounded bg-light-purple">
                                  <div className="doc-icon me-3">
                                    <i className="fa fa-file-pdf text-warning fa-2x"></i>
                                  </div>
                                  <div className="doc-info flex-grow-1">
                                    <h6 className="text-primary mb-1">Surat Kematian</h6>
                                    <p className="small text-muted mb-1">
                                      Surat kematian orang tua dari kelurahan
                                    </p>
                                    <span className="badge bg-primary">Wajib</span>
                                  </div>
                                </div>
                              </div>

                              {/* Surat Tidak Menerima Beasiswa */}
                              <div className="col-md-6">
                                <div className="d-flex align-items-start p-3 border rounded bg-light-orange">
                                  <div className="doc-icon me-3">
                                    <i className="fa fa-file-pdf text-info fa-2x"></i>
                                  </div>
                                  <div className="doc-info flex-grow-1">
                                    <h6 className="text-primary mb-1">Surat Tidak Menerima Beasiswa</h6>
                                    <p className="small text-muted mb-1">
                                      Surat pernyataan tidak menerima beasiswa dari sumber lain
                                    </p>
                                    <span className="badge bg-primary">Wajib</span>
                                  </div>
                                </div>
                              </div>

                              {/* Surat SKTM */}
                              <div className="col-md-6">
                                <div className="d-flex align-items-start p-3 border rounded bg-light-pink">
                                  <div className="doc-icon me-3">
                                    <i className="fa fa-file-pdf text-danger fa-2x"></i>
                                  </div>
                                  <div className="doc-info flex-grow-1">
                                    <h6 className="text-primary mb-1">Surat SKTM</h6>
                                    <p className="small text-muted mb-1">
                                      Surat Keterangan Tidak Mampu dari kelurahan
                                    </p>
                                    <span className="badge bg-primary">Wajib</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Informasi Format File */}
                            <div className="alert alert-danger mt-3 mb-0 p-2 small">
                              <div className="d-flex align-items-center">
                                <i className="fa fa-exclamation-triangle me-2"></i>
                                <div>
                                  <strong>PERHATIAN:</strong> Semua dokumen harus dalam format 
                                  <span className="badge bg-dark mx-1">PDF</span> 
                                  dengan ukuran maksimal 
                                  <span className="badge bg-dark mx-1">5MB</span> 
                                  per file. Pastikan dokumen jelas terbaca.
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {!userId && (
                    <div className="alert alert-warning">
                      User ID tidak ditemukan. Silakan login ulang.
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    {/* Overlay dan pesan jika pendaftaran ditutup */}
                    {pendaftaranDitutup && (
                      <div className="position-relative">
                        <div className="form-overlay position-absolute top-0 start-0 w-100 h-100 bg-light bg-opacity-75 d-flex align-items-center justify-content-center z-3">
                          <div className="text-center p-4 bg-white rounded shadow">
                            <i className="fa fa-lock fa-3x text-danger mb-3"></i>
                            <h5 className="text-danger mb-2">PENDAFTARAN DITUTUP</h5>
                            <p className="text-muted mb-0">
                              Masa pendaftaran telah berakhir. Formulir tidak dapat diisi.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

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
                            disabled={pendaftaranDitutup}
                          />
                          <div className="form-text text-muted">
                            16 digit Nomor Induk Kependudukan
                          </div>
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
                            disabled={pendaftaranDitutup}
                          />
                          <div className="form-text text-muted">
                           Nomor Pokok Sekolah Nasional
                          </div>
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
                            style={{ backgroundColor: "#f8f9fa" }}
                            disabled={pendaftaranDitutup}
                          />
                          <div className="form-text text-muted">
                            Nomor Pokok Sekolah Nasional (otomatis terisi)
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Jenjang *</label>
                          <select
                            className="form-select"
                            name="jenjang"
                            value={formData.jenjang}
                            onChange={handleInputChange}
                            required
                            disabled={pendaftaranDitutup}
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
                            disabled={pendaftaranDitutup}
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
                            style={{ backgroundColor: "#f8f9fa" }}
                            required
                            disabled={pendaftaranDitutup}
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
                            disabled={pendaftaranDitutup}
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
                            disabled={pendaftaranDitutup}
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
                            disabled={pendaftaranDitutup}
                          />
                        </div>
                      </div>
                    </div>

                    {/* File Uploads */}
                    <div className="row mt-4">
                      <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="text-primary mb-0">
                            <i className="fa fa-upload me-2"></i>
                            Upload Dokumen
                          </h5>
                          <span className="badge bg-danger">* Wajib Diisi</span>
                        </div>
                        <p className="text-muted mb-4">
                          Upload semua dokumen dalam format PDF (maksimal 5MB per file)
                        </p>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-bold">
                            Kartu Keluarga <span className="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            name="imageskartukeluarga"
                            onChange={handleInputChange}
                            accept=".pdf"
                            required
                            disabled={pendaftaranDitutup}
                          />
                          <div className="form-text text-muted">
                            <i className="fa fa-info-circle me-1"></i>
                            Scan/foto kartu keluarga yang masih berlaku
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label fw-bold">
                            Keterangan Siswa Aktif <span className="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            name="imagesketerangansiswaaktif"
                            onChange={handleInputChange}
                            accept=".pdf"
                            required
                            disabled={pendaftaranDitutup}
                          />
                          <div className="form-text text-muted">
                            <i className="fa fa-info-circle me-1"></i>
                            Surat dari sekolah yang menyatakan siswa masih aktif
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label fw-bold">
                            Surat Kematian <span className="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            name="imagessuratkematian"
                            onChange={handleInputChange}
                            accept=".pdf"
                            required
                            disabled={pendaftaranDitutup}
                          />
                          <div className="form-text text-muted">
                            <i className="fa fa-info-circle me-1"></i>
                            Surat kematian orang tua dari kelurahan
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label fw-bold">
                            Surat Tidak Menerima Beasiswa <span className="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            name="imagessurattidakmenerimabeasiswa"
                            onChange={handleInputChange}
                            accept=".pdf"
                            required
                            disabled={pendaftaranDitutup}
                          />
                          <div className="form-text text-muted">
                            <i className="fa fa-info-circle me-1"></i>
                            Surat pernyataan tidak menerima beasiswa dari sumber lain
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label fw-bold">
                            Surat SKTM <span className="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            name="imagesuratsktm"
                            onChange={handleInputChange}
                            accept=".pdf"
                            required
                            disabled={pendaftaranDitutup}
                          />
                          <div className="form-text text-muted">
                            <i className="fa fa-info-circle me-1"></i>
                            Surat Keterangan Tidak Mampu dari kelurahan
                          </div>
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
                        disabled={submitting || !userId || pendaftaranDitutup}
                      >
                        {submitting ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                            ></span>
                            Menyimpan...
                          </>
                        ) : (
                          "Simpan Data"
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
                        <div
                          className="status-indicator bg-success me-2"
                          style={{
                            width: "15px",
                            height: "15px",
                            borderRadius: "3px",
                          }}
                        ></div>
                        <small>Terverifikasi</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <div
                          className="status-indicator bg-danger me-2"
                          style={{
                            width: "15px",
                            height: "15px",
                            borderRadius: "3px",
                          }}
                        ></div>
                        <small>Ditolak</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <div
                          className="status-indicator bg-warning me-2"
                          style={{
                            width: "15px",
                            height: "15px",
                            borderRadius: "3px",
                          }}
                        ></div>
                        <small>Belum Diverifikasi</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <div
                          className="status-indicator bg-success me-2"
                          style={{
                            width: "15px",
                            height: "15px",
                            borderRadius: "50%",
                          }}
                        ></div>
                        <small><strong>Diterima Beasiswa</strong></small>
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
                            <th scope="col">Alasan Verif KK</th>
                            <th scope="col">Status Verifikasi</th>
                            <th scope="col">Verifikasi KK</th>
                            <th scope="col">Status Beasiswa</th>
                            <th scope="col">Status Upload</th>
                            <th scope="col" width="130">Upload Tabungan</th>
                            <th scope="col" width="150">
                              Aksi
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {yatim && yatim.length > 0 ? (
                            yatim.map((item, index) => (
                              <tr
                                key={item.id}
                                className={getStatusClass(item.status_data)}
                              >
                                <td>{index + 1}</td>
                                <td>{getStatusBadge(item.status_data)}</td>
                                <td>{item.name}</td>
                                <td>{item.nik}</td>
                                <td>{item.nisn}</td>
                                <td>
                                  <span className="badge bg-info">
                                    {item.jenjang}
                                  </span>
                                </td>
                                <td>{item.asal_sekolah}</td>
                                <td>
                                  {item.alasan_verif ? (
                                    <div
                                      className="text-truncate"
                                      style={{ maxWidth: "200px" }}
                                      title={item.alasan_verif}
                                    >
                                      {item.alasan_verif}
                                    </div>
                                  ) : (
                                    <span className="text-muted">-</span>
                                  )}
                                </td>
                                <td>
                                  {item.alasan_kk ? (
                                    <div
                                      className="text-truncate"
                                      style={{ maxWidth: "200px" }}
                                      title={item.alasan_kk}
                                    >
                                      {item.alasan_kk}
                                    </div>
                                  ) : (
                                    <span className="text-muted">-</span>
                                  )}
                                </td>
                                <td>
                                  {item.status_data === 'ditolak' ? (
                                    <span className="badge bg-danger">Ditolak</span>
                                  ) : item.status_data === 'verif' ? (
                                    <span className="badge bg-success">Terverifikasi</span>
                                  ) : (
                                    <span className="badge bg-warning text-dark">{item.status_data || 'Belum'}</span>
                                  )}
                                </td>
                                <td>
                                  {item.verif_kk === 'ditolak' ? (
                                    <span className="badge bg-danger">Ditolak</span>
                                  ) : item.verif_kk === 'verif' ? (
                                    <span className="badge bg-success">Terverifikasi</span>
                                  ) : (
                                    <span className="badge bg-warning text-dark">{item.verif_kk || 'Belum'}</span>
                                  )}
                                </td>
                                <td>
                                  {getStatusKetrimaBadge(item.status_ketrima)}
                                </td>
                                <td className="text-center">
                                  {(() => {
                                    // Check if file actually exists (not just base path)
                                    const hasFile = item.imageketrima && 
                                      (item.imageketrima.match(/\.(pdf|jpg|jpeg|png|gif)$/i) || 
                                       !item.imageketrima.endsWith('/dokumen/yatim'));
                                    
                                    if ((item.status_ketrima === "1" || item.status_ketrima === 1)) {
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
                                  {(item.status_ketrima === "1" || item.status_ketrima === 1) ? (
                                    <div className="d-flex flex-column gap-2">
                                      <button
                                        type="button"
                                        onClick={() => handleViewTabunganData(item)}
                                        className="btn btn-sm btn-info"
                                        title="Lihat Data Tabungan"
                                      >
                                        <span><i className="fa fa-eye me-1"></i>Lihat</span>
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleOpenTabunganModal(item)}
                                        className="btn btn-sm btn-success"
                                        title="Upload Buku Tabungan"
                                      >
                                        <span><i className="fa fa-upload me-1"></i>Upload</span>
                                      </button>
                                    </div>
                                  ) : (
                                    <span className="text-muted small">-</span>
                                  )}
                                </td>
                                <td>
                                  <div className="btn-group-vertical" role="group">
                                    <button
                                      type="button"
                                      onClick={() => handleViewDetail(item.id)}
                                      className="btn btn-sm btn-primary"
                                    >
                                      <span>Detail</span>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="16" className="text-center py-4">
                                <div className="text-muted">
                                  <i className="fa fa-inbox fa-3x mb-3"></i>
                                  <p>Tidak ada data yatim</p>
                                  {pendaftaranDitutup && (
                                    <div className="alert alert-warning mt-2 small">
                                      <i className="fa fa-info-circle me-1"></i>
                                      Pendaftaran sudah ditutup
                                    </div>
                                  )}
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
                          Menampilkan semua data. Pagination tidak tersedia
                          untuk endpoint ini.
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

      {/* Modal Upload Buku Tabungan - menggunakan Portal */}
      {showTabunganModal && selectedYatim && createPortal(
        <div 
          className="modal yatim-modal-portal" 
          tabIndex="-1"
          translate="no"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseTabunganModal();
            }
          }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">
                  <span><i className="fa fa-upload me-2"></i>Upload Buku Tabungan - {selectedYatim?.name || ''}</span>
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={handleCloseTabunganModal}
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={handleSubmitTabungan}>
                <div className="modal-body">
                  {/* Info Penerima */}
                  <div className="alert alert-info mb-3">
                    <div className="row">
                      <div className="col-md-6">
                        <strong>Nama:</strong> {selectedYatim?.name || '-'}
                      </div>
                      <div className="col-md-6">
                        <strong>NIK:</strong> {selectedYatim?.nik || '-'}
                      </div>
                      <div className="col-md-6">
                        <strong>NISN:</strong> {selectedYatim?.nisn || '-'}
                      </div>
                      <div className="col-md-6">
                        <strong>Asal Sekolah:</strong> {selectedYatim?.asal_sekolah || '-'}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    {/* Upload Buku Tabungan */}
                    <div className="col-md-12 mb-3">
                      <label className="form-label fw-bold">
                        File No. Rekening / Buku Tabungan <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        className={`form-control ${tabunganErrors.imageketrima ? 'is-invalid' : ''}`}
                        name="buku_tabungan"
                        onChange={handleTabunganInputChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                        required
                      />
                      {tabunganErrors.imageketrima && (
                        <div className="invalid-feedback">{tabunganErrors.imageketrima[0]}</div>
                      )}
                      <div className="form-text">
                        <i className="fa fa-info-circle me-1"></i>
                        Upload foto/scan buku tabungan atau nomor rekening (PDF/JPG/PNG, max 5MB)
                      </div>
                    </div>

                    {/* Upload Surat SPJMT */}
                    <div className="col-md-12 mb-3">
                      <label className="form-label fw-bold">
                        Surat SPJMT <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        className={`form-control ${tabunganErrors.imagespjmt ? 'is-invalid' : ''}`}
                        name="spjmt"
                        onChange={handleTabunganInputChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                        required
                      />
                      {tabunganErrors.imagespjmt && (
                        <div className="invalid-feedback">{tabunganErrors.imagespjmt[0]}</div>
                      )}
                      <div className="form-text">
                        <i className="fa fa-info-circle me-1"></i>
                        Upload surat SPJMT (Surat Pernyataan_joint) dalam format PDF/JPG/PNG (max 5MB)
                      </div>
                    </div>

                    {/* No Rekening */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">
                        Nomor Rekening <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${tabunganErrors.no_rekening ? 'is-invalid' : ''}`}
                        name="no_rekening"
                        value={tabunganData.no_rekening}
                        onChange={handleTabunganInputChange}
                        placeholder="Masukkan nomor rekening"
                      />
                      {tabunganErrors.no_rekening && (
                        <div className="invalid-feedback">{tabunganErrors.no_rekening[0]}</div>
                      )}
                      <div className="form-text">
                        Nomor rekening bank untuk pencairan beasiswa
                      </div>
                    </div>

                    {/* NIK Orang Tua */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">
                        NIK Orang Tua / Wali <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${tabunganErrors.nik_ortu ? 'is-invalid' : ''}`}
                        name="nik_ortu"
                        value={tabunganData.nik_ortu}
                        onChange={handleTabunganInputChange}
                        placeholder="Masukkan 16 digit NIK"
                        maxLength={16}
                      />
                      {tabunganErrors.nik_ortu && (
                        <div className="invalid-feedback">{tabunganErrors.nik_ortu[0]}</div>
                      )}
                      <div className="form-text">
                        {tabunganData.nik_ortu.length}/16 digit NIK orang tua/wali
                      </div>
                    </div>

                    {/* Nama Orang Tua */}
                    <div className="col-md-12 mb-3">
                      <label className="form-label fw-bold">
                        Nama Orang Tua / Wali <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${tabunganErrors.nama_ortu ? 'is-invalid' : ''}`}
                        name="nama_ortu"
                        value={tabunganData.nama_ortu}
                        onChange={handleTabunganInputChange}
                        placeholder="Masukkan nama lengkap orang tua/wali"
                      />
                      {tabunganErrors.nama_ortu && (
                        <div className="invalid-feedback">{tabunganErrors.nama_ortu[0]}</div>
                      )}
                      <div className="form-text">
                        Nama lengkap sesuai KTP orang tua/wali
                      </div>
                    </div>
                  </div>

                  {/* Warning */}
                  <div className="alert alert-warning mb-0">
                    <i className="fa fa-exclamation-triangle me-2"></i>
                    <strong>Perhatian:</strong> Pastikan data yang diisi sudah benar untuk proses pencairan beasiswa.
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseTabunganModal}>
                    Batal
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-success"
                    disabled={uploading}
                  >
                    <span>
                      {uploading ? 'Menyimpan...' : 'Simpan Data'}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      , document.body)}

      {/* Modal Lihat Data Tabungan - menggunakan Portal */}
      {showViewTabunganModal && viewTabunganData && createPortal(
        <div 
          className="modal yatim-modal-portal" 
          tabIndex="-1"
          translate="no"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseViewTabunganModal();
            }
          }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-info text-white">
                <h5 className="modal-title">
                  <span><i className="fa fa-eye me-2"></i>Data Tabungan - {viewTabunganData?.name || ''}</span>
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={handleCloseViewTabunganModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
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
                        
                        {/* Preview File atau Pesan Belum Upload */}
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
                              File buku tabungan belum diupload. Silakan klik tombol "Upload" untuk mengupload file.
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
                        
                        {/* Preview File SPJMT atau Pesan Belum Upload */}
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
                              Surat SPJMT belum diupload. Silakan klik tombol "Upload" untuk mengupload file.
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
      , document.body)}

      {/* Tambahkan style untuk SweetAlert dan warna dokumen */}
      <style>{`
        /* CSS Isolation untuk mencegah DOM conflict */
        .yatim-modal-portal {
          isolation: isolate;
          contain: layout style;
          z-index: 1055;
        }
        .yatim-modal-portal .modal-dialog {
          z-index: 1056;
        }
        /* Prevent Google Translate & extensions interference */
        .notranslate {
          translate: no;
        }
        .yatim-table-container {
          isolation: isolate;
          contain: layout;
        }
        .sweet-alert-custom {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
            sans-serif;
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
        
        /* Warna background untuk kartu dokumen */
        .bg-light-blue {
          background-color: #e3f2fd !important;
          border-left: 4px solid #2196f3 !important;
        }
        .bg-light-green {
          background-color: #e8f5e8 !important;
          border-left: 4px solid #4caf50 !important;
        }
        .bg-light-purple {
          background-color: #f3e5f5 !important;
          border-left: 4px solid #9c27b0 !important;
        }
        .bg-light-orange {
          background-color: #fff3e0 !important;
          border-left: 4px solid #ff9800 !important;
        }
        .bg-light-pink {
          background-color: #fce4ec !important;
          border-left: 4px solid #e91e63 !important;
        }
        
        .doc-icon {
          flex-shrink: 0;
        }
        
        .doc-info h6 {
          font-size: 0.9rem;
          font-weight: 600;
        }
        
        .template-info-section .card-header {
          border-bottom: 2px solid #ffc107;
        }
        
        .form-overlay {
          z-index: 1050;
        }
        
        .form-overlay > div {
          max-width: 400px;
          border: 2px solid #dc3545;
        }
      `}</style>
    </LayoutAdmin>
  );
}