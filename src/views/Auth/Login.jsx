//import layoutAuth
import { useState } from "react";
import LayoutAuth from "../../layouts/Auth";
//import Cookie
import Cookies from "js-cookie";

//import Navigate
import { Link, Navigate, useNavigate } from "react-router-dom";

//import toast
import toast from "react-hot-toast";

//import service
import Api from "../../services/Api";

export default function Login() {
  //title page
  document.title = "Login - BEASISWA SIDOARJO";

  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState([]);

  //navigate
  const navigate = useNavigate();

  //method login
  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    await Api.post("/api/login", {
      //data
      nik: nik,
      password: password,
    })
      .then((response) => {
        setLoading(false);

        //set token to cookies
        Cookies.set("token", response.data.token);

        //set user to cookies
        Cookies.set("user", JSON.stringify(response.data.user));

        Cookies.set("terdaftar", JSON.stringify(response.data.metta));

        //set permissions to cookies
        Cookies.set("permissions", JSON.stringify(response.data.permissions));

        //show toast
        toast.success("Login Successfully!", {
          position: "top-right",
          duration: 4000,
        });

        //redirect dashboard page
        navigate("/admin/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        //set response error to state
        setErrors(error.response.data);
      });
  };

  //check if cookie already exists
  if (Cookies.get("token")) {
    //redirect dashboard page
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <>
      <div className="login-container">
        <div className="background-overlay"></div>

        <div className="login-card">
          <div className="card-header">
            <div className="logo-section">
              <div className="logo-wrapper">
                <img
                  src="/images/sidoarjo-logo.png"
                  alt="Logo Kabupaten Sidoarjo"
                  className="logo"
                  onError={(e) => {
                    // Fallback jika gambar tidak load
                    e.target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = 'logo-fallback';
                    fallback.innerHTML = '<i class="fa-solid fa-graduation-cap"></i>';
                    e.target.parentNode.appendChild(fallback);
                  }}
                />
              </div>
              <h1 className="app-title">Beasiswa Sidoarjo 2025</h1>
              <p className="app-subtitle">
                Pemerintah Kabupaten Sidoarjo mengapresiasi para mahasiswa
                <br />Kabupaten Sidoarjo 2025
              </p>
            </div>
          </div>

          <div className="card-body">
            <div className="login-header">
              <h2>Masuk ke Akun</h2>
              <p>Silakan masuk dengan username dan password Anda</p>
            </div>

            {errors.message && (
              <div className="alert alert-error">
                <i className="fa-solid fa-circle-exclamation"></i>
                <span>{errors.message}</span>
              </div>
            )}

            <form onSubmit={login} className="login-form">
              <div className="form-group">
                <label className="form-label">USERNAME</label>
                <div className="input-container">
                  <div className="input-icon">
                    <i className="fa fa-id-card"></i>
                  </div>
                  <input
                    type="text"
                    className={`form-input ${errors.nik ? 'error' : ''}`}
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                    placeholder="Masukkan username Anda"

                  />
                </div>
                {errors.nik && (
                  <div className="error-message">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    <span>{errors.nik[0]}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-container">
                  <div className="input-icon">
                    <i className="fa fa-lock"></i>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-input ${errors.password ? 'error' : ''}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan Password Anda"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
                {errors.password && (
                  <div className="error-message">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    <span>{errors.password[0]}</span>
                  </div>
                )}
              </div>

              <div className="form-options">
                <Link to="/reset" className="forgot-password">
                  Lupa Password?
                </Link>
              </div>

              <button
                type="submit"
                className={`login-button ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    <span>MEMUAT...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-right-to-bracket"></i>
                    <span>MASUK</span>
                  </>
                )}
              </button>

              <div className="login-footer">
                <Link to="/" className="back-link">
                  <i className="fa-solid fa-arrow-left"></i>
                  <span>Kembali ke Beranda</span>
                </Link>
              </div>
            </form>
          </div>
        </div>

        <style jsx>{`
          .login-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: 
              linear-gradient(rgba(30, 58, 138, 0.9), rgba(59, 130, 246, 0.9)),
              url('/images/auth-bg.jpg') center/cover;
            position: relative;
            overflow: hidden;
          }
          
          .background-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
              radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%);
            z-index: 1;
          }
          
          .login-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            width: 100%;
            max-width: 450px;
            overflow: hidden;
            position: relative;
            z-index: 2;
            border: 1px solid rgba(255, 255, 255, 0.2);
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
          }
          
          .logo-wrapper {
            margin-bottom: 20px;
            display: flex;
            justify-content: center;
          }
          
          .logo {
            width: 100px;
            height: 100px;
            object-fit: contain;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            padding: 10px;
            border: 3px solid rgba(255, 255, 255, 0.3);
          }
          
          .logo-fallback {
            width: 100px;
            height: 100px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 3px solid rgba(255, 255, 255, 0.3);
            color: white;
            font-size: 40px;
          }
          
          .app-title {
            font-size: 24px;
            font-weight: 700;
            margin: 0 0 10px;
            line-height: 1.2;
          }
          
          .app-subtitle {
            font-size: 14px;
            line-height: 1.5;
            opacity: 0.9;
            margin: 0;
          }
          
          .card-body {
            padding: 40px 30px 30px;
          }
          
          .login-header {
            text-align: center;
            margin-bottom: 30px;
          }
          
          .login-header h2 {
            font-size: 24px;
            font-weight: 700;
            color: #1f2937;
            margin: 0 0 8px;
          }
          
          .login-header p {
            color: #6b7280;
            font-size: 14px;
            margin: 0;
          }
          
          .alert {
            padding: 12px 15px;
            border-radius: 10px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 14px;
          }
          
          .alert-error {
            background-color: #fef2f2;
            color: #dc2626;
            border: 1px solid #fecaca;
          }
          
          .form-group {
            margin-bottom: 20px;
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
            color: #9ca3af;
            z-index: 1;
          }
          
          .form-input {
            width: 100%;
            padding: 14px 15px 14px 45px;
            border: 2px solid #e5e7eb;
            border-radius: 10px;
            font-size: 14px;
            transition: all 0.3s ease;
            background: white;
          }
          
          .form-input:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
          
          .form-input.error {
            border-color: #ef4444;
          }
          
          .password-toggle {
            position: absolute;
            right: 15px;
            background: none;
            border: none;
            color: #9ca3af;
            cursor: pointer;
            padding: 6px;
            border-radius: 5px;
            transition: all 0.3s;
          }
          
          .password-toggle:hover {
            color: #3b82f6;
            background: #f3f4f6;
          }
          
          .error-message {
            color: #ef4444;
            font-size: 12px;
            margin-top: 6px;
            display: flex;
            align-items: center;
            gap: 5px;
          }
          
          .form-options {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 25px;
          }
          
          .forgot-password {
            color: #3b82f6;
            font-size: 14px;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s;
          }
          
          .forgot-password:hover {
            color: #1d4ed8;
            text-decoration: underline;
          }
          
          .login-button {
            width: 100%;
            padding: 14px;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-bottom: 20px;
          }
          
          .login-button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
          }
          
          .login-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
          
          .login-button.loading {
            background: #9ca3af;
          }
          
          .login-footer {
            text-align: center;
          }
          
          .back-link {
            color: #6b7280;
            text-decoration: none;
            font-size: 14px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s;
            padding: 8px 16px;
            border-radius: 8px;
          }
          
          .back-link:hover {
            color: #3b82f6;
            background: #f3f4f6;
          }
          
          @media (max-width: 480px) {
            .login-container {
              padding: 15px;
            }
            
            .login-card {
              border-radius: 20px;
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
            
            .login-header h2 {
              font-size: 20px;
            }
            
            .logo {
              width: 80px;
              height: 80px;
            }
          }
        `}</style>
      </div>
    </>
  );
}