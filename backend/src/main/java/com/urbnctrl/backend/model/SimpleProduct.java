package com.urbnctrl.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "products")
public class SimpleProduct {
    
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
    
    // New fields
    private String collaboration;
    
    @ElementCollection
    @CollectionTable(name = "product_features", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "feature")
    private List<String> features;
    
    @ElementCollection
    @CollectionTable(name = "product_sizes", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "size")
    private List<String> sizes;
    
    @ElementCollection
    @CollectionTable(name = "product_size_stock", joinColumns = @JoinColumn(name = "product_id"))
    @MapKeyColumn(name = "size")
    @Column(name = "stock")
    private Map<String, Integer> sizeStock;
    
    @ElementCollection
    @CollectionTable(name = "product_colors", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "color")
    private List<String> colors;
    
    private String material;
    private String lining;
    private String weight;
    private String fit;
    private String deliveryTime;
    
    @ElementCollection
    @CollectionTable(name = "product_care_instructions", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "instruction")
    private List<String> careInstructions;
    
    @Column(name = "shipping_info")
    private String shippingInfo;
    
    @ElementCollection
    @CollectionTable(name = "product_tags", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "tag")
    private List<String> tags;
    
    @Column(name = "release_date")
    private LocalDate releaseDate;
    
    @Column(name = "limited_edition")
    private Boolean limitedEdition;
    
    private Boolean featured;
    
    // Product details as separate fields (flattened from nested object)
    @Column(name = "detail_sport")
    private String sport;
    
    @Column(name = "detail_belt")
    private String belt;
    
    @Column(name = "detail_neckline")
    private String neckline;
    
    @Column(name = "detail_collar")
    private String collar;
    
    @Column(name = "detail_pockets")
    private String pockets;
    
    @Column(name = "detail_sleeves")
    private String sleeves;
    
    @Column(name = "detail_pattern")
    private String pattern;
    
    @Column(name = "detail_details")
    private String details;
    
    @Column(name = "detail_function")
    private String function;
    
    @Column(name = "detail_product_number")
    private String productNumber;
    
    // Size and fit details (flattened from nested object)
    @Column(name = "size_fit_model_height")
    private String modelHeight;
    
    @Column(name = "size_fit_fit_type")
    private String fitType;
    
    @Column(name = "size_fit_shape")
    private String shape;
    
    @Column(name = "size_fit_length")
    private String length;
    
    @Column(name = "size_fit_sleeve_length")
    private String sleeveLength;
    
    // Images (flattened from nested object)
    @Column(name = "image_primary")
    private String primaryImage;
    
    @Column(name = "image_secondary")
    private String secondaryImage;
    
    @ElementCollection
    @CollectionTable(name = "product_gallery_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url")
    private List<String> galleryImages;
    
    // Default constructor
    public SimpleProduct() {}
    
    // Constructor with basic fields
    public SimpleProduct(String name, String category, String description, BigDecimal price, 
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
    
    public String getCollaboration() { return collaboration; }
    public void setCollaboration(String collaboration) { this.collaboration = collaboration; }
    
    public List<String> getFeatures() { return features; }
    public void setFeatures(List<String> features) { this.features = features; }
    
    public List<String> getSizes() { return sizes; }
    public void setSizes(List<String> sizes) { this.sizes = sizes; }
    
    public Map<String, Integer> getSizeStock() { return sizeStock; }
    public void setSizeStock(Map<String, Integer> sizeStock) { this.sizeStock = sizeStock; }
    
    public List<String> getColors() { return colors; }
    public void setColors(List<String> colors) { this.colors = colors; }
    
    public String getMaterial() { return material; }
    public void setMaterial(String material) { this.material = material; }
    
    public String getLining() { return lining; }
    public void setLining(String lining) { this.lining = lining; }
    
    public String getWeight() { return weight; }
    public void setWeight(String weight) { this.weight = weight; }
    
    public String getFit() { return fit; }
    public void setFit(String fit) { this.fit = fit; }
    
    public String getDeliveryTime() { return deliveryTime; }
    public void setDeliveryTime(String deliveryTime) { this.deliveryTime = deliveryTime; }
    
    public List<String> getCareInstructions() { return careInstructions; }
    public void setCareInstructions(List<String> careInstructions) { this.careInstructions = careInstructions; }
    
    public String getShippingInfo() { return shippingInfo; }
    public void setShippingInfo(String shippingInfo) { this.shippingInfo = shippingInfo; }
    
    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }
    
    public LocalDate getReleaseDate() { return releaseDate; }
    public void setReleaseDate(LocalDate releaseDate) { this.releaseDate = releaseDate; }
    
    public Boolean getLimitedEdition() { return limitedEdition; }
    public void setLimitedEdition(Boolean limitedEdition) { this.limitedEdition = limitedEdition; }
    
    public Boolean getFeatured() { return featured; }
    public void setFeatured(Boolean featured) { this.featured = featured; }
    
    public String getPrimaryImage() { return primaryImage; }
    public void setPrimaryImage(String primaryImage) { this.primaryImage = primaryImage; }
    
    public String getSecondaryImage() { return secondaryImage; }
    public void setSecondaryImage(String secondaryImage) { this.secondaryImage = secondaryImage; }
    
    public List<String> getGalleryImages() { return galleryImages; }
    public void setGalleryImages(List<String> galleryImages) { this.galleryImages = galleryImages; }
    
    public String getSport() { return sport; }
    public void setSport(String sport) { this.sport = sport; }
    
    public String getBelt() { return belt; }
    public void setBelt(String belt) { this.belt = belt; }
    
    public String getNeckline() { return neckline; }
    public void setNeckline(String neckline) { this.neckline = neckline; }
    
    public String getCollar() { return collar; }
    public void setCollar(String collar) { this.collar = collar; }
    
    public String getPockets() { return pockets; }
    public void setPockets(String pockets) { this.pockets = pockets; }
    
    public String getSleeves() { return sleeves; }
    public void setSleeves(String sleeves) { this.sleeves = sleeves; }
    
    public String getPattern() { return pattern; }
    public void setPattern(String pattern) { this.pattern = pattern; }
    
    public String getModelHeight() { return modelHeight; }
    public void setModelHeight(String modelHeight) { this.modelHeight = modelHeight; }
    
    public String getFitType() { return fitType; }
    public void setFitType(String fitType) { this.fitType = fitType; }
    
    public String getShape() { return shape; }
    public void setShape(String shape) { this.shape = shape; }
    
    public String getLength() { return length; }
    public void setLength(String length) { this.length = length; }
    
    public String getSleeveLength() { return sleeveLength; }
    public void setSleeveLength(String sleeveLength) { this.sleeveLength = sleeveLength; }
    
    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
    
    public String getFunction() { return function; }
    public void setFunction(String function) { this.function = function; }
    
    public String getProductNumber() { return productNumber; }
    public void setProductNumber(String productNumber) { this.productNumber = productNumber; }
    
    @Override
    public String toString() {
        return "SimpleProduct{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", category='" + category + '\'' +
                ", price=" + price +
                ", sku='" + sku + '\'' +
                ", brand='" + brand + '\'' +
                ", featured=" + featured +
                '}';
    }
}
