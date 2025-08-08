# 🚀 URBNCTRL - Szybkie Podsumowanie Docker Deploymentu na Render

## 📋 Co zostało skonfigurowane

### ✅ Pliki Dockerowe:
- **`backend/Dockerfile`** - Backend Spring Boot z Java 23
- **`admin/Dockerfile`** - Admin Panel React z nginx
- **`admin/nginx.conf`** - Konfiguracja nginx
- **`docker-compose.yml`** - Cała aplikacja lokalnie
- **`render.yaml`** - Konfiguracja Render dla Docker

### ✅ Konfiguracje:
- **`backend/src/main/resources/application-docker.properties`** - Konfiguracja dla Docker
- **`.dockerignore`** (backend i admin) - Optymalizacja build
- **`backend/.gitattributes`** - Uprawnienia dla mvnw

## 🗄️ Baza Danych PostgreSQL

**Nazwa:** `urbnctrl-db`
**Dane połączenia:**
- URL: `postgresql://urbnctrl_user:password@host:port/urbnctrl_db`
- User: `urbnctrl_user`
- Database: `urbnctrl_db`

## ⚙️ Backend Docker Service

**Nazwa:** `urbnctrl-backend`
**URL:** `https://urbnctrl-backend.onrender.com`

**Automatyczne zmienne środowiskowe:**
- `DATABASE_URL` = URL z bazy danych
- `DATABASE_USER` = `urbnctrl_user`
- `DATABASE_PASSWORD` = hasło z bazy danych
- `SPRING_PROFILES_ACTIVE` = `docker`

**Endpoints:**
- Test: `https://urbnctrl-backend.onrender.com/api/simple-products/test`
- Produkty: `https://urbnctrl-backend.onrender.com/api/simple-products`
- Zamówienia: `https://urbnctrl-backend.onrender.com/api/orders`

## 🎨 Admin Panel Docker Service

**Nazwa:** `urbnctrl-admin`
**URL:** `https://urbnctrl-admin.onrender.com`

**Automatyczne zmienne środowiskowe:**
- `REACT_APP_API_URL` = `https://urbnctrl-backend.onrender.com/api`

**Dane logowania:**
- Email: `admin@urbnctrl.com`
- Password: `admin123`

## 🚀 Kroki do Wdrożenia

### 1. Baza Danych (już masz)
```
Render.com → New + → PostgreSQL
Name: urbnctrl-db
Database: urbnctrl_db
User: urbnctrl_user
```

### 2. Docker Blueprint
```
Render.com → New + → Blueprint
Repository: https://github.com/JakubStankiewicz1/URBNCTRL
Render automatycznie użyje render.yaml
```

### 3. Automatyczna Konfiguracja
Render automatycznie:
- ✅ Wykryje Dockerfile w backend/ i admin/
- ✅ Zbuduje obrazy Docker
- ✅ Wdroży na serwer
- ✅ Połączy z bazą danych
- ✅ Ustawi zmienne środowiskowe

## 🔧 Struktura Docker

### Backend:
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

### Admin Panel:
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

## 🐳 Lokalne Testowanie

```bash
# Uruchomienie lokalnie
docker-compose up --build

# Dostęp:
# - Backend: http://localhost:8080
# - Admin Panel: http://localhost:3000
# - Database: localhost:5432

# Zatrzymanie
docker-compose down
```

## 🚨 Rozwiązywanie Problemów

### Blueprint nie działa
1. Sprawdź czy `render.yaml` jest w głównym katalogu
2. Sprawdź czy wszystkie Dockerfile są poprawne
3. Sprawdź czy repozytorium jest publiczne

### Docker build nie działa
1. Sprawdź logi w Render Dashboard
2. Sprawdź czy Dockerfile jest poprawny
3. Sprawdź czy wszystkie pliki są w repozytorium

### Backend nie łączy się z bazą
1. Sprawdź zmienne środowiskowe w Render
2. Sprawdź czy baza danych jest aktywna
3. Sprawdź logi aplikacji

### Admin panel nie łączy się z backendem
1. Sprawdź `REACT_APP_API_URL`
2. Sprawdź CORS w backendzie
3. Sprawdź czy backend działa

## 📊 Zalety Docker Deploymentu

### ✅ Zalety:
- **Spójność środowisk** - działa tak samo lokalnie i na serwerze
- **Izolacja** - każda usługa w swoim kontenerze
- **Łatwość deploymentu** - jeden plik konfiguracyjny
- **Skalowalność** - łatwe dodawanie instancji
- **Bezpieczeństwo** - izolowane środowiska
- **Automatyzacja** - Render automatycznie konfiguruje wszystko

### 🔧 Konfiguracja:
- **Backend:** Java 23 + Spring Boot
- **Admin:** Node.js 18 + React + nginx
- **Database:** PostgreSQL 17
- **Network:** Docker bridge network

## 📊 Monitoring

- **Logi:** Dostępne w Render Dashboard
- **Status:** Automatyczne monitorowanie
- **Restart:** Możliwość restartu z dashboardu
- **Build:** Automatyczny rebuild przy zmianach

## 🔄 Aktualizacje

1. Wypchnij zmiany do Git
2. Render automatycznie wykryje zmiany
3. Automatyczny rebuild i deploy

---

## 🚀 Szybki Start

### 1. Przygotowanie:
- ✅ Masz już bazę danych `urbnctrl-db`
- ✅ Kod jest w repozytorium Git
- ✅ Pliki Docker są gotowe

### 2. Deployment:
- ✅ Kliknij **"New +"** → **"Blueprint"**
- ✅ Połącz z repozytorium Git
- ✅ Render zrobi resztę automatycznie

### 3. Testowanie:
- ✅ Backend: `https://urbnctrl-backend.onrender.com/api/simple-products/test`
- ✅ Admin: `https://urbnctrl-admin.onrender.com`

---

**🎯 Wszystko gotowe do wdrożenia! Postępuj zgodnie z `RENDER_DEPLOYMENT_GUIDE.md`** 