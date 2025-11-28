import { useEffect, useState } from "react";
import Api from "../../../services/Api";
import LayoutAdmin from "../../../layouts/Admin";
import { Link } from "react-router-dom";
import hasAnyPermission from "../../../utils/Permissions";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  const [formData, setFormData] = useState({
    nik: "",
    name: "",
    email: "",
    gender: "",
    alamat: ""
  });
  
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  document.title = "User Management - Beasiswa";

  // Fungsi untuk generate email acak
  const generateRandomEmail = () => {
    const randomString = Math.random().toString(36).substring(2, 10); // 8 karakter acak
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    return `${randomString}@${randomDomain}`;
  };

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await Api.get("/api/admin/getuserManagement", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "multipart/form-data",
        }
      });
      setUsers(response.data.data || []);
    } catch (error) {
      toast.error("Gagal memuat data users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'nik') {
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue.length <= 16) {
        setFormData(prev => ({
          ...prev,
          [name]: numericValue
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    if (formData.nik.length !== 16) {
      setErrors({ nik: ["NIK harus 16 digit"] });
      setSubmitting(false);
      toast.error("NIK harus 16 digit");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('nik', formData.nik);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('alamat', formData.alamat);

      const response = await Api.post("/api/admin/usersManagement", formDataToSend, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "multipart/form-data",
        }
      });
      
      toast.success(response.data.message);
      setShowModal(false);
      resetForm();
      fetchUsers();
      
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors || {});
        toast.error("Validasi gagal, periksa form kembali");
      } else {
        toast.error(error.response?.data?.message || "Gagal membuat user");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      nik: "",
      name: "",
      email: "",
      gender: "",
      alamat: ""
    });
    setErrors({});
  };

  // Open modal - generate email acak saat modal dibuka
  const openModal = () => {
    const randomEmail = generateRandomEmail();
    setFormData(prev => ({
      ...prev,
      email: randomEmail
    }));
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  // Tombol untuk generate email baru
  const handleGenerateNewEmail = () => {
    const newEmail = generateRandomEmail();
    setFormData(prev => ({
      ...prev,
      email: newEmail
    }));
  };

  // Get role names
  const getRoleNames = (roles) => {
    return roles.map(role => role.name).join(', ');
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID');
  };

  return (
    <LayoutAdmin>
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>User Management</h1>
          <button 
            className="btn btn-primary"
            onClick={openModal}
          >
            <i className="fa fa-plus me-2"></i>
            Tambah User
          </button>
        </div>

        {/* Users Table */}
        <div className="card">
          <div className="card-body">
            {loading ? (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>NIK</th>
                      <th>Nama</th>
                      <th>Email</th>
                      <th>No HP</th>
                      <th>Jenis Kelamin</th>
                      <th>Alamat</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Tanggal Daftar</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users && users.length > 0 ? (
                      users.map((user, index) => (
                        <tr key={user.id}>
                          <td>{index + 1}</td>
                          <td>{user.nik}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.nohp || '-'}</td>
                          <td>
                            <span className={`badge ${user.gender === 'male' ? 'bg-primary' : 'bg-success'}`}>
                              {user.gender === 'male' ? 'Laki-laki' : 'Perempuan'}
                            </span>
                          </td>
                          <td>{user.alamat}</td>
                          <td>
                            <span className="badge bg-info">
                              {getRoleNames(user.roles)}
                            </span>
                          </td>
                          <td>
                            <span className={`badge ${user.status === 1 ? 'bg-success' : 'bg-danger'}`}>
                              {user.status === 1 ? 'Aktif' : 'Nonaktif'}
                            </span>
                          </td>
                          <td>{formatDate(user.created_at)}</td>
                          <td>
                            <div className="btn-group">
                              <button className="btn btn-sm btn-warning">
                                <i className="fa fa-edit"></i>
                              </button>
                              <button className="btn btn-sm btn-danger">
                                <i className="fa fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="11" className="text-center">
                          Tidak ada data users
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Create User Modal */}
        {showModal && (
          <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Tambah User Baru</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-12 mb-3">
                        <label className="form-label">NIK *</label>
                        <input
                          type="text"
                          className={`form-control ${errors.nik ? 'is-invalid' : ''}`}
                          name="nik"
                          value={formData.nik}
                          onChange={handleInputChange}
                          placeholder="Masukkan 16 digit NIK"
                          maxLength={16}
                          required
                        />
                        <div className="form-text">
                          {formData.nik.length}/16 digit
                        </div>
                        {errors.nik && <div className="invalid-feedback">{errors.nik[0]}</div>}
                      </div>

                      <div className="col-12 mb-3">
                        <label className="form-label">Nama Lengkap *</label>
                        <input
                          type="text"
                          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Masukkan nama lengkap"
                          required
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name[0]}</div>}
                      </div>

                      <div className="col-12 mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <label className="form-label">Email *</label>
                          <button 
                            type="button" 
                            className="btn btn-sm btn-outline-secondary"
                            onClick={handleGenerateNewEmail}
                          >
                            <i className="fa fa-refresh me-1"></i>
                            Generate Email Baru
                          </button>
                        </div>
                        <input
                          type="email"
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Email akan digenerate otomatis"
                          required
                        />
                        <div className="form-text">
                          Email digenerate otomatis, klik tombol di atas untuk mengubah
                        </div>
                        {errors.email && <div className="invalid-feedback">{errors.email[0]}</div>}
                      </div>

                      <div className="col-12 mb-3">
                        <label className="form-label">Jenis Kelamin *</label>
                        <select
                          className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Pilih Jenis Kelamin</option>
                          <option value="male">Laki-laki</option>
                          <option value="female">Perempuan</option>
                        </select>
                        {errors.gender && <div className="invalid-feedback">{errors.gender[0]}</div>}
                      </div>

                      <div className="col-12 mb-3">
                        <label className="form-label">Alamat *</label>
                        <textarea
                          className={`form-control ${errors.alamat ? 'is-invalid' : ''}`}
                          name="alamat"
                          value={formData.alamat}
                          onChange={handleInputChange}
                          rows="3"
                          placeholder="Masukkan alamat lengkap"
                          required
                        />
                        {errors.alamat && <div className="invalid-feedback">{errors.alamat[0]}</div>}
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>
                      Batal
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary" 
                      disabled={submitting || formData.nik.length !== 16}
                    >
                      {submitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Menyimpan...
                        </>
                      ) : (
                        'Simpan'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayoutAdmin>
  );
}