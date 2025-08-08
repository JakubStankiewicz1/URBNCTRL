# 🚀 URBNCTRL - Kompletny Tutorial Docker Hostingu na Render

## 📋 Wymagania Wstępne

- Konto na [Render.com](https://render.com)
- Repozytorium Git (GitHub, GitLab, Bitbucket)
- Kod aplikacji w repozytorium z plikami Docker

---

## 🗄️ KROK 1: Tworzenie Bazy Danych PostgreSQL

### 1.1 Logowanie do Render
1. Przejdź na [render.com](https://render.com)
2. Zaloguj się lub utwórz konto
3. Kliknij **"New +"** → **"PostgreSQL"**

### 1.2 Konfiguracja Bazy Danych
- **Name:** `urbnctrl-db`
- **Database:** `urbnctrl_db`
- **User:** `urbnctrl_user`
- **Plan:** `Free` (dla testów) lub `Starter` (dla produkcji)
- **Region:** Wybierz najbliższą lokalizację (np. Frankfurt)

### 1.3 Zapisz Dane Połączenia
Po utworzeniu bazy danych, Render pokaże:
- **Internal Database URL:** `postgresql://urbnctrl_user:password@host:port/urbnctrl_db`
- **External Database URL:** `postgresql://urbnctrl_user:password@host:port/urbnctrl_db`
- **Username:** `urbnctrl_user`
- **Password:** (wygenerowane hasło)
- **Database:** `urbnctrl_db`

**Zapisz te dane - będą potrzebne w następnych krokach!**

---

## 🐳 KROK 2: Docker Deployment z Blueprint

### 2.1 Usuń Obecny Service (jeśli istnieje)
1. W Render Dashboard przejdź do **"urbnctrl-backend"** (jeśli istnieje)
2. Kliknij **"Settings"** → **"Delete Service"**

### 2.2 Utwórz Blueprint
1. W Render kliknij **"New +"** → **"Blueprint"**
2. Połącz z repozytorium Git: `https://github.com/JakubStankiewicz1/URBNCTRL`
3. Render automatycznie wykryje `render.yaml` i skonfiguruje wszystko

### 2.3 Co Render Zrobi Automatycznie
Render automatycznie utworzy:

#### Backend Service:
- **Name:** `urbnctrl-backend`
- **Environment:** `Docker`
- **Root Directory:** `backend`
- **Dockerfile:** `backend/Dockerfile`
- **Port:** `8080`

#### Admin Panel Service:
- **Name:** `urbnctrl-admin`
- **Environment:** `Docker`
- **Root Directory:** `admin`
- **Dockerfile:** `admin/Dockerfile`
- **Port:** `80`

#### Połączenie z Bazą Danych:
- Automatyczne połączenie z `urbnctrl-db`
- Automatyczne ustawienie zmiennych środowiskowych

---

## ⚙️ KROK 3: Automatyczna Konfiguracja

### 3.1 Zmienne Środowiskowe (Automatyczne)
Render automatycznie ustawi:

#### Dla Backendu:
| Klucz | Wartość | Źródło |
|-------|---------|--------|
| `DATABASE_URL` | `postgresql://urbnctrl_user:password@host:port/urbnctrl_db` | Z bazy danych |
| `DATABASE_USER` | `urbnctrl_user` | Z bazy danych |
| `DATABASE_PASSWORD` | `password` | Z bazy danych |
| `SPRING_PROFILES_ACTIVE` | `docker` | Z render.yaml |

#### Dla Admin Panelu:
| Klucz | Wartość | Źródło |
|-------|---------|--------|
| `REACT_APP_API_URL` | `https://urbnctrl-backend.onrender.com/api` | Z render.yaml |

### 3.2 Docker Build Process
Render automatycznie:

#### Backend:
1. **Wykryje** `backend/Dockerfile`
2. **Zbuduje** obraz z Java 23 + Spring Boot
3. **Uruchomi** aplikację na porcie 8080
4. **Połączy** z bazą danych

#### Admin Panel:
1. **Wykryje** `admin/Dockerfile`
2. **Zbuduje** obraz z Node.js 18 + React + nginx
3. **Uruchomi** nginx na porcie 80
4. **Skonfiguruje** routing dla SPA

---

## 🧪 KROK 4: Testowanie Aplikacji

### 4.1 Test Backendu
1. Otwórz: `https://urbnctrl-backend.onrender.com/api/simple-products/test`
2. Powinieneś zobaczyć: `"SimpleProduct API is working!"`

### 4.2 Test Admin Panelu
1. Otwórz: `https://urbnctrl-admin.onrender.com`
2. Zaloguj się używając:
   - **Email:** `admin@urbnctrl.com`
   - **Password:** `admin123`

### 4.3 Test Funkcjonalności
1. Sprawdź czy możesz dodać produkt
2. Sprawdź czy możesz przeglądać zamówienia
3. Sprawdź czy dashboard działa poprawnie

---

## 🔍 KROK 5: Monitoring i Debugging

### 5.1 Logi Backendu
1. W Render przejdź do **"urbnctrl-backend"**
2. Kliknij zakładkę **"Logs"**
3. Sprawdź logi w przypadku błędów

### 5.2 Logi Admin Panelu
1. W Render przejdź do **"urbnctrl-admin"**
2. Kliknij zakładkę **"Logs"**
3. Sprawdź logi build process

### 5.3 Baza Danych
1. W Render przejdź do **"urbnctrl-db"**
2. Kliknij **"Connect"** → **"External Database URL"**
3. Użyj pgAdmin lub innego klienta PostgreSQL

---

## 🐳 KROK 6: Lokalne Testowanie z Docker

### 6.1 Uruchomienie Lokalnie
```bash
# Zbuduj i uruchom wszystkie usługi
docker-compose up --build

# Dostęp:
# - Backend: http://localhost:8080
# - Admin Panel: http://localhost:3000
# - Database: localhost:5432
```

### 6.2 Zatrzymanie
```bash
docker-compose down
```

### 6.3 Sprawdzenie Logów
```bash
# Logi wszystkich usług
docker-compose logs

# Logi konkretnej usługi
docker-compose logs backend
docker-compose logs admin
docker-compose logs postgres
```

---

## 🚨 Rozwiązywanie Problemów

### Problem: Blueprint nie działa
**Rozwiązanie:**
1. Sprawdź czy `render.yaml` jest w głównym katalogu
2. Sprawdź czy wszystkie Dockerfile są poprawne
3. Sprawdź czy repozytorium jest publiczne

### Problem: Docker build nie działa
**Rozwiązanie:**
1. Sprawdź logi w Render Dashboard
2. Sprawdź czy Dockerfile jest poprawny
3. Sprawdź czy wszystkie pliki są w repozytorium

### Problem: Backend nie łączy się z bazą danych
**Rozwiązanie:**
1. Sprawdź zmienne środowiskowe w Render
2. Sprawdź czy baza danych jest aktywna
3. Sprawdź logi aplikacji

### Problem: Admin panel nie łączy się z backendem
**Rozwiązanie:**
1. Sprawdź `REACT_APP_API_URL`
2. Sprawdź CORS w backendzie
3. Sprawdź czy backend działa

### Problem: Błędy CORS
**Rozwiązanie:**
1. Sprawdź konfigurację CORS w `CorsConfig.java`
2. Dodaj domenę admin panelu do dozwolonych origins

---

## 📊 KROK 7: Optymalizacja i Produkcja

### 7.1 Upgrade Planów
- **Baza danych:** Free → Starter ($7/miesiąc)
- **Backend:** Free → Starter ($7/miesiąc)
- **Admin panel:** Free (wystarczy)

### 7.2 Custom Domain
1. Kup domenę (np. `urbnctrl.com`)
2. W Render dodaj custom domain
3. Skonfiguruj DNS

### 7.3 SSL/HTTPS
- Render automatycznie zapewnia SSL
- Wszystkie połączenia są szyfrowane

---

## 🔧 Struktura Plików Docker

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

### render.yaml:
```yaml
services:
  - type: web
    name: urbnctrl-backend
    env: docker
    plan: free
    rootDir: backend
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: urbnctrl-db
          property: connectionString
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

  - type: web
    name: urbnctrl-admin
    env: docker
    plan: free
    rootDir: admin
    envVars:
      - key: REACT_APP_API_URL
        value: https://urbnctrl-backend.onrender.com/api

databases:
  - name: urbnctrl-db
    databaseName: urbnctrl_db
    user: urbnctrl_user
```

---

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

---

## 🎯 Podsumowanie

Po wykonaniu wszystkich kroków będziesz mieć:

1. **Baza danych PostgreSQL:** `urbnctrl-db`
2. **Backend API:** `https://urbnctrl-backend.onrender.com`
3. **Admin Panel:** `https://urbnctrl-admin.onrender.com`

### Dostęp do aplikacji:
- **Admin Panel:** `https://urbnctrl-admin.onrender.com`
- **API Endpoints:** `https://urbnctrl-backend.onrender.com/api/*`
- **Dane logowania:** `admin@urbnctrl.com` / `admin123`

### Monitoring:
- Wszystkie usługi są monitorowane w Render Dashboard
- Logi są dostępne w czasie rzeczywistym
- Możliwość restartu usług w razie problemów

---

## 🔄 Aktualizacje

Aby zaktualizować aplikację:
1. Wypchnij zmiany do repozytorium Git
2. Render automatycznie wykryje zmiany
3. Automatycznie przebuduje i wdroży aplikację

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

**🎉 Gratulacje! Twoja aplikacja URBNCTRL jest teraz w pełni wdrożona na Render z Docker!** 