# URBNCTRL Backend API

Backend aplikacji URBNCTRL zbudowany w Spring Boot z bazą danych MySQL.

## Wymagania

- Java 24+
- Maven 3.6+
- MySQL 8.0+

## Konfiguracja bazy danych

1. Zainstaluj MySQL Server
2. Utwórz bazę danych:

```sql
CREATE DATABASE urbnctrl_db;
```

3. Zaktualizuj ustawienia w `src/main/resources/application.properties`:

```properties
spring.datasource.username=twoj_uzytkownik
spring.datasource.password=twoje_haslo
```

## Uruchamianie aplikacji

### Za pomocą Maven

```bash
./mvnw spring-boot:run
```

### Za pomocą PowerShell (Windows)

```powershell
.\mvnw.cmd spring-boot:run
```

## API Endpoints

### Produkty

- `GET /api/products` - Pobierz wszystkie produkty
- `GET /api/products/{id}` - Pobierz produkt po ID
- `GET /api/products/sku/{sku}` - Pobierz produkt po SKU
- `GET /api/products/category/{category}` - Pobierz produkty z kategorii
- `GET /api/products/brand/{brand}` - Pobierz produkty marki
- `GET /api/products/featured` - Pobierz polecane produkty
- `GET /api/products/limited-edition` - Pobierz produkty limitowane
- `GET /api/products/search?name={name}` - Wyszukaj produkty po nazwie
- `GET /api/products/search/advanced?category={}&brand={}&availability={}&featured={}` - Zaawansowane wyszukiwanie
- `POST /api/products` - Utwórz nowy produkt
- `PUT /api/products/{id}` - Zaktualizuj produkt
- `DELETE /api/products/{id}` - Usuń produkt
- `GET /api/products/{id}/exists` - Sprawdź czy produkt istnieje
- `GET /api/products/sku/{sku}/exists` - Sprawdź czy SKU istnieje

## Przykład JSON dla nowego produktu

```json
{
  "name": "Test Product",
  "category": "Apparel",
  "description": "Test description",
  "price": 99.99,
  "currency": "$",
  "availability": "In Stock",
  "sku": "TEST-001",
  "brand": "T-LD",
  "collaboration": null,
  "features": ["Feature 1", "Feature 2"],
  "sizes": ["S", "M", "L"],
  "sizeStock": { "S": 10, "M": 15, "L": 12 },
  "colors": ["Black", "White"],
  "material": "100% Cotton",
  "weight": "Medium",
  "fit": "Regular",
  "deliveryTime": "2-3 dni",
  "careInstructions": ["Pranie w 30°C"],
  "productDetails": {
    "sport": "Casual",
    "neckline": "Okrągły",
    "collar": "Crew neck"
  },
  "sizeAndFit": {
    "modelHeight": "185 cm",
    "fitType": "Regular",
    "shape": "Prosty"
  },
  "images": {
    "primary": "http://example.com/image1.jpg",
    "secondary": "http://example.com/image2.jpg",
    "gallery": ["http://example.com/image1.jpg"]
  },
  "shippingInfo": "Ships from Poland",
  "tags": ["test", "new"],
  "releaseDate": "2024-12-01",
  "limitedEdition": false,
  "featured": true
}
```

## Testowanie

Możesz przetestować API używając:

- Postman
- cURL
- Frontend aplikacji (React/Vite)

### Przykład cURL:

```bash
# Pobierz wszystkie produkty
curl -X GET http://localhost:8080/api/products

# Utwórz nowy produkt
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d @example_product.json
```

## Struktura bazy danych

Aplikacja automatycznie utworzy następujące tabele:

- `products` - główna tabela produktów
- `product_features` - cechy produktów
- `product_sizes` - dostępne rozmiary
- `product_size_stock` - stan magazynowy per rozmiar
- `product_colors` - dostępne kolory
- `product_care_instructions` - instrukcje pielęgnacji
- `product_gallery_images` - galeria zdjęć
- `product_tags` - tagi produktów

## Rozwiązywanie problemów

1. **Błąd połączenia z bazą danych**: Sprawdź czy MySQL działa i czy dane logowania są poprawne
2. **Port 8080 zajęty**: Zmień port w `application.properties`: `server.port=8081`
3. **Błędy CORS**: Dodaj swój frontend URL do `CorsConfig.java`
