import { Injectable } from "@angular/core";
import { enviroment } from "../../Enviroments/enviroments";
import { HttpClient } from '@angular/common/http';
import { Item } from "../Models/item";
const base_url=enviroment.base;
@Injectable({
    providedIn:'root',
})
export class Itemservice{
    private url=`${base_url}/`;
    constructor(private http:HttpClient){}
    
  list() {
    return this.http.get<Item[]>(`${this.url}/lista`);
  }

  insert(i:Item) {
    return this.http.post(`${this.url}/nuevo`, i);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' })
  }

  listId(id: number) {
    return this.http.get<Item>(`${this.url}/${id}`)
  }


  update(i:Item) {
    return this.http.put(`${this.url}/actualiza`, i, { responseType: 'text' })
  }
}