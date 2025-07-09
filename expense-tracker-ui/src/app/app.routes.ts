import { Routes } from '@angular/router';
import { ExpensesListComponent } from './pages/expenses-list/expenses-list.component';
import { ExpenseFormComponent } from './pages/expense-form/expense-form.component';
import { SummaryComponent } from './pages/summary/summary.component';

export const routes: Routes = [
  { path: '', redirectTo: 'expenses', pathMatch: 'full' },
  { path: 'expenses', component: ExpensesListComponent },
  { path: 'add', component: ExpenseFormComponent },
  { path: 'summary', component: SummaryComponent },
  { path: '**', redirectTo: 'expenses' }
];
