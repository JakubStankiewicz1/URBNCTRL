package com.urbnctrl.backend.controller;

import com.urbnctrl.backend.model.Order;
import com.urbnctrl.backend.model.OrderItem;
import com.urbnctrl.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:9999"})
public class OrderController {
      @Autowired
    private OrderService orderService;    // Create new order
    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        try {
            System.out.println("====== RECEIVED ORDER REQUEST ======");
            
            // Sprawdź czy są wymagane pola
            if (order.getCustomerEmail() == null) {
                System.out.println("ERROR: customerEmail is null");
            }
            if (order.getFirstName() == null) {
                System.out.println("ERROR: firstName is null");
            }
            if (order.getLastName() == null) {
                System.out.println("ERROR: lastName is null");
            }
            if (order.getShippingAddress() == null) {
                System.out.println("ERROR: shippingAddress is null");
            }
            if (order.getCity() == null) {
                System.out.println("ERROR: city is null");
            }
            if (order.getPostcode() == null) {
                System.out.println("ERROR: postcode is null");
            }
            if (order.getCountry() == null) {
                System.out.println("ERROR: country is null");
            }
            if (order.getPaymentMethod() == null) {
                System.out.println("ERROR: paymentMethod is null");
            }
            
            System.out.println("Customer: " + order.getFirstName() + " " + order.getLastName());
            System.out.println("Email: " + order.getCustomerEmail());
            System.out.println("Address: " + order.getShippingAddress() + ", " + order.getCity());
            System.out.println("Payment: " + order.getPaymentMethod());
            System.out.println("Subtotal: " + order.getSubtotal() + ", Total: " + order.getTotal());
            
            if (order.getOrderItems() == null || order.getOrderItems().isEmpty()) {
                System.out.println("ERROR: Order has no items");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Order must have at least one item");
            }
            
            System.out.println("Order items: " + order.getOrderItems().size());
            for (int i = 0; i < order.getOrderItems().size(); i++) {
                OrderItem item = order.getOrderItems().get(i);
                System.out.println("Item " + (i+1) + ": " + item.getProductName() + 
                                  " - Qty: " + item.getQuantity() + 
                                  ", Price: " + item.getPrice() + 
                                  ", Subtotal: " + item.getSubtotal());
                
                if (item.getProductId() == null) {
                    System.out.println("ERROR: item " + i + " productId is null");
                }
                if (item.getProductName() == null) {
                    System.out.println("ERROR: item " + i + " productName is null");
                }
                if (item.getPrice() == null) {
                    System.out.println("ERROR: item " + i + " price is null");
                }
                if (item.getQuantity() == null) {
                    System.out.println("ERROR: item " + i + " quantity is null");
                }
                if (item.getSubtotal() == null) {
                    System.out.println("ERROR: item " + i + " subtotal is null");
                }
            }
            
            // Explicitly set createdAt
            order.setCreatedAt(LocalDateTime.now());
              Order createdOrder = orderService.createOrder(order);
            System.out.println("Order created successfully with ID: " + createdOrder.getId() +
                              " and Number: " + createdOrder.getOrderNumber());
            System.out.println("====== END OF ORDER PROCESSING ======");
            
            return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
        } catch (Exception e) {
            System.err.println("====== ERROR IN ORDER PROCESSING ======");
            System.err.println("Error message: " + e.getMessage());
            System.err.println("Error class: " + e.getClass().getName());
            System.err.println("Stack trace:");
            e.printStackTrace();
            System.err.println("====== END OF ERROR REPORT ======");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error creating order: " + e.getMessage());
        }
    }
    
    // Get all orders
    @GetMapping
    public ResponseEntity<?> getAllOrders() {
        try {
            List<Order> orders = orderService.getAllOrders();
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching orders: " + e.getMessage());
        }
    }
    
    // Get order by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Long id) {
        try {
            Optional<Order> order = orderService.getOrderById(id);
            if (order.isPresent()) {
                return ResponseEntity.ok(order.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Order not found with id: " + id);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching order: " + e.getMessage());
        }
    }
    
    // Get order by order number
    @GetMapping("/number/{orderNumber}")
    public ResponseEntity<?> getOrderByNumber(@PathVariable String orderNumber) {
        try {
            Optional<Order> order = orderService.getOrderByNumber(orderNumber);
            if (order.isPresent()) {
                return ResponseEntity.ok(order.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Order not found with number: " + orderNumber);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching order: " + e.getMessage());
        }
    }
    
    // Get orders by customer email
    @GetMapping("/customer/{email}")
    public ResponseEntity<?> getOrdersByCustomerEmail(@PathVariable String email) {
        try {
            List<Order> orders = orderService.getOrdersByCustomerEmail(email);
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching orders: " + e.getMessage());
        }
    }
    
    // Get orders by status
    @GetMapping("/status/{status}")
    public ResponseEntity<?> getOrdersByStatus(@PathVariable String status) {
        try {
            List<Order> orders = orderService.getOrdersByStatus(status);
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching orders: " + e.getMessage());
        }
    }
    
    // Update order status
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestBody String status) {
        try {
            Order updatedOrder = orderService.updateOrderStatus(id, status);
            return ResponseEntity.ok(updatedOrder);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating order status: " + e.getMessage());
        }
    }
    
    // Update payment status
    @PutMapping("/{id}/payment-status")
    public ResponseEntity<?> updatePaymentStatus(@PathVariable Long id, @RequestBody String paymentStatus) {
        try {
            Order updatedOrder = orderService.updatePaymentStatus(id, paymentStatus);
            return ResponseEntity.ok(updatedOrder);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating payment status: " + e.getMessage());
        }
    }
    
    // Get order statistics
    @GetMapping("/stats")
    public ResponseEntity<?> getOrderStats() {
        try {
            OrderService.OrderStats stats = orderService.getOrderStats();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching order statistics: " + e.getMessage());
        }
    }
    
    // Delete order
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id) {
        try {
            orderService.deleteOrder(id);
            return ResponseEntity.ok("Order deleted successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting order: " + e.getMessage());
        }
    }
}
