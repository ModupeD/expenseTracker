package com.example.expensetracker.service;

import com.example.expensetracker.dto.ExpenseRequest;
import com.example.expensetracker.dto.ExpenseResponse;
import com.example.expensetracker.dto.SummaryItem;
import com.example.expensetracker.model.Category;
import com.example.expensetracker.model.Expense;
import com.example.expensetracker.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Month;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public ExpenseResponse addExpense(ExpenseRequest request) {
        LocalDate date = LocalDate.parse(request.getDate());
        Expense expense = new Expense(request.getAmount(), request.getCategory(), date);
        Expense saved = expenseRepository.save(expense);
        return new ExpenseResponse(saved.getId(), saved.getAmount(), saved.getCategory(), saved.getDate());
    }

    public List<ExpenseResponse> getExpenses(Optional<String> month) {
        List<Expense> expenses;
        if (month.isPresent()) {
            Month parsedMonth = Month.valueOf(month.get().toUpperCase());
            expenses = expenseRepository.findByMonth(parsedMonth.getValue());
        } else {
            expenses = expenseRepository.findAll();
        }
        return expenses.stream()
                .map(e -> new ExpenseResponse(e.getId(), e.getAmount(), e.getCategory(), e.getDate()))
                .collect(Collectors.toList());
    }

    public List<SummaryItem> getSummary() {
        List<Expense> expenses = expenseRepository.findAll();
        Map<Category, BigDecimal> totals = expenses.stream()
                .collect(Collectors.groupingBy(Expense::getCategory,
                        Collectors.reducing(BigDecimal.ZERO, Expense::getAmount, BigDecimal::add)));

        return totals.entrySet().stream()
                .map(e -> new SummaryItem(e.getKey(), e.getValue()))
                .sorted(Comparator.comparing(SummaryItem::getCategory))
                .collect(Collectors.toList());
    }
} 