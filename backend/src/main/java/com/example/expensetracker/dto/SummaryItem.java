package com.example.expensetracker.dto;

import com.example.expensetracker.model.Category;

import java.math.BigDecimal;

public class SummaryItem {
    private Category category;
    private BigDecimal total;

    public SummaryItem(Category category, BigDecimal total) {
        this.category = category;
        this.total = total;
    }

    public Category getCategory() {
        return category;
    }

    public BigDecimal getTotal() {
        return total;
    }
} 