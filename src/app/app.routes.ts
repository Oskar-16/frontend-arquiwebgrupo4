import { Routes } from '@angular/router';
import { Logincomponent } from './Components/logincomponent/logincomponent';
import { Layoutcomponent } from './Components/layoutcomponent/layoutcomponent';
import { authGuard } from './Guards/auth.guard';
import { Itemcomponent } from './Components/itemcomponent/itemcomponent';
import { ItemListar } from './Components/itemcomponent/item-listar/item-listar';
import { ItemInsertar } from './Components/itemcomponent/item-insertar/item-insertar';
import { ItemActualizar } from './Components/itemcomponent/item-actualizar/item-actualizar';
import { ItemBuscar } from './Components/itemcomponent/item-buscar/item-buscar';
import { Explorarcomponent } from './Components/explorarcomponent/explorarcomponent';
import { ItemDetalle } from './Components/itemcomponent/item-detalle/item-detalle';
import { Landingcomponent } from './Components/landingcomponent/landingcomponent';
import { Truequecomponent } from './Components/truequecomponent/truequecomponent';
import { Verificacioncomponent } from './Components/verificacioncomponent/verificacioncomponent';
import { VerificacionListar } from './Components/verificacioncomponent/verificacion-listar/verificacion-listar';
import { VerificacionInsertar } from './Components/verificacioncomponent/verificacion-insertar/verificacion-insertar';
import { VerificacionActualizar } from './Components/verificacioncomponent/verificacion-actualizar/verificacion-actualizar';

export const routes: Routes = [
    {
        // Landing page pública (raíz). El login queda detrás del CTA.
        path: '',
        component: Landingcomponent,
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Logincomponent
    },
    {
        path: 'registro',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        // Zona protegida: muestra el menú y requiere estar logueado
        path: '',
        component: Layoutcomponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                redirectTo: 'explorar',
                pathMatch: 'full'
            },
            {
                path: 'explorar',
                component: Explorarcomponent
            },
            {
                path: 'explorar/:id',
                component: ItemDetalle
            },
            {
                path: 'homes',
                redirectTo: 'explorar',
                pathMatch: 'full'
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
            },
            {
                path: 'trueques',
                component: Truequecomponent
            },
            {
                // Verificación KYC (consolidado desde el proyecto verificacionkyc/)
                path: 'kyc',
                component: Verificacioncomponent,
                children: [
                    {
                        path: 'listar',
                        component: VerificacionListar
                    },
                    {
                        path: 'nuevo',
                        component: VerificacionInsertar
                    },
                    {
                        path: 'edits/:id',
                        component: VerificacionActualizar
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
