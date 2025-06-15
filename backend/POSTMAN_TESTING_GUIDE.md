# Przewodnik testowania API w Postman

## Ustawienia wstępne

1. Otwórz Postman
2. Utwórz nową kolekcję: "URBNCTRL API"
3. Base URL: `http://localhost:8081`

## 1. TEST: Sprawdzenie czy API działa

### GET - Pobierz wszystkie produkty
```
Method: GET
URL: http://localhost:8081/api/products
Headers: 
  Content-Type: application/json
```

**Oczekiwany wynik:** Lista produktów (może być pusta na początku)

---

## 2. TEST: Dodawanie nowego produktu

### POST - Utwórz nowy produkt
```
Method: POST
URL: http://localhost:8081/api/products
Headers: 
  Content-Type: application/json
```

**Body (raw JSON):**
```json
{
    "name": "Test Champions Tee",
    "category": "Apparel",
    "description": "Test product description - premium cotton t-shirt",
    "price": 59.99,
    "currency": "$",
    "availability": "In Stock",
    "sku": "TEST-001",
    "brand": "T-LD",
    "collaboration": "Test Collaboration",
    "features": [
        "Boxy Fit",
        "True to Size",
        "Front & Rear Print",
        "Heavy Weight"
    ],
    "sizes": ["S", "M", "L", "XL"],
    "sizeStock": {
        "S": 10,
        "M": 15,
        "L": 12,
        "XL": 8
    },
    "colors": ["Black", "White"],
    "material": "68% Bawełna, 32% Poliester",
    "lining": "58% Bawełna, 42% Poliester",
    "weight": "Heavy Weight",
    "fit": "Boxy",
    "deliveryTime": "2-3 dni",
    "careInstructions": [
        "Pranie w pralce w 30°C",
        "Nie wybielać",
        "Prasowanie w niskiej temperaturze"
    ],
    "productDetails": {
        "sport": "Trening i fitness",
        "belt": "Elastyczny",
        "neckline": "Okrągły",
        "collar": "Kaptur",
        "pockets": "Kieszeń typu kangur",
        "sleeves": "Ściągacz",
        "pattern": "Kolor jednolity",
        "details": "Elastyczna talia",
        "function": "Wiatroszczelny",
        "productNumber": "TEST-001"
    },
    "sizeAndFit": {
        "modelHeight": "Osoba na zdjęciu ma 185 cm wzrostu i nosi rozmiar M",
        "fitType": "Boxy fit",
        "shape": "Prosty",
        "length": "Standardowa",
        "sleeveLength": "Długi rękaw"
    },
    "images": {
        "primary": "https://example.com/image1.jpg",
        "secondary": "https://example.com/image2.jpg",
        "gallery": [
            "https://example.com/image1.jpg",
            "https://example.com/image2.jpg"
        ]
    },
    "shippingInfo": "Ships from Poland",
    "tags": ["test", "limited edition", "collaboration"],
    "releaseDate": "2024-12-01",
    "limitedEdition": true,
    "featured": true
}
```

**Oczekiwany wynik:** Status 201 Created + utworzony produkt z ID

---

## 3. TEST: Pobieranie produktu po ID

### GET - Pobierz produkt po ID
```
Method: GET
URL: http://localhost:8081/api/products/1
Headers: 
  Content-Type: application/json
```

**Oczekiwany wynik:** Szczegóły produktu o ID = 1

---

## 4. TEST: Wyszukiwanie produktów

### GET - Wyszukaj po SKU
```
Method: GET
URL: http://localhost:8081/api/products/sku/TEST-001
Headers: 
  Content-Type: application/json
```

### GET - Wyszukaj po kategorii
```
Method: GET
URL: http://localhost:8081/api/products/category/Apparel
Headers: 
  Content-Type: application/json
```

### GET - Wyszukaj po marce
```
Method: GET
URL: http://localhost:8081/api/products/brand/T-LD
Headers: 
  Content-Type: application/json
```

### GET - Polecane produkty
```
Method: GET
URL: http://localhost:8081/api/products/featured
Headers: 
  Content-Type: application/json
```

### GET - Wyszukaj po nazwie
```
Method: GET
URL: http://localhost:8081/api/products/search?name=Champions
Headers: 
  Content-Type: application/json
```

---

## 5. TEST: Aktualizacja produktu

### PUT - Zaktualizuj produkt
```
Method: PUT
URL: http://localhost:8081/api/products/1
Headers: 
  Content-Type: application/json
```

