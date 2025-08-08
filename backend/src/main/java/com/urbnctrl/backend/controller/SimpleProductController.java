package com.urbnctrl.backend.controller;

import com.urbnctrl.backend.model.SimpleProduct;
import com.urbnctrl.backend.service.SimpleProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/simple-products")
@CrossOrigin(origins = {
    "https://urbnctrl-frontend-j99n.onrender.com",
    "https://urbnctrl-admin-x6jn.onrender.com",
    "https://*.onrender.com", 
    "http://localhost:3000", 
    "http://localhost:5173", 
    "http://localhost:9999"
})
public class SimpleProductController {

    @Autowired
    private SimpleProductService productService;

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("SimpleProduct API is working!");
    }

    @GetMapping
    public ResponseEntity<List<SimpleProduct>> getAllProducts() {
        List<SimpleProduct> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SimpleProduct> getProductById(@PathVariable Long id) {
        Optional<SimpleProduct> product = productService.getProductById(id);
        if (product.isPresent()) {
            return ResponseEntity.ok(product.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<SimpleProduct> createProduct(@Valid @RequestBody SimpleProduct product) {
        try {
            SimpleProduct createdProduct = productService.createProduct(product);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<SimpleProduct> updateProduct(@PathVariable Long id, @Valid @RequestBody SimpleProduct productDetails) {
        try {
            SimpleProduct updatedProduct = productService.updateProduct(id, productDetails);
            return ResponseEntity.ok(updatedProduct);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteProduct(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
