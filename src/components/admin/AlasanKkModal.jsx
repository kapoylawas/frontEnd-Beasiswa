// components/AlasanKkModal.js
import React, { useState } from "react";
import Swal from "sweetalert2";
import Api from "../../services/Api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function AlasanKkModal({ 
    item, 
    onClose, 
    onSave,
    show
}) {
    const [alasanVerifKk, setAlasanVerifKk] = useState(item?.alasan_kk || "");
    const [savingAlasanKk, setSavingAlasanKk] = useState(false);

    const handleSaveAlasanVerifKk = async () => {
        if (!item) return;

        if (alasanVerifKk.length > 1000) {
            toast.error('Alasan verifikasi KK maksimal 1000 karakter');
            return;
        }

        if (!alasanVerifKk.trim()) {
            toast.error('Alasan verifikasi KK tidak boleh kosong');
            return;
        }

        setSavingAlasanKk(true);
        try {
            const response = await Api.put(`/api/admin/yatim/${item.id}/update-alasan-kk`, {
                alasan_kk: alasanVerifKk
            }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });

            if (response.data.success) {
                toast.success('Alasan verifikasi KK berhasil disimpan');
                if (onSave) {
                    onSave(item.id, alasanVerifKk);
                }
                onClose();
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

    if (!show) return null;

    return (
        <div className="modal fade show" style={{ 
            display: 'block', 
            backgroundColor: 'rgba(0,0,0,0.7)',
            zIndex: 1055
        }}>
            <div className="modal-dialog modal-lg" style={{ maxWidth: '800px', marginTop: '60px' }}>
                <div className="modal-content">
                    <div className="modal-header bg-warning text-white">
                        <h4 className="modal-title">
                            <i className="fa fa-comment me-2"></i>
                            {item?.verif_kk === 'verif' ? 'Edit Alasan Verifikasi KK' :
                             item?.verif_kk === 'ditolak' ? 'Edit Alasan Penolakan KK' :
                             item?.alasan_kk ? 'Edit Alasan' : 'Tambah Alasan Verifikasi KK'}
                        </h4>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={onClose}
                            disabled={savingAlasanKk}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {item && (
                            <div className="mb-3">
                                <div className="alert alert-light">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <strong>Data Peserta:</strong><br />
                                            <strong className="text-primary">{item.name}</strong><br />
                                            NIK: <code>{item.nik}</code> | 
                                            Jenjang: <span className="badge bg-info">{item.jenjang}</span><br />
                                            Status KK: 
                                            {item.verif_kk === 'verif' ? 
                                                <span className="badge bg-success ms-2">Terverifikasi</span> :
                                                item.verif_kk === 'ditolak' ? 
                                                <span className="badge bg-danger ms-2">Ditolak</span> :
                                                <span className="badge bg-warning ms-2">Belum Diverifikasi</span>
                                            }
                                        </div>
                                        <div className="col-md-4 text-end">
                                            <small className="text-muted">
                                                ID: {item.id}<br />
                                                Dibuat: {item.created_at ? 
                                                    new Date(item.created_at).toLocaleDateString('id-ID') : 
                                                    '-'}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mb-3">
                            <label htmlFor="alasanVerifKk" className="form-label fw-bold">
                                {item?.verif_kk === 'verif' ? 'Alasan Verifikasi:' :
                                 item?.verif_kk === 'ditolak' ? 'Alasan Penolakan:' :
                                 'Alasan:'}
                                <span className="text-danger ms-1">*</span>
                            </label>
                            <textarea
                                id="alasanVerifKk"
                                className="form-control"
                                rows="8"
                                value={alasanVerifKk}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value.length <= 1000) {
                                        setAlasanVerifKk(value);
                                    }
                                }}
                                placeholder={`Masukkan alasan ${item?.verif_kk === 'verif' ? 'verifikasi' : 
                                            item?.verif_kk === 'ditolak' ? 'penolakan' : ''} Kartu Keluarga...`}
                                style={{ 
                                    resize: 'vertical',
                                    minHeight: '150px'
                                }}
                            />
                            <div className="form-text d-flex justify-content-between mt-2">
                                <div>
                                    <span className={alasanVerifKk.length >= 1000 ? 'text-danger' : 'text-muted'}>
                                        {alasanVerifKk.length}/1000 karakter
                                    </span>
                                    {alasanVerifKk.length >= 1000 && (
                                        <span className="text-danger ms-2">
                                            <i className="fa fa-exclamation-triangle me-1"></i>
                                            Maksimal karakter tercapai
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <span className="text-muted">
                                        <i className="fa fa-info-circle me-1"></i>
                                        Alasan akan tersimpan sesuai status KK
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Info Status */}
                        <div className="alert alert-info">
                            <div className="d-flex">
                                <i className="fa fa-info-circle me-2 mt-1"></i>
                                <div>
                                    <small>
                                        <strong>Informasi:</strong><br />
                                        • Alasan ini akan disimpan dan dapat dilihat oleh admin lainnya<br />
                                        • Jika status KK berubah, alasan dapat diedit kembali<br />
                                        • Pastikan alasan jelas dan informatif
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="d-flex justify-content-between w-100">
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={onClose}
                                disabled={savingAlasanKk}
                            >
                                <i className="fa fa-times me-2"></i> Batal
                            </button>
                            <div>
                                {item?.alasan_kk && alasanVerifKk.trim() && (
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger me-2"
                                        onClick={() => {
                                            Swal.fire({
                                                title: 'Hapus Alasan?',
                                                text: 'Apakah Anda yakin ingin menghapus alasan ini?',
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonColor: '#d33',
                                                cancelButtonColor: '#6c757d',
                                                confirmButtonText: 'Ya, Hapus!',
                                                cancelButtonText: 'Batal'
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    setAlasanVerifKk('');
                                                }
                                            });
                                        }}
                                        disabled={savingAlasanKk}
                                    >
                                        <i className="fa fa-trash me-2"></i> Hapus
                                    </button>
                                )}
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
                                            {item?.alasan_kk ? 'Update Alasan' : 'Simpan Alasan'}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}