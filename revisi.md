REVISI 1
```json
1. max upload per field all form
2. nik ditambah NIK / KTP-el
3. gender diganti jenis kelamin
4. registrasi ditambahi alamat lengkap kampus / universitas
5. list perguruan dalam negeri —> sidoarjo dan luar sidoarjo
6. kategori beasiswa —> beasiswa prestasi bidang akademik, beasiswa prestasi bidang non akademik, beasiwa mahasiwa kurang   mampu,beasiswa bidang keagaaman
7. ketika luar negeri —> hanya muncul kategori beasiswa prestasi bidang akademik
8. field IPK harus tanda titik (.) dan dikasih keterangan
9. field Akreditasi Kampus A, B, C, Unggul, Baik, Baik Sekali, Tidak Terakreditasi
10. file akreditasi jurusan dihapus
11. drop down semester dimulai dari semester 2 smp 12
12. hasil akhir masih ditanyakan
13. ditambahkan filed upload bukti akreditasi BAN-PT
14. field akhreditasi kampus dikasih link BAN-PT
15. persyaratan beasiswa luar negeri : GPA (grade point average) /IPK , link dikti (https://beasiswa.kemdikbud.go.id/list-perguruan-tinggi-gtk-s2-ln/, https://beasiswa.kemdikbud.go.id/list-perguruan-tinggi-pta-s3-ln/, https://beasiswa.kemdikbud.go.id/list-perguruan-tinggi-bim-s1-ln/)
16. label Sertifikat /Piagam/Surat Keterangan sesuai Prestasi Bidang yang di isi pendaftar ditambah “Sertifikat /Piagam/Surat Keterangan prestasi bidang ilmu pengetahuan, teknologi, kebudayaan, olahraga, sosial, kemanusiaan, lingkungan, dan nasionalisme tingkat Internasional, Nasional, Provinsi, dan Kabupaten yang dibuktikan dengan sertifikat, piagam, surat keterangan dan/atau bentuk lain yang dipersamakan.”
17. tambah kolom di table user untuk notif WA dan email
18. beasiswa kurang mampu tebalik file upload DTKS
19. label Pilih Salah Satu Terdaftar DTKS atau Tidak Terdaftar DTKS ditambah —> Pilih Salah Satu : terdaftar dalam Data Terpadu Kesejahteraan Sosial (DTKS) atau Non DTKS / SKTM
akredetasi hilang sama upload
bela negara di ganti nasionallisme
```

Revisi 2
```json
1.	Menu Register -> NIK / KTP-EL diganti NIK sesuai KTP-EL dan Nama lengkap sesuai ktp di tambahi KTP-EL
2.	Menu Register -> Title Kelurahan di ganti dengan Desa / Kelurahan
3.	Menu Register -> Field Kodepos dibuat Optioan bisa di isi bisa tidak
4.	Menu Register -> Field RT/RT di default 0 dan Ketika di isi 0 ada popup apakah RT/RW sudah benar?
5.	Menu Register -> File No KK bisa libih dari 1
6.	Semua placeholder dan title harus Bahasa Indonesia
7.	Penambahan upload file surat keterangan tidak sedang menerima beasiswa lain untuk beasiswa dalam negeri
8.	Pilihan Sidoarjo dan luar sidoarjo tidak bisa
9.	IPK dibuat 2 angka dibelakang koma (,) atau titik (.)
10.	Title Masing-masing beasiswa tidak sesuai
11.	Kategori non akademik -> upload setifikat, ada penambahan field tingkatan (Internasional, Nasional, Provinsi, Kabupaten)
12.	Upload sertifikat kata-kata Terbaru dihilangkan
==========
13.	Beasiswa Kesra -> non muslim -> ada title ponpes
14.	Tambahan form survey lapangan dinsos -> menunggu kiriman form dari dinsos
15.	Tambah menu login untuk akun DISPENDUKCAPIL
```

## tipe kesra A

```json
-Hafal minimal 10 (sepuluh) juz A1-Qur'an : Sertifikat / SK .
-Pernah mengikuti kejuaraan MTQ : Sertifikat / SK .
-Prestasi lain di bidang keagamaan : sertifikat atau surat keterangan dan/atau bentuk lain yang dipersamakan .

1. hafal minimal 10 (sepuluh) juz A1-Qur'an : Sertifikat / SK 
2. Pernah mengikuti kejuaraan MTQ : Sertifikat / SK
3. Prestasi lain di bidang keagamaan :  sertifikat atau surat keterangan dan/atau bentuk lain yang dipersamakan
```

## tipe kesra B

```json
-Santriwan dan Santriwati yang berkuliah dan menetap di Pondok Pesantren : Surat Ket Ponpes.
-Ustadz/ustadzah sebagai guru ngaji di TPA/TPQ/ Madin : Surat Rekomendasi Kepala TPQ atau Madrasah Diniyah .

1. Santriwan dan Santriwati yang berkuliah dan menetap di Pondok Pesantren : Surat Ket Ponpes
2. Ustadz/ustadzah sebagai guru ngaji di TPA/TPQ/ Madin : Surat Rekomendasi Kepala TPQ atau Madrasah Diniyah
```

## tipe kesra C

```json
-Jajaran pengurus harian (Ketua, Wakil Ketua, Sekretaris, Bendahara) aktifis organisasi keagamaan tingkat Kabupaten/ Kecamatan dan/ atau perguruan tinggi.

1. Jajaran pengurus (Ketua, Wakil Ketua, Sekretaris, Bendahara) aktifis organisasi keagamaan tingkat Kabupaten/Kecamatan dan/atau perguruan tinggi

```

# tipe kesra D

```json
-(Khusus Non Muslim) tercatat sebagai pengurus/aktifis atau mempunyai piagam kejuaraan bidang keagamaan.

1. Piagam kejuaraan keagamaan
2. Pengurus atau Aktifis Keagamaan
```