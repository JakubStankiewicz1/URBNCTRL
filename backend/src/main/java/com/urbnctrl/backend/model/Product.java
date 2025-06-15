package com.urbnctrl.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Name is required")
    @Column(nullable = false)
    private String name;
    
    @NotBlank(message = "Category is required")
    @Column(nullable = false)
    private String category;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    @Column(nullable = false)
    private BigDecimal price;
    
    @NotBlank(message = "Currency is required")
    @Column(nullable = false)
    private String currency;
    
    @NotBlank(message = "Availability is required")
    @Column(nullable = false)
    private String availability;
    
    @Column(unique = true, nullable = false)
    @NotBlank(message = "SKU is required")
    private String sku;
    
    @NotBlank(message = "Brand is required")
    @Column(nullable = false)
    private String brand;
      // Default constructor
    public Product() {}
    
    // Constructor with basic fields
    public Product(String name, String category, String description, BigDecimal price, 
                        String currency, String availability, String sku, String brand) {
        this.name = name;
        this.category = category;
        this.description = description;
        this.price = price;
        this.currency = currency;
        this.availability = availability;
        this.sku = sku;
        this.brand = brand;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    
    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }
    
    public String getAvailability() { return availability; }
    public void setAvailability(String availability) { this.availability = availability; }
    
    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }
    
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
      @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", category='" + category + '\'' +
                ", price=" + price +
                ", sku='" + sku + '\'' +
                ", brand='" + brand + '\'' +
                '}';
    }
}
