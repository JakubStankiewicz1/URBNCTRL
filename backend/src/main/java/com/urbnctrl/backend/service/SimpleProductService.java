package com.urbnctrl.backend.service;

import com.urbnctrl.backend.model.SimpleProduct;
import com.urbnctrl.backend.repository.SimpleProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SimpleProductService {
    
    @Autowired
    private SimpleProductRepository repository;
    
    public List<SimpleProduct> getAllProducts() {
        return repository.findAll();
    }
    
    public Optional<SimpleProduct> getProductById(Long id) {
        return repository.findById(id);
    }
    
    public Optional<SimpleProduct> getProductBySku(String sku) {
        return repository.findBySku(sku);
    }
    
    public List<SimpleProduct> getProductsByCategory(String category) {
        return repository.findByCategory(category);
    }
    
    public SimpleProduct createProduct(SimpleProduct product) {
        if (repository.existsBySku(product.getSku())) {
            throw new RuntimeException("Product with SKU " + product.getSku() + " already exists");
        }
        return repository.save(product);
    }
    
    public SimpleProduct updateProduct(Long id, SimpleProduct productDetails) {
        Optional<SimpleProduct> optionalProduct = repository.findById(id);
        
        if (optionalProduct.isPresent()) {
            SimpleProduct product = optionalProduct.get();
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
