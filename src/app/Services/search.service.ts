import { Injectable, signal } from '@angular/core';

// Estado de búsqueda compartido entre el navbar y la pantalla Explorar.
@Injectable({ providedIn: 'root' })
export class SearchService {
  readonly query = signal('');

  set(valor: string): void {
    this.query.set(valor);
  }

  clear(): void {
    this.query.set('');
  }
}
