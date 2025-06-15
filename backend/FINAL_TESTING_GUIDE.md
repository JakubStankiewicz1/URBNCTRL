# 🧪 KOMPLETNY PRZEWODNIK TESTOWANIA - FINAL

## 1️⃣ SPRAWDŹ CZY APLIKACJA DZIAŁA

### Uruchom aplikację (jeśli nie działa):
```bash
cd "c:\Users\stank\Desktop\URBNCTRL\backend"
.\mvnw.cmd spring-boot:run
```

### Sprawdź w terminalu:
- ✅ `Tomcat started on port 8081`
- ✅ `Started BackendApplication in X seconds`

---

## 2️⃣ OTWÓRZ POSTMAN

### Utwórz nową kolekcję:
1. File → New → Collection
2. Nazwa: "URBNCTRL - Simple Products"
3. Base URL: `http://localhost:8081`

---

## 3️⃣ TESTUJ KROK PO KROKU

### TEST 1: Sprawdź czy API działa
```
Method: GET
URL: http://localhost:8081/api/simple-products/test
```
**Oczekiwany wynik:**
- Status: `200 OK`
- Body: `"Simple API works!"`

---

### TEST 2: Sprawdź pustą listę produktów
```
Method: GET
URL: http://localhost:8081/api/simple-products
Headers: Content-Type: application/json
```
**Oczekiwany wynik:**
- Status: `200 OK`
- Body: `[]` (pusta lista)

---

### TEST 3: Dodaj pierwszy produkt
```
Method: POST
URL: http://localhost:8081/api/simple-products
Headers: Content-Type: application/json
```

**Body (raw JSON):**
```json
{
    "name": "Test Champions Tee",
    "category": "Apparel",
    "description": "Premium cotton t-shirt for testing",
    "price": 59.99,
    "currency": "$",
    "availability": "In Stock",
    "sku": "TEST-001",
    "brand": "T-LD"
}
```

**Oczekiwany wynik:**
- Status: `201 Created`
- Body: JSON z nowym produktem + ID (np. `"id": 1`)

---

### TEST 4: Sprawdź czy produkt został dodany
```
Method: GET
URL: http://localhost:8081/api/simple-products
```
**Oczekiwany wynik:**
- Status: `200 OK`
- Body: Lista z 1 produktem

---

### TEST 5: Pobierz produkt po ID
```
Method: GET
URL: http://localhost:8081/api/simple-products/1
```
**Oczekiwany wynik:**
- Status: `200 OK`
- Body: Szczegóły produktu o ID = 1

---

### TEST 6: Dodaj drugi produkt
```
Method: POST
URL: http://localhost:8081/api/simple-products
Headers: Content-Type: application/json
```

**Body (raw JSON):**
```json
{
    "name": "Tokyo Drift Hoodie",
    "category": "Hoodies",
    "description": "Premium hoodie with Tokyo graphics",
    "price": 89.99,
    "currency": "$",
    "availability": "Limited Stock",
    "sku": "TOKYO-001",
    "brand": "T-LD"
}
```

**Oczekiwany wynik:**
- Status: `201 Created`
- Body: JSON z nowym produktem + ID (np. `"id": 2`)

---

### TEST 7: Sprawdź listę (powinna mieć 2 produkty)
```
Method: GET
URL: http://localhost:8081/api/simple-products
```
**Oczekiwany wynik:**
- Status: `200 OK`
- Body: Lista z 2 produktami

---

### TEST 8: Zaktualizuj pierwszy produkt
```
Method: PUT
URL: http://localhost:8081/api/simple-products/1
Headers: Content-Type: application/json
```

**Body (raw JSON):**
```json
{
    "name": "UPDATED Champions Tee",
    "category": "Apparel",
    "description": "UPDATED description - premium cotton",
    "price": 69.99,
    "currency": "$",
    "availability": "In Stock",
    "sku": "TEST-001",
    "brand": "T-LD"
}
```

**Oczekiwany wynik:**
- Status: `200 OK`
- Body: Zaktualizowany produkt

---

### TEST 9: Usuń drugi produkt
```
Method: DELETE
URL: http://localhost:8081/api/simple-products/2
```
**Oczekiwany wynik:**
- Status: `204 No Content`
- Body: (puste)

---

### TEST 10: Sprawdź finalną listę
```
Method: GET
URL: http://localhost:8081/api/simple-products
```
**Oczekiwany wynik:**
- Status: `200 OK`
- Body: Lista z 1 produktem (tylko pierwszy, zaktualizowany)

---

## 4️⃣ TESTUJ BŁĘDY

### TEST 11: Spróbuj dodać produkt z tym samym SKU
```
Method: POST
URL: http://localhost:8081/api/simple-products
Body: (użyj SKU "TEST-001" - już istnieje)
```
**Oczekiwany wynik:**
- Status: `409 Conflict`

### TEST 12: Spróbuj pobrać nieistniejący produkt
```
Method: GET
URL: http://localhost:8081/api/simple-products/999
```
**Oczekiwany wynik:**
- Status: `404 Not Found`

### TEST 13: Spróbuj dodać produkt bez wymaganych pól
```
Method: POST
URL: http://localhost:8081/api/simple-products
Body: {"name": ""}  // pusty name
```
**Oczekiwany wynik:**
- Status: `400 Bad Request`
- Body: Błędy walidacji

---

## 5️⃣ IMPORT GOTOWEJ KOLEKCJI

### Możesz zaimportować gotową kolekcję:
1. W Postmanie: File → Import
2. Wybierz plik: `URBNCTRL_API.postman_collection.json`
3. Zmień URL w kolekcji na: `http://localhost:8081/api/simple-products`

---

## 📋 CHECKLIST TESTOWANIA

- [ ] ✅ TEST 1: `/test` endpoint działa
- [ ] ✅ TEST 2: Pusta lista produktów
- [ ] ✅ TEST 3: Dodanie pierwszego produktu (201)
- [ ] ✅ TEST 4: Lista z 1 produktem
- [ ] ✅ TEST 5: Pobranie produktu po ID
- [ ] ✅ TEST 6: Dodanie drugiego produktu (201)
- [ ] ✅ TEST 7: Lista z 2 produktami
- [ ] ✅ TEST 8: Aktualizacja produktu (200)
- [ ] ✅ TEST 9: Usunięcie produktu (204)
- [ ] ✅ TEST 10: Finalna lista z 1 produktem
- [ ] ✅ TEST 11: Błąd duplikatu SKU (409)
- [ ] ✅ TEST 12: Błąd nieistniejący ID (404)
- [ ] ✅ TEST 13: Błąd walidacji (400)

## 🚨 CO ROBIĆ GDY COŚ NIE DZIAŁA

### Jeśli dostajesz 500 Internal Server Error:
1. Sprawdź logi aplikacji w terminalu
2. Sprawdź czy baza danych działa
3. Sprawdź czy tabela `products` została utworzona

### Jeśli dostajesz 404 Not Found:
1. Sprawdź URL - czy używasz `/api/simple-products`
2. Sprawdź czy aplikacja działa na porcie 8081

### Jeśli aplikacja się nie uruchamia:
1. Sprawdź czy port 8081 jest wolny
2. Sprawdź połączenie z MySQL
3. Sprawdź hasło w `application.properties`

---

**GOTOWE! TERAZ PRZETESTUJ WSZYSTKO KROK PO KROKU!** 🚀
