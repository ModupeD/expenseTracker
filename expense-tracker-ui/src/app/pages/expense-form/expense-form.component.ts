import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ExpensesService } from '../../services/expenses.service';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss'
})
export class ExpenseFormComponent {
  private fb = inject(FormBuilder);
  private service = inject(ExpensesService);
  private router = inject(Router);

  form = this.fb.group({
    amount: [0, [Validators.required, Validators.min(0.01)]],
    category: ['GROCERIES', Validators.required],
    date: [new Date().toISOString().substring(0, 10), Validators.required]
  });

  categories = [
    'GROCERIES',
    'RENT',
    'UTILITIES',
    'ENTERTAINMENT',
    'TRAVEL',
    'HEALTH',
    'OTHER'
  ];

  submit(): void {
    if (this.form.invalid) return;
    const { amount, category, date } = this.form.value as Expense;
    this.service
      .addExpense({ amount: Number(amount), category, date })
      .subscribe(() => this.router.navigate(['/expenses']));
  }
}
