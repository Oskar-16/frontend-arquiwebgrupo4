import { Routes } from '@angular/router';
import { Homecomponent } from './Components/homecomponent/homecomponent';
import { Logincomponent } from './Components/logincomponent/logincomponent';
import { Registrocomponent } from './Components/registrocomponent/registrocomponent';
import { Layoutcomponent } from './Components/layoutcomponent/layoutcomponent';
import { authGuard } from './Guards/auth.guard';
import { Itemcomponent } from './Components/itemcomponent/itemcomponent';
import { ItemListar } from './Components/itemcomponent/item-listar/item-listar';
import { ItemInsertar } from './Components/itemcomponent/item-insertar/item-insertar';
import { ItemActualizar } from './Components/itemcomponent/item-actualizar/item-actualizar';
import { ItemBuscar } from './Components/itemcomponent/item-buscar/item-buscar';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Logincomponent
    },
    {
        path: 'registro',
        component: Registrocomponent
    },
    {
        // Zona protegida: muestra el menú y requiere estar logueado
        path: '',
        component: Layoutcomponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'homes',
                component: Homecomponent
            },
            {
                path: 'items',
                component: Itemcomponent,
                children: [
                    {
                        path: 'listaritem',
                        component: ItemListar
                    },
                    {
                        path: 'insertaritem',
                        component: ItemInsertar
                    },
                    {
                        path: 'actualizaritem',
                        component: ItemActualizar
                    },
                    {
                        path: 'buscaritem',
                        component: ItemBuscar
                    }
                ]
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
