# 🚀 URBNCTRL - Szybkie Podsumowanie Deploymentu na Render

## 📋 Co zostało skonfigurowane

### ✅ Backend (Spring Boot)
- **Technologia:** Java 23 + Spring Boot 3.5.0
- **Baza danych:** PostgreSQL (zamiast MySQL)
- **CORS:** Skonfigurowany dla Render
- **Pliki konfiguracyjne:** `render.yaml`, `pom.xml` (PostgreSQL)

### ✅ Admin Panel (React)
- **Technologia:** React 19 + Vite
- **API URL:** Konfigurowalny przez zmienne środowiskowe
- **Pliki konfiguracyjne:** `render.yaml`, `vite.config.js`

## 🗄️ Baza Danych PostgreSQL

**Nazwa:** `urbnctrl-db`
**Dane połączenia:**
- URL: `postgresql://urbnctrl_user:password@host:port/urbnctrl_db`
- User: `urbnctrl_user`
- Database: `urbnctrl_db`

## ⚙️ Backend Web Service

**Nazwa:** `urbnctrl-backend`
**URL:** `https://urbnctrl-backend.onrender.com`

**Zmienne środowiskowe:**
- `DATABASE_URL` = URL z bazy danych
- `DATABASE_USER` = `urbnctrl_user`
- `DATABASE_PASSWORD` = hasło z bazy danych

**Endpoints:**
- Test: `https://urbnctrl-backend.onrender.com/api/simple-products/test`
- Produkty: `https://urbnctrl-backend.onrender.com/api/simple-products`
- Zamówienia: `https://urbnctrl-backend.onrender.com/api/orders`

## 🎨 Admin Panel Static Site

**Nazwa:** `urbnctrl-admin`
**URL:** `https://urbnctrl-admin.onrender.com`

**Zmienne środowiskowe:**
- `REACT_APP_API_URL` = `https://urbnctrl-backend.onrender.com/api`

**Dane logowania:**
- Email: `admin@urbnctrl.com`
- Password: `admin123`

## 🚀 Kroki do Wdrożenia

### 1. Baza Danych
```
Render.com → New + → PostgreSQL
Name: urbnctrl-db
Database: urbnctrl_db
User: urbnctrl_user
```

### 2. Backend
```
Render.com → New + → Web Service
Environment: Java
Build: ./mvnw clean package -DskipTests
Start: java -jar target/backend-0.0.1-SNAPSHOT.jar
```

### 3. Admin Panel
```
Render.com → New + → Static Site
Build: npm install && npm run build
Publish: dist
```

## 🔧 Zmiany w Kodzie

### Backend
- ✅ `pom.xml`: MySQL → PostgreSQL
- ✅ `application.properties`: Konfiguracja Render
- ✅ `CorsConfig.java`: CORS dla Render
- ✅ `render.yaml`: Konfiguracja deploymentu

### Admin Panel
- ✅ `ProductContext.jsx`: Zmienna środowiskowa API URL
- ✅ `OrderContext.jsx`: Zmienna środowiskowa API URL
- ✅ `vite.config.js`: Konfiguracja build
- ✅ `render.yaml`: Konfiguracja deploymentu

## 🧪 Testowanie

### Backend
```bash
curl https://urbnctrl-backend.onrender.com/api/simple-products/test
# Oczekiwany wynik: "SimpleProduct API is working!"
```

### Admin Panel
1. Otwórz: `https://urbnctrl-admin.onrender.com`
2. Zaloguj się: `admin@urbnctrl.com` / `admin123`
3. Sprawdź funkcjonalności

## 🚨 Rozwiązywanie Problemów

### Backend nie działa
1. Sprawdź logi w Render Dashboard
2. Sprawdź zmienne środowiskowe
3. Sprawdź połączenie z bazą danych

### Admin panel nie łączy się z backendem
1. Sprawdź `REACT_APP_API_URL`
2. Sprawdź CORS w backendzie
3. Sprawdź czy backend działa

### Błędy CORS
1. Sprawdź `CorsConfig.java`
2. Dodaj domenę do dozwolonych origins

## 📊 Monitoring

- **Logi:** Dostępne w Render Dashboard
- **Status:** Automatyczne monitorowanie
- **Restart:** Możliwość restartu z dashboardu

## 🔄 Aktualizacje

1. Wypchnij zmiany do Git
2. Render automatycznie wykryje zmiany
3. Automatyczny rebuild i deploy

---

**🎯 Wszystko gotowe do wdrożenia! Postępuj zgodnie z `RENDER_DEPLOYMENT_GUIDE.md`** 