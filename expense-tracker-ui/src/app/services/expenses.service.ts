import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Expense } from '../models/expense.model';
import { SummaryItem } from '../models/summary-item.model';

@Injectable({ providedIn: 'root' })
export class ExpensesService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiBase;

  getExpenses(month?: string): Observable<Expense[]> {
    let params = new HttpParams();
    if (month) {
      params = params.set('month', month);
    }
    return this.http.get<Expense[]>(`${this.base}/expenses`, { params });
  }

  getExpense(id: number): Observable<Expense> {
    return this.http.get<Expense>('${this.base/expense/${id}')
  }

  getSummary(): Observable<SummaryItem[]> {
    return this.http.get<SummaryItem[]>(`${this.base}/summary`);
  }

  addExpense(expense: Omit<Expense, 'id'>): Observable<Expense> {
    return this.http.post<Expense>(`${this.base}/expenses`, expense);
  }

  deleteExpense(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/expenses/${id}`)
  }

  updateExpense(id: number, expense: Omit<Expense, 'id'>): Observable<Expense> {
    return this.http.put<Expense>(`${this.base}/expenses/${id}`, expense)
  }
  saveExpense(payload: Omit<Expense, 'id'>, id?: number): Observable<Expense> {
  return id ? this.updateExpense(id, payload) : this.addExpense(payload);
}


}
