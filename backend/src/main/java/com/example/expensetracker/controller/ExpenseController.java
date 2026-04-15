package com.example.expensetracker.controller;

import com.example.expensetracker.dto.ExpenseRequest;
import com.example.expensetracker.dto.ExpenseResponse;
import com.example.expensetracker.dto.SummaryItem;
import com.example.expensetracker.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:4200", "https://expense-tracker-beryl-psi.vercel.app"},
 methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE,  RequestMethod.PUT})
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping("/expenses")
    @ResponseStatus(HttpStatus.CREATED)
    public ExpenseResponse addExpense(@Valid @RequestBody ExpenseRequest request) {
        return expenseService.addExpense(request);
    }

    @GetMapping("/expenses")
    public List<ExpenseResponse> listExpenses(@RequestParam(required = false) String month) {
        return expenseService.getExpenses(Optional.ofNullable(month));
    }

    @GetMapping("/summary")
    public List<SummaryItem> summary() {
        return expenseService.getSummary();
    }

    @PutMapping("/expenses/{id}")
    public ExpenseResponse updateExpense(@PathVariable Long id, @Valid @RequestBody ExpenseRequest request){
        return expenseService.updateExpense(id, request);
    }
    @DeleteMapping("/expenses/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteExpense(@PathVariable Long id){
        expenseService.deleteExpense(id);
    }
} 