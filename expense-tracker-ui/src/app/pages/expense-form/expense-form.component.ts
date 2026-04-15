import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExpensesService } from '../../services/expenses.service';
import { Expense } from '../../models/expense.model';
import { NotificationService } from '../../services/notification.service';

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
  private route = inject(ActivatedRoute);
  private notify = inject(NotificationService);
  editId: number | null = null;

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

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id){
      this.editId = Number(id);
      this.service.getExpense(this.editId).subscribe(e => {
        this.form.patchValue({
          amount:e.amount,
          category: e.category,
          date: e.date
        })
      })
    }
  }
  
 submit(): void {
  if (this.form.invalid) return;
  const { amount, category, date } = this.form.value as Expense;
  const payload = { amount: Number(amount), category, date };

  this.service.saveExpense(payload, this.editId ?? undefined).subscribe({
    next: () => {
      this.notify.success(this.editId ? 'Expense updated' : 'Expense added');
      this.router.navigate(['/expenses']);
    },
    error: () => this.notify.error('Failed to save expense')
  });
}

}
