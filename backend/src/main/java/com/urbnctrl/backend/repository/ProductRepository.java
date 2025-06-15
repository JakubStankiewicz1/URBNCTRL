package com.urbnctrl.backend.repository;

import com.urbnctrl.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
      Optional<Product> findBySku(String sku);
    List<Product> findByCategory(String category);
    List<Product> findByBrand(String brand);
    boolean existsBySku(String sku);
}
