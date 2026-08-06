import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export default function AutoUpdateChecker() {
  const location = useLocation();
  const currentHashRef = useRef(null);
  const isReloadingRef = useRef(false);

  const checkVersion = async () => {
    if (isReloadingRef.current) return;

    try {
      // Fetch index.html dengan query timestamp agar tidak terkena cache lokal
      const response = await fetch(`/index.html?t=${new Date().getTime()}`, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache",
        },
      });

      if (!response.ok) return;

      const htmlText = await response.text();
      // Ekstrak nama file script js yang di-bundle oleh Vite (contoh: index.a39561cb.js)
      const match = htmlText.match(/\/assets\/index\.[a-zA-Z0-9_-]+\.js/);

      if (match && match[0]) {
        const serverScriptPath = match[0];

        if (currentHashRef.current === null) {
          // Pertama kali load, simpan hash versi saat ini
          currentHashRef.current = serverScriptPath;
        } else if (currentHashRef.current !== serverScriptPath) {
          // Versi di server berbeda dengan versi yang sedang berjalan!
          isReloadingRef.current = true;
          toast.loading("Versi aplikasi terbaru tersedia. Memuat ulang halaman...", {
            position: "top-center",
            duration: 2000,
          });

          setTimeout(() => {
            window.location.reload(true);
          }, 1000);
        }
      }
    } catch (err) {
      console.warn("Gagal mengecek versi terbaru:", err);
    }
  };

  // Cek versi saat perpindahan halaman
  useEffect(() => {
    checkVersion();
  }, [location.pathname]);

  // Cek versi secara berkala setiap 60 detik
  useEffect(() => {
    const interval = setInterval(() => {
      checkVersion();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
