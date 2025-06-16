package com.urbnctrl.backend.repository;

import com.urbnctrl.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    
    // Find order by order number
    Optional<Order> findByOrderNumber(String orderNumber);
    
    // Find orders by customer email
    List<Order> findByCustomerEmailOrderByCreatedAtDesc(String customerEmail);
    
    // Find orders by status
    List<Order> findByOrderStatusOrderByCreatedAtDesc(String orderStatus);
    
    // Find orders by payment status
    List<Order> findByPaymentStatusOrderByCreatedAtDesc(String paymentStatus);
    
    // Find orders created between dates
    List<Order> findByCreatedAtBetweenOrderByCreatedAtDesc(LocalDateTime startDate, LocalDateTime endDate);
    
    // Count orders by status
    @Query("SELECT COUNT(o) FROM Order o WHERE o.orderStatus = :status")
    Long countByOrderStatus(@Param("status") String status);
    
    // Get total revenue
    @Query("SELECT SUM(o.total) FROM Order o WHERE o.paymentStatus = 'PAID'")
    Double getTotalRevenue();
    
    // Get recent orders (last 10)
    @Query("SELECT o FROM Order o ORDER BY o.createdAt DESC")
    List<Order> findRecentOrders();
}
