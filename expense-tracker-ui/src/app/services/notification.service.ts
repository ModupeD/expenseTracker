import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type NotificationType = 'success' | 'error' | 'info';

export interface Notification {
  id: number;
  message: string;
  type: NotificationType;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  success(message: string): void {
    this.show(message, 'success');
  }

  error(message: string): void {
    this.show(message, 'error');
  }

  info(message: string): void {
    this.show(message, 'info');
  }

  private show(message: string, type: NotificationType): void {
    const id = Date.now();
    const current = this.notificationsSubject.value;
    this.notificationsSubject.next([...current, { id, message, type }]);

    setTimeout(() => {
      const filtered = this.notificationsSubject.value.filter(n => n.id !== id);
      this.notificationsSubject.next(filtered);
    }, 4000);
  }
}
