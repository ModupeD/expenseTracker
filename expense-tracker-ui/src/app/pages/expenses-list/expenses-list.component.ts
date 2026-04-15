import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesService } from '../../services/expenses.service';
import { Expense } from '../../models/expense.model';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { NotificationService } from '../../services/notification.service';
import { DashboardSummaryComponent } from './dashboard-summary/dashboard-summary.component';

type ViewMode = 'list' | 'summary';

@Component({
  selector: 'app-expenses-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, DashboardSummaryComponent],
  templateUrl: './expenses-list.component.html',
  styleUrl: './expenses-list.component.scss'
})
export class ExpensesListComponent {
  private service = inject(ExpensesService);
  private notify = inject(NotificationService);

  expenses: Expense[] = [];
  view: ViewMode = 'list';
  monthFilter = '';
  openMenuId: number | null = null;

  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  constructor() {
    this.load();
  }

  load(): void {
    const month = this.monthFilter || undefined;
    this.service.getExpenses(month).subscribe((data) => (this.expenses = data));
  }

  setView(view: ViewMode): void {
    this.view = view;
  }

  get total(): number {
    return this.expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  }

  toggleMenu(id: number): void {
    this.openMenuId = this.openMenuId === id ? null : id;
  }

  delete(id: number): void {
    this.openMenuId = null;
    this.service.deleteExpense(id).subscribe({
      next: () => {
        this.notify.success('Expense deleted');
        this.load();
      },
      error: () => this.notify.error('Failed to delete expense')
    });
  }

  exportPdf(): void {
    const doc = new jsPDF();
    const title = this.monthFilter ? `Expenses - ${this.monthFilter}` : 'Expenses - All';
    doc.setFontSize(14);
    doc.text(title, 10, 10);
    const rows = this.expenses.map((e) => [Number(e.amount).toFixed(2), e.category, e.date]);
    // @ts-ignore
    autoTable(doc, {
      head: [['Amount ($)', 'Category', 'Date']],
      body: rows,
      startY: 20
    });
    doc.save(`${title.replace(/\s+/g, '_').toLowerCase()}.pdf`);
  }
}
