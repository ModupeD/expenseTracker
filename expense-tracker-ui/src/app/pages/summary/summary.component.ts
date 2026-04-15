import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesService } from '../../services/expenses.service';
import { Category, SummaryItem } from '../../models/category';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  private service = inject(ExpensesService);
  summary: SummaryItem[] = [];
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
  selectedMonth = '';

  constructor() {
    this.load();
  }

  load(): void {
    const month = this.selectedMonth || undefined;
    if (month) {
      this.service.getExpenses(month).subscribe((expenses) => {
        const map = new Map<string, number>();
        expenses.forEach((e) => {
          map.set(e.category, (map.get(e.category) || 0) + e.amount);
        });
        this.summary = Array.from(map.entries()).map((e) => ({
          category: e[0] as Category,
          total: e[1]
        }));
      });
    } else {
      this.service.getSummary().subscribe((data) => (this.summary = data));
    }
  }

  exportPdf(): void {
    const doc = new jsPDF();
    doc.setFontSize(14);
    const title = this.selectedMonth ? `Summary - ${this.selectedMonth}` : 'Summary - All';
    doc.text(title, 10, 10);

    const rows = this.summary.map((s) => [s.category, s.total.toFixed(2)]);
    // @ts-ignore
    autoTable(doc, {
      head: [['Category', 'Total ($)']],
      body: rows,
      startY: 20
    });
    doc.save(`${title.replace(/\s+/g, '_').toLowerCase()}.pdf`);
  }

  getTotalAmount(): number {
    return this.summary.reduce((total, item) => total + item.total, 0);
  }

  getPercentage(amount: number): number {
    const total = this.getTotalAmount();
    return total > 0 ? Math.round((amount / total) * 100) : 0;
  }
}
