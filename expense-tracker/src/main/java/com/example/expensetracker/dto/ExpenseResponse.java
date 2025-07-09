package com.example.expensetracker.dto;

import com.example.expensetracker.model.Category;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ExpenseResponse {

    private Long id;
    private BigDecimal amount;
    private Category category;
    private LocalDate date;

    public ExpenseResponse(Long id, BigDecimal amount, Category category, LocalDate date) {
        this.id = id;
        this.amount = amount;
        this.category = category;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public Category getCategory() {
        return category;
    }

    public LocalDate getDate() {
        return date;
    }
} 