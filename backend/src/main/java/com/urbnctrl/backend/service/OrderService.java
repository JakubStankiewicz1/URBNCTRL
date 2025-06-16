package com.urbnctrl.backend.service;

import com.urbnctrl.backend.model.Order;
import com.urbnctrl.backend.model.OrderItem;
import com.urbnctrl.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;    // Create new order
    public Order createOrder(Order order) {
        // Generate unique order number
        String orderNumber = generateOrderNumber();
        order.setOrderNumber(orderNumber);
        
        // Set timestamps
        order.setCreatedAt(LocalDateTime.now());
        
        // Set default values for required fields if not provided
        if (order.getOrderStatus() == null) {
            order.setOrderStatus("PENDING");
        }
        
        if (order.getPaymentStatus() == null) {
            order.setPaymentStatus("PENDING");
        }
        
        // Ensure relationship between order and items
        if (order.getOrderItems() != null) {
            for (OrderItem item : order.getOrderItems()) {
                // Set relationship
                item.setOrder(order);
                
                // Calculate subtotal if not provided
                if (item.getSubtotal() == null) {
                    item.calculateSubtotal();
                }
                
                // Set defaults for nullable fields
                if (item.getProductSku() == null) item.setProductSku("");
                if (item.getProductImage() == null) item.setProductImage("");
                if (item.getSelectedSize() == null) item.setSelectedSize("");
                if (item.getSelectedColor() == null) item.setSelectedColor("");
            }
        }
        
        return orderRepository.save(order);
    }
    
    // Get all orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    
    // Get order by ID
    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }
    
    // Get order by order number
    public Optional<Order> getOrderByNumber(String orderNumber) {
        return orderRepository.findByOrderNumber(orderNumber);
    }
    
    // Get orders by customer email
    public List<Order> getOrdersByCustomerEmail(String email) {
        return orderRepository.findByCustomerEmailOrderByCreatedAtDesc(email);
    }
    
    // Get orders by status
    public List<Order> getOrdersByStatus(String status) {
        return orderRepository.findByOrderStatusOrderByCreatedAtDesc(status);
    }
    
    // Update order status
    public Order updateOrderStatus(Long orderId, String status) {
        Optional<Order> orderOpt = orderRepository.findById(orderId);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            order.setOrderStatus(status);
            order.setUpdatedAt(LocalDateTime.now());
            return orderRepository.save(order);
        }
        throw new RuntimeException("Order not found with id: " + orderId);
    }
    
    // Update payment status
    public Order updatePaymentStatus(Long orderId, String paymentStatus) {
        Optional<Order> orderOpt = orderRepository.findById(orderId);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            order.setPaymentStatus(paymentStatus);
            order.setUpdatedAt(LocalDateTime.now());
            return orderRepository.save(order);
        }
        throw new RuntimeException("Order not found with id: " + orderId);
    }
    
    // Delete order
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
    
    // Get recent orders
    public List<Order> getRecentOrders() {
        return orderRepository.findRecentOrders();
    }
    
    // Get order statistics
    public OrderStats getOrderStats() {
        Long totalOrders = orderRepository.count();
        Long pendingOrders = orderRepository.countByOrderStatus("PENDING");
        Long confirmedOrders = orderRepository.countByOrderStatus("CONFIRMED");
        Long shippedOrders = orderRepository.countByOrderStatus("SHIPPED");
        Long deliveredOrders = orderRepository.countByOrderStatus("DELIVERED");
        Double totalRevenue = orderRepository.getTotalRevenue();
        
        return new OrderStats(totalOrders, pendingOrders, confirmedOrders, 
                            shippedOrders, deliveredOrders, totalRevenue != null ? totalRevenue : 0.0);
    }
    
    // Generate unique order number
    private String generateOrderNumber() {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        return "ORD-" + timestamp + "-" + (int)(Math.random() * 1000);
    }
    
    // Inner class for order statistics
    public static class OrderStats {
        private Long totalOrders;
        private Long pendingOrders;
        private Long confirmedOrders;
        private Long shippedOrders;
        private Long deliveredOrders;
        private Double totalRevenue;
        
        public OrderStats(Long totalOrders, Long pendingOrders, Long confirmedOrders, 
                         Long shippedOrders, Long deliveredOrders, Double totalRevenue) {
            this.totalOrders = totalOrders;
            this.pendingOrders = pendingOrders;
            this.confirmedOrders = confirmedOrders;
            this.shippedOrders = shippedOrders;
            this.deliveredOrders = deliveredOrders;
            this.totalRevenue = totalRevenue;
        }
        
        // Getters
        public Long getTotalOrders() { return totalOrders; }
        public Long getPendingOrders() { return pendingOrders; }
        public Long getConfirmedOrders() { return confirmedOrders; }
        public Long getShippedOrders() { return shippedOrders; }
        public Long getDeliveredOrders() { return deliveredOrders; }
        public Double getTotalRevenue() { return totalRevenue; }
    }
}
