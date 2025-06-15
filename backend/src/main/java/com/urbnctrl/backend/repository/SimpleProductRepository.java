package com.urbnctrl.backend.repository;

import com.urbnctrl.backend.model.SimpleProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SimpleProductRepository extends JpaRepository<SimpleProduct, Long> {
    
    Optional<SimpleProduct> findBySku(String sku);
    List<SimpleProduct> findByCategory(String category);
    List<SimpleProduct> findByBrand(String brand);
    boolean existsBySku(String sku);
}
