# 🔧 Naprawa Problemu z Połączeniem Bazy Danych

## 🚨 Problem
Błąd: `Driver org.postgresql.Driver claims to not accept jdbcUrl, postgresql://...`

## ✅ Rozwiązanie

### Problem: Nieprawidłowy format URL bazy danych
Spring Boot oczekuje JDBC URL, a nie PostgreSQL URL.

### KROK 1: Sprawdź zmienne środowiskowe w Render

W Render Dashboard przejdź do **"urbnctrl-backend"** → **"Environment"** i upewnij się, że masz:

| Klucz | Wartość |
|-------|---------|
| `DATABASE_USER` | `urbnctrl_user` |
| `DATABASE_PASSWORD` | `twoje_rzeczywiste_hasło` |
| `SPRING_PROFILES_ACTIVE` | `docker` |

### KROK 2: Sprawdź konfigurację w application.properties

Upewnij się, że w `backend/src/main/resources/application.properties` masz:

```properties
spring.datasource.url=jdbc:postgresql://dpg-d2b5pfur433s739fs1h0-a.oregon-postgres.render.com:5432/urbnctrl_db
spring.datasource.username=${DATABASE_USER}
spring.datasource.password=${DATABASE_PASSWORD}
spring.datasource.driver-class-name=org.postgresql.Driver
```

### KROK 3: Sprawdź konfigurację w application-docker.properties

Upewnij się, że w `backend/src/main/resources/application-docker.properties` masz:

```properties
spring.datasource.url=jdbc:postgresql://dpg-d2b5pfur433s739fs1h0-a.oregon-postgres.render.com:5432/urbnctrl_db
spring.datasource.username=${DATABASE_USER}
spring.datasource.password=${DATABASE_PASSWORD}
spring.datasource.driver-class-name=org.postgresql.Driver
```

### KROK 4: Redeploy

1. **Wypchnij zmiany do Git:**
```bash
git add .
git commit -m "Fix database connection - use JDBC URL format"
git push
```

2. **Render automatycznie wykryje zmiany i przebuduje aplikację**

### KROK 5: Sprawdź logi

Po redeploy sprawdź logi w Render Dashboard:
1. Przejdź do **"urbnctrl-backend"**
2. Kliknij zakładkę **"Logs"**
3. Sprawdź czy nie ma błędów połączenia z bazą

## 🧪 Testowanie

Po naprawie przetestuj:
```
https://urbnctrl-backend.onrender.com/api/simple-products/test
```

Oczekiwany wynik: `"SimpleProduct API is working!"`

## 🔍 Dodatkowe Sprawdzenia

### Sprawdź czy baza danych jest aktywna:
1. W Render przejdź do **"urbnctrl-db"**
2. Sprawdź status - powinien być **"Available"**

### Sprawdź dane połączenia:
1. W **"urbnctrl-db"** kliknij **"Connect"**
2. Sprawdź **"External Database URL"**
3. Upewnij się, że hostname to: `dpg-d2b5pfur433s739fs1h0-a.oregon-postgres.render.com`

## 🚨 Jeśli problem się utrzymuje

### Opcja 1: Sprawdź hasło
1. W **"urbnctrl-db"** kliknij **"Connect"**
2. Skopiuj hasło z **"Password"**
3. W **"urbnctrl-backend"** → **"Environment"** zaktualizuj `DATABASE_PASSWORD`

### Opcja 2: Sprawdź użytkownika
1. W **"urbnctrl-db"** sprawdź **"Username"**
2. Upewnij się, że w `DATABASE_USER` masz poprawną nazwę użytkownika

### Opcja 3: Sprawdź nazwę bazy danych
1. W **"urbnctrl-db"** sprawdź **"Database"**
2. Upewnij się, że w URL masz poprawną nazwę bazy danych

## 📋 Podsumowanie Zmian

### ✅ Co zostało naprawione:
- Zmieniono format URL z `postgresql://` na `jdbc:postgresql://`
- Usunięto `DATABASE_URL` z render.yaml
- Dodano osobne zmienne `DATABASE_USER` i `DATABASE_PASSWORD`
- Ustawiono `SPRING_PROFILES_ACTIVE=docker`

### 🔄 Co zrobić:
1. Wypchnij zmiany do Git
2. Poczekaj na automatyczny redeploy
3. Sprawdź logi w Render Dashboard
4. Przetestuj endpoint

---

**🎯 Po tych zmianach aplikacja powinna się połączyć z bazą danych!** 