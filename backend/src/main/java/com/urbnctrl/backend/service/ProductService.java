package com.urbnctrl.backend.service;

import com.urbnctrl.backend.model.Product;
import com.urbnctrl.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository repository;
      public List<Product> getAllProducts() {
        return repository.findAll();
    }
    
    public Optional<Product> getProductById(Long id) {
        return repository.findById(id);
    }
    
    public Optional<Product> getProductBySku(String sku) {
        return repository.findBySku(sku);
    }
    
    public List<Product> getProductsByCategory(String category) {
        return repository.findByCategory(category);
    }
    
    public Product createProduct(Product product) {
        if (repository.existsBySku(product.getSku())) {
            throw new RuntimeException("Product with SKU " + product.getSku() + " already exists");
        }
        return repository.save(product);
    }
      public Product updateProduct(Long id, Product productDetails) {
        Optional<Product> optionalProduct = repository.findById(id);
        
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setName(productDetails.getName());
            product.setCategory(productDetails.getCategory());
            product.setDescription(productDetails.getDescription());
            product.setPrice(productDetails.getPrice());
            product.setCurrency(productDetails.getCurrency());
            product.setAvailability(productDetails.getAvailability());
            product.setBrand(productDetails.getBrand());
            return repository.save(product);
        } else {
            throw new RuntimeException("Product not found with id: " + id);
        }
    }
    
    public void deleteProduct(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Product not found with id: " + id);
        }
    }
}
