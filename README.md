# URBNCTRL

**"URBNCTRL"** (czyt. Urban Control) - Kompletna aplikacja e-commerce z zarządzaniem produktami i zamówieniami.

## 🏗️ **Architektura Projektu**

### **3 Główne Komponenty:**

#### **🔧 Backend API** (Spring Boot + PostgreSQL)
- **Technologie:** Java 23, Spring Boot 3.5, PostgreSQL
- **Funkcje:** REST API, zarządzanie produktami, zamówieniami, użytkownikami
- **URL:** `https://urbnctrl-backend.onrender.com`

#### **⚙️ Admin Panel** (React + Vite)
- **Technologie:** React 18, Vite, Axios, React Router
- **Funkcje:** Panel administracyjny, zarządzanie produktami, zamówieniami
- **URL:** `https://urbnctrl-admin-x6jn.onrender.com`

#### **🌐 Frontend** (React + Vite)
- **Technologie:** React 18, Vite, CSS3, Responsive Design
- **Funkcje:** Publiczna strona sklepu, katalog produktów, koszyk
- **URL:** `https://urbnctrl-frontend-j99n.onrender.com`

---

## 🚀 **Wdrożenie na Render.com**

### **🌐 Live URLs:**
- **Backend API:** https://urbnctrl-backend.onrender.com
- **Admin Panel:** https://urbnctrl-admin-x6jn.onrender.com
- **Frontend:** https://urbnctrl-frontend-j99n.onrender.com

### **🗄️ Baza Danych:**
- **Typ:** PostgreSQL na Render
- **Nazwa:** `urbnctrl-db`
- **Plan:** Free (można upgrade do Starter)

---

## 📋 **Funkcjonalności**

### **🔧 Backend API:**
- ✅ **Zarządzanie produktami** (CRUD)
- ✅ **Zarządzanie zamówieniami** (CRUD)
- ✅ **Autoryzacja i uwierzytelnianie**
- ✅ **CORS konfiguracja** dla wszystkich domen
- ✅ **Połączenie z PostgreSQL**
- ✅ **RESTful API endpoints**

### **⚙️ Admin Panel:**
- ✅ **Dashboard** z statystykami
- ✅ **Zarządzanie produktami** (dodawanie, edycja, usuwanie)
- ✅ **Zarządzanie zamówieniami** (przeglądanie, aktualizacja statusu)
- ✅ **Responsive design**
- ✅ **Real-time aktualizacje**

### **🌐 Frontend:**
- ✅ **Strona główna** z hero section
- ✅ **Katalog produktów** z filtrowaniem
- ✅ **Szczegóły produktu**
- ✅ **Koszyk zakupów**
- ✅ **Proces checkout**
- ✅ **Responsive design**
- ✅ **Modern UI/UX**

---

## 🛠️ **Technologie**

### **Backend:**
- **Java 23** - język programowania
- **Spring Boot 3.5** - framework
- **Spring Data JPA** - ORM
- **PostgreSQL** - baza danych
- **Maven** - dependency management
- **Docker** - konteneryzacja

### **Frontend & Admin:**
- **React 18** - biblioteka UI
- **Vite** - build tool
- **CSS3** - stylowanie
- **Axios** - HTTP client
- **React Router** - routing
- **Responsive Design** - mobile-first

### **DevOps:**
- **Render.com** - hosting
- **Docker** - konteneryzacja
- **Git** - version control
- **PostgreSQL** - cloud database

---

## 🚀 **Szybki Start**

### **1. Lokalne Uruchomienie:**
```bash
# Klonuj repozytorium
git clone https://github.com/JakubStankiewicz1/URBNCTRL.git
cd URBNCTRL

# Uruchom z Docker Compose
docker-compose up --build

# Dostęp:
# - Backend: http://localhost:8080
# - Admin Panel: http://localhost:3000
# - Frontend: http://localhost:5173
# - Database: localhost:5432
```

### **2. Wdrożenie na Render:**
1. **Przejdź do Render Dashboard**
2. **Kliknij "New" → "Blueprint"**
3. **Połącz z repozytorium:** `JakubStankiewicz1/URBNCTRL`
4. **Kliknij "Apply"**
5. **Render automatycznie wdroży wszystkie komponenty**

---

## 📁 **Struktura Projektu**

```
URBNCTRL/
├── backend/                 # Spring Boot API
│   ├── src/main/java/
│   │   ├── controller/      # REST controllers
│   │   ├── service/         # Business logic
│   │   ├── repository/      # Data access
│   │   ├── model/          # Entity classes
│   │   └── config/         # Configuration
│   ├── Dockerfile          # Backend container
│   └── pom.xml            # Maven dependencies
├── admin/                  # React Admin Panel
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   └── App.jsx        # Main app
│   ├── Dockerfile         # Admin container
│   └── nginx.conf         # Nginx config
├── frontend/              # React Frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/        # Page components
│   │   ├── context/      # React contexts
│   │   └── App.jsx       # Main app
│   └── vite.config.js    # Vite config
├── render.yaml            # Render deployment config
├── docker-compose.yml     # Local development
└── README.md             # This file
```

