# 🚀 Kompletny Przewodnik Wdrożenia URBNCTRL na Render.com

## 📋 **Przegląd Architektury**

Twoja aplikacja URBNCTRL składa się z **3 głównych komponentów**:

### **🏗️ Komponenty:**
1. **Backend API** (Spring Boot + PostgreSQL)
2. **Admin Panel** (React + Vite)
3. **Frontend** (React + Vite) ← **NOWO DODANY!**

### **🌐 URL-e po wdrożeniu:**
- **Backend:** `https://urbnctrl-backend.onrender.com`
- **Admin Panel:** `https://urbnctrl-admin-x6jn.onrender.com`
- **Frontend:** `https://urbnctrl-frontend-j99n.onrender.com` ← **AKTUALNY!**

---

## 🎯 **KROK 1: Przygotowanie Repozytorium**

### **1.1 Struktura Projektu**
```
URBNCTRL/
├── backend/          # Spring Boot API
├── admin/           # React Admin Panel
├── frontend/        # React Frontend ← NOWY!
├── render.yaml      # Konfiguracja Render
└── README.md
```

### **1.2 Sprawdź czy masz wszystkie pliki:**
- ✅ `backend/Dockerfile`
- ✅ `admin/Dockerfile`
- ✅ `frontend/vite.config.js` ← **NOWY!**
- ✅ `render.yaml` (zaktualizowany)
- ✅ `docker-compose.yml`

---

## 🎯 **KROK 2: Konfiguracja Render Blueprint**

### **2.1 render.yaml - Kompletna Konfiguracja**

```yaml
services:
  # Backend API
  - type: web
    name: urbnctrl-backend
    env: docker
    plan: free
    rootDir: backend
    envVars:
      - key: DATABASE_USER
        fromDatabase:
          name: urbnctrl-db
          property: username
      - key: DATABASE_PASSWORD
        fromDatabase:
          name: urbnctrl-db
          property: password
      - key: SPRING_PROFILES_ACTIVE
        value: docker

  # Admin Panel
  - type: web
    name: urbnctrl-admin
    env: docker
    plan: free
    rootDir: admin
    envVars:
      - key: REACT_APP_API_URL
        value: https://urbnctrl-backend.onrender.com/api

  # Frontend ← AKTUALNY!
  - type: web
    name: urbnctrl-frontend-j99n
    env: static
    plan: free
    rootDir: frontend
    buildCommand: npm install && npm run build
    staticPublishPath: ./dist
    envVars:
      - key: REACT_APP_API_URL
        value: https://urbnctrl-backend.onrender.com/api

databases:
  - name: urbnctrl-db
    databaseName: urbnctrl_db
    user: urbnctrl_user
```

---

## 🎯 **KROK 3: Wdrożenie na Render**

### **3.1 Tworzenie Blueprint**

1. **Przejdź do Render Dashboard**
2. **Kliknij "New" → "Blueprint"**
3. **Połącz z repozytorium:** `JakubStankiewicz1/URBNCTRL`
4. **Kliknij "Apply"**

### **3.2 Render automatycznie utworzy:**

#### **🗄️ Baza Danych:**
- **Nazwa:** `urbnctrl-db`
- **Typ:** PostgreSQL
- **Plan:** Free

#### **🔧 Backend API:**
- **Nazwa:** `urbnctrl-backend`
- **Typ:** Web Service (Docker)
- **URL:** `https://urbnctrl-backend.onrender.com`

#### **⚙️ Admin Panel:**
- **Nazwa:** `urbnctrl-admin`
- **Typ:** Web Service (Docker)
- **URL:** `https://urbnctrl-admin-x6jn.onrender.com`

#### **🌐 Frontend:** ← **AKTUALNY!**
- **Nazwa:** `urbnctrl-frontend-j99n`
- **Typ:** Static Site
- **URL:** `https://urbnctrl-frontend-j99n.onrender.com`

---

## 🎯 **KROK 4: Konfiguracja Environment Variables**

