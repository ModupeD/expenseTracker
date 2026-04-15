import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesService } from '../../services/expenses.service';
import { Expense } from '../../models/expense.model';
import { SummaryItem } from '../../models/summary-item.model';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, Chart, registerables } from 'chart.js';

Chart.register(...registerables);
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { NotificationService } from '../../services/notification.service';

type ViewMode = 'list' | 'summary';

const CATEGORY_COLORS: Record<string, string> = {
  GROCERIES: '#10b981',
  ENTERTAINMENT: '#8b5cf6',
  UTILITIES: '#f59e0b',
  TRANSPORT: '#3b82f6',
  TRAVEL: '#3b82f6',
  SHOPPING: '#ef4444',
  HEALTH: '#ec4899',
  RENT: '#f97316',
  OTHER: '#6b7280'
};

@Component({
  selector: 'app-expenses-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, BaseChartDirective],
  templateUrl: './expenses-list.component.html',
  styleUrl: './expenses-list.component.scss'
})
export class ExpensesListComponent {
  private service = inject(ExpensesService);
  private notify = inject(NotificationService);

  expenses: Expense[] = [];
  summary: SummaryItem[] = [];
  view: ViewMode = 'list';
  monthFilter = '';
  openMenuId: number | null = null;

  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  chartType: 'doughnut' = 'doughnut';
  chartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 16,
          usePointStyle: true,
          font: { size: 12 }
        }
      }
    },
    cutout: '65%'
  };

  constructor() {
    this.load();
  }

  load(): void {
    const month = this.monthFilter || undefined;
    this.service.getExpenses(month).subscribe((data) => {
      this.expenses = data;
      this.summary = this.computeSummary(data);
    });
  }

  private computeSummary(expenses: Expense[]): SummaryItem[] {
    const map = new Map<string, number>();
    expenses.forEach((e) => map.set(e.category, (map.get(e.category) || 0) + Number(e.amount)));
    return Array.from(map.entries()).map(([category, total]) => ({ category, total }));
  }

  setView(view: ViewMode): void {
    this.view = view;
  }

  get total(): number {
    return this.expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  }

  get averageExpense(): number {
    return this.expenses.length > 0 ? this.total / this.expenses.length : 0;
  }

  get sortedSummary(): SummaryItem[] {
    return [...this.summary].sort((a, b) => Number(b.total) - Number(a.total));
  }

  get highestCategory(): SummaryItem | null {
    return this.sortedSummary[0] ?? null;
  }

  get lowestCategory(): SummaryItem | null {
    const sorted = this.sortedSummary;
    return sorted.length > 0 ? sorted[sorted.length - 1] : null;
  }

  get chartData(): ChartData<'doughnut'> {
    const sorted = this.sortedSummary;
    return {
      labels: sorted.map(s => this.titleCase(s.category)),
      datasets: [{
        data: sorted.map(s => Number(s.total)),
        backgroundColor: sorted.map(s => CATEGORY_COLORS[s.category] || '#6b7280'),
        borderWidth: 0
      }]
    };
  }

  getPercentage(amount: number): number {
    const t = this.summary.reduce((sum, s) => sum + Number(s.total), 0);
    return t > 0 ? Math.round((amount / t) * 100) : 0;
  }

  getCategoryColor(category: string): string {
    return CATEGORY_COLORS[category] || '#6b7280';
  }

  private titleCase(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
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