---

## 🔧 **Konfiguracja**

### **Environment Variables:**

#### **Backend:**
```properties
DATABASE_USER=urbnctrl_user
DATABASE_PASSWORD=your_password
SPRING_PROFILES_ACTIVE=docker
```

#### **Admin Panel:**
```properties
REACT_APP_API_URL=https://urbnctrl-backend.onrender.com/api
```

#### **Frontend:**
```properties
REACT_APP_API_URL=https://urbnctrl-backend.onrender.com/api
```

---

## 🧪 **Testowanie**

### **Backend API:**
```bash
# Test endpoint
curl https://urbnctrl-backend.onrender.com/api/simple-products/test

# Oczekiwany wynik: "SimpleProduct API is working!"
```

### **Admin Panel:**
- **URL:** https://urbnctrl-admin-x6jn.onrender.com
- **Funkcje:** Logowanie, zarządzanie produktami, zamówieniami

### **Frontend:**
- **URL:** https://urbnctrl-frontend-j99n.onrender.com
- **Funkcje:** Przeglądanie produktów, koszyk, checkout

---

## 🔍 **API Endpoints**

### **Produkty:**
- `GET /api/simple-products` - lista produktów
- `GET /api/simple-products/{id}` - szczegóły produktu
- `POST /api/simple-products` - dodaj produkt
- `PUT /api/simple-products/{id}` - aktualizuj produkt
- `DELETE /api/simple-products/{id}` - usuń produkt

### **Zamówienia:**
- `GET /api/orders` - lista zamówień
- `GET /api/orders/{id}` - szczegóły zamówienia
- `POST /api/orders` - dodaj zamówienie
- `PUT /api/orders/{id}/status` - aktualizuj status
- `DELETE /api/orders/{id}` - usuń zamówienie

---

## 🚨 **Rozwiązywanie Problemów**

### **CORS Errors:**
Sprawdź czy backend ma wszystkie domeny w CORS:
```java
@CrossOrigin(origins = {
    "https://urbnctrl-frontend-j99n.onrender.com",
    "https://urbnctrl-admin-x6jn.onrender.com",
    "https://*.onrender.com"
})
```

### **Database Connection:**
Sprawdź environment variables w Render Dashboard

### **Build Failures:**
Sprawdź logi w Render Dashboard

---

## 📊 **Monitoring**

### **Render Dashboard:**
- **Logi:** Dostępne w czasie rzeczywistym
- **Status:** Automatyczne monitorowanie
- **Restart:** Możliwość restartu z dashboardu
- **Build:** Automatyczny rebuild przy zmianach

---

## 🔄 **Aktualizacje**

1. **Wypchnij zmiany do Git:**
   ```bash
   git add .
   git commit -m "Update description"
   git push
   ```

2. **Render automatycznie:**
   - ✅ Wykryje zmiany
   - ✅ Przebuduje aplikacje
   - ✅ Zredeployuje

---

## 📈 **Plany Rozwoju**

### **Krótkoterminowe:**
- [ ] Dodanie systemu płatności
- [ ] Implementacja systemu użytkowników
- [ ] Dodanie kategorii produktów
- [ ] System ocen i recenzji

### **Długoterminowe:**
- [ ] Aplikacja mobilna
- [ ] System powiadomień
- [ ] Analytics i raporty
- [ ] Integracja z systemami płatności

---

## 🤝 **Współpraca**

### **Jak przyczynić się do projektu:**
1. **Fork** repozytorium
2. **Utwórz branch** dla nowej funkcjonalności
3. **Commit** zmiany
4. **Push** do branch
5. **Utwórz Pull Request**

---

## 📄 **Licencja**

Ten projekt jest dostępny na licencji MIT. Zobacz plik `LICENSE` dla szczegółów.

---

## 📞 **Kontakt**

- **Autor:** Jakub Stankiewicz
- **GitHub:** [JakubStankiewicz1](https://github.com/JakubStankiewicz1)
- **Projekt:** URBNCTRL

---

## 🎉 **Podsumowanie**

**URBNCTRL** to kompletna aplikacja e-commerce z:
- ✅ **Backend API** (Spring Boot + PostgreSQL)
- ✅ **Admin Panel** (React + Vite)
- ✅ **Frontend** (React + Vite)
- ✅ **Wdrożenie na Render.com**
- ✅ **Responsive Design**
- ✅ **Modern Architecture**

**🚀 Wszystko gotowe do użycia!**
