package com.example.expensetracker.dto;

import com.example.expensetracker.model.Category;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public class ExpenseRequest {

    @Positive
    @NotNull
    private BigDecimal amount;

    @NotNull
    private Category category;

    @NotNull
    private String date; 

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
} 