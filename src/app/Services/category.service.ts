import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../Enviroments/enviroments';
import { Category } from '../Models/category';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private http = inject(HttpClient);
  private url = `${enviroment.base}/categories`;

  list() {
    return this.http.get<Category[]>(this.url);
  }
}