**Body (raw JSON) - tylko zmienione pola:**
```json
{
    "name": "UPDATED Champions Tee",
    "category": "Apparel",
    "description": "UPDATED description",
    "price": 69.99,
    "currency": "$",
    "availability": "In Stock",
    "sku": "TEST-001",
    "brand": "T-LD",
    "collaboration": "Updated Collaboration",
    "features": [
        "Boxy Fit",
        "True to Size",
        "UPDATED Feature"
    ],
    "sizes": ["S", "M", "L", "XL"],
    "sizeStock": {
        "S": 5,
        "M": 10,
        "L": 8,
        "XL": 3
    },
    "colors": ["Black", "White", "Gray"],
    "material": "100% Bawełna",
    "weight": "Medium Weight",
    "fit": "Regular",
    "deliveryTime": "1-2 dni",
    "careInstructions": [
        "Pranie w 40°C",
        "Można prasować"
    ],
    "productDetails": {
        "sport": "Casual",
        "neckline": "V-neck",
        "collar": "No collar"
    },
    "sizeAndFit": {
        "modelHeight": "180 cm",
        "fitType": "Regular fit",
        "shape": "Slim"
    },
    "images": {
        "primary": "https://example.com/updated1.jpg",
        "gallery": [
            "https://example.com/updated1.jpg"
        ]
    },
    "shippingInfo": "Fast shipping from Warsaw",
    "tags": ["updated", "test"],
    "releaseDate": "2024-12-15",
    "limitedEdition": false,
    "featured": false
}
```

---

## 6. TEST: Sprawdzanie istnienia

### GET - Czy produkt istnieje
```
Method: GET
URL: http://localhost:8081/api/products/1/exists
Headers: 
  Content-Type: application/json
```

### GET - Czy SKU istnieje
```
Method: GET
URL: http://localhost:8081/api/products/sku/TEST-001/exists
Headers: 
  Content-Type: application/json
```

---

## 7. TEST: Dodanie drugiego produktu

### POST - Drugi testowy produkt
```
Method: POST
URL: http://localhost:8081/api/products
Headers: 
  Content-Type: application/json
```

**Body (raw JSON):**
```json
{
    "name": "Tokyo Drift Hoodie",
    "category": "Hoodies",
    "description": "Premium hoodie with Tokyo Drift graphics",
    "price": 89.99,
    "currency": "$",
    "availability": "Limited Stock",
    "sku": "TLD-TD-002",
    "brand": "T-LD",
    "features": [
        "Warm",
        "Comfortable",
        "Stylish Print"
    ],
    "sizes": ["M", "L", "XL"],
    "sizeStock": {
        "M": 3,
        "L": 5,
        "XL": 2
    },
    "colors": ["Black", "Navy"],
    "material": "80% Cotton, 20% Polyester",
    "weight": "Heavy Weight",
    "fit": "Oversized",
    "deliveryTime": "3-5 dni",
    "careInstructions": [
        "Pranie w 30°C",
        "Nie suszyć w suszarce"
    ],
    "productDetails": {
        "sport": "Streetwear",
        "neckline": "Hood",
        "collar": "Hoodie",
        "pockets": "Kangaroo pocket"
    },
    "sizeAndFit": {
        "modelHeight": "185 cm, rozmiar L",
        "fitType": "Oversized",
        "shape": "Boxy"
    },
    "images": {
        "primary": "https://example.com/hoodie1.jpg",
        "gallery": [
            "https://example.com/hoodie1.jpg",
            "https://example.com/hoodie2.jpg"
        ]
    },
    "shippingInfo": "Ships from Tokyo",
    "tags": ["hoodie", "tokyo", "drift", "streetwear"],
    "releaseDate": "2024-11-01",
    "limitedEdition": true,
    "featured": false
}
```

---

## 8. TEST: Zaawansowane wyszukiwanie

### GET - Filtrowanie po wielu kryteriach
```
Method: GET
URL: http://localhost:8081/api/products/search/advanced?category=Apparel&brand=T-LD&featured=true
Headers: 
  Content-Type: application/json
```

---

## 9. TEST: Usuwanie produktu

### DELETE - Usuń produkt
```
Method: DELETE
URL: http://localhost:8081/api/products/2
Headers: 
  Content-Type: application/json
```

**Oczekiwany wynik:** Status 204 No Content

---

## 10. TEST: Błędy i walidacja

### POST - Próba dodania produktu z tym samym SKU (powinien zwrócić błąd)
```
Method: POST
URL: http://localhost:8081/api/products
Headers: 
  Content-Type: application/json
```

**Body:** Użyj tego samego SKU co wcześniej (TEST-001)

### POST - Produkt z nieprawidłowymi danymi
```json
{
    "name": "",
    "price": -10,
    "sku": ""
}
```

**Oczekiwany wynik:** Status 400 Bad Request z błędami walidacji

---

## Kolejność testowania:

1. ✅ GET /api/products (sprawdź czy API działa)
2. ✅ POST /api/products (dodaj pierwszy produkt)
3. ✅ GET /api/products (sprawdź czy produkt został dodany)
4. ✅ GET /api/products/1 (pobierz po ID)
5. ✅ GET /api/products/sku/TEST-001 (pobierz po SKU)
6. ✅ PUT /api/products/1 (zaktualizuj produkt)
7. ✅ POST /api/products (dodaj drugi produkt)
8. ✅ GET /api/products/featured (polecane)
9. ✅ GET /api/products/search?name=Tokyo (wyszukaj)
10. ✅ DELETE /api/products/2 (usuń drugi produkt)

## Ważne!
- Sprawdzaj zawsze status codes (200, 201, 204, 400, 404, 500)
- Sprawdzaj czy odpowiedzi JSON są poprawnie sformatowane
- Testuj błędne scenariusze (nieprawidłowe ID, duplikaty SKU)
- Obserwuj logi aplikacji w terminalu podczas testowania