### **4.1 Backend Environment Variables**
W **"urbnctrl-backend"** → **"Environment":**

| Key | Value |
|-----|-------|
| `DATABASE_USER` | `urbnctrl_user` |
| `DATABASE_PASSWORD` | `twoje_rzeczywiste_hasło` |
| `SPRING_PROFILES_ACTIVE` | `docker` |

### **4.2 Admin Panel Environment Variables**
W **"urbnctrl-admin"** → **"Environment":**

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | `https://urbnctrl-backend.onrender.com/api` |

### **4.3 Frontend Environment Variables** ← **AKTUALNY!**
W **"urbnctrl-frontend-j99n"** → **"Environment":**

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | `https://urbnctrl-backend.onrender.com/api` |

---

## 🎯 **KROK 5: Testowanie**

### **5.1 Test Backend**
```
https://urbnctrl-backend.onrender.com/api/simple-products/test
```
**Oczekiwany wynik:** `"SimpleProduct API is working!"`

### **5.2 Test Admin Panel**
```
https://urbnctrl-admin-x6jn.onrender.com
```
**Oczekiwane:** Panel logowania, możliwość zarządzania produktami

### **5.3 Test Frontend** ← **AKTUALNY!**
```
https://urbnctrl-frontend-j99n.onrender.com
```
**Oczekiwane:** Strona główna, sklep, wszystkie funkcje frontend

---

## 🎯 **KROK 6: Sprawdzenie Logów**

### **6.1 Backend Logs**
1. **Przejdź do "urbnctrl-backend"**
2. **Kliknij "Logs"**
3. **Sprawdź czy nie ma błędów CORS**

### **6.2 Admin Panel Logs**
1. **Przejdź do "urbnctrl-admin"**
2. **Kliknij "Logs"**
3. **Sprawdź czy build przebiegł pomyślnie**

### **6.3 Frontend Logs** ← **AKTUALNY!**
1. **Przejdź do "urbnctrl-frontend-j99n"**
2. **Kliknij "Logs"**
3. **Sprawdź czy build przebiegł pomyślnie**

---

## 🔧 **Rozwiązywanie Problemów**

### **Problem 1: CORS Errors**
**Rozwiązanie:** Sprawdź czy w backend CORS zawiera wszystkie domeny:
```java
@CrossOrigin(origins = {
    "https://urbnctrl-frontend-j99n.onrender.com",
    "https://urbnctrl-admin-x6jn.onrender.com",
    "https://*.onrender.com"
})
```

### **Problem 2: Build Failures**
**Rozwiązanie:** Sprawdź logi w Render Dashboard

### **Problem 3: Database Connection**
**Rozwiązanie:** Sprawdź environment variables w backend

---

## 📊 **Podsumowanie Wdrożenia**

### **✅ Co zostało wdrożone:**
- 🗄️ **PostgreSQL Database** na Render
- 🔧 **Spring Boot Backend** (Docker)
- ⚙️ **React Admin Panel** (Docker)
- 🌐 **React Frontend** (Static Site) ← **AKTUALNY!**

### **🌐 URL-e:**
- **Backend:** `https://urbnctrl-backend.onrender.com`
- **Admin:** `https://urbnctrl-admin-x6jn.onrender.com`
- **Frontend:** `https://urbnctrl-frontend-j99n.onrender.com`

### **🔗 Integracja:**
- ✅ **Frontend** ↔ **Backend** (CORS skonfigurowany)
- ✅ **Admin Panel** ↔ **Backend** (CORS skonfigurowany)
- ✅ **Wszystkie aplikacje** ↔ **Database**

---

## 🎉 **Gratulacje!**

Twoja aplikacja URBNCTRL jest teraz **w pełni wdrożona na Render** z **3 komponentami**:

1. **Backend API** - obsługuje logikę biznesową
2. **Admin Panel** - zarządzanie produktami i zamówieniami
3. **Frontend** - publiczna strona sklepu

**🚀 Wszystko gotowe do użycia!** 