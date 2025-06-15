# 🔧 SZYBKI TROUBLESHOOTING - Postman

## Problem: Tabela 'products' doesn't exist

### KROK 1: Sprawdź czy API w ogóle odpowiada

**GET** `http://localhost:8081/api/products`
- Jeśli dostajesz błąd 500 - to problem z bazą
- Jeśli dostajesz pustą listę [] - to znaczy że wszystko działa!

### KROK 2: Sprawdź endpoint który nie wymaga bazy

**GET** `http://localhost:8081/api/products/sku/TEST-001/exists`
- To też może nie działać jeśli tabela nie istnieje

### KROK 3: Spróbuj dodać produkt

**POST** `http://localhost:8081/api/products`
**Content-Type:** `application/json`

**BODY:**
```json
{
    "name": "Simple Test",
    "category": "Test",
    "description": "Test description",
    "price": 99.99,
    "currency": "$",
    "availability": "In Stock",
    "sku": "SIMPLE-001",
    "brand": "TestBrand"
}
```

### KROK 4: Jeśli nie działa - sprawdź logi aplikacji

W terminalu gdzie działa aplikacja szukaj:
- `CREATE TABLE` - czy tabele są tworzone
- `ERROR` - jakie są błędy

---

## 🚨 SZYBKA NAPRAWA

Jeśli problem się utrzymuje, spróbuj tego:

1. **Zatrzymaj aplikację** (Ctrl+C)
2. **Zmień na prostsze ustawienie:**

```properties
spring.jpa.hibernate.ddl-auto=create
```

3. **Uruchom ponownie**
4. **Po pierwszym uruchomieniu zmień z powrotem na:**

```properties
spring.jpa.hibernate.ddl-auto=update
```

---

## 🔍 CO SZUKAĆ W POSTMANIE:

### Jeśli GET /api/products zwraca:
- **[]** (pusta lista) = ✅ DZIAŁA!
- **500 Internal Server Error** = ❌ Problem z bazą
- **404 Not Found** = ❌ Problem z kontrolerem

### Jeśli POST /api/products zwraca:
- **201 Created** + JSON produktu = ✅ DZIAŁA IDEALNIE!
- **500 Internal Server Error** = ❌ Problem z bazą
- **400 Bad Request** = ❌ Problem z validacją danych

---

**PRZETESTUJ TO TERAZ I POWIEDZ MI CO DOSTAJESZ!** 🚀
