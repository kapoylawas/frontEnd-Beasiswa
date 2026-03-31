<?php
/**
 * Script untuk clear OPcache manual
 * Akses via browser: https://beasiswa.sidoarjokab.go.id/clear-cache.php
 */

// Check jika ada parameter 'clear'
if (isset($_GET['clear']) && $_GET['clear'] === 'true') {
    // Clear OPcache
    if (function_exists('opcache_reset')) {
        opcache_reset();
        echo "✅ OPcache berhasil di-clear!<br>";
    } else {
        echo "⚠️ OPcache tidak tersedia<br>";
    }
    
    // Clear realfile cache
    if (function_exists('opcache_invalidate')) {
        $files = [
            __FILE__,
            dirname(__DIR__) . '/index.php',
        ];
        
        foreach ($files as $file) {
            if (file_exists($file)) {
                opcache_invalidate($file, true);
            }
        }
        echo "✅ Realfile cache di-clear!<br>";
    }
    
    echo "<hr>";
    echo "📊 <strong>OPcache Status:</strong><br>";
    
    if (function_exists('opcache_get_status')) {
        $status = opcache_get_status();
        if ($status) {
            echo "<pre>" . print_r($status, true) . "</pre>";
        } else {
            echo "OPcache tidak aktif atau belum ada cache";
        }
    }
    
    echo "<br><a href='?'>Kembali ke status</a>";
    exit;
}

// Tampilkan status OPcache
?>
<!DOCTYPE html>
<html>
<head>
    <title>Clear Cache - Beasiswa Sidoarjo</title>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 { color: #333; }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            background: #dc3545;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            margin: 10px 0;
        }
        .btn:hover { background: #c82333; }
        .status {
            padding: 15px;
            background: #e7f3ff;
            border-left: 4px solid #2196F3;
            margin: 20px 0;
        }
        pre {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 4px;
            overflow-x: auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🧹 Clear OPcache</h1>
        
        <div class="status">
            <strong>Status OPcache:</strong><br>
            <?php
            if (function_exists('opcache_get_status')) {
                $status = opcache_get_status();
                if ($status && isset($status['opcache_enabled']) && $status['opcache_enabled']) {
                    echo "✅ OPcache <strong>AKTIF</strong><br>";
                    echo "Memory used: " . number_format($status['memory_usage']['used_memory'] / 1024 / 1024, 2) . " MB<br>";
                    echo "Cached files: " . $status['opcache_statistics']['num_cached_files'];
                } else {
                    echo "⚠️ OPcache <strong>TIDAK AKTIF</strong>";
                }
            } else {
                echo "❌ OPcache <strong>TIDAK TERSEDIA</strong>";
            }
            ?>
        </div>
        
        <p>
            Klik tombol di bawah untuk clear OPcache server:
        </p>
        
        <a href="?clear=true" class="btn" onclick="return confirm('Yakin ingin clear OPcache?')">
            🗑️ Clear OPcache Sekarang
        </a>
        
        <hr style="margin: 30px 0;">
        
        <h3>📖 Instruksi:</h3>
        <ol>
            <li>Klik tombol "Clear OPcache Sekarang"</li>
            <li>OPcache akan di-reset otomatis</li>
            <li>Refresh halaman ini untuk melihat perubahan</li>
        </ol>
        
        <div style="margin-top: 30px; padding: 15px; background: #fff3cd; border-left: 4px solid #ffc107;">
            <strong>⚠️ Catatan:</strong><br>
            - Script ini hanya clear OPcache server (PHP)<br>
            - Browser user tetap perlu clear cache sendiri<br>
            - Untuk clear browser cache, sudah ada Service Worker yang auto-update
        </div>
    </div>
</body>
</html>
