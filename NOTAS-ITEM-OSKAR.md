# Nota para Oskar — endpoints de Item

Revisé `src/app/Services/itemservice.ts` contra el `ItemController` real del backend
(`https://tutrade-api.onrender.com`) y las URLs **no coinciden**. Tal como está, el
servicio no funcionará contra producción. Aquí el detalle y el fix sugerido.

## 1. URLs incorrectas

El controlador del backend tiene `@RequestMapping("/items")`, así que **todas** las rutas
empiezan con `/items`. El servicio actual usa rutas inventadas (`/lista`, `/nuevo`, `/actualiza`).

| Operación   | Servicio actual (mal)        | Backend real                   |
|-------------|------------------------------|--------------------------------|
| Listar      | `GET  /lista`                | `GET  /items`                  |
| Ver por id  | `GET  /{id}`                 | `GET  /items/{id}`             |
| Insertar    | `POST /nuevo`                | `POST /items`                  |
| Actualizar  | `PUT  /actualiza`            | `PUT  /items/{id}`             |
| Eliminar    | `DELETE /{id}`               | `DELETE /items/{id}`           |

## 2. Bug de doble slash en la URL base

```ts
private url = `${base_url}/`;        // termina en /
... `${this.url}/lista`              // => https://...onrender.com//lista  (doble //)
```

## 3. El modelo `Item` no coincide con `ItemRequestDTO`

El backend, al insertar/actualizar, espera un `ItemRequestDTO` con estos campos:

```
titleItem        (string)
descriptionItem  (string)
conditionItem    (int)
statusItem       (int)   // 1=Disponible, 2=Pausado, 3=Intercambiado
categoryId       (int)   // <-- es el ID de la categoría, no un string
```

El modelo actual (`src/app/Models/item.ts`) tiene `user:number` y `category:string`,
que no aplican al request. El `user` lo deduce el backend del token JWT (no se envía),
y la categoría debe ser `categoryId` (número).

> Nota: el POST/PUT/DELETE requieren estar autenticado (el backend usa `Principal`).
> Eso ya está cubierto: el `authInterceptor` adjunta el token automáticamente.

## Fix sugerido para `itemservice.ts`

```ts
import { Injectable } from "@angular/core";
import { enviroment } from "../../Enviroments/enviroments";
import { HttpClient } from '@angular/common/http';
import { Item } from "../Models/item";

@Injectable({ providedIn: 'root' })
export class Itemservice {
    private url = `${enviroment.base}/items`;   // sin slash final

    constructor(private http: HttpClient) {}

    list() {
        return this.http.get<Item[]>(this.url);
    }

    insert(i: Item) {
        return this.http.post(this.url, i);
    }

    eliminar(id: number) {
        return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
    }

    listId(id: number) {
        return this.http.get<Item>(`${this.url}/${id}`);
    }

    update(id: number, i: Item) {
        return this.http.put(`${this.url}/${id}`, i, { responseType: 'text' });
    }
}
```

## Endpoints extra disponibles (por si los necesitas)

```
GET /items/category/{categoryId}   listar por categoría
GET /items/status/{status}         listar por status (1/2/3)
GET /items/user/{userId}           listar por usuario
GET /items/received                ítems recibidos por el usuario autenticado
PUT /items/{id}/pause              pausar ítem
PUT /items/{id}/activate           activar ítem
```
