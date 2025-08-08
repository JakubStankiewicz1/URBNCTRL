# 🚀 URBNCTRL - Kompletny Tutorial Hostingu na Render

## 📋 Wymagania Wstępne

- Konto na [Render.com](https://render.com)
- Repozytorium Git (GitHub, GitLab, Bitbucket)
- Kod aplikacji w repozytorium

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

## ⚙️ KROK 2: Konfiguracja Backendu (Spring Boot)

### 2.1 Przygotowanie Repozytorium
1. Upewnij się, że kod backendu jest w repozytorium Git
2. Sprawdź czy plik `render.yaml` jest w głównym katalogu backendu
3. Sprawdź czy `pom.xml` używa PostgreSQL zamiast MySQL

### 2.2 Tworzenie Web Service na Render
1. W Render kliknij **"New +"** → **"Web Service"**
2. Połącz z repozytorium Git
3. Wybierz folder z backendem

### 2.3 Konfiguracja Web Service
- **Name:** `urbnctrl-backend`
- **Environment:** `Java`
- **Build Command:** `./mvnw clean package -DskipTests`
- **Start Command:** `java -jar target/backend-0.0.1-SNAPSHOT.jar`
- **Plan:** `Free`

### 2.4 Zmienne Środowiskowe
Dodaj następujące zmienne środowiskowe:

| Klucz | Wartość | Opis |
|-------|---------|------|
| `DATABASE_URL` | `postgresql://urbnctrl_user:password@host:port/urbnctrl_db` | URL bazy danych z kroku 1.3 |
| `DATABASE_USER` | `urbnctrl_user` | Nazwa użytkownika bazy danych |
| `DATABASE_PASSWORD` | `password` | Hasło z kroku 1.3 |

### 2.5 Połączenie z Bazą Danych
1. W sekcji **"Environment"** kliknij **"Add Environment Variable"**
2. Dodaj zmienne z tabeli powyżej
3. W sekcji **"Connections"** dodaj połączenie z bazą danych `urbnctrl-db`

### 2.6 Deploy
1. Kliknij **"Create Web Service"**
2. Render automatycznie zbuduje i wdroży aplikację
3. Poczekaj na zakończenie procesu (może potrwać 5-10 minut)

### 2.7 Sprawdzenie Działania
Po wdrożeniu otrzymasz URL: `https://urbnctrl-backend.onrender.com`

Przetestuj endpoint: `https://urbnctrl-backend.onrender.com/api/simple-products/test`

---

## 🎨 KROK 3: Konfiguracja Admin Panelu (React)

### 3.1 Przygotowanie Repozytorium
1. Upewnij się, że kod admin panelu jest w repozytorium Git
2. Sprawdź czy plik `render.yaml` jest w głównym katalogu admin
3. Sprawdź czy `package.json` ma skrypt `build`

### 3.2 Tworzenie Static Site na Render
1. W Render kliknij **"New +"** → **"Static Site"**
2. Połącz z repozytorium Git
3. Wybierz folder z admin panelem

### 3.3 Konfiguracja Static Site
- **Name:** `urbnctrl-admin`
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`
- **Plan:** `Free`

### 3.4 Zmienne Środowiskowe
Dodaj następującą zmienną środowiskową:

| Klucz | Wartość | Opis |
|-------|---------|------|
| `REACT_APP_API_URL` | `https://urbnctrl-backend.onrender.com/api` | URL API backendu |

### 3.5 Deploy
1. Kliknij **"Create Static Site"**
2. Render automatycznie zbuduje i wdroży aplikację
3. Poczekaj na zakończenie procesu (może potrwać 3-5 minut)

### 3.6 Sprawdzenie Działania
Po wdrożeniu otrzymasz URL: `https://urbnctrl-admin.onrender.com`

---

## 🔧 KROK 4: Konfiguracja CORS i Bezpieczeństwa

### 4.1 Aktualizacja CORS w Backendzie
Sprawdź czy w `CorsConfig.java` są dozwolone domeny Render:

```java
.allowedOrigins(
    "https://*.onrender.com",
    "http://localhost:3000", 
    "http://localhost:5173"
)
```

### 4.2 Aktualizacja URL w Admin Panelu
Sprawdź czy w `ProductContext.jsx` i `OrderContext.jsx` jest:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8081/api";
```

---

## 🧪 KROK 5: Testowanie Aplikacji

### 5.1 Test Backendu
1. Otwórz: `https://urbnctrl-backend.onrender.com/api/simple-products/test`
2. Powinieneś zobaczyć: `"SimpleProduct API is working!"`

### 5.2 Test Admin Panelu
1. Otwórz: `https://urbnctrl-admin.onrender.com`
2. Zaloguj się używając:
   - **Email:** `admin@urbnctrl.com`
   - **Password:** `admin123`

### 5.3 Test Funkcjonalności
1. Sprawdź czy możesz dodać produkt
2. Sprawdź czy możesz przeglądać zamówienia
3. Sprawdź czy dashboard działa poprawnie

---

## 🔍 KROK 6: Monitoring i Debugging

### 6.1 Logi Backendu
1. W Render przejdź do **"urbnctrl-backend"**
2. Kliknij zakładkę **"Logs"**
3. Sprawdź logi w przypadku błędów

### 6.2 Logi Admin Panelu
1. W Render przejdź do **"urbnctrl-admin"**
2. Kliknij zakładkę **"Logs"**
3. Sprawdź logi build process

### 6.3 Baza Danych
1. W Render przejdź do **"urbnctrl-db"**
2. Kliknij **"Connect"** → **"External Database URL"**
3. Użyj pgAdmin lub innego klienta PostgreSQL

---

## 🚨 Rozwiązywanie Problemów

### Problem: Backend nie łączy się z bazą danych
**Rozwiązanie:**
1. Sprawdź zmienne środowiskowe w Render
2. Sprawdź czy baza danych jest aktywna
3. Sprawdź logi aplikacji

### Problem: Admin panel nie łączy się z backendem
**Rozwiązanie:**
1. Sprawdź zmienną `REACT_APP_API_URL`
2. Sprawdź CORS w backendzie
3. Sprawdź czy backend działa

### Problem: Błędy CORS
**Rozwiązanie:**
1. Sprawdź konfigurację CORS w `CorsConfig.java`
2. Dodaj domenę admin panelu do dozwolonych origins

### Problem: Aplikacja nie buduje się
**Rozwiązanie:**
1. Sprawdź logi build process
2. Sprawdź czy wszystkie zależności są w `pom.xml`/`package.json`
3. Sprawdź czy pliki konfiguracyjne są poprawne

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

**🎉 Gratulacje! Twoja aplikacja URBNCTRL jest teraz w pełni wdrożona na Render!** 