import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Api from "../../services/Api";
import LayoutWeb from "../../layouts/Web";

export default function LupaPassword() {
  // Title Page
  document.title = "Reset Password - Beasiswa Sidoarjo";

  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  // State Math Captcha
  const [mathCaptcha, setMathCaptcha] = useState({
    question: "",
    answer: 0,
    userAnswer: "",
    verified: false,
  });

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
        userAnswer: "",
        verified: false,
      });
    } else {
      num1 = Math.floor(Math.random() * 15) + 5;
      num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
      answer = num1 - num2;

      setMathCaptcha({
        question: `${num1} - ${num2}`,
        answer: answer,
        userAnswer: "",
        verified: false,
      });
    }
  };

  const checkMathAnswer = () => {
    if (mathCaptcha.userAnswer.trim() === "") {
      toast.error("Masukkan jawaban verifikasi!", {
        position: "top-center",
        duration: 2000,
      });
      return;
    }

    const userAnswer = parseInt(mathCaptcha.userAnswer);
    if (isNaN(userAnswer)) {
      toast.error("Jawaban harus berupa angka!", {
        position: "top-center",
        duration: 2000,
      });
      return;
    }

    if (userAnswer === mathCaptcha.answer) {
      setMathCaptcha((prev) => ({ ...prev, verified: true }));
      toast.success("Verifikasi berhasil!", {
        position: "top-center",
        duration: 1500,
      });
    } else {
      toast.error("Jawaban salah! Silakan coba lagi.", {
        position: "top-center",
        duration: 2000,
      });
      setTimeout(() => {
        generateMathQuestion();
      }, 1500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !mathCaptcha.verified) {
      checkMathAnswer();
    }
  };

  const resetCaptcha = () => {
    generateMathQuestion();
  };

  const reset = async (e) => {
    e.preventDefault();

    if (!mathCaptcha.verified) {
      toast.error("Harap verifikasi captcha terlebih dahulu!", {
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Sedang memproses & mengirim link reset ke email...", {
      position: "top-center",
    });

    await Api.post("/api/send-welcome-email", {
      email: email,
    })
      .then((response) => {
        setLoading(false);
        setIsSuccess(true);
        console.log(response);

        toast.success("Reset password berhasil! Silakan periksa inbox/spam email Anda.", {
          id: toastId,
          position: "top-center",
          duration: 6000,
        });
      })
      .catch((error) => {
        setLoading(false);
        toast.dismiss(toastId);
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        } else {
          toast.error("Gagal mengirim email reset password! Periksa koneksi atau email Anda.", {
            position: "top-center",
            duration: 3000,
          });
        }
      });
  };

  return (
    <LayoutWeb>
      {/* HERO SECTION (SAWERIA 3D RETRO STYLE) */}
      <section className="saweria-hero-section text-center py-5">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="saweria-mascot-badge">
            <i className="fas fa-key text-rose-500 me-1"></i>
            <span>Reset Password Beasiswa Sidoarjo</span>
          </div>

          <h1 className="hero-title-3d">
            Lupa Password? <br />
            <span className="hero-title-highlight mt-3 d-inline-block">Kami Siap Membantu</span>
          </h1>

          <p className="hero-subtitle-3d mx-auto">
            Masukkan alamat email terdaftar Anda. Tautan instruksi pemulihan kata sandi baru akan dikirimkan secara resmi ke email Anda.
          </p>
        </div>
      </section>

      {/* MAIN FORM SECTION */}
      <section className="py-5 bg-white border-bottom border-slate-900">
        <div className="container max-w-xl mx-auto px-4">
          <div
            className="saweria-3d-card p-4 p-md-5 text-start"
            style={{
              background: "#ffffff",
              border: "2.5px solid #1e293b",
              boxShadow: "8px 8px 0px #1e293b",
              borderRadius: "18px",
            }}
          >
            {isSuccess ? (
              <div
                className="p-4 rounded-3 text-center"
                style={{
                  background: "#e6f4ec",
                  border: "2.5px solid #1e293b",
                  boxShadow: "4px 4px 0px #1e293b",
                }}
              >
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                  style={{
                    width: "70px",
                    height: "70px",
                    backgroundColor: "#34d399",
                    color: "#1e293b",
                    border: "2.5px solid #1e293b",
                    boxShadow: "3px 3px 0px #1e293b",
                  }}
                >
                  <i className="fas fa-paper-plane" style={{ fontSize: "2rem" }}></i>
                </div>
                <h4 className="fw-black text-slate-900 fs-5 mb-2">
                  Instruksi Reset Berhasil Dikirim!
                </h4>
                <p className="text-slate-700 font-bold text-sm leading-relaxed mb-4">
                  Tautan & petunjuk reset password telah sukses dikirimkan ke alamat email{" "}
                  <strong>{email}</strong>. Silakan periksa pesan pada <strong>Kotak Masuk (Inbox)</strong> atau <strong>Folder Spam</strong> email Anda.
                </p>

                <div className="d-flex flex-wrap align-items-center justify-content-center gap-2">
                  <Link
                    to="/login"
                    className="btn-saweria-3d-teal px-4 py-2.5 font-black text-sm d-inline-flex align-items-center gap-2"
                  >
                    <i className="fas fa-arrow-left"></i> Kembali ke Login
                  </Link>
                  <button
                    type="button"
                    className="btn btn-sm btn-white border-dark font-black px-3 py-2 text-xs"
                    style={{
                      border: "2px solid #1e293b",
                      boxShadow: "2px 2px 0px #1e293b",
                      borderRadius: "8px",
                      background: "#ffffff",
                    }}
                    onClick={() => {
                      setIsSuccess(false);
                      generateMathQuestion();
                    }}
                  >
                    <i className="fas fa-rotate me-1"></i> Kirim Ulang
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Header Icon & Intro Box */}
                <div
                  className="p-3 mb-4 d-flex align-items-center gap-3"
                  style={{
                    background: "#fffbeb",
                    border: "2.5px solid #1e293b",
                    borderRadius: "12px",
                    boxShadow: "3px 3px 0px #1e293b",
                  }}
                >
                  <div
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "10px",
                      background: "#fbbf24",
                      border: "2px solid #1e293b",
                      boxShadow: "2px 2px 0px #1e293b",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                      color: "#1e293b",
                      flexShrink: 0,
                    }}
                  >
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <strong className="d-block font-black text-slate-900 text-sm">
                      Pemulihan Kata Sandi Akun
                    </strong>
                    <span className="text-slate-700 text-xs font-extrabold">
                      Pastikan email yang dimasukkan sesuai dengan email pendaftaran akun Anda.
                    </span>
                  </div>
                </div>

                {/* Error Notification */}
                {errors.message && (
                  <div
                    className="p-3 mb-4 text-xs font-bold text-rose-900 d-flex align-items-center gap-2"
                    style={{
                      background: "#ffe4e6",
                      border: "2px solid #1e293b",
                      boxShadow: "3px 3px 0px #1e293b",
                      borderRadius: "10px",
                    }}
                  >
                    <i className="fas fa-circle-exclamation text-rose-600 fs-6"></i>
                    <span>{errors.message}</span>
                  </div>
                )}

            <form onSubmit={reset}>
              {/* EMAIL FIELD */}
              <div className="mb-4">
                <label
                  className="form-label d-block text-slate-800 font-bold text-sm mb-1"
                  style={{ fontFamily: "var(--font-family-code)" }}
                >
                  Alamat Email Terdaftar: <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  className="form-control text-slate-900 font-bold"
                  style={{
                    background: "transparent",
                    border: "none",
                    borderBottom: "2.5px solid #1e293b",
                    borderRadius: "0",
                    boxShadow: "none",
                    padding: "8px 0",
                    fontFamily: "var(--font-family-code)",
                    fontSize: "0.95rem",
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contoh: nama@domain.com"
                  required
                />
              </div>

              {/* SAWERIA STYLE CAPTCHA BOX (FRESH MINT BACKGROUND) */}
              <div
                className="p-3 mb-4 rounded-3 d-flex align-items-center justify-content-between"
                style={{
                  background: "#e6f4ec",
                  border: "2.5px solid #1e293b",
                  boxShadow: "3px 3px 0px #1e293b",
                }}
              >
                <div className="d-flex align-items-center gap-2">
                  <span
                    className="font-bold text-slate-900 text-sm"
                    style={{ fontFamily: "var(--font-family-code)" }}
                  >
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
                      background: "#ffffff",
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
                          padding: "6px 12px",
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
                          padding: "6px 10px",
                        }}
                        onClick={resetCaptcha}
                      >
                        <i className="fas fa-rotate"></i>
                      </button>
                    </div>
                  ) : (
                    <span
                      className="badge font-black text-xs px-2.5 py-1.5 rounded-2"
                      style={{
                        backgroundColor: "#34d399",
                        color: "#1e293b",
                        border: "2px solid #1e293b",
                        boxShadow: "2px 2px 0px #1e293b",
                      }}
                    >
                      <i className="fas fa-check me-1 text-slate-900"></i> Verifikasi OK
                    </span>
                  )}
                </div>
              </div>

              {/* BUTTON & BACK TO LOGIN ROW */}
              <div className="d-flex align-items-center justify-content-between mt-4">
                <Link
                  to="/login"
                  className="text-slate-800 text-decoration-none font-bold text-sm"
                  style={{ fontFamily: "var(--font-family-code)" }}
                >
                  &larr; Kembali ke Login
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
                    transition: "all 0.15s ease",
                  }}
                >
                  {isLoading ? "Mengirim..." : "Kirim Link Reset"}
                </button>
              </div>
            </form>
          </>
        )}
          </div>
        </div>
      </section>
    </LayoutWeb>
  );
}