# Testowanie Zamówień (Orders) w Postmanie

## Przygotowanie

1. **Uruchom backend:**
   ```
   cd backend
   mvn spring-boot:run
   ```
   Backend będzie dostępny pod adresem: `http://localhost:8081`

2. **Zaimportuj kolekcję Postman:**
   - Otwórz Postman
   - Kliknij "Import"
   - Wybierz plik `URBNCTRL_API.postman_collection.json`
   - Kolekcja zawiera teraz folder "Orders" z wszystkimi endpointami

## Dostępne Endpointy dla Zamówień

### 1. Utworzenie Zamówienia
**POST** `/api/orders`

**Przykładowe body (JSON):**
```json
{
    "customerEmail": "jan.kowalski@example.com",
    "firstName": "Jan",
    "lastName": "Kowalski",
    "phone": "+48123456789",
    "shippingAddress": "ul. Testowa 123",
    "apartment": "10A",
    "city": "Warszawa",
    "postcode": "00-001",
    "country": "Polska",
    "subtotal": 119.98,
    "shippingCost": 15.00,
    "total": 134.98,
    "paymentMethod": "Credit Card",
    "orderNote": "Proszę o szybką dostawę",
    "newsletterSignup": true,
    "orderItems": [
        {
            "productId": 1,
            "productName": "Test Champions Tee",
            "productImage": "https://example.com/image1.jpg",
            "productSku": "TEST-001",
            "price": 59.99,
            "quantity": 2,
            "selectedSize": "M",
            "selectedColor": "Black",
            "subtotal": 119.98
        }
    ]
}
```

### 2. Pobranie Wszystkich Zamówień
**GET** `/api/orders`

### 3. Pobranie Zamówienia po ID
**GET** `/api/orders/{id}`
- Przykład: `/api/orders/1`

### 4. Pobranie Zamówienia po Numerze
**GET** `/api/orders/number/{orderNumber}`
- Przykład: `/api/orders/number/ORD-000001`

### 5. Pobranie Zamówień Klienta
**GET** `/api/orders/customer/{email}`
- Przykład: `/api/orders/customer/jan.kowalski@example.com`

### 6. Pobranie Zamówień po Statusie
**GET** `/api/orders/status/{status}`
- Przykład: `/api/orders/status/PENDING`
- Dostępne statusy: `PENDING`, `CONFIRMED`, `SHIPPED`, `DELIVERED`, `CANCELLED`

### 7. Zmiana Statusu Zamówienia
**PUT** `/api/orders/{id}/status`

**Body (raw text):**
```
"CONFIRMED"
```

### 8. Zmiana Statusu Płatności
**PUT** `/api/orders/{id}/payment-status`

**Body (raw text):**
```
"PAID"
```
- Dostępne statusy płatności: `PENDING`, `PAID`, `FAILED`, `REFUNDED`

### 9. Statystyki Zamówień
**GET** `/api/orders/stats`

### 10. Usunięcie Zamówienia
**DELETE** `/api/orders/{id}`

## Scenariusze Testowe

### Scenariusz 1: Kompletny Cykl Zamówienia
1. Utwórz zamówienie (POST `/api/orders`)
2. Sprawdź czy zostało utworzone (GET `/api/orders`)
3. Potwierdź zamówienie (PUT `/api/orders/{id}/status` → "CONFIRMED")
4. Oznacz jako opłacone (PUT `/api/orders/{id}/payment-status` → "PAID")
5. Zmień status na wysłane (PUT `/api/orders/{id}/status` → "SHIPPED")

### Scenariusz 2: Testowanie Walidacji
1. Spróbuj utworzyć zamówienie bez wymaganych pól
2. Spróbuj utworzyć zamówienie bez items
3. Sprawdź obsługę błędów

### Scenariusz 3: Wyszukiwanie
1. Utwórz kilka zamówień z różnymi emailami
2. Wyszukaj zamówienia po emailu klienta
3. Wyszukaj zamówienia po statusie

## Wymagane Pola dla Zamówienia

**Obowiązkowe:**
- `customerEmail`
- `firstName`
- `lastName`
- `shippingAddress`
- `city`
- `postcode`
- `country`
- `subtotal`
- `shippingCost`
- `total`
- `paymentMethod`
- `orderItems` (co najmniej jeden item)

**Opcjonalne:**
- `phone`
- `apartment`
- `orderNote`
- `newsletterSignup`

**Dla każdego OrderItem obowiązkowe:**
- `productId`
- `productName`
- `price`
- `quantity`
- `subtotal`

## Uwagi Dodatkowe

1. **Automatyczne Generowanie:** 
   - `orderNumber` jest generowany automatycznie
   - `createdAt` jest ustawiane automatycznie
   - Domyślny status: `PENDING`
   - Domyślny payment status: `PENDING`

2. **Logowanie:**
   - Backend loguje szczegółowe informacje o tworzeniu zamówień
   - Sprawdź konsole backendu w przypadku błędów

3. **CORS:**
   - API wspiera CORS dla localhost:3000, localhost:5173, i localhost:9999

4. **Przykładowy plik:**
   - Użyj pliku `sample_order.json` jako szablonu dla testów

## Rozwiązywanie Problemów

1. **Błąd 400 (Bad Request):**
   - Sprawdź czy wszystkie wymagane pola są wypełnione
   - Sprawdź czy `orderItems` nie jest puste

2. **Błąd 404 (Not Found):**
   - Sprawdź czy używasz poprawnego ID zamówienia
   - Sprawdź czy zamówienie istnieje

3. **Błąd 500 (Internal Server Error):**
   - Sprawdź logi backendu
   - Sprawdź czy baza danych jest uruchomiona
