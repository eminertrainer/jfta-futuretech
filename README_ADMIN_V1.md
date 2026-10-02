# JFTA Admin Selection Dashboard V1

## Tambah ke repo sedia ada
Salin folder/fail ini ke root repo `jfta-futuretech`:
- public/admin/index.html
- functions/api/admin/applications.js
- functions/api/admin/evaluation.js
- functions/api/admin/export.js
- admin_schema.sql

JANGAN padam `public/index.html`, `functions/api/register.js` atau fail sedia ada.

## 1. Jalankan SQL
Cloudflare > D1 > jfta-applications > Console.
Jalankan keseluruhan `admin_schema.sql`.

## 2. Upload ke GitHub
Selepas upload, struktur perlu jadi:
public/
  index.html
  admin/index.html
functions/
  api/
    register.js
    admin/
      applications.js
      evaluation.js
      export.js

Commit dan tunggu Cloudflare auto-deploy.

## 3. Test dashboard
Buka:
https://futuretech.andaitech.my/admin/

Semak data calon muncul. Cuba skor pada rekod TEST.

## 4. Cloudflare Access
Selepas dashboard berfungsi, lindungi KEDUA-DUA path:
- futuretech.andaitech.my/admin/*
- futuretech.andaitech.my/api/admin/*

Jangan lindungi `/api/register`.

Policy: Allow only email yang Dr. benarkan. Kaedah mudah: One-time PIN melalui email.

## Skor manual
- Minat & motivasi: 0–4
- Minat teknologi: 0–2
- Sikap apabila menghadapi kesukaran: 0–4
Jumlah: 10

Word/Excel/AI/Coding = baseline sahaja.

## Status
Belum Dinilai / Shortlist / Dipilih / Simpanan / Tidak Dipilih
