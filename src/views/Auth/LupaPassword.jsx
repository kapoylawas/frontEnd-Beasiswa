import { useState } from "react";
import LayoutAuth from "../../layouts/Auth";
import Cookies from "js-cookie";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Api from "../../services/Api";

export default function LupaPassword() {
    //title page
    document.title = "Reset Password - BEASISWA SIDOARJO";

    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const reset = async (e) => {
        e.preventDefault();
        setLoading(true);
        await Api.post("/api/send-welcome-email", {
            email: email,
        })
            .then((response) => {
                setLoading(false);
                console.log(response);

                //show toast
                toast('Reset password berhasil! Silakan cek email Anda.', {
                    icon: '✅',
                    style: {
                        borderRadius: '12px',
                        background: '#10B981',
                        color: '#fff',
                        fontWeight: '500',
                        padding: '16px',
                        fontSize: '14px'
                    },
                    duration: 120000,
                });

                //redirect dashboard page
                navigate("/");
            })
            .catch((error) => {
                setLoading(false);
                setErrors(error.response.data);
            });
    };

    return (
        <>
            <div className="reset-password-container">
                <div className="background-animation">
                    {/* Animated Key SVG */}
                    <svg className="floating-key key-1" viewBox="0 0 100 100">
                        <path d="M50 15 C30 15, 15 30, 15 50 C15 70, 30 85, 50 85 C70 85, 85 70, 85 50 C85 30, 70 15, 50 15 Z"
                            fill="rgba(59, 130, 246, 0.1)" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" />
                        <rect x="45" y="35" width="10" height="30" rx="2" fill="rgba(59, 130, 246, 0.5)" />
                        <circle cx="50" cy="25" r="8" fill="rgba(59, 130, 246, 0.7)" />
                    </svg>

                    {/* Animated Mail SVG */}
                    <svg className="floating-mail mail-1" viewBox="0 0 100 100">
                        <rect x="15" y="25" width="70" height="50" rx="8" fill="rgba(16, 185, 129, 0.1)" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="2" />
                        <polygon points="15,25 50,45 85,25" fill="rgba(16, 185, 129, 0.2)" />
                        <line x1="25" y1="40" x2="45" y2="55" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="2" />
                        <line x1="55" y1="55" x2="75" y2="40" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="2" />
                    </svg>

                    {/* Animated Shield SVG */}
                    <svg className="floating-shield shield-1" viewBox="0 0 100 100">
                        <path d="M50 15 L85 30 V60 C85 75, 70 85, 50 85 C30 85, 15 75, 15 60 V30 Z"
                            fill="rgba(139, 92, 246, 0.1)" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="2" />
                        <path d="M50 40 L60 50 L50 60 L40 50 Z" fill="rgba(139, 92, 246, 0.4)" />
                    </svg>

                    {/* Animated Lock SVG */}
                    <svg className="floating-lock lock-1" viewBox="0 0 100 100">
                        <rect x="30" y="45" width="40" height="35" rx="5" fill="rgba(245, 158, 11, 0.1)" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="2" />
                        <path d="M35 45 C35 35, 45 25, 50 25 C55 25, 65 35, 65 45" fill="none" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="2" />
                        <circle cx="50" cy="60" r="3" fill="rgba(245, 158, 11, 0.5)" />
                    </svg>

                    {/* Additional floating elements */}
                    <div className="floating-circle circle-1"></div>
                    <div className="floating-circle circle-2"></div>
                    <div className="floating-circle circle-3"></div>
                </div>

                <div className="reset-content">
                    <div className="reset-card">
                        {/* Header Section */}
                        <div className="card-header">
                            <div className="logo-section">
                                <div className="logo-container">
                                    <img
                                        src="/images/sidoarjo-logo.png"
                                        alt="Logo Kabupaten Sidoarjo"
                                        className="logo"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            const fallback = document.createElement('div');
                                            fallback.className = 'logo-fallback';
                                            fallback.innerHTML = '<i class="fa-solid fa-graduation-cap"></i>';
                                            e.target.parentNode.appendChild(fallback);
                                        }}
                                    />
                                </div>
                                <div className="title-container">
                                    <h1 className="app-title">Beasiswa Sidoarjo 2025</h1>
                                    <p className="app-subtitle">
                                        Reset Password Akun Anda
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="card-body">
                            {/* Alert Info */}
                            <div className="info-section">
                                <div className="info-icon">
                                    <i className="fa-solid fa-key"></i>
                                </div>
                                <div className="info-content">
                                    <h3>Reset Password</h3>
                                    <p>Masukkan email terdaftar Anda. Link reset password akan dikirim ke email tersebut.</p>
                                </div>
                            </div>

                            {/* Error Message */}
                            {errors.message && (
                                <div className="alert-error">
                                    <i className="fa-solid fa-circle-exclamation"></i>
                                    <span>{errors.message}</span>
                                </div>
                            )}

                            {/* Form */}
                            <form onSubmit={reset} className="reset-form">
                                <div className="form-group">
                                    <label className="form-label">Email Address</label>
                                    <div className="input-container">
                                        <div className="input-icon">
                                            <i className="fa-solid fa-envelope"></i>
                                        </div>
                                        <input
                                            type="email"
                                            className={`form-input ${errors.email ? 'error' : ''}`}
                                            placeholder="Masukkan email yang terdaftar"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    {errors.email && (
                                        <div className="error-message">
                                            <i className="fa-solid fa-circle-exclamation"></i>
                                            <span>{errors.email[0]}</span>
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className={`submit-button ${isLoading ? 'loading' : ''}`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <i className="fa-solid fa-spinner fa-spin"></i>
                                            <span>MEMPROSES...</span>
                                        </>
                                    ) : (
                                        <>
                                            <i className="fa-solid fa-paper-plane"></i>
                                            <span>KIRIM LINK RESET</span>
                                        </>
                                    )}
                                </button>

                                <div className="form-footer">
                                    <Link to="/login" className="back-link">
                                        <i className="fa-solid fa-arrow-left"></i>
                                        <span>Kembali ke Halaman Login</span>
                                    </Link>
                                </div>
                            </form>

                            {/* Additional Info */}
                            <div className="additional-info">
                                <div className="info-icon-wrapper">
                                    <i className="fa-solid fa-lightbulb"></i>
                                </div>
                                <div className="info-text-content">
                                    <h4>Tips Penting!</h4>
                                    <p>Pastikan email yang Anda masukkan adalah email yang valid dan aktif. Periksa folder spam jika tidak menemukan email reset password.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="page-footer">
                        <p>&copy; {new Date().getFullYear()} Beasiswa SIDOARJO. All rights reserved.</p>
                    </div>
                </div>

                <style jsx>{`
                    .reset-password-container {
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 20px;
                        background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .background-animation {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        z-index: 1;
                        overflow: hidden;
                    }
                    
                    /* Floating Key Animation */
                    .floating-key {
                        position: absolute;
                        opacity: 0.7;
                        animation: float 6s ease-in-out infinite;
                    }
                    
                    .key-1 {
                        width: 80px;
                        top: 15%;
                        left: 10%;
                        animation-delay: 0s;
                    }
                    
                    /* Floating Mail Animation */
                    .floating-mail {
                        position: absolute;
                        opacity: 0.7;
                        animation: float 8s ease-in-out infinite;
                    }
                    
                    .mail-1 {
                        width: 70px;
                        top: 70%;
                        right: 15%;
                        animation-delay: 1s;
                    }
                    
                    /* Floating Shield Animation */
                    .floating-shield {
                        position: absolute;
                        opacity: 0.7;
                        animation: float 7s ease-in-out infinite;
                    }
                    
                    .shield-1 {
                        width: 90px;
                        top: 20%;
                        right: 10%;
                        animation-delay: 2s;
                    }
                    
                    /* Floating Lock Animation */
                    .floating-lock {
                        position: absolute;
                        opacity: 0.7;
                        animation: float 9s ease-in-out infinite;
                    }
                    
                    .lock-1 {
                        width: 75px;
                        bottom: 20%;
                        left: 15%;
                        animation-delay: 3s;
                    }
                    
                    /* Floating Circles */
                    .floating-circle {
                        position: absolute;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.1);
                        animation: float 10s ease-in-out infinite;
                    }
                    
                    .circle-1 {
                        width: 60px;
                        height: 60px;
                        top: 10%;
                        right: 20%;
                        animation-delay: 0.5s;
                    }
                    
                    .circle-2 {
                        width: 40px;
                        height: 40px;
                        bottom: 30%;
                        left: 20%;
                        animation-delay: 1.5s;
                    }
                    
                    .circle-3 {
                        width: 80px;
                        height: 80px;
                        top: 60%;
                        left: 5%;
                        animation-delay: 2.5s;
                    }
                    
                    @keyframes float {
                        0%, 100% {
                            transform: translateY(0px) rotate(0deg);
                        }
                        50% {
                            transform: translateY(-20px) rotate(5deg);
                        }
                    }
                    
                    /* Pulse animation for additional effect */
                    @keyframes pulse {
                        0%, 100% {
                            opacity: 0.5;
                        }
                        50% {
                            opacity: 0.8;
                        }
                    }
                    
                    .reset-content {
                        width: 100%;
                        max-width: 480px;
                        position: relative;
                        z-index: 2;
                    }
                    
                    .reset-card {
                        background: rgba(255, 255, 255, 0.95);
                        backdrop-filter: blur(20px);
                        border-radius: 24px;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                        overflow: hidden;
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        margin-bottom: 20px;
                    }
                    
                    .card-header {
                        background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
                        color: white;
                        padding: 40px 30px 30px;
                        text-align: center;
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .card-header::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                        opacity: 0.3;
                    }
                    
                    .logo-section {
                        position: relative;
                        z-index: 2;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                    }
                    
                    .logo-container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-bottom: 20px;
                        width: 100%;
                    }
                    
                    .logo {
                        width: 100px;
                        height: 100px;
                        object-fit: contain;
                        border-radius: 20px;
                        background: rgba(255, 255, 255, 0.2);
                        padding: 12px;
                        border: 2px solid rgba(255, 255, 255, 0.3);
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                        display: block;
                        margin: 0 auto;
                    }
                    
                    .logo-fallback {
                        width: 100px;
                        height: 100px;
                        background: rgba(255, 255, 255, 0.2);
                        border-radius: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border: 2px solid rgba(255, 255, 255, 0.3);
                        color: white;
                        font-size: 40px;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                        margin: 0 auto;
                    }
                    
                    .title-container {
                        text-align: center;
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                    }
                    
                    .app-title {
                        font-size: 24px;
                        font-weight: 700;
                        margin: 0 0 8px;
                        line-height: 1.2;
                        text-align: center;
                        width: 100%;
                    }
                    
                    .app-subtitle {
                        font-size: 14px;
                        line-height: 1.5;
                        opacity: 0.9;
                        margin: 0;
                        text-align: center;
                        width: 100%;
                    }
                    
                    .card-body {
                        padding: 40px 30px 30px;
                    }
                    
                    .info-section {
                        display: flex;
                        align-items: flex-start;
                        gap: 15px;
                        background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
                        border: 1px solid #bae6fd;
                        border-radius: 16px;
                        padding: 20px;
                        margin-bottom: 25px;
                    }
                    
                    .info-icon {
                        background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%);
                        color: white;
                        width: 40px;
                        height: 40px;
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-shrink: 0;
                        font-size: 18px;
                    }
                    
                    .info-content h3 {
                        font-size: 16px;
                        font-weight: 700;
                        color: #0369a1;
                        margin: 0 0 5px;
                    }
                    
                    .info-content p {
                        font-size: 14px;
                        color: #0c4a6e;
                        margin: 0;
                        line-height: 1.5;
                    }
                    
                    .alert-error {
                        background-color: #fef2f2;
                        color: #dc2626;
                        border: 1px solid #fecaca;
                        border-radius: 12px;
                        padding: 15px;
                        margin-bottom: 20px;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        font-size: 14px;
                    }
                    
                    .reset-form {
                        margin-bottom: 20px;
                    }
                    
                    .form-group {
                        margin-bottom: 25px;
                    }
                    
                    .form-label {
                        display: block;
                        margin-bottom: 8px;
                        font-weight: 600;
                        color: #374151;
                        font-size: 14px;
                    }
                    
                    .input-container {
                        position: relative;
                        display: flex;
                        align-items: center;
                    }
                    
                    .input-icon {
                        position: absolute;
                        left: 15px;
                        color: #6b7280;
                        z-index: 1;
                        font-size: 16px;
                    }
                    
                    .form-input {
                        width: 100%;
                        padding: 15px 15px 15px 45px;
                        border: 2px solid #e5e7eb;
                        border-radius: 12px;
                        font-size: 15px;
                        transition: all 0.3s ease;
                        background: white;
                        color: #374151;
                    }
                    
                    .form-input:focus {
                        outline: none;
                        border-color: #3b82f6;
                        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                    }
                    
                    .form-input::placeholder {
                        color: #9ca3af;
                    }
                    
                    .form-input.error {
                        border-color: #ef4444;
                        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
                    }
                    
                    .error-message {
                        color: #ef4444;
                        font-size: 13px;
                        margin-top: 8px;
                        display: flex;
                        align-items: center;
                        gap: 6px;
                    }
                    
                    .submit-button {
                        width: 100%;
                        padding: 16px;
                        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
                        color: white;
                        border: none;
                        border-radius: 12px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;
                        margin-bottom: 20px;
                        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
                    }
                    
                    .submit-button:hover:not(:disabled) {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(59, 130, 246, 0.5);
                    }
                    
                    .submit-button:disabled {
                        opacity: 0.7;
                        cursor: not-allowed;
                    }
                    
                    .submit-button.loading {
                        background: #6b7280;
                    }
                    
                    .form-footer {
                        text-align: center;
                        padding-top: 20px;
                        border-top: 1px solid #f1f5f9;
                    }
                    
                    .back-link {
                        color: #64748b;
                        text-decoration: none;
                        font-size: 14px;
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                        transition: all 0.3s;
                        padding: 10px 16px;
                        border-radius: 8px;
                        font-weight: 500;
                    }
                    
                    .back-link:hover {
                        color: #3b82f6;
                        background: #f8fafc;
                    }
                    
                    /* Updated Additional Info Styles */
                    .additional-info {
                        background: linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%);
                        border: 2px solid #F59E0B;
                        border-radius: 16px;
                        padding: 20px;
                        margin-top: 20px;
                        display: flex;
                        align-items: flex-start;
                        gap: 15px;
                        box-shadow: 0 4px 20px rgba(245, 158, 11, 0.15);
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .additional-info::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        height: 3px;
                        background: linear-gradient(90deg, #F59E0B, #FBBF24, #F59E0B);
                    }
                    
                    .info-icon-wrapper {
                        background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
                        color: white;
                        width: 44px;
                        height: 44px;
                        border-radius: 12px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-shrink: 0;
                        font-size: 20px;
                        box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
                    }
                    
                    .info-text-content {
                        flex: 1;
                    }
                    
                    .info-text-content h4 {
                        font-size: 16px;
                        font-weight: 700;
                        color: #92400E;
                        margin: 0 0 8px;
                        line-height: 1.3;
                    }
                    
                    .info-text-content p {
                        font-size: 14px;
                        color: #92400E;
                        margin: 0;
                        line-height: 1.5;
                        font-weight: 500;
                    }
                    
                    .page-footer {
                        text-align: center;
                    }
                    
                    .page-footer p {
                        color: rgba(255, 255, 255, 0.8);
                        font-size: 13px;
                        margin: 0;
                    }
                    
                    @media (max-width: 480px) {
                        .reset-password-container {
                            padding: 15px;
                        }
                        
                        .reset-card {
                            border-radius: 20px;
                            margin-bottom: 15px;
                        }
                        
                        .card-header {
                            padding: 30px 20px 25px;
                        }
                        
                        .card-body {
                            padding: 30px 20px 25px;
                        }
                        
                        .app-title {
                            font-size: 20px;
                        }
                        
                        .logo {
                            width: 80px;
                            height: 80px;
                        }
                        
                        .info-section {
                            flex-direction: column;
                            text-align: center;
                            gap: 12px;
                        }
                        
                        .additional-info {
                            flex-direction: column;
                            text-align: center;
                            gap: 12px;
                            padding: 20px 16px;
                        }
                        
                        .info-icon-wrapper {
                            align-self: center;
                        }
                        
                        /* Adjust floating elements for mobile */
                        .floating-key,
                        .floating-mail,
                        .floating-shield,
                        .floating-lock {
                            width: 50px !important;
                            opacity: 0.4;
                        }
                        
                        .floating-circle {
                            opacity: 0.2;
                        }
                    }
                `}</style>
            </div>
        </>
    )
}