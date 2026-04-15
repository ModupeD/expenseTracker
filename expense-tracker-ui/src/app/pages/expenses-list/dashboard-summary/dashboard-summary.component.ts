import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js';
import { Expense } from '../../../models/expense.model';
import { Category, SummaryItem } from '../../../models/category';
import { colorFor } from '../../../theme/tokens';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-summary',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard-summary.component.html',
  styleUrl: './dashboard-summary.component.scss'
})
export class DashboardSummaryComponent implements OnChanges {
  @Input() expenses: Expense[] = [];

  summary: SummaryItem[] = [];

  chartType: 'doughnut' = 'doughnut';
  chartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { padding: 16, usePointStyle: true, font: { size: 12 } }
      }
    },
    cutout: '65%'
  };

  ngOnChanges(): void {
    this.summary = this.computeSummary(this.expenses);
  }

  private computeSummary(expenses: Expense[]): SummaryItem[] {
    const map = new Map<string, number>();
    expenses.forEach((e) => map.set(e.category, (map.get(e.category) || 0) + Number(e.amount)));
    return Array.from(map.entries()).map(([category, total]) => ({
      category: category as Category,
      total
    }));
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
        backgroundColor: sorted.map(s => colorFor(s.category)),
        borderWidth: 0
      }]
    };
  }

  getPercentage(amount: number): number {
    const t = this.summary.reduce((sum, s) => sum + Number(s.total), 0);
    return t > 0 ? Math.round((amount / t) * 100) : 0;
  }

  getCategoryColor(category: string): string {
    return colorFor(category);
  }

  private titleCase(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  }
}
