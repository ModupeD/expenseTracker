import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesService } from '../../services/expenses.service';
import { Expense } from '../../models/expense.model';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-expenses-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './expenses-list.component.html',
  styleUrl: './expenses-list.component.scss'
})
export class ExpensesListComponent {
  private service = inject(ExpensesService);
  expenses: Expense[] = [];
  monthFilter = '';
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  constructor() {
    this.load();
  }

  load(): void {
    const month = this.monthFilter || undefined;
    this.service.getExpenses(month).subscribe((data) => (this.expenses = data));
  }

  exportPdf(): void {
    const doc = new jsPDF();
    const title = this.monthFilter ? `Expenses - ${this.monthFilter}` : 'Expenses - All';
    doc.setFontSize(14);
    doc.text(title, 10, 10);

    const rows = this.expenses.map((e) => [e.amount.toFixed(2), e.category, e.date]);
    // @ts-ignore
    autoTable(doc, {
      head: [['Amount ($)', 'Category', 'Date']],
      body: rows,
      startY: 20
    });

    doc.save(`${title.replace(/\s+/g, '_').toLowerCase()}.pdf`);
  }
}
