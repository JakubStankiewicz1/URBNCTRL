# 🚀 JAK PRZETESTOWAĆ BACKEND W POSTMAN

## ✅ AKTUALNE ENDPOINTY (PO REFAKTORINGU)

**Base URL:** `http://localhost:8081`
**Endpoint Path:** `/api/products` (już nie `/api/simple-products`)

---

## 🔥 KROK PO KROKU - TESTOWANIE

### 1. **SPRAWDŹ CZY API DZIAŁA**
```
GET http://localhost:8081/api/products/test
```
**Oczekiwany wynik:**
- Status: `200 OK`
- Body: `"Product API works!"`

---

### 2. **POBIERZ LISTĘ PRODUKTÓW (PUSTA NA POCZĄTKU)**
```
GET http://localhost:8081/api/products
```
**Oczekiwany wynik:**
- Status: `200 OK`
- Body: `[]` (pusta lista)

---

### 3. **DODAJ NOWY PRODUKT**
```
POST http://localhost:8081/api/products
Content-Type: application/json
```

**Body:**
```json
{
    "name": "Test Product",
    "category": "Test Category",
    "description": "This is a test product for the clean API",
    "price": 29.99,
    "currency": "$",
    "availability": "In Stock",
    "sku": "TEST-001",
    "brand": "TestBrand"
}
```

**Oczekiwany wynik:**
- Status: `201 Created`
- Body: JSON z nowym produktem + `id`

---

### 4. **SPRAWDŹ CZY PRODUKT ZOSTAŁ DODANY**
```
GET http://localhost:8081/api/products
```
**Oczekiwany wynik:**
- Status: `200 OK`
- Body: Lista z 1 produktem

---

### 5. **POBIERZ PRODUKT PO ID**
```
GET http://localhost:8081/api/products/1
```
**Oczekiwany wynik:**
- Status: `200 OK`
- Body: Szczegóły produktu o ID = 1

---

### 6. **ZAKTUALIZUJ PRODUKT**
```
PUT http://localhost:8081/api/products/1
Content-Type: application/json
```

**Body:**
```json
{
    "name": "UPDATED Test Product",
    "category": "Updated Category",
    "description": "This product has been updated",
    "price": 39.99,
    "currency": "$",
    "availability": "Limited Stock",
    "sku": "TEST-001",
    "brand": "UpdatedBrand"
}
```

**Oczekiwany wynik:**
- Status: `200 OK`
- Body: Zaktualizowany produkt

---

### 7. **USUŃ PRODUKT**
```
DELETE http://localhost:8081/api/products/1
```
**Oczekiwany wynik:**
- Status: `204 No Content`
- Body: (puste)

---

### 8. **SPRAWDŹ CZY PRODUKT ZOSTAŁ USUNIĘTY**
```
GET http://localhost:8081/api/products/1
```
**Oczekiwany wynik:**
- Status: `404 Not Found`

---

## 🎯 TESTOWANIE BŁĘDÓW

### Dodanie produktu z tym samym SKU (duplikat)
```
POST http://localhost:8081/api/products
```
Dodaj drugi produkt z tym samym SKU - powinien zwrócić `409 Conflict`

### Dodanie produktu z brakującymi polami
```
POST http://localhost:8081/api/products
```
**Body:**
```json
{
    "name": "",
    "price": -10
}
```
**Oczekiwany wynik:** `400 Bad Request` z błędami walidacji

---

## 📋 KOLEJNOŚĆ TESTOWANIA

1. ✅ `GET /api/products/test` - sprawdź czy API działa
2. ✅ `GET /api/products` - pusta lista
3. ✅ `POST /api/products` - dodaj produkt
4. ✅ `GET /api/products` - sprawdź czy został dodany
5. ✅ `GET /api/products/1` - pobierz po ID
6. ✅ `PUT /api/products/1` - zaktualizuj
7. ✅ `DELETE /api/products/1` - usuń
8. ✅ `GET /api/products/1` - sprawdź czy został usunięty

---

## 🔧 ROZWIĄZYWANIE PROBLEMÓW

### Jeśli dostajesz 500 Internal Server Error:
1. Sprawdź logi aplikacji w terminalu
2. Upewnij się że aplikacja jest uruchomiona
3. Sprawdź czy baza danych MySQL działa

### Jeśli dostajesz 404 Not Found:
1. Sprawdź czy używasz poprawnego URL: `/api/products`
2. Sprawdź czy aplikacja działa na porcie 8081

### Jeśli dostajesz Connection Error:
1. Sprawdź czy aplikacja jest uruchomiona
2. Sprawdź port w URL (8081)

---

## 🎉 GOTOWE!

Teraz masz:
- ✅ Czyste endpointy: `/api/products`
- ✅ Czyste nazwy plików: `Product.java`, `ProductController.java`
- ✅ Działający backend gotowy do testowania

**URUCHOM APLIKACJĘ I TESTUJ W POSTMAN!** 🚀
