# 🐳 URBNCTRL - Docker Deployment na Render

## 📋 Co zostało utworzone

### ✅ Pliki Dockerowe:
- `backend/Dockerfile` - Backend Spring Boot
- `admin/Dockerfile` - Admin Panel React
- `admin/nginx.conf` - Konfiguracja nginx
- `docker-compose.yml` - Cała aplikacja lokalnie
- `render.yaml` - Konfiguracja Render

### ✅ Konfiguracje:
- `backend/src/main/resources/application-docker.properties`
- `.dockerignore` (backend i admin)
- `backend/.gitattributes`

---

## 🚀 KROK 1: Aktualizacja Render dla Docker

### 1.1 Usuń obecny service
1. W Render Dashboard przejdź do **"urbnctrl-backend"**
2. Kliknij **"Settings"** → **"Delete Service"**

### 1.2 Utwórz nowy service z Blueprint
1. Kliknij **"New +"** → **"Blueprint"**
2. Połącz z repozytorium Git
3. Render automatycznie użyje `render.yaml`

---

## 🗄️ KROK 2: Baza Danych (już masz)

Twoja baza danych `urbnctrl-db` już istnieje i będzie automatycznie połączona.

---

## ⚙️ KROK 3: Backend Docker Service

### 3.1 Automatyczna konfiguracja
Render automatycznie:
- Wykryje `backend/Dockerfile`
- Zbuduje obraz Docker
- Wdroży na serwer
- Połączy z bazą danych

### 3.2 Zmienne środowiskowe (automatyczne)
Render automatycznie ustawi:
- `DATABASE_URL` - z bazy danych
- `DATABASE_USER` - z bazy danych  
- `DATABASE_PASSWORD` - z bazy danych
- `SPRING_PROFILES_ACTIVE=docker`

---

## 🎨 KROK 4: Admin Panel Docker Service

### 4.1 Automatyczna konfiguracja
Render automatycznie:
- Wykryje `admin/Dockerfile`
- Zbuduje obraz Docker z nginx
- Wdroży na serwer

### 4.2 Zmienne środowiskowe
- `REACT_APP_API_URL=https://urbnctrl-backend.onrender.com/api`

---

## 🧪 KROK 5: Testowanie

### 5.1 Test Backendu
```
https://urbnctrl-backend.onrender.com/api/simple-products/test
```
Oczekiwany wynik: `"SimpleProduct API is working!"`

### 5.2 Test Admin Panelu
```
https://urbnctrl-admin.onrender.com
```
Login: `admin@urbnctrl.com` / `admin123`

---

## 🐳 Lokalne Testowanie z Docker

### Uruchomienie lokalnie:
```bash
# Zbuduj i uruchom wszystkie usługi
docker-compose up --build

# Dostęp:
# - Backend: http://localhost:8080
# - Admin Panel: http://localhost:3000
# - Database: localhost:5432
```

### Zatrzymanie:
```bash
docker-compose down
```

---

## 🔧 Struktura Docker

### Backend Dockerfile:
```dockerfile
FROM openjdk:23-jdk-slim
WORKDIR /app
COPY mvnw . .mvn .mvn pom.xml ./
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline -B
COPY src src
RUN ./mvnw clean package -DskipTests
EXPOSE 8080
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]
```

### Admin Dockerfile:
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 🚨 Rozwiązywanie Problemów

### Problem: Docker build nie działa
**Rozwiązanie:**
1. Sprawdź logi w Render Dashboard
2. Sprawdź czy Dockerfile jest poprawny
3. Sprawdź czy wszystkie pliki są w repozytorium

### Problem: Backend nie łączy się z bazą
**Rozwiązanie:**
1. Sprawdź zmienne środowiskowe w Render
2. Sprawdź czy baza danych jest aktywna
3. Sprawdź logi aplikacji

### Problem: Admin panel nie łączy się z backendem
**Rozwiązanie:**
1. Sprawdź `REACT_APP_API_URL`
2. Sprawdź CORS w backendzie
3. Sprawdź czy backend działa

---

## 📊 Zalety Docker Deploymentu

### ✅ Zalety:
- **Spójność środowisk** - działa tak samo lokalnie i na serwerze
- **Izolacja** - każda usługa w swoim kontenerze
- **Łatwość deploymentu** - jeden plik konfiguracyjny
- **Skalowalność** - łatwe dodawanie instancji
- **Bezpieczeństwo** - izolowane środowiska

### 🔧 Konfiguracja:
- **Backend:** Java 23 + Spring Boot
- **Admin:** Node.js 18 + React + nginx
- **Database:** PostgreSQL 17
- **Network:** Docker bridge network

---

## 🎯 Podsumowanie

Po wdrożeniu będziesz mieć:

1. **Backend:** `https://urbnctrl-backend.onrender.com`
2. **Admin Panel:** `https://urbnctrl-admin.onrender.com`
3. **Database:** `urbnctrl-db` (PostgreSQL)

### Dostęp:
- **Admin Panel:** `https://urbnctrl-admin.onrender.com`
- **API:** `https://urbnctrl-backend.onrender.com/api/*`
- **Login:** `admin@urbnctrl.com` / `admin123`

---

## 🔄 Aktualizacje

1. **Wypchnij zmiany do Git**
2. **Render automatycznie wykryje zmiany**
3. **Automatyczny rebuild i deploy**

---

**🎉 Docker deployment jest gotowy! Render automatycznie zbuduje i wdroży aplikację!** 