//import layoutAuth
import { useState, useEffect } from "react";
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
  
  // State untuk math captcha
  const [mathCaptcha, setMathCaptcha] = useState({
    question: '',
    answer: 0,
    userAnswer: '',
    verified: false
  });

  //navigate
  const navigate = useNavigate();

  // Initialize captcha
  useEffect(() => {
    generateMathQuestion();
  }, []);

  // Generate math question - HANYA PENJUMLAHAN DAN PENGURANGAN
  const generateMathQuestion = () => {
    // Pilih random antara penjumlahan (+) atau pengurangan (-)
    const useAddition = Math.random() > 0.5;
    
    let num1, num2, answer;
    
    if (useAddition) {
      // Penjumlahan: hasil maksimal 20
      num1 = Math.floor(Math.random() * 10) + 1; // 1-10
      num2 = Math.floor(Math.random() * 10) + 1; // 1-10
      answer = num1 + num2;
      
      // Pastikan hasil tidak lebih dari 20
      while (answer > 20) {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = num1 + num2;
      }
      
      setMathCaptcha({
        question: `${num1} + ${num2}`,
        answer: answer,
        userAnswer: '',
        verified: false
      });
    } else {
      // Pengurangan: hasil tidak negatif
      num1 = Math.floor(Math.random() * 15) + 5; // 5-19
      num2 = Math.floor(Math.random() * (num1 - 1)) + 1; // 1 sampai (num1-1)
      answer = num1 - num2;
      
      setMathCaptcha({
        question: `${num1} - ${num2}`,
        answer: answer,
        userAnswer: '',
        verified: false
      });
    }
  };

  // Check answer
  const checkMathAnswer = () => {
    if (mathCaptcha.userAnswer.trim() === '') {
      toast.error("Masukkan jawaban!", {
        position: "top-right",
        duration: 2000,
      });
      return;
    }
    
    const userAnswer = parseInt(mathCaptcha.userAnswer);
    if (isNaN(userAnswer)) {
      toast.error("Jawaban harus angka!", {
        position: "top-right",
        duration: 2000,
      });
      return;
    }
    
    if (userAnswer === mathCaptcha.answer) {
      setMathCaptcha(prev => ({ ...prev, verified: true }));
      toast.success("Verifikasi berhasil!", {
        position: "top-right",
        duration: 1500,
      });
    } else {
      toast.error("Salah! Coba lagi.", {
        position: "top-right",
        duration: 2000,
      });
      // Auto generate soal baru
      setTimeout(() => {
        generateMathQuestion();
      }, 1500);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !mathCaptcha.verified) {
      checkMathAnswer();
    }
  };

  // Reset captcha
  const resetCaptcha = () => {
    generateMathQuestion();
  };

  //method login
  const login = async (e) => {
    e.preventDefault();
    
    // Validasi captcha
    if (!mathCaptcha.verified) {
      toast.error("Harap verifikasi terlebih dahulu!", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }
    
    setLoading(true);
    
    // Determine if input is NIK or NISN based on format
    const isNISN = /^\d{10}$/.test(nik);
    const isNIK = /^\d{16}$/.test(nik);
    
    // Prepare data based on format detection
    let loginData = {};
    
    if (isNISN) {
      loginData = { nisn: nik, password: password };
    } else if (isNIK) {
      loginData = { nik: nik, password: password };
    } else {
      loginData = { nik: nik, password: password };
    }
    
    await Api.post("/api/login", loginData)
      .then((response) => {
        setLoading(false);
        Cookies.set("token", response.data.token);
        Cookies.set("user", JSON.stringify(response.data.user));
        Cookies.set("terdaftar", JSON.stringify(response.data.metta));
        Cookies.set("permissions", JSON.stringify(response.data.permissions));
        
        toast.success("Login Berhasil!", {
          position: "top-right",
          duration: 3000,
        });
        
        navigate("/admin/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        resetCaptcha();
        setErrors(error.response.data || { message: "Terjadi kesalahan" });
      });
  };

  //check if cookie already exists
  if (Cookies.get("token")) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <>
      <div className="login-container">
        <div className="background-overlay"></div>

        <div className="login-wrapper">
          <div className="login-left">
            <div className="login-left-content">
              <div className="logo-wrapper">
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
              <h1 className="app-title">Beasiswa Sidoarjo 2026</h1>
              <p className="app-subtitle">
                Pemerintah Kabupaten Sidoarjo mengapresiasi para mahasiswa
                <br />Kabupaten Sidoarjo 2026
              </p>
              
              <div className="features">
                <div className="feature-item">
                  <i className="fa-solid fa-graduation-cap"></i>
                  <div>
                    <h3>Mahasiswa</h3>
                    <p>Login menggunakan NIK (16 digit)</p>
                  </div>
                </div>
                <div className="feature-item">
                  <i className="fa-solid fa-hands-holding-child"></i>
                  <div>
                    <h3>Beasiswa yatim sd/smp/sma</h3>
                    <p>Login menggunakan NPSN (10 digit)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="login-right">
            <div className="login-card">
              <div className="card-header">
                <p>Silakan masuk dengan NIK/NPSN dan password Anda</p>
              </div>

              {errors.message && (
                <div className="alert alert-error">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <span>{errors.message}</span>
                </div>
              )}

              <form onSubmit={login} className="login-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">NIK / NPSN</label>
                    <div className="input-container">
                      <div className="input-icon">
                        <i className="fa fa-id-card"></i>
                      </div>
                      <input
                        type="text"
                        className={`form-input ${errors.nik || errors.nisn ? 'error' : ''}`}
                        value={nik}
                        onChange={(e) => setNik(e.target.value)}
                        placeholder="NIK atau NPSN"
                      />
                    </div>
                    {(errors.nik || errors.npsn) && (
                      <div className="error-message">
                        <i className="fa-solid fa-circle-exclamation"></i>
                        <span>{errors.nik?.[0] || errors.npsn?.[0]}</span>
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
                        placeholder="password"
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
                </div>

                {/* CAPTCHA Section - COMPACT */}
                <div className="form-group">
                  <label className="form-label">VERIFIKASI BUKAN ROBOT</label>
                  <div className="compact-captcha">
                    <div className="captcha-row">
                      <div className="math-display">
                        <div className="question-box">
                          <span className="question">{mathCaptcha.question}</span>
                          <span className="equals">=</span>
                          <div className="answer-input-wrapper">
                            <input
                              type="text"
                              className={`answer-input ${mathCaptcha.verified ? 'verified' : ''}`}
                              value={mathCaptcha.userAnswer}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                setMathCaptcha(prev => ({
                                  ...prev,
                                  userAnswer: value
                                }));
                              }}
                              onKeyPress={handleKeyPress}
                              placeholder="?"
                              disabled={mathCaptcha.verified}
                              maxLength="2"
                            />
                            {mathCaptcha.verified && (
                              <div className="verified-mark">
                                <i className="fa-solid fa-check"></i>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="captcha-actions">
                        {!mathCaptcha.verified ? (
                          <>
                            <button
                              type="button"
                              className="verify-btn"
                              onClick={checkMathAnswer}
                            >
                              <i className="fa-solid fa-check"></i>
                              <span>Verifikasi</span>
                            </button>
                            <button 
                              type="button" 
                              className="refresh-btn"
                              onClick={resetCaptcha}
                            >
                              <i className="fa-solid fa-rotate"></i>
                            </button>
                          </>
                        ) : (
                          <div className="verified-status">
                            <i className="fa-solid fa-shield-check"></i>
                            <span>Terverifikasi</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="captcha-hint">
                      <i className="fa-solid fa-lightbulb"></i>
                      <span>Hitung penjumlahan atau pengurangan sederhana</span>
                    </div>
                  </div>
                </div>

                <div className="form-options">
                  <Link to="/reset" className="forgot-password">
                    Lupa Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className={`login-button ${isLoading ? 'loading' : ''} ${!mathCaptcha.verified ? 'disabled' : ''}`}
                  disabled={isLoading || !mathCaptcha.verified}
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
          
          .login-wrapper {
            display: flex;
            width: 100%;
            max-width: 1000px;
            min-height: 550px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
            position: relative;
            z-index: 2;
          }
          
          .login-left {
            flex: 1;
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            color: white;
            padding: 40px 35px;
            display: flex;
            align-items: center;
          }
          
          .login-left-content {
            width: 100%;
            max-width: 380px;
            margin: 0 auto;
          }
          
          .logo-wrapper {
            text-align: center;
            margin-bottom: 25px;
          }
          
          .logo {
            width: 100px;
            height: 100px;
            object-fit: contain;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            padding: 12px;
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
            font-size: 42px;
            margin: 0 auto;
          }
          
          .app-title {
            font-size: 24px;
            font-weight: 700;
            margin: 0 0 12px;
            line-height: 1.3;
            text-align: center;
          }
          
          .app-subtitle {
            font-size: 14px;
            line-height: 1.5;
            opacity: 0.9;
            margin: 0 0 30px;
            text-align: center;
          }
          
          .features {
            margin-top: 30px;
          }
          
          .feature-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 15px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            margin-bottom: 15px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
          }
          
          .feature-item i {
            font-size: 24px;
            color: #93c5fd;
          }
          
          .feature-item h3 {
            font-size: 16px;
            font-weight: 600;
            margin: 0 0 4px 0;
          }
          
          .feature-item p {
            font-size: 13px;
            opacity: 0.9;
            margin: 0;
          }
          
          .login-right {
            flex: 1;
            padding: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .login-card {
            width: 100%;
            max-width: 420px;
          }
          
          .card-header {
            text-align: center;
            margin-bottom: 25px;
          }
          
          .card-header h2 {
            font-size: 24px;
            font-weight: 700;
            color: #1f2937;
            margin: 0 0 8px;
          }
          
          .card-header p {
            color: #6b7280;
            font-size: 14px;
            margin: 0;
          }
          
          .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 18px;
            margin-bottom: 18px;
          }
          
          .alert {
            padding: 12px 14px;
            border-radius: 8px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 13px;
          }
          
          .alert-error {
            background-color: #fef2f2;
            color: #dc2626;
            border: 1px solid #fecaca;
          }
          
          .form-group {
            margin-bottom: 18px;
          }
          
          .form-label {
            display: block;
            margin-bottom: 6px;
            font-weight: 600;
            color: #374151;
            font-size: 13px;
          }
          
          .input-container {
            position: relative;
            display: flex;
            align-items: center;
          }
          
          .input-icon {
            position: absolute;
            left: 12px;
            color: #9ca3af;
            z-index: 1;
            font-size: 14px;
          }
          
          .form-input {
            width: 100%;
            padding: 12px 12px 12px 38px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            font-size: 14px;
            transition: all 0.2s ease;
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
            right: 12px;
            background: none;
            border: none;
            color: #9ca3af;
            cursor: pointer;
            padding: 6px;
            border-radius: 4px;
            transition: all 0.2s;
            font-size: 14px;
          }
          
          .password-toggle:hover {
            color: #3b82f6;
            background: #f3f4f6;
          }
          
          .error-message {
            color: #ef4444;
            font-size: 11px;
            margin-top: 5px;
            display: flex;
            align-items: center;
            gap: 4px;
          }
          
          /* COMPACT CAPTCHA Styles */
          .compact-captcha {
            background: #f8fafc;
            border: 2px solid #e5e7eb;
            border-radius: 10px;
            padding: 15px;
            user-select: none;
            margin-top: 5px;
          }
          
          .captcha-row {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 10px;
          }
          
          .math-display {
            flex: 1;
          }
          
          .question-box {
            display: flex;
            align-items: center;
            gap: 8px;
            background: white;
            padding: 12px 16px;
            border-radius: 8px;
            border: 2px solid #e5e7eb;
          }
          
          .question {
            font-size: 20px;
            font-weight: 600;
            color: #1f2937;
            font-family: 'Courier New', monospace;
            padding: 0 4px;
          }
          
          .equals {
            font-size: 20px;
            font-weight: 600;
            color: #6b7280;
          }
          
          .answer-input-wrapper {
            position: relative;
            width: 70px;
          }
          
          .answer-input {
            width: 100%;
            padding: 10px 12px;
            border: 2px solid #3b82f6;
            border-radius: 6px;
            font-size: 18px;
            font-weight: 600;
            text-align: center;
            transition: all 0.2s;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: white;
          }
          
          .answer-input:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
            border-color: #1d4ed8;
          }
          
          .answer-input.verified {
            border-color: #10b981;
            background-color: #f0fdf4;
            color: #065f46;
            padding-right: 32px;
          }
          
          .verified-mark {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: #10b981;
            font-size: 14px;
          }
          
          .captcha-actions {
            display: flex;
            gap: 8px;
          }
          
          .verify-btn {
            padding: 10px 16px;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: all 0.2s;
            white-space: nowrap;
          }
          
          .verify-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          }
          
          .verify-btn:active {
            transform: translateY(0);
          }
          
          .refresh-btn {
            padding: 10px 12px;
            background: #f3f4f6;
            border: 1px solid #d1d5db;
            color: #4b5563;
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
          }
          
          .refresh-btn:hover {
            background: #e5e7eb;
            color: #374151;
          }
          
          .verified-status {
            padding: 10px 16px;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
            animation: fadeIn 0.3s ease;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          
          .captcha-hint {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #6b7280;
            font-size: 12px;
            padding-top: 8px;
            border-top: 1px solid #e5e7eb;
          }
          
          .captcha-hint i {
            color: #f59e0b;
            font-size: 12px;
          }
          
          .form-options {
            display: flex;
            justify-content: flex-end;
            margin: 20px 0 25px;
          }
          
          .forgot-password {
            color: #3b82f6;
            font-size: 13px;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.2s;
            padding: 6px 10px;
            border-radius: 5px;
          }
          
          .forgot-password:hover {
            color: #1d4ed8;
            text-decoration: underline;
            background: #f3f4f6;
          }
          
          .login-button {
            width: 100%;
            padding: 14px;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 15px;
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
          
          .login-button:disabled,
          .login-button.disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }
          
          .login-button.loading {
            background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);
          }
          
          .login-footer {
            text-align: center;
            padding-top: 15px;
            border-top: 1px solid #e5e7eb;
          }
          
          .back-link {
            color: #6b7280;
            text-decoration: none;
            font-size: 13px;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: all 0.2s;
            padding: 8px 12px;
            border-radius: 6px;
          }
          
          .back-link:hover {
            color: #3b82f6;
            background: #f3f4f6;
          }
          
          /* Responsive Styles */
          @media (max-width: 992px) {
            .login-wrapper {
              flex-direction: column;
              max-width: 550px;
              min-height: auto;
            }
            
            .login-left {
              padding: 30px 25px;
            }
            
            .login-right {
              padding: 30px 25px;
            }
            
            .login-left-content {
              max-width: 100%;
            }
            
            .form-row {
              grid-template-columns: 1fr;
              gap: 15px;
            }
          }
          
          @media (max-width: 768px) {
            .login-container {
              padding: 15px;
            }
            
            .login-wrapper {
              border-radius: 16px;
            }
            
            .app-title {
              font-size: 22px;
            }
            
            .card-header h2 {
              font-size: 22px;
            }
            
            .captcha-row {
              flex-direction: column;
              gap: 10px;
            }
            
            .question-box {
              width: 100%;
              justify-content: center;
            }
            
            .captcha-actions {
              width: 100%;
              justify-content: center;
            }
            
            .verify-btn, .verified-status {
              flex: 1;
            }
          }
          
          @media (max-width: 480px) {
            .login-container {
              padding: 10px;
            }
            
            .login-wrapper {
              border-radius: 12px;
            }
            
            .login-left {
              padding: 25px 20px;
            }
            
            .login-right {
              padding: 25px 20px;
            }
            
            .app-title {
              font-size: 20px;
            }
            
            .card-header h2 {
              font-size: 20px;
            }
            
            .logo {
              width: 80px;
              height: 80px;
              padding: 10px;
            }
            
            .feature-item {
              padding: 12px;
              gap: 12px;
            }
            
            .feature-item i {
              font-size: 20px;
            }
            
            .feature-item h3 {
              font-size: 15px;
            }
            
            .form-input {
              padding: 10px 10px 10px 35px;
              font-size: 14px;
            }
            
            .input-icon {
              left: 10px;
            }
            
            .question {
              font-size: 18px;
            }
            
            .answer-input {
              font-size: 16px;
              padding: 8px 10px;
            }
            
            .verify-btn, .refresh-btn, .verified-status {
              padding: 8px 12px;
              font-size: 12px;
            }
            
            .login-button {
              padding: 12px;
              font-size: 14px;
            }
          }
          
          @media (max-width: 360px) {
            .app-title {
              font-size: 18px;
            }
            
            .card-header h2 {
              font-size: 18px;
            }
            
            .captcha-hint {
              font-size: 11px;
            }
            
            .question {
              font-size: 16px;
            }
            
            .answer-input {
              font-size: 15px;
            }
          }
        `}</style>
      </div>
    </>
  );
}