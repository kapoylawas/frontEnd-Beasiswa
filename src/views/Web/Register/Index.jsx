import { useEffect, useState } from "react";
import LayoutWeb from "../../../layouts/Web";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Api from "../../../services/Api";
import Logo from "../../../../public/images/lock.svg";
import Select from "react-select";

export default function Register() {
  document.title = "Register - Beasiswa Sidoarjo";

  const maintenance = false;

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [nik, setNik] = useState("");
  const [nokk, setNokk] = useState("");
  const [nohp, setNohp] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [codepos, setCodepos] = useState("");
  const [rt, setRt] = useState("");
  const [rw, setRw] = useState("");
  const [alamat, setAlamat] = useState("");
  const [ktp, setKtp] = useState("");
  const [kk, setKk] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [kecamatanList, setKecamatanList] = useState([]);
  const [kelurahanList, setKelurahanList] = useState([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState("");
  const [selectedKelurahan, setSelectedKelurahan] = useState("");
  const [tanggalBatas, setTanggalBatas] = useState();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPersyaratan, setShowPersyaratan] = useState(false);

  // State baru yang ditambahkan
  const [duplicateNik, setDuplicateNik] = useState(false);
  const [duplicateEmail, setDuplicateEmail] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submissionAttempts, setSubmissionAttempts] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [hasError, setHasError] = useState(false); // State untuk error handling

  // Simple error handling dengan useEffect
  useEffect(() => {
    const handleGlobalError = (event) => {
      console.error("Global error caught:", event.error);
      setHasError(true);
      // Mencegah error ditampilkan di console
      event.preventDefault();
    };

    const handleUnhandledRejection = (event) => {
      console.error("Unhandled rejection:", event.reason);
      setHasError(true);
      // Mencegah error ditampilkan di console
      event.preventDefault();
    };

    window.addEventListener("error", handleGlobalError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    // Cek koneksi online/offline
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Browser compatibility check
    if (typeof FileReader === "undefined") {
      toast.error(
        "Browser Anda tidak mendukung fitur upload file. Silakan gunakan browser terbaru.",
        {
          duration: 10000,
        },
      );
    }

    // Cek cookies/localStorage
    try {
      localStorage.setItem("test", "test");
      localStorage.removeItem("test");
    } catch (e) {
      console.warn("LocalStorage mungkin dinonaktifkan");
    }

    return () => {
      window.removeEventListener("error", handleGlobalError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection,
      );
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    Api.get("/api/tanggalBatas", {}).then((response) => {
      setTanggalBatas(response.data.data);
    });
  }, []);

  // get data kecamatan
  useEffect(() => {
    Api.get("/api/kecamatan/all", {}).then((response) => {
      const formattedKecamatan = response.data.data.map((kecamatan) => ({
        value: kecamatan.id,
        label: kecamatan.name,
      }));
      setKecamatanList(formattedKecamatan);
    });
  }, []);

  const handleKecamatanChange = (selectedOption) => {
    setSelectedKecamatan(selectedOption.value);
    setSelectedKelurahan("");
    setErrors((prev) => ({ ...prev, id_kecamatan: null, id_kelurahan: null }));
  };

  const handleKelurahanChange = (selectedOption) => {
    setSelectedKelurahan(selectedOption.value);
    setErrors((prev) => ({ ...prev, id_kelurahan: null }));
  };

  // hook data kelurahan by id kecamatan
  useEffect(() => {
    if (selectedKecamatan) {
      Api.get(`/api/kelurahan/byid?kecamatan_id=${selectedKecamatan}`).then(
        (response) => {
          const formattedKelurahan = response.data.data.map((kelurahan) => ({
            value: kelurahan.id,
            label: kelurahan.name,
          }));
          setKelurahanList(formattedKelurahan);
        },
      );
    }
  }, [selectedKecamatan]);

  // Fungsi bantu baru
  const scrollToFirstError = () => {
    const firstErrorElement = document.querySelector(".error-message");
    if (firstErrorElement) {
      firstErrorElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const determineErrorStep = (errors) => {
    const errorFields = Object.keys(errors);
    if (errorFields.length === 0) return 1;

    const firstError = errorFields[0];
    const stepMap = {
      nik: 1,
      email: 1,
      name: 1,
      nohp: 1,
      gender: 1,
      nokk: 1,
      id_kecamatan: 2,
      id_kelurahan: 2,
      codepos: 2,
      rt: 2,
      rw: 2,
      alamat: 2,
      imagektp: 3,
      imagekk: 3,
      password: 4,
      password_confirmation: 4,
    };

    return stepMap[firstError] || 1;
  };

  const prepareFormData = () => {
    const formData = new FormData();

    const fields = {
      nik,
      nokk,
      name,
      nohp,
      email,
      gender,
      id_kecamatan: selectedKecamatan,
      id_kelurahan: selectedKelurahan,
      codepos,
      rt,
      rw,
      alamat,
      password,
      password_confirmation: passwordConfirmation,
    };

    Object.entries(fields).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        formData.append(key, value);
      }
    });

    if (ktp instanceof File) {
      formData.append("imagektp", ktp);
    }

    if (kk instanceof File) {
      formData.append("imagekk", kk);
    }

    return formData;
  };

  const resetForm = () => {
    setName("");
    setNik("");
    setNokk("");
    setNohp("");
    setEmail("");
    setGender("");
    setCodepos("");
    setRt("");
    setRw("");
    setAlamat("");
    setKtp("");
    setKk("");
    setPassword("");
    setPasswordConfirmation("");
    setSelectedKecamatan("");
    setSelectedKelurahan("");
    setErrors({});
    setDuplicateNik(false);
    setDuplicateEmail(false);
    setCurrentStep(1);
    setUploadProgress(0);
    setSubmissionAttempts(0);
  };

  const logRegistrationAttempt = (success, error = null) => {
    const logData = {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      online: navigator.onLine,
      success,
      step: currentStep,
      error: error
        ? {
            message: error.message,
            type: error.constructor.name,
            status: error.response?.status,
          }
        : null,
      fieldsPresent: {
        name: !!name,
        nik: !!nik,
        email: !!email,
        hasKtp: !!ktp,
        hasKk: !!kk,
      },
    };

    try {
      const logs = JSON.parse(localStorage.getItem("registrationLogs") || "[]");
      logs.unshift(logData);
      if (logs.length > 50) logs.pop();
      localStorage.setItem("registrationLogs", JSON.stringify(logs));
    } catch (e) {
      console.log("Failed to save logs:", e);
    }
  };

  // Fungsi retry dengan exponential backoff
  const retryApiCall = async (apiCall, maxRetries = 2, delay = 1000) => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await apiCall();
      } catch (error) {
        // Hanya retry untuk network/timeout errors, bukan validation errors
        if (
          i === maxRetries - 1 ||
          (error.response && error.response.status !== 500) ||
          (!error.response && !error.request)
        ) {
          throw error;
        }

        // Exponential backoff
        await new Promise((resolve) =>
          setTimeout(resolve, delay * Math.pow(2, i)),
        );

        console.log(`Retry attempt ${i + 1}/${maxRetries}`);
      }
    }
  };

  // Fungsi validasi semua step
  const validateAllSteps = () => {
    const newErrors = {};

    // Step 1 validations
    if (!name.trim()) newErrors.name = ["Nama lengkap tidak boleh kosong"];

    if (!nik.trim()) {
      newErrors.nik = ["NIK tidak boleh kosong"];
    } else if (nik.length !== 16) {
      newErrors.nik = ["NIK harus 16 digit"];
    }

    if (!nokk.trim())
      newErrors.nokk = ["Nomor Kartu Keluarga tidak boleh kosong"];
    else if (nokk.length !== 16) newErrors.nokk = ["Nomor KK harus 16 digit"];

    if (!nohp.trim()) newErrors.nohp = ["Nomor HP/WhatsApp tidak boleh kosong"];
    else if (nohp.length < 10) newErrors.nohp = ["Nomor HP minimal 10 digit"];

    if (!email.trim()) {
      newErrors.email = ["Email tidak boleh kosong"];
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = ["Format email tidak valid"];
    }

    if (!gender) newErrors.gender = ["Pilih jenis kelamin terlebih dahulu"];

    // Step 2 validations
    if (!selectedKecamatan)
      newErrors.id_kecamatan = ["Pilih kecamatan terlebih dahulu"];
    if (!selectedKelurahan)
      newErrors.id_kelurahan = ["Pilih kelurahan terlebih dahulu"];
    if (!codepos.trim()) newErrors.codepos = ["Kode POS tidak boleh kosong"];
    else if (codepos.length !== 5)
      newErrors.codepos = ["Kode POS harus 5 digit"];
    if (!rt.trim()) newErrors.rt = ["RT tidak boleh kosong"];
    if (!rw.trim()) newErrors.rw = ["RW tidak boleh kosong"];
    if (!alamat.trim())
      newErrors.alamat = ["Alamat lengkap tidak boleh kosong"];
    else if (alamat.length < 10)
      newErrors.alamat = ["Alamat terlalu pendek, minimal 10 karakter"];

    // Step 3 validations
    if (!ktp) newErrors.imagektp = ["File KTP harus diupload"];
    if (!kk) newErrors.imagekk = ["File Kartu Keluarga harus diupload"];

    // Step 4 validations
    if (!password) newErrors.password = ["Password tidak boleh kosong"];
    else if (password.length < 8)
      newErrors.password = ["Password minimal 8 karakter"];
    if (!passwordConfirmation)
      newErrors.password_confirmation = [
        "Konfirmasi password tidak boleh kosong",
      ];
    else if (password !== passwordConfirmation)
      newErrors.password_confirmation = ["Konfirmasi password tidak cocok"];

    return newErrors;
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = ["Nama lengkap tidak boleh kosong"];

    if (!nik.trim()) {
      newErrors.nik = ["NIK tidak boleh kosong"];
    } else if (nik.length !== 16) {
      newErrors.nik = ["NIK harus 16 digit"];
    }

    if (!nokk.trim())
      newErrors.nokk = ["Nomor Kartu Keluarga tidak boleh kosong"];
    else if (nokk.length !== 16) newErrors.nokk = ["Nomor KK harus 16 digit"];

    if (!nohp.trim()) newErrors.nohp = ["Nomor HP/WhatsApp tidak boleh kosong"];
    else if (nohp.length < 10) newErrors.nohp = ["Nomor HP minimal 10 digit"];

    if (!email.trim()) {
      newErrors.email = ["Email tidak boleh kosong"];
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = ["Format email tidak valid"];
    }

    if (!gender) newErrors.gender = ["Pilih jenis kelamin terlebih dahulu"];

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!selectedKecamatan)
      newErrors.id_kecamatan = ["Pilih kecamatan terlebih dahulu"];
    if (!selectedKelurahan)
      newErrors.id_kelurahan = ["Pilih kelurahan terlebih dahulu"];
    if (!codepos.trim()) newErrors.codepos = ["Kode POS tidak boleh kosong"];
    else if (codepos.length !== 5)
      newErrors.codepos = ["Kode POS harus 5 digit"];
    if (!rt.trim()) newErrors.rt = ["RT tidak boleh kosong"];
    if (!rw.trim()) newErrors.rw = ["RW tidak boleh kosong"];
    if (!alamat.trim())
      newErrors.alamat = ["Alamat lengkap tidak boleh kosong"];
    else if (alamat.length < 10)
      newErrors.alamat = ["Alamat terlalu pendek, minimal 10 karakter"];

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};

    if (!ktp) newErrors.imagektp = ["File KTP harus diupload"];
    if (!kk) newErrors.imagekk = ["File Kartu Keluarga harus diupload"];

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = () => {
    const newErrors = {};

    if (!password) newErrors.password = ["Password tidak boleh kosong"];
    else if (password.length < 8)
      newErrors.password = ["Password minimal 8 karakter"];
    if (!passwordConfirmation)
      newErrors.password_confirmation = [
        "Konfirmasi password tidak boleh kosong",
      ];
    else if (password !== passwordConfirmation)
      newErrors.password_confirmation = ["Konfirmasi password tidak cocok"];

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    let isValid = false;

    switch (currentStep) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      default:
        isValid = true;
    }

    if (isValid) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
      setErrors({});
    } else {
      setTimeout(scrollToFirstError, 100);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
    setErrors({});
  };

  const handleFileKtp = (e) => {
    const imageData = e.target.files[0];
    setErrors((prev) => ({ ...prev, imagektp: null }));

    if (!imageData) return;

    // Improved PDF validation
    const allowedTypes = [
      "application/pdf",
      "application/x-pdf",
      "application/acrobat",
      "application/vnd.pdf",
      "text/pdf",
      "application/octet-stream",
    ];

    const fileExtension = imageData.name.split(".").pop().toLowerCase();
    const isPDF =
      allowedTypes.includes(imageData.type) || fileExtension === "pdf";

    if (!isPDF) {
      setKtp("");
      toast.error("Format File KTP harus PDF", {
        duration: 5000,
        position: "top-center",
      });
      return;
    }

    const maxSize = 2 * 1024 * 1024;
    if (imageData.size > maxSize) {
      toast.error("Ukuran file melebihi batas (2MB)", {
        duration: 5000,
        position: "top-center",
      });
      return;
    }

    setKtp(imageData);
    toast.success("File KTP berhasil diupload", {
      duration: 3000,
      position: "top-center",
    });
  };

  const handleFileKk = (e) => {
    const imageData = e.target.files[0];
    setErrors((prev) => ({ ...prev, imagekk: null }));

    if (!imageData) return;

    const allowedTypes = [
      "application/pdf",
      "application/x-pdf",
      "application/acrobat",
      "application/vnd.pdf",
      "text/pdf",
      "application/octet-stream",
    ];

    const fileExtension = imageData.name.split(".").pop().toLowerCase();
    const isPDF =
      allowedTypes.includes(imageData.type) || fileExtension === "pdf";

    if (!isPDF) {
      setKk("");
      toast.error("Format File Kartu Keluarga harus PDF", {
        duration: 5000,
        position: "top-center",
      });
      return;
    }

    const maxSize = 2 * 1024 * 1024;
    if (imageData.size > maxSize) {
      toast.error("Ukuran file melebihi batas (2MB)", {
        duration: 5000,
        position: "top-center",
      });
      return;
    }

    setKk(imageData);
    toast.success("File Kartu Keluarga berhasil diupload", {
      duration: 3000,
      position: "top-center",
    });
  };

  const handleChangeNik = (event) => {
    const inputValue = event.target.value.replace(/\D/g, "").slice(0, 16);
    setNik(inputValue);
    setErrors((prev) => ({ ...prev, nik: null }));
    setDuplicateNik(false);
  };

  const handleChangeKartuKeluarga = (event) => {
    const inputValue = event.target.value.replace(/\D/g, "").slice(0, 16);
    setNokk(inputValue);
    setErrors((prev) => ({ ...prev, nokk: null }));
  };

  const handleChangeNoHp = (event) => {
    const inputValue = event.target.value.replace(/\D/g, "");
    setNohp(inputValue);
    setErrors((prev) => ({ ...prev, nohp: null }));
  };

  const handleChangeEmail = (event) => {
    const inputValue = event.target.value;
    setEmail(inputValue);
    setErrors((prev) => ({ ...prev, email: null }));
    setDuplicateEmail(false);
  };

  const handleChangeKodePos = (event) => {
    const inputValue = event.target.value.replace(/\D/g, "");
    setCodepos(inputValue);
    setErrors((prev) => ({ ...prev, codepos: null }));
  };

  const handleChangeRT = (event) => {
    const inputValue = event.target.value.replace(/\D/g, "");
    setRt(inputValue);
    setErrors((prev) => ({ ...prev, rt: null }));
  };

  const handleChangeRW = (event) => {
    const inputValue = event.target.value.replace(/\D/g, "");
    setRw(inputValue);
    setErrors((prev) => ({ ...prev, rw: null }));
  };

  // Improved error handling functions
  const handleApiError = (error) => {
    console.group("API Error Debug");
    console.error("Error type:", error.constructor.name);
    console.error("Error message:", error.message);

    // Network error (no response)
    if (!error.response) {
      if (!isOnline) {
        toast.error("Anda sedang offline. Periksa koneksi internet Anda.", {
          duration: 5000,
          position: "top-center",
        });
        console.groupEnd();
        return;
      }

      if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
        toast.error("Waktu koneksi habis. Silakan coba lagi.", {
          duration: 5000,
          position: "top-center",
        });
        console.groupEnd();
        return;
      }

      toast.error(
        "Gagal terhubung ke server. Silakan coba beberapa saat lagi.",
        {
          duration: 5000,
          position: "top-center",
        },
      );
      console.groupEnd();
      return;
    }

    // Server responded with error
    const { status, data } = error.response;


    console.groupEnd();

    switch (status) {
      case 400:
        toast.error("Permintaan tidak valid. Harap periksa data Anda.", {
          duration: 5000,
        });
        break;

      case 422:
        handleValidationErrors(data.errors || {});
        break;

      case 429:
        toast.error("Terlalu banyak percobaan. Silakan tunggu beberapa saat.", {
          duration: 5000,
        });
        break;

      case 413:
        toast.error("Ukuran file terlalu besar. Maksimal 2MB per file.", {
          duration: 5000,
        });
        break;

      case 500:
      case 502:
      case 503:
      case 504:
        toast.error(
          "Server sedang sibuk. Silakan coba lagi dalam beberapa menit.",
          {
            duration: 5000,
          },
        );
        break;

      default:
        const message = data?.message || `Error ${status}. Silakan coba lagi.`;
        toast.error(message, {
          duration: 5000,
          position: "top-center",
        });
    }
  };

  const handleValidationErrors = (errors) => {
    const newErrors = {};
    let hasDuplicate = false;

    Object.entries(errors).forEach(([field, messages]) => {
      if (Array.isArray(messages)) {
        newErrors[field] = messages;

        if (field === "nik" || field === "email") {
          hasDuplicate = true;
          if (field === "nik") setDuplicateNik(true);
          if (field === "email") setDuplicateEmail(true);

          newErrors[field] = [
            `${field === "nik" ? "NIK" : "Email"} sudah terdaftar. ` +
              `Silakan gunakan ${field === "nik" ? "NIK" : "email"} lain atau login.`,
          ];
        }
      }
    });

    setErrors(newErrors);

    const errorStep = determineErrorStep(newErrors);
    setCurrentStep(errorStep);

    if (hasDuplicate) {
      toast.error("Data duplikasi ditemukan. Silakan periksa NIK/Email Anda.", {
        duration: 5000,
      });
    } else {
      toast.error("Harap perbaiki data yang salah.", {
        duration: 4000,
      });
    }

    setTimeout(scrollToFirstError, 100);
  };

  // Tampilkan fallback UI jika ada error global
  if (hasError) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-header bg-danger text-white">
                <div className="d-flex align-items-center">
                  <i className="fas fa-exclamation-triangle fa-2x me-3"></i>
                  <div>
                    <h4 className="mb-0">Terjadi Kesalahan</h4>
                    <p className="mb-0 opacity-75">
                      Maaf, proses pendaftaran mengalami gangguan
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="card h-100">
                      <div className="card-header bg-light">
                        <h5 className="mb-0">Penyebab mungkin:</h5>
                      </div>
                      <div className="card-body">
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item">
                            <i className="fas fa-wifi text-danger me-2"></i>
                            Koneksi internet tidak stabil
                          </li>
                          <li className="list-group-item">
                            <i className="fas fa-browser text-danger me-2"></i>
                            Browser perlu diperbarui
                          </li>
                          <li className="list-group-item">
                            <i className="fas fa-file-alt text-danger me-2"></i>
                            Data yang dimasukkan tidak valid
                          </li>
                          <li className="list-group-item">
                            <i className="fas fa-server text-danger me-2"></i>
                            Server sedang dalam perawatan
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="card h-100">
                      <div className="card-header bg-light">
                        <h5 className="mb-0">Solusi yang bisa dicoba:</h5>
                      </div>
                      <div className="card-body">
                        <ol className="mb-0">
                          <li className="mb-2">Refresh halaman ini</li>
                          <li className="mb-2">
                            Periksa koneksi internet Anda
                          </li>
                          <li className="mb-2">Clear cache browser</li>
                          <li className="mb-2">Coba gunakan browser lain</li>
                          <li>Hubungi tim support jika masalah berlanjut</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="alert alert-info mt-3">
                  <h5 className="alert-heading">
                    <i className="fas fa-headset me-2"></i>
                    Butuh Bantuan?
                  </h5>
                  <p className="mb-2">Hubungi tim support beasiswa:</p>
                  <div className="row">
                    <div className="col-md-4 mb-2">
                      <div className="d-flex align-items-center">
                        <i className="fas fa-envelope text-primary me-2"></i>
                        <span>beasiswa@sidoarjo.go.id</span>
                      </div>
                    </div>
                    <div className="col-md-4 mb-2">
                      <div className="d-flex align-items-center">
                        <i className="fas fa-phone text-primary me-2"></i>
                        <span>(031) 896-1234</span>
                      </div>
                    </div>
                    <div className="col-md-4 mb-2">
                      <div className="d-flex align-items-center">
                        <i className="fab fa-whatsapp text-success me-2"></i>
                        <span>0812-3456-7890</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-md-4 mb-2">
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => window.location.reload()}
                    >
                      <i className="fas fa-redo me-2"></i>
                      Refresh Halaman
                    </button>
                  </div>
                  <div className="col-md-4 mb-2">
                    <button
                      className="btn btn-outline-secondary w-100"
                      onClick={() => navigate("/")}
                    >
                      <i className="fas fa-home me-2"></i>
                      Kembali ke Beranda
                    </button>
                  </div>
                  <div className="col-md-4 mb-2">
                    <button
                      className="btn btn-warning w-100"
                      onClick={() => {
                        const logs = localStorage.getItem("registrationLogs");
                        const errorData = {
                          timestamp: new Date().toISOString(),
                          userAgent: navigator.userAgent,
                          url: window.location.href,
                          logs: logs ? JSON.parse(logs)[0] : null,
                        };
                        toast.success("Laporan error telah disimpan", {
                          duration: 3000,
                          position: "top-center",
                        });
                      }}
                    >
                      <i className="fas fa-bug me-2"></i>
                      Laporkan Error
                    </button>
                  </div>
                </div>

                <div className="alert alert-warning mt-3 mb-0">
                  <i className="fas fa-lightbulb me-2"></i>
                  <strong>Tips:</strong> Screenshot halaman ini untuk
                  mempermudah troubleshooting
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //function "storeRegister" - IMPROVED VERSION
  const storeRegister = async (e) => {
    e.preventDefault();

    // Cek koneksi internet
    if (!isOnline) {
      toast.error("Anda sedang offline. Periksa koneksi internet Anda.", {
        duration: 5000,
        position: "top-center",
      });
      return;
    }

    // Prevent multiple submissions
    if (isLoading) {
      toast.error("Sedang memproses pendaftaran, harap tunggu...", {
        duration: 3000,
        position: "top-center",
      });
      return;
    }

    // Validasi semua step sebelum submit
    const allErrors = validateAllSteps();

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      const errorStep = determineErrorStep(allErrors);
      setCurrentStep(errorStep);

      toast.error("Harap perbaiki semua data sebelum mendaftar", {
        duration: 4000,
        position: "top-center",
      });

      setTimeout(scrollToFirstError, 100);
      return;
    }

    setLoading(true);
    setSubmissionAttempts((prev) => prev + 1);

    // Log attempt
    logRegistrationAttempt(false, null);

    // Timeout handler
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        toast.warning(
          "Proses memakan waktu lebih lama dari biasanya. Harap tunggu...",
          {
            duration: 5000,
            position: "top-center",
          },
        );
      }
    }, 15000); // 15 detik

    const formData = prepareFormData();

    // Konfigurasi upload
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "X-Requested-With": "XMLHttpRequest",
      },
      timeout: 45000, // 45 detik
      onUploadProgress: (progressEvent) => {
        if (progressEvent.lengthComputable) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadProgress(progress);
        }
      },
    };

    try {
      // Menggunakan retry logic
      const response = await retryApiCall(
        () => Api.post("/api/users", formData, config),
        2, // Maksimal 2 retry
      );

      clearTimeout(timeoutId);
      setLoading(false);
      setUploadProgress(0);

      if (response.data.success) {
        // Log success
        logRegistrationAttempt(true, null);

        toast.success(response.data.message, {
          duration: 4000,
          position: "top-center",
        });

        // Reset form
        resetForm();

        // Navigate setelah delay
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        logRegistrationAttempt(false, { message: response.data.message });
        toast.error(response.data.message || "Gagal mendaftar", {
          duration: 4000,
          position: "top-center",
        });
      }
    } catch (error) {
      clearTimeout(timeoutId);
      setLoading(false);
      setUploadProgress(0);

      console.error("Registration error:", error);

      // Log error
      logRegistrationAttempt(false, error);

      if (submissionAttempts >= 2) {
        toast.info(
          <div>
            <p>
              <strong>Tips jika terus mengalami masalah:</strong>
            </p>
            <ul
              style={{
                marginLeft: "20px",
                textAlign: "left",
                fontSize: "0.9rem",
              }}
            >
              <li>Gunakan koneksi internet stabil</li>
              <li>Pastikan ukuran file maksimal 2MB</li>
              <li>Format file harus PDF</li>
              <li>Coba refresh halaman</li>
              <li>Hubungi admin jika masalah berlanjut</li>
            </ul>
          </div>,
          {
            duration: 10000,
            position: "top-center",
          },
        );
      }

      handleApiError(error);
    }
  };

  // Custom styles untuk react-select
  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      border: `2px solid ${errors.id_kecamatan || errors.id_kelurahan ? "#dc2626" : "#e2e8f0"}`,
      borderRadius: "10px",
      padding: "4px 8px",
      boxShadow: "none",
      "&:hover": {
        borderColor:
          errors.id_kecamatan || errors.id_kelurahan ? "#dc2626" : "#3b82f6",
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#1e3c72"
        : state.isFocused
          ? "#f1f5f9"
          : "white",
      color: state.isSelected ? "white" : "#1f2937",
    }),
  };

  return (
    <LayoutWeb>
      <div className="register-container">
        <div className="register-hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-logo">
                <img
                  src="/images/sidoarjo.png"
                  alt="Logo Sidoarjo"
                  className="logo-image"
                  onError={(e) => {
                    e.target.src = "/sidoarjo.png";
                    e.target.onerror = () => {
                      e.target.src =
                        "https://via.placeholder.com/100x100?text=Logo+Sidoarjo";
                    };
                  }}
                />
              </div>
              <h1 className="hero-title">Pendaftaran Beasiswa</h1>
              <p className="hero-subtitle">
                Daftarkan diri Anda untuk menjadi penerima beasiswa
                <span className="highlight"> Kabupaten Sidoarjo 2026</span>
              </p>
              <div className="hero-divider"></div>
            </div>
          </div>
        </div>

        <div className="container main-container mt-5 mb-5">
          {maintenance ? (
            <div className="maintenance-section">
              <div className="maintenance-card">
                <div className="maintenance-icon">
                  <i className="fas fa-tools"></i>
                </div>
                <h2>Pendaftaran Sudah Ditutup</h2>
                <p>
                  Masa pendaftaran beasiswa telah berakhir. Terima kasih atas
                  minat Anda.
                </p>
                <div className="maintenance-image">
                  <img src={Logo} alt="Maintenance" />
                </div>
              </div>
            </div>
          ) : (
            <div className="register-section">
              {/* Online/Offline Indicator */}
              {!isOnline && (
                <div className="offline-indicator">
                  <i className="fas fa-wifi-slash"></i>
                  <span>
                    Anda sedang offline. Periksa koneksi internet Anda.
                  </span>
                </div>
              )}

              {/* Progress Steps */}
              <div className="progress-steps">
                <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
                  <div className="step-number">1</div>
                  <div className="step-label">Data Pribadi</div>
                </div>
                <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
                  <div className="step-number">2</div>
                  <div className="step-label">Alamat</div>
                </div>
                <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
                  <div className="step-number">3</div>
                  <div className="step-label">Dokumen</div>
                </div>
                <div className={`step ${currentStep >= 4 ? "active" : ""}`}>
                  <div className="step-number">4</div>
                  <div className="step-label">Akun</div>
                </div>
              </div>

              <div className="register-card">
                <div className="card-header">
                  <i className="fas fa-user-plus"></i>
                  <h2>Formulir Pendaftaran</h2>
                </div>

                {/* Alert Informasi Beasiswa */}
                <div className="alert-beasiswa">
                  <div className="alert-header">
                    <i className="fas fa-info-circle"></i>
                    <h3>Informasi Pendaftaran Beasiswa</h3>
                  </div>
                  <div className="alert-content">
                    <div className="alert-item">
                      <div className="alert-icon">
                        <i className="fas fa-medal"></i>
                      </div>
                      <div className="alert-text">
                        <h4>Beasiswa Prestasi</h4>
                        <p>
                          Untuk mahasiswa berprestasi akademik dan
                          non-akademik{" "}
                        </p>
                      </div>
                    </div>

                    <div className="alert-item">
                      <div className="alert-icon">
                        <i className="fas fa-hand-holding-heart"></i>
                      </div>
                      <div className="alert-text">
                        <h4>Beasiswa Kurang Mampu</h4>
                        <p>Untuk mahasiswa dari kurang mampu</p>
                      </div>
                    </div>

                    <div className="alert-item">
                      <div className="alert-icon">
                        <i className="fas fa-mosque"></i>
                      </div>
                      <div className="alert-text">
                        <h4>Beasiswa Keagamaan</h4>
                        <p>
                          Untuk mahasiswa aktif berorganisasi keagamaan dengan
                          rekomendasi dari lembaga terkait
                        </p>
                      </div>
                    </div>

                    <div className="alert-item important">
                      <div className="alert-icon">
                        <i className="fas fa-exclamation-triangle"></i>
                      </div>
                      <div className="alert-text">
                        <h4>Catatan Penting</h4>
                        <p>
                          <strong>Beasiswa Yatim SD/SMP/SMA</strong> didaftarkan
                          oleh pihak sekolah masing-masing
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notification untuk data duplikasi */}
                {(duplicateNik || duplicateEmail) && (
                  <div className="duplicate-notification">
                    <div className="duplicate-notification-header">
                      <i className="fas fa-exclamation-triangle"></i>
                      <h4>Data Duplikasi Ditemukan</h4>
                    </div>
                    <div className="duplicate-notification-content">
                      {duplicateNik && (
                        <p>
                          <strong>NIK {nik}</strong> sudah terdaftar dalam
                          sistem. Jika Anda sudah memiliki akun, silakan login.
                        </p>
                      )}
                      {duplicateEmail && (
                        <p>
                          <strong>Email {email}</strong> sudah terdaftar dalam
                          sistem. Jika Anda sudah memiliki akun, silakan login.
                        </p>
                      )}
                    </div>
                    <div className="duplicate-notification-actions">
                      <button
                        type="button"
                        className="btn-login"
                        onClick={() => navigate("/login")}
                      >
                        <i className="fas fa-sign-in-alt"></i> Login Sekarang
                      </button>
                      <button
                        type="button"
                        className="btn-change"
                        onClick={() => {
                          setDuplicateNik(false);
                          setDuplicateEmail(false);
                          setErrors({});
                        }}
                      >
                        <i className="fas fa-edit"></i> Ubah Data
                      </button>
                    </div>
                  </div>
                )}

                {/* Upload Progress Indicator */}
                {isLoading && uploadProgress > 0 && (
                  <div className="upload-progress-container">
                    <div className="upload-progress-header">
                      <i className="fas fa-cloud-upload-alt"></i>
                      <span>Mengunggah file...</span>
                    </div>
                    <div className="upload-progress-bar">
                      <div
                        className="upload-progress-fill"
                        style={{ width: `${uploadProgress}%` }}
                      >
                        {uploadProgress}%
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={storeRegister}>
                  {/* Step 1: Data Pribadi */}
                  {currentStep === 1 && (
                    <div className="step-content">
                      <h3 className="step-title">Data Pribadi</h3>
                      <p className="step-description">
                        Isi data pribadi Anda dengan benar sesuai dokumen resmi
                      </p>

                      <div className="form-grid">
                        <div className="form-group">
                          <label className="form-label">
                            <i className="fas fa-user"></i>
                            Nama Lengkap Sesuai KTP-EL
                          </label>
                          <input
                            type="text"
                            className={`form-input ${errors.name ? "error" : ""}`}
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                              setErrors((prev) => ({ ...prev, name: null }));
                            }}
                            placeholder="Masukkan Nama Lengkap"
                          />
                          {errors.name && errors.name[0] && (
                            <div className="error-message">
                              <i className="fas fa-exclamation-circle"></i>
                              {errors.name[0]}
                            </div>
                          )}
                        </div>

                        <div className="form-group">
                          <label className="form-label">
                            <i className="fas fa-id-card"></i>
                            NIK Sesuai KTP-EL
                          </label>
                          <div className="input-with-indicator">
                            <input
                              type="text"
                              className={`form-input ${errors.nik ? "error" : ""} ${duplicateNik ? "duplicate-border" : ""}`}
                              value={nik}
                              onChange={handleChangeNik}
                              placeholder="Masukkan No Induk Kependudukan (16 digit)"
                              maxLength={16}
                            />
                            {duplicateNik && (
                              <div className="input-indicator duplicate">
                                <i className="fas fa-exclamation-triangle"></i>
                                <span>Sudah Terdaftar!</span>
                              </div>
                            )}
                          </div>
                          {errors.nik && errors.nik[0] && (
                            <div className="error-message">
                              <i className="fas fa-exclamation-circle"></i>
                              {errors.nik[0]}
                            </div>
                          )}
                          <div className="input-hint">
                            <i className="fas fa-info-circle"></i>
                            <span>
                              Pastikan NIK belum pernah terdaftar sebelumnya
                            </span>
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="form-label">
                            <i className="fas fa-home"></i>
                            No Kartu Keluarga (KK)
                          </label>
                          <input
                            type="text"
                            className={`form-input ${errors.nokk ? "error" : ""}`}
                            value={nokk}
                            onChange={handleChangeKartuKeluarga}
                            placeholder="Masukkan No Kartu Keluarga (16 digit)"
                            maxLength={16}
                          />
                          {errors.nokk && errors.nokk[0] && (
                            <div className="error-message">
                              <i className="fas fa-exclamation-circle"></i>
                              {errors.nokk[0]}
                            </div>
                          )}
                        </div>

                        <div className="form-group">
                          <label className="form-label">
                            <i className="fas fa-phone"></i>
                            No HP/Whatsapp
                          </label>
                          <input
                            type="text"
                            className={`form-input ${errors.nohp ? "error" : ""}`}
                            value={nohp}
                            onChange={handleChangeNoHp}
                            placeholder="Masukkan No Hp atau Whatsapp"
                          />
                          {errors.nohp && errors.nohp[0] && (
                            <div className="error-message">
                              <i className="fas fa-exclamation-circle"></i>
                              {errors.nohp[0]}
                            </div>
                          )}
                        </div>

                        <div className="form-group">
                          <label className="form-label">
                            <i className="fas fa-envelope"></i>
                            Email
                          </label>
                          <div className="input-with-indicator">
                            <input
                              type="email"
                              className={`form-input ${errors.email ? "error" : ""} ${duplicateEmail ? "duplicate-border" : ""}`}
                              value={email}
                              onChange={handleChangeEmail}
                              placeholder="Masukkan Email"
                            />
                            {duplicateEmail && (
                              <div className="input-indicator duplicate">
                                <i className="fas fa-exclamation-triangle"></i>
                                <span>Sudah Terdaftar!</span>
                              </div>
                            )}
                          </div>
                          {errors.email && errors.email[0] && (
                            <div className="error-message">
                              <i className="fas fa-exclamation-circle"></i>
                              {errors.email[0]}
                            </div>
                          )}
                        </div>

                        <div className="form-group">
                          <label className="form-label">
                            <i className="fas fa-venus-mars"></i>
                            Jenis Kelamin
                          </label>
                          <select
                            className={`form-select ${errors.gender ? "error" : ""}`}
                            value={gender}
                            onChange={(e) => {
                              setGender(e.target.value);
                              setErrors((prev) => ({ ...prev, gender: null }));
                            }}
                          >
                            <option value="">-- Pilih Jenis Kelamin --</option>
                            <option value="L">Laki-Laki</option>
                            <option value="P">Perempuan</option>
                          </select>
                          {errors.gender && errors.gender[0] && (
                            <div className="error-message">
                              <i className="fas fa-exclamation-circle"></i>
                              {errors.gender[0]}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="step-actions">
                        <button
                          type="button"
                          className="btn-next"
                          onClick={nextStep}
                          disabled={isLoading}
                        >
                          Selanjutnya <i className="fas fa-arrow-right"></i>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Alamat */}
                  {currentStep === 2 && (
                    <div className="step-content">
                      <h3 className="step-title">Data Alamat</h3>
                      <p className="step-description">
                        Isi alamat lengkap sesuai KTP
                      </p>

                      <div className="form-grid">
                        <div className="form-group">
                          <label className="form-label">
                            <i className="fas fa-map-marker-alt"></i>
                            Kecamatan
                          </label>
                          <Select
                            options={kecamatanList}
                            value={
                              kecamatanList.find(
                                (kecamatan) =>
                                  kecamatan.value === selectedKecamatan,
                              ) || null
                            }
                            onChange={handleKecamatanChange}
                            placeholder="Pilih Kecamatan"
                            styles={customSelectStyles}
                          />
                          {errors.id_kecamatan && errors.id_kecamatan[0] && (
                            <div className="error-message">
                              <i className="fas fa-exclamation-circle"></i>
                              {errors.id_kecamatan[0]}
                            </div>
                          )}
                        </div>

                        <div className="form-group">
                          <label className="form-label">
                            <i className="fas fa-map-pin"></i>
                            Kelurahan/Desa
                          </label>
                          <Select
                            options={kelurahanList}
                            value={
                              kelurahanList.find(
                                (kelurahan) =>
                                  kelurahan.value === selectedKelurahan,
                              ) || null
                            }
                            onChange={handleKelurahanChange}
                            placeholder="Pilih Kelurahan"
                            styles={customSelectStyles}
                            isDisabled={!selectedKecamatan}
                          />
                          {errors.id_kelurahan && errors.id_kelurahan[0] && (
                            <div className="error-message">
                              <i className="fas fa-exclamation-circle"></i>
                              {errors.id_kelurahan[0]}
                            </div>
                          )}
                        </div>

                        <div className="form-group">
                          <label className="form-label">
                            <i className="fas fa-mail-bulk"></i>
                            Kode POS
                          </label>
                          <input
                            type="text"
                            className={`form-input ${errors.codepos ? "error" : ""}`}
                            value={codepos}
                            onChange={handleChangeKodePos}
                            placeholder="Masukkan Kode POS (5 digit)"
                            maxLength={5}
                          />
                          {errors.codepos && errors.codepos[0] && (
                            <div className="error-message">
                              <i className="fas fa-exclamation-circle"></i>
                              {errors.codepos[0]}
                            </div>
                          )}
                        </div>

                        <div className="form-group">
                          <label className="form-label">
                            <i className="fas fa-hashtag"></i>
                            RT
                          </label>
                          <input
                            type="text"
                            className={`form-input ${errors.rt ? "error" : ""}`}
                            value={rt}
                            onChange={handleChangeRT}
                            placeholder="Isi 0 jika belum ada"
                          />
                          {errors.rt && errors.rt[0] && (
                            <div className="error-message">
                              <i className="fas fa-exclamation-circle"></i>
                              {errors.rt[0]}
                            </div>
                          )}
                        </div>

                        <div className="form-group">
                          <label className="form-label">
                            <i className="fas fa-hashtag"></i>
                            RW
                          </label>
                          <input
                            type="text"
                            className={`form-input ${errors.rw ? "error" : ""}`}
                            value={rw}
                            onChange={handleChangeRW}
                            placeholder="Isi 0 jika belum ada"
                          />
                          {errors.rw && errors.rw[0] && (
                            <div className="error-message">
                              <i className="fas fa-exclamation-circle"></i>
                              {errors.rw[0]}
                            </div>
                          )}
                        </div>

                        <div className="form-group full-width">
                          <label className="form-label">
                            <i className="fas fa-map-marked-alt"></i>
                            Alamat Lengkap Sesuai KTP
                          </label>
                          <textarea
                            rows="4"
                            className={`form-textarea ${errors.alamat ? "error" : ""}`}
                            value={alamat}
                            onChange={(e) => {
                              setAlamat(e.target.value);
                              setErrors((prev) => ({ ...prev, alamat: null }));
                            }}
                            placeholder="Tulis alamat lengkap sesuai KTP"
                          />
                          {errors.alamat && errors.alamat[0] && (
                            <div className="error-message">
                              <i className="fas fa-exclamation-circle"></i>
                              {errors.alamat[0]}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="step-actions">
                        <button
                          type="button"
                          className="btn-prev"
                          onClick={prevStep}
                          disabled={isLoading}
                        >
                          <i className="fas fa-arrow-left"></i> Sebelumnya
                        </button>
                        <button
                          type="button"
                          className="btn-next"
                          onClick={nextStep}
                          disabled={isLoading}
                        >
                          Selanjutnya <i className="fas fa-arrow-right"></i>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Dokumen */}
                  {currentStep === 3 && (
                    <div className="step-content">
                      <h3 className="step-title">Upload Dokumen</h3>
                      <p className="step-description">
                        Upload dokumen dalam format PDF (maksimal 2MB)
                      </p>

                      <div className="document-upload">
                        <div className="upload-group">
                          <label className="upload-label">
                            <i className="fas fa-file-pdf"></i>
                            Upload KTP (PDF)
                          </label>
                          <div
                            className={`upload-area ${errors.imagektp ? "error" : ""}`}
                          >
                            <input
                              type="file"
                              className="upload-input"
                              onChange={handleFileKtp}
                              accept=".pdf,application/pdf"
                              disabled={isLoading}
                            />
                            <div className="upload-content">
                              <i className="fas fa-cloud-upload-alt"></i>
                              <p>Klik untuk upload KTP</p>
                              <span>Format: PDF, Maksimal: 2MB</span>
                            </div>
                          </div>
                          {ktp && (
                            <div className="file-preview success">
                              <i className="fas fa-check-circle"></i>
                              <span>{ktp.name}</span>
                            </div>
                          )}
                          {errors.imagektp && errors.imagektp[0] && (
                            <div className="error-message">
                              <i className="fas fa-exclamation-circle"></i>
                              {errors.imagektp[0]}
                            </div>
                          )}
                        </div>

                        <div className="upload-group">
                          <label className="upload-label">
                            <i className="fas fa-file-pdf"></i>
                            Upload Kartu Keluarga (PDF)
                          </label>
                          <div
                            className={`upload-area ${errors.imagekk ? "error" : ""}`}
                          >
                            <input
                              type="file"
                              className="upload-input"
                              onChange={handleFileKk}
                              accept=".pdf,application/pdf"
                              disabled={isLoading}
                            />
                            <div className="upload-content">
                              <i className="fas fa-cloud-upload-alt"></i>
                              <p>Klik untuk upload Kartu Keluarga</p>
                              <span>Format: PDF, Maksimal: 2MB</span>
                            </div>
                          </div>
                          {kk && (
                            <div className="file-preview success">
                              <i className="fas fa-check-circle"></i>
                              <span>{kk.name}</span>
                            </div>
                          )}
                          {errors.imagekk && errors.imagekk[0] && (
                            <div className="error-message">
                              <i className="fas fa-exclamation-circle"></i>
                              {errors.imagekk[0]}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="step-actions">
                        <button
                          type="button"
                          className="btn-prev"
                          onClick={prevStep}
                          disabled={isLoading}
                        >
                          <i className="fas fa-arrow-left"></i> Sebelumnya
                        </button>
                        <button
                          type="button"
                          className="btn-next"
                          onClick={nextStep}
                          disabled={isLoading}
                        >
                          Selanjutnya <i className="fas fa-arrow-right"></i>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Akun */}
                  {currentStep === 4 && (
                    <div className="step-content">
                      <h3 className="step-title">Buat Akun</h3>
                      <p className="step-description">
                        Buat password untuk akun Anda
                      </p>

                      <div className="form-grid">
                        <div className="form-group">
                          <label className="form-label">
                            <i className="fas fa-lock"></i>
                            Password
                          </label>
                          <input
                            type="password"
                            className={`form-input ${errors.password ? "error" : ""}`}
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              setErrors((prev) => ({
                                ...prev,
                                password: null,
                              }));
                            }}
                            placeholder="Buat password (minimal 8 karakter)"
                            disabled={isLoading}
                          />
                          {errors.password && errors.password[0] && (
                            <div className="error-message">
                              <i className="fas fa-exclamation-circle"></i>
                              {errors.password[0]}
                            </div>
                          )}
                        </div>

                        <div className="form-group">
                          <label className="form-label">
                            <i className="fas fa-lock"></i>
                            Konfirmasi Password
                          </label>
                          <input
                            type="password"
                            className={`form-input ${errors.password_confirmation ? "error" : ""}`}
                            value={passwordConfirmation}
                            onChange={(e) => {
                              setPasswordConfirmation(e.target.value);
                              setErrors((prev) => ({
                                ...prev,
                                password_confirmation: null,
                              }));
                            }}
                            placeholder="Ulangi password"
                            disabled={isLoading}
                          />
                          {errors.password_confirmation &&
                            errors.password_confirmation[0] && (
                              <div className="error-message">
                                <i className="fas fa-exclamation-circle"></i>
                                {errors.password_confirmation[0]}
                              </div>
                            )}
                        </div>
                      </div>

                      <div className="step-actions final-actions">
                        <button
                          type="button"
                          className="btn-prev"
                          onClick={prevStep}
                          disabled={isLoading}
                        >
                          <i className="fas fa-arrow-left"></i> Sebelumnya
                        </button>

                        <button
                          type="submit"
                          className="btn-submit"
                          disabled={
                            isLoading ||
                            duplicateNik ||
                            duplicateEmail ||
                            !ktp ||
                            !kk
                          }
                        >
                          {isLoading ? (
                            <>
                              <i className="fas fa-spinner fa-spin"></i>{" "}
                              {uploadProgress > 0
                                ? `MENGUPLOAD ${uploadProgress}%`
                                : "MEMPROSES..."}
                            </>
                          ) : (
                            <>
                              <i className="fas fa-check"></i> DAFTAR SEKARANG
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>

              {/* Info Box */}
              <div className="info-box">
                <div className="info-header">
                  <i className="fas fa-info-circle"></i>
                  <h4>Informasi Penting</h4>
                </div>
                <div className="info-content">
                  <div className="info-item">
                    <i className="fas fa-check"></i>
                    <span>
                      Pastikan semua data diisi dengan benar sesuai dokumen
                      resmi
                    </span>
                  </div>
                  <div className="info-item">
                    <i className="fas fa-check"></i>
                    <span>
                      Dokumen harus dalam format PDF dengan ukuran maksimal 2MB
                    </span>
                  </div>
                  <div className="info-item important-info">
                    <i className="fas fa-exclamation-triangle"></i>
                    <span>
                      <strong>NIK dan Email harus unik:</strong> Jika sudah
                      terdaftar, Anda tidak dapat melanjutkan
                    </span>
                  </div>
                  <div className="info-item">
                    <i className="fas fa-check"></i>
                    <span>Gunakan koneksi internet stabil saat submit</span>
                  </div>
                  <div className="info-item">
                    <i className="fas fa-check"></i>
                    <span>Jika mengalami error, coba refresh halaman</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        /* Error Fallback Styles */
        .btn-refresh {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 auto;
        }

        .btn-refresh:hover {
          background: #2563eb;
        }

        /* Online/Offline Indicator */
        .offline-indicator {
          background: #fef3c7;
          border: 2px solid #f59e0b;
          border-radius: 10px;
          padding: 12px 20px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #92400e;
          animation: slideDown 0.3s ease;
        }

        .offline-indicator i {
          font-size: 1.2rem;
        }

        /* Upload Progress Indicator */
        .upload-progress-container {
          background: #f0f9ff;
          border: 2px solid #0ea5e9;
          border-radius: 10px;
          padding: 15px;
          margin-bottom: 20px;
          animation: slideDown 0.3s ease;
        }

        .upload-progress-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
          color: #0369a1;
        }

        .upload-progress-header i {
          font-size: 1.2rem;
        }

        .upload-progress-header span {
          font-weight: 600;
        }

        .upload-progress-bar {
          width: 100%;
          height: 20px;
          background: #e0f2fe;
          border-radius: 10px;
          overflow: hidden;
        }

        .upload-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #0ea5e9, #38bdf8);
          border-radius: 10px;
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: width 0.3s ease;
        }

        /* Disabled States */
        .btn-prev:disabled,
        .btn-next:disabled,
        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed !important;
          transform: none !important;
        }

        .upload-input:disabled {
          cursor: not-allowed;
        }

        .upload-area.disabled {
          opacity: 0.6;
          cursor: not-allowed;
          background: #f3f4f6;
        }

        .upload-area.disabled:hover {
          border-color: #cbd5e1 !important;
          background: #f3f4f6 !important;
        }

        /* Loading States */
        .fa-spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Final Actions */
        .final-actions {
          justify-content: flex-end;
        }

        /* Input with Indicator Styles */
        .input-with-indicator {
          position: relative;
        }

        .input-indicator {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.75rem;
          padding: 4px 8px;
          border-radius: 4px;
          background: white;
          z-index: 10;
          font-weight: 600;
        }

        .input-indicator.duplicate {
          color: #dc2626;
          border: 1px solid #dc2626;
          background: #fef2f2;
        }

        .input-indicator i {
          font-size: 0.7rem;
        }

        .input-hint {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 5px;
          font-size: 0.75rem;
          color: #6b7280;
        }

        .input-hint i {
          font-size: 0.7rem;
        }

        /* Border Styles for Input */
        .duplicate-border {
          border-color: #dc2626 !important;
          background-color: #fef2f2;
        }

        .form-input {
          padding-right: 120px !important;
        }

        /* Info Box Important Item */
        .info-item.important-info {
          background: #fef3c7;
          padding: 10px;
          border-radius: 8px;
          border-left: 4px solid #f59e0b;
        }

        .info-item.important-info i {
          color: #d97706;
        }

        .info-item.important-info span {
          color: #92400e;
        }

        /* Alert Beasiswa Styles */
        .alert-beasiswa {
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          border: 2px solid #3b82f6;
          border-left: 5px solid #1e40af;
          border-radius: 15px;
          padding: 25px;
          margin-bottom: 25px;
          margin-top: 10px;
        }

        .alert-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 2px solid rgba(59, 130, 246, 0.2);
        }

        .alert-header i {
          color: #1e40af;
          font-size: 1.8rem;
        }

        .alert-header h3 {
          color: #1e40af;
          margin: 0;
          font-size: 1.4rem;
        }

        .alert-content {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .alert-item {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          padding: 15px;
          background: white;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .alert-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .alert-item.important {
          background: #fffbeb;
          border: 2px solid #f59e0b;
        }

        .alert-icon {
          width: 45px;
          height: 45px;
          min-width: 45px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: white;
        }

        .alert-item:nth-child(1) .alert-icon {
          background: linear-gradient(135deg, #f59e0b, #fbbf24);
        }

        .alert-item:nth-child(2) .alert-icon {
          background: linear-gradient(135deg, #10b981, #34d399);
        }

        .alert-item:nth-child(3) .alert-icon {
          background: linear-gradient(135deg, #8b5cf6, #a78bfa);
        }

        .alert-item.important .alert-icon {
          background: linear-gradient(135deg, #dc2626, #ef4444);
        }

        .alert-text h4 {
          color: #1e293b;
          margin: 0 0 5px 0;
          font-size: 1.1rem;
        }

        .alert-text p {
          color: #475569;
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .alert-item.important .alert-text h4 {
          color: #dc2626;
        }

        .alert-item.important .alert-text p strong {
          color: #dc2626;
        }

        /* Duplicate Notification Styles */
        .duplicate-notification {
          background: #fef2f2;
          border: 2px solid #ef4444;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 20px;
          animation: slideDown 0.3s ease;
        }

        .duplicate-notification-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
          color: #dc2626;
        }

        .duplicate-notification-header i {
          font-size: 1.2rem;
        }

        .duplicate-notification-header h4 {
          margin: 0;
          font-size: 1.1rem;
        }

        .duplicate-notification-content {
          color: #991b1b;
          line-height: 1.5;
        }

        .duplicate-notification-actions {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }

        .duplicate-notification-actions button {
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .duplicate-notification-actions .btn-login {
          background: #3b82f6;
          color: white;
        }

        .duplicate-notification-actions .btn-login:hover {
          background: #2563eb;
        }

        .duplicate-notification-actions .btn-change {
          background: #f3f4f6;
          color: #374151;
          border: 1px solid #d1d5db;
        }

        .duplicate-notification-actions .btn-change:hover {
          background: #e5e7eb;
        }

        /* Error Styles */
        .error-summary {
          background: #fef2f2;
          border: 1px solid #fecaca;
          background-color: #fff5f5;
          border-left: 5px solid #ef4444;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 25px;
        }

        .error-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }

        .error-header i {
          color: #ef4444;
          font-size: 1.2rem;
        }

        .error-header h4 {
          color: #c53030;
          margin: 0;
          font-size: 1.1rem;
        }

        .error-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .error-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #c53030;
        }

        .error-item i {
          font-size: 0.9rem;
        }

        .form-input.error,
        .form-select.error,
        .form-textarea.error,
        .upload-area.error {
          border-color: #ef4444 !important;
          background-color: #fff5f5;
        }

        .form-input.error:focus,
        .form-select.error:focus,
        .form-textarea.error:focus {
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }

        .upload-area.error {
          border-color: #ef4444 !important;
          background-color: #fff5f5;
        }

        .error-message {
          color: #ef4444;
          font-size: 0.875rem;
          margin-top: 5px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .file-preview.success {
          color: #10b981;
        }

        /* Logo Styles */
        .hero-logo img {
          width: 120px;
          height: auto;
          margin-bottom: 20px;
          border-radius: 12px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          background: white;
          padding: 8px;
        }

        /* Persyaratan Button Styles */
        .persyaratan-button-container {
          margin-top: 25px;
        }

        .btn-persyaratan {
          background: linear-gradient(135deg, #10b981, #34d399);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 auto;
        }

        .btn-persyaratan:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3);
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background: white;
          border-radius: 20px;
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 25px 30px;
          border-bottom: 1px solid #e2e8f0;
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          color: white;
          border-radius: 20px 20px 0 0;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 1.8rem;
        }

        .modal-close {
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 5px;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease;
        }

        .modal-close:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .modal-body {
          padding: 30px;
        }

        .modal-footer {
          padding: 20px 30px;
          border-top: 1px solid #e2e8f0;
          display: flex;
          justify-content: flex-end;
        }

        .btn-modal-close {
          background: #64748b;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.3s ease;
        }

        .btn-modal-close:hover {
          background: #475569;
        }

        /* Persyaratan Section Styles */
        .persyaratan-description {
          text-align: center;
          color: #666;
          font-size: 1.1rem;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        .persyaratan-description strong {
          color: #1e3c72;
        }

        .persyaratan-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
        }

        .persyaratan-card {
          background: #ffffff;
          border-radius: 15px;
          padding: 25px;
          border: 1px solid #e2e8f0;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .persyaratan-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .card-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #1e3c72, #2a5298);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.3rem;
        }

        .card-header h3 {
          margin: 0;
          color: #1e3c72;
          font-size: 1.3rem;
        }

        .requirements-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .requirement-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 12px;
          padding: 8px 0;
        }

        .requirement-item i {
          color: #10b981;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .requirement-item span {
          color: #374151;
          line-height: 1.5;
        }

        .requirement-item strong {
          color: #1e3c72;
        }

        /* Rest of the styles remain the same */
        .register-container {
          min-height: 100vh;
          background: #f8fafc;
        }

        .register-hero {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          color: white;
          padding: 50px 0;
          text-align: center;
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .hero-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 15px;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          margin-bottom: 25px;
          opacity: 0.9;
        }

        .hero-subtitle .highlight {
          color: #ffd700;
          font-weight: 600;
        }

        .hero-divider {
          width: 80px;
          height: 4px;
          background: #ffd700;
          margin: 0 auto;
          border-radius: 2px;
        }

        .main-container {
          padding: 40px 20px;
        }

        .maintenance-section {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 50vh;
        }

        .maintenance-card {
          background: white;
          border-radius: 20px;
          padding: 50px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          width: 100%;
        }

        .maintenance-icon {
          font-size: 4rem;
          color: #6c757d;
          margin-bottom: 20px;
        }

        .maintenance-card h2 {
          color: #1e3c72;
          margin-bottom: 15px;
        }

        .maintenance-card p {
          color: #666;
          margin-bottom: 25px;
        }

        .maintenance-image img {
          max-width: 200px;
          height: auto;
        }

        .register-section {
          max-width: 1000px;
          margin: 0 auto;
        }

        .progress-steps {
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
          position: relative;
        }

        .progress-steps::before {
          content: "";
          position: absolute;
          top: 20px;
          left: 0;
          right: 0;
          height: 3px;
          background: #e2e8f0;
          z-index: 1;
        }

        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .step-number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #e2e8f0;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          margin-bottom: 10px;
          transition: all 0.3s ease;
        }

        .step.active .step-number {
          background: #1e40af;
          color: white;
        }

        .step-label {
          font-size: 0.9rem;
          color: #475569;
          font-weight: 600;
        }

        .step.active .step-label {
          color: #1e3c72;
        }

        .register-card {
          background: white;
          border-radius: 20px;
          padding: 30px 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          margin-bottom: 30px;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
          padding-bottom: 15px;
          border-bottom: 2px solid #f1f5f9;
        }

        .card-header i {
          font-size: 2rem;
          color: #1e3c72;
        }

        .card-header h2 {
          color: #1e3c72;
          margin: 0;
          font-size: 1.8rem;
        }

        .step-title {
          color: #1e3c72;
          font-size: 1.5rem;
          margin-bottom: 10px;
        }

        .step-description {
          color: #666;
          margin-bottom: 30px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 30px;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #1e3c72;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .form-label i {
          color: #64748b;
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(30, 60, 114, 0.1);
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .document-upload {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .upload-group {
          margin-bottom: 20px;
        }

        .upload-label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #1e3c72;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .upload-area {
          position: relative;
          border: 2px dashed #cbd5e1;
          border-radius: 12px;
          padding: 30px;
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .upload-area:hover {
          border-color: #3b82f6;
          background: #f8faff;
        }

        .upload-input {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }

        .upload-content i {
          font-size: 2.5rem;
          color: #64748b;
          margin-bottom: 10px;
        }

        .upload-content p {
          color: #1e3c72;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .upload-content span {
          color: #64748b;
          font-size: 0.875rem;
        }

        .file-preview {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #10b981;
          margin-top: 10px;
          font-weight: 500;
        }

        .step-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
        }

        .btn-prev,
        .btn-next,
        .btn-submit {
          padding: 12px 24px;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-prev {
          background: #64748b;
          color: white;
        }

        .btn-prev:hover:not(:disabled) {
          background: #475569;
        }

        .btn-next {
          background: #2563eb;
          color: white;
        }

        .btn-next:hover:not(:disabled) {
          background: #1d4ed8;
          transform: translateY(-2px);
        }

        .btn-submit {
          background: linear-gradient(135deg, #10b981, #34d399);
          color: white;
        }

        .btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(5, 150, 105, 0.3);
        }

        .btn-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          background: #9ca3af;
        }

        .info-box {
          background: white;
          border-radius: 15px;
          padding: 30px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }

        .info-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .info-header i {
          color: #1e3c72;
          font-size: 1.5rem;
        }

        .info-header h4 {
          color: #1e3c72;
          margin: 0;
        }

        .info-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .info-item i {
          color: #10b981;
          margin-top: 2px;
        }

        .info-item span {
          color: #555;
          line-height: 1.4;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .duplicate-notification-actions {
            flex-direction: column;
          }

          .duplicate-notification-actions button {
            width: 100%;
            justify-content: center;
          }

          .upload-progress-container {
            padding: 12px;
          }

          .upload-progress-fill {
            font-size: 0.7rem;
          }

          .alert-beasiswa {
            padding: 20px;
          }

          .alert-item {
            padding: 12px;
          }

          .alert-icon {
            width: 40px;
            height: 40px;
            min-width: 40px;
            font-size: 1rem;
          }

          .alert-text h4 {
            font-size: 1rem;
          }

          .alert-text p {
            font-size: 0.9rem;
          }

          .hero-title {
            font-size: 2rem;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .register-card {
            padding: 25px 20px;
          }

          .progress-steps {
            gap: 10px;
          }

          .step-label {
            font-size: 0.8rem;
          }

          .step-actions {
            flex-direction: column;
            gap: 15px;
          }

          .btn-prev,
          .btn-next,
          .btn-submit {
            width: 100%;
            justify-content: center;
          }

          .persyaratan-grid {
            grid-template-columns: 1fr;
          }

          .modal-content {
            margin: 10px;
          }

          .modal-header {
            padding: 20px;
          }

          .modal-body {
            padding: 20px;
          }

          /* Adjust input indicators for mobile */
          .input-indicator {
            font-size: 0.65rem;
            padding: 3px 6px;
          }

          .form-input,
          .form-select,
          .form-textarea {
            padding-right: 90px !important;
          }
        }

        @media (max-width: 576px) {
          .error-fallback-content {
            padding: 30px 20px;
          }

          .offline-indicator {
            padding: 10px 15px;
            font-size: 0.9rem;
          }

          .alert-header {
            flex-direction: column;
            text-align: center;
            gap: 8px;
          }

          .alert-item {
            flex-direction: column;
            text-align: center;
          }

          .alert-icon {
            align-self: center;
          }

          .main-container {
            padding: 20px 15px;
          }

          .hero-title {
            font-size: 1.8rem;
          }

          .card-header {
            flex-direction: column;
            text-align: center;
            gap: 10px;
          }

          .progress-steps {
            flex-wrap: wrap;
            gap: 15px;
          }

          .step {
            flex: 1;
            min-width: 80px;
          }

          .input-indicator span {
            display: none;
          }

          .input-indicator {
            padding: 4px;
            right: 5px;
          }

          .form-input,
          .form-select,
          .form-textarea {
            padding-right: 40px !important;
          }
        }

        @media (max-width: 400px) {
          .input-indicator {
            display: none;
          }

          .form-input,
          .form-select,
          .form-textarea {
            padding-right: 16px !important;
          }
        }
      `}</style>
    </LayoutWeb>
  );
}
