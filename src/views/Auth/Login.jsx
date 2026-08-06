import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Api from "../../services/Api";
import LayoutWeb from "../../layouts/Web";

export default function Login() {
  // Title Page
  document.title = "Login - Beasiswa Sidoarjo";

  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  
  // State Math Captcha
  const [mathCaptcha, setMathCaptcha] = useState({
    question: '',
    answer: 0,
    userAnswer: '',
    verified: false
  });

  const navigate = useNavigate();

  // Initialize Captcha
  useEffect(() => {
    generateMathQuestion();
  }, []);

  const generateMathQuestion = () => {
    const useAddition = Math.random() > 0.5;
    let num1, num2, answer;
    
    if (useAddition) {
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      answer = num1 + num2;
      
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
      num1 = Math.floor(Math.random() * 15) + 5;
      num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
      answer = num1 - num2;
      
      setMathCaptcha({
        question: `${num1} - ${num2}`,
        answer: answer,
        userAnswer: '',
        verified: false
      });
    }
  };

  const checkMathAnswer = () => {
    if (mathCaptcha.userAnswer.trim() === '') {
      toast.error("Masukkan jawaban verifikasi!", { position: "top-right", duration: 2000 });
      return;
    }
    
    const userAnswer = parseInt(mathCaptcha.userAnswer);
    if (isNaN(userAnswer)) {
      toast.error("Jawaban harus berupa angka!", { position: "top-right", duration: 2000 });
      return;
    }
    
    if (userAnswer === mathCaptcha.answer) {
      setMathCaptcha(prev => ({ ...prev, verified: true }));
      toast.success("Verifikasi berhasil!", { position: "top-right", duration: 1500 });
    } else {
      toast.error("Jawaban salah! Silakan coba lagi.", { position: "top-right", duration: 2000 });
      setTimeout(() => {
        generateMathQuestion();
      }, 1500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !mathCaptcha.verified) {
      checkMathAnswer();
    }
  };

  const resetCaptcha = () => {
    generateMathQuestion();
  };

  const login = async (e) => {
    e.preventDefault();
    
    if (!mathCaptcha.verified) {
      toast.error("Harap verifikasi captcha terlebih dahulu!", { position: "top-right", duration: 3000 });
      return;
    }
    
    setLoading(true);
    
    const isNISN = /^\d{10}$/.test(nik);
    const isNIK = /^\d{16}$/.test(nik);
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
        
        toast.success("Login Berhasil!", { position: "top-right", duration: 3000 });
        navigate("/admin/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        resetCaptcha();
        setErrors(error.response?.data || { message: "NIK / NPSN atau Password yang Anda masukkan salah!" });
      });
  };

  if (Cookies.get("token")) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <LayoutWeb hideFooter={true}>
      {/* EXACT SAWERIA LOGIN CONTAINER */}
      <div className="py-5 d-flex align-items-center justify-content-center" style={{ minHeight: "85vh", background: "#f4fbf7" }}>
        <div className="w-100" style={{ maxWidth: "480px", padding: "0 16px" }}>
          
          {/* SAWERIA 3D CARD */}
          <div style={{
            background: "#ffffff",
            border: "2.5px solid #1e293b",
            boxShadow: "8px 8px 0px #1e293b",
            borderRadius: "16px",
            padding: "36px 32px",
            fontFamily: "var(--font-family-code)"
          }}>

            {/* TOP MASCOT ILLUSTRATION */}
            <div className="text-center mb-3">
              <div className="d-inline-flex align-items-center justify-content-center" style={{
                width: 68,
                height: 68,
                borderRadius: "20px",
                background: "var(--saweria-green-bright)",
                border: "2.5px solid #1e293b",
                boxShadow: "3px 3px 0px #1e293b",
                fontSize: "1.8rem",
                color: "#1e293b",
                marginBottom: "12px"
              }}>
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h4 className="m-0 font-extrabold text-slate-900" style={{ fontFamily: "var(--font-family-base)", fontSize: "1.35rem", letterSpacing: "-0.5px" }}>
                beasiswa.sidoarjo
              </h4>
            </div>

            {/* LOGIN TITLE */}
            <h2 className="text-center font-bold text-slate-900 mb-4" style={{ fontSize: "1.85rem", letterSpacing: "-0.5px" }}>
              Login
            </h2>

            {/* ERROR ALERT */}
            {errors.message && (
              <div className="p-3 bg-rose-100 border-2 border-slate-900 rounded-3 mb-4 text-rose-900 font-bold text-xs" style={{ boxShadow: "3px 3px 0px #1e293b" }}>
                <i className="fas fa-exclamation-triangle me-1"></i> {errors.message}
              </div>
            )}

            <form onSubmit={login}>
              {/* NIK / NPSN FIELD */}
              <div className="mb-4">
                <label className="form-label d-block text-slate-800 font-bold text-sm mb-1" style={{ fontFamily: "var(--font-family-code)" }}>
                  NIK / NPSN: <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  className="form-control text-slate-900 font-bold"
                  style={{
                    background: "transparent",
                    border: "none",
                    borderBottom: "2.5px solid #1e293b",
                    borderRadius: "0",
                    boxShadow: "none",
                    padding: "8px 0",
                    fontFamily: "var(--font-family-code)",
                    fontSize: "0.95rem"
                  }}
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                  placeholder="masukkan 16 digit NIK atau NPSN"
                  required
                />
              </div>

              {/* PASSWORD FIELD */}
              <div className="mb-4">
                <label className="form-label d-block text-slate-800 font-bold text-sm mb-1" style={{ fontFamily: "var(--font-family-code)" }}>
                  Password: <span className="text-rose-500">*</span>
                </label>
                <div className="position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control text-slate-900 font-bold"
                    style={{
                      background: "#ffffff",
                      border: "2.5px solid #1e293b",
                      borderRadius: "12px",
                      boxShadow: "3px 3px 0px #1e293b",
                      padding: "10px 45px 10px 14px",
                      fontFamily: "var(--font-family-code)",
                      fontSize: "0.95rem"
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="masukkan password"
                    required
                  />
                  <button
                    type="button"
                    className="btn position-absolute top-50 translate-middle-y border-0 text-slate-600"
                    style={{
                      right: "12px",
                      background: "transparent",
                      padding: "4px 8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      zIndex: 5
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  >
                    <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} fs-6`}></i>
                  </button>
                </div>
              </div>

              {/* SAWERIA STYLE CAPTCHA BOX (FRESH MINT BACKGROUND) */}
              <div className="p-3 mb-4 rounded-3 d-flex align-items-center justify-content-between" style={{
                background: "#e6f4ec",
                border: "2.5px solid #1e293b",
                boxShadow: "3px 3px 0px #1e293b"
              }}>
                <div className="d-flex align-items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm" style={{ fontFamily: "var(--font-family-code)" }}>
                    {mathCaptcha.question} =
                  </span>
                  <input
                    type="text"
                    className="form-control text-center font-bold"
                    style={{
                      width: "60px",
                      border: "2px solid #1e293b",
                      borderRadius: "8px",
                      padding: "4px 8px",
                      fontSize: "0.9rem",
                      background: "#ffffff"
                    }}
                    value={mathCaptcha.userAnswer}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setMathCaptcha((prev) => ({ ...prev, userAnswer: value }));
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder="?"
                    disabled={mathCaptcha.verified}
                    maxLength="2"
                  />
                </div>

                <div>
                  {!mathCaptcha.verified ? (
                    <div className="d-flex gap-1">
                      <button
                        type="button"
                        className="btn font-bold text-xs"
                        style={{
                          background: "var(--saweria-teal)",
                          color: "#1e293b",
                          border: "2px solid #1e293b",
                          boxShadow: "2px 2px 0px #1e293b",
                          borderRadius: "8px",
                          padding: "6px 12px"
                        }}
                        onClick={checkMathAnswer}
                      >
                        Verifikasi
                      </button>
                      <button
                        type="button"
                        className="btn font-bold text-xs"
                        style={{
                          background: "#ffffff",
                          color: "#1e293b",
                          border: "2px solid #1e293b",
                          boxShadow: "2px 2px 0px #1e293b",
                          borderRadius: "8px",
                          padding: "6px 10px"
                        }}
                        onClick={resetCaptcha}
                      >
                        <i className="fas fa-rotate"></i>
                      </button>
                    </div>
                  ) : (
                    <span className="badge font-black text-xs px-2.5 py-1.5 rounded-2" style={{ backgroundColor: "#34d399", color: "#1e293b", border: "2px solid #1e293b", boxShadow: "2px 2px 0px #1e293b" }}>
                      <i className="fas fa-check me-1 text-slate-900"></i> Verifikasi OK
                    </span>
                  )}
                </div>
              </div>

              {/* BUTTON & LUPA PASSWORD ROW */}
              <div className="d-flex align-items-center justify-content-between mt-4">
                <Link to="/reset" className="text-slate-800 text-decoration-none font-bold text-sm" style={{ fontFamily: "var(--font-family-code)" }}>
                  Lupa Password
                </Link>

                <button
                  type="submit"
                  className="btn font-bold text-base px-4 py-2"
                  disabled={isLoading || !mathCaptcha.verified}
                  style={{
                    background: "var(--saweria-teal)",
                    color: "#1e293b",
                    border: "2.5px solid #1e293b",
                    boxShadow: "4px 4px 0px #1e293b",
                    borderRadius: "10px",
                    opacity: !mathCaptcha.verified ? 0.7 : 1,
                    transition: "all 0.15s ease"
                  }}
                >
                  {isLoading ? "Memuat..." : "Masuk"}
                </button>
              </div>

              {/* REGISTER LINK */}
              <div className="text-center mt-4 pt-3" style={{ borderTop: "2px solid #1e293b" }}>
                <span className="text-slate-700 text-xs font-bold me-1" style={{ fontFamily: "var(--font-family-code)" }}>Belum punya akun?</span>
                <Link to="/registers" className="text-emerald-700 text-decoration-none font-bold text-xs" style={{ fontFamily: "var(--font-family-code)" }}>
                  Daftar Sekarang &rarr;
                </Link>
              </div>
            </form>
          </div>

        </div>
      </div>
    </LayoutWeb>
  );
}