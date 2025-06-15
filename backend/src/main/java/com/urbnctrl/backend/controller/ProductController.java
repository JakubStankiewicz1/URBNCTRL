package com.urbnctrl.backend.controller;

import com.urbnctrl.backend.model.Product;
import com.urbnctrl.backend.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class ProductController {
    
    @Autowired
    private ProductService productService;
      // Test endpoint
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Product API works!");
    }
    
    // Get all products
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        try {
            List<Product> products = productService.getAllProducts();
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error getting all products: " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // Get product by ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        try {
            Optional<Product> product = productService.getProductById(id);
            if (product.isPresent()) {
                return new ResponseEntity<>(product.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            System.err.println("Error getting product by id: " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // Create new product
    @PostMapping
    public ResponseEntity<Product> createProduct(@Valid @RequestBody Product product) {
        try {
            Product createdProduct = productService.createProduct(product);
            return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            System.err.println("Error creating product: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } catch (Exception e) {
            System.err.println("Error creating product: " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // Update product
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @Valid @RequestBody Product productDetails) {
        try {
            Product updatedProduct = productService.updateProduct(id, productDetails);
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            System.err.println("Error updating product: " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // Delete product
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteProduct(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            System.err.println("Error deleting product: " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
