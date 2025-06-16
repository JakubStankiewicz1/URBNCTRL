package com.urbnctrl.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    // Relationship with Order
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;
    
    // Product Information
    @Column(name = "product_id", nullable = false)
    private Long productId;
    
    @Column(name = "product_name", nullable = false)
    private String productName;
    
    @Column(name = "product_image")
    private String productImage;
    
    @Column(name = "product_sku")
    private String productSku;
    
    // Item Details
    @Column(name = "price", nullable = false)
    private Double price;
    
    @Column(name = "quantity", nullable = false)
    private Integer quantity;
    
    @Column(name = "selected_size")
    private String selectedSize;
    
    @Column(name = "selected_color")
    private String selectedColor;
    
    @Column(name = "subtotal", nullable = false)
    private Double subtotal;
    
    // Constructors
    public OrderItem() {}
    
    public OrderItem(Order order, Long productId, String productName, String productImage, 
                     String productSku, Double price, Integer quantity, String selectedSize, 
                     String selectedColor) {
        this.order = order;
        this.productId = productId;
        this.productName = productName;
        this.productImage = productImage;
        this.productSku = productSku;
        this.price = price;
        this.quantity = quantity;
        this.selectedSize = selectedSize;
        this.selectedColor = selectedColor;
        this.subtotal = price * quantity;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Order getOrder() {
        return order;
    }
    
    public void setOrder(Order order) {
        this.order = order;
    }
    
    public Long getProductId() {
        return productId;
    }
    
    public void setProductId(Long productId) {
        this.productId = productId;
    }
    
    public String getProductName() {
        return productName;
    }
    
    public void setProductName(String productName) {
        this.productName = productName;
    }
    
    public String getProductImage() {
        return productImage;
    }
    
    public void setProductImage(String productImage) {
        this.productImage = productImage;
    }
    
    public String getProductSku() {
        return productSku;
    }
    
    public void setProductSku(String productSku) {
        this.productSku = productSku;
    }
    
    public Double getPrice() {
        return price;
    }
    
    public void setPrice(Double price) {
        this.price = price;
    }
    
    public Integer getQuantity() {
        return quantity;
    }
    
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    
    public String getSelectedSize() {
        return selectedSize;
    }
    
    public void setSelectedSize(String selectedSize) {
        this.selectedSize = selectedSize;
    }
    
    public String getSelectedColor() {
        return selectedColor;
    }
    
    public void setSelectedColor(String selectedColor) {
        this.selectedColor = selectedColor;
    }
    
    public Double getSubtotal() {
        return subtotal;
    }
    
    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }
    
    // Calculate subtotal automatically
    public void calculateSubtotal() {
        if (this.price != null && this.quantity != null) {
            this.subtotal = this.price * this.quantity;
        }
    }
}
