import json
import requests
import time

# Konfiguracja
BACKEND_URL = "http://localhost:8081/api/simple-products"
JSON_FILE = r"c:\Users\stank\Desktop\URBNCTRL\frontend\src\assets\products_new.json"

def load_products():
    """Wczytaj produkty z pliku JSON"""
    with open(JSON_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def transform_product(product):
    """Przekształć format produktu z frontend na backend"""
    return {
        "name": product.get("name"),
        "description": product.get("description"),
        "price": product.get("price"),
        "currency": product.get("currency", "$"),
        "category": product.get("category"),
        "brand": product.get("brand"),
        "availability": product.get("availability", "In Stock"),
        "sku": product.get("sku"),
        "collaboration": product.get("collaboration"),
        "features": product.get("features", []),
        "sizes": product.get("sizes", []),
        "sizeStock": product.get("sizeStock", {}),
        "colors": product.get("colors", []),
        "material": product.get("material"),
        "lining": product.get("lining"),
        "weight": product.get("weight", "Medium Weight"),
        "fit": product.get("fit", "Regular"),
        "deliveryTime": product.get("deliveryTime", "2-4 dni"),
        "careInstructions": product.get("careInstructions", []),
        "shippingInfo": product.get("shippingInfo"),
        "tags": product.get("tags", []),
        "releaseDate": product.get("releaseDate"),
        "limitedEdition": product.get("limitedEdition", False),
        "featured": product.get("featured", False),
        "primaryImage": product.get("images", {}).get("primary"),
        "secondaryImage": product.get("images", {}).get("secondary"),
        "galleryImages": product.get("images", {}).get("gallery", []),
        # Dodatkowe pola z productDetails
        "sport": product.get("productDetails", {}).get("sport"),
        "belt": product.get("productDetails", {}).get("belt"),
        "neckline": product.get("productDetails", {}).get("neckline"),
        "collar": product.get("productDetails", {}).get("collar"),
        "pockets": product.get("productDetails", {}).get("pockets"),
        "sleeves": product.get("productDetails", {}).get("sleeves"),
        "pattern": product.get("productDetails", {}).get("pattern"),
        "details": product.get("productDetails", {}).get("details"),
        "function": product.get("productDetails", {}).get("function"),
        "productNumber": product.get("productDetails", {}).get("productNumber", product.get("sku"))
    }

def add_product(product_data):
    """Dodaj produkt do backend"""
    try:
        response = requests.post(BACKEND_URL, json=product_data)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Błąd przy dodawaniu produktu {product_data.get('name')}: {e}")
        return None

def main():
    print("🚀 Rozpoczynam importowanie produktów...")
    
    # Wczytaj produkty
    products = load_products()
    print(f"📦 Znaleziono {len(products)} produktów do importu")
    
    # Dodaj każdy produkt
    success_count = 0
    for i, product in enumerate(products, 1):
        print(f"\n📤 ({i}/{len(products)}) Dodawanie: {product['name']}")
        
        # Przekształć format
        transformed_product = transform_product(product)
        
        # Dodaj do backend
        result = add_product(transformed_product)
        if result:
            print(f"✅ Pomyślnie dodano: {product['name']}")
            success_count += 1
        else:
            print(f"❌ Błąd przy dodawaniu: {product['name']}")
        
        # Krótka pauza między requestami
        time.sleep(0.5)
    
    print(f"\n🎉 Import zakończony!")
    print(f"✅ Pomyślnie dodano: {success_count}/{len(products)} produktów")

if __name__ == "__main__":
    main()
