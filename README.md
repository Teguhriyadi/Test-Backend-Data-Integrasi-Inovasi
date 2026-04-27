<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

# 🚀 SISTEM AUTHENTIKASI & ROLE BASED ACCESS CONTROL (RBAC)

Project backend ini dibuat menggunakan:

- NestJS
- PostgreSQL
- TypeORM
- JWT Authentication
- bcrypt untuk enkripsi password

---

# 🧠 DESKRIPSI SISTEM

Sistem ini digunakan untuk mengatur:

- Login karyawan
- User dengan multiple role
- Pemilihan role setelah login
- Akses menu berdasarkan role
- Struktur menu bertingkat (tree / nested unlimited)

---

# ✨ FITUR UTAMA

## 1. Login

- User login menggunakan username dan password
- Password sudah di-hash menggunakan bcrypt
- Jika berhasil login, sistem menampilkan daftar role user

---

## 2. Pemilihan Role

- User yang memiliki lebih dari 1 role harus memilih role aktif
- Role yang dipilih akan digunakan untuk membuat JWT token

---

## 3. Menu Management

- Menu berdasarkan role
- Struktur menu bisa bertingkat tanpa batas (tree)
- Menggunakan relasi parent-child

---

# 🔐 ENDPOINT API

## 📌 1. Login

- ENDPOINT : /auth/login (POST):

### Request

```json
{
  "username": "admin",
  "password": "123456"
}
```

### RESPONSE

```json
{
  "statusCode": 200,
  "message": "Login berhasil",
  "data": {
    "userId": 1,
    "roles": [
      {
        "role_id": 1,
        "role_name": "admin"
      },
      {
        "role_id": 2,
        "role_name": "staff"
      }
    ]
  }
}
```

- ENDPOINT : /auth/select-role (POST):

### Request

```json
{
  "userId": 1,
  "roleId": 1
}
```

### RESPONSE :

```json
{
  "statusCode": 200,
  "message": "Login role berhasil dipilih",
  "data": {
    "access_token": "jwt_token_here"
  }
}
```

## 📌 2. Menu

- ENDPOINT : /menu (GET):

### HEADERS :
```json
HEADERS : Authorization: Bearer <token>
```

### RESPONSE :

```json
[
  {
    "id": 1,
    "name": "Menu 1",
    "path": "/menu-1",
    "children": [
      {
        "id": 2,
        "name": "Menu 1.1",
        "path": "/menu-1-1",
        "children": []
      },
      {
        "id": 3,
        "name": "Menu 1.2",
        "path": "/menu-1-2",
        "children": [
          {
            "id": 4,
            "name": "Menu 1.2.1",
            "path": "/menu-1-2-1",
            "children": []
          }
        ]
      }
    ]
  }
]
```
