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
import { VerificacionActualizar } from './Components/verificacioncomponent/verificacion-actualizar/verificacion-actualizar';
import { CategoryListar } from './Components/categorycomponent/category-listar/category-listar';
import { CategoryInsertar } from './Components/categorycomponent/category-insertar/category-insertar';
import { CategoryActualizar } from './Components/categorycomponent/category-actualizar/category-actualizar';
import { Profilecomponent } from './Components/profilecomponent/profilecomponent';
import { Reportcomponent } from './Components/reportcomponent/reportcomponent';
import { adminGuard } from './Guards/admin.guard';
import { Impactocomponent } from './Components/impactocomponent/impactocomponent';
import { Guiacomponent } from './Components/guiacomponent/guiacomponent';
import { Chatcomponent } from './Components/chatcomponent/chatcomponent';
import { Ofertascomponent } from './Components/ofertascomponent/ofertascomponent';
import { Premiumcomponent } from './Components/premiumcomponent/premiumcomponent';
import { Adminpremiumcomponent } from './Components/adminpremiumcomponent/adminpremiumcomponent';
import { Estadisticascomponent } from './Components/estadisticascomponent/estadisticascomponent';
import { Moderacioncomponent } from './Components/moderacioncomponent/moderacioncomponent';

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
                path: 'trueques',
                component: Truequecomponent
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
                        path: 'actualizaritem/:id',
                        component: ItemActualizar
                    },
                    {
                        path: 'buscaritem',
                        component: ItemBuscar
                    }
                ]
            },
            {
                path: 'categories',
                component: Itemcomponent,
                canActivate: [adminGuard],
                children: [
                    {
                        path: 'listar',
                        component: CategoryListar
                    },
                    {
                        path: 'insertar',
                        component: CategoryInsertar
                    },
                    {
                        path: 'actualizar/:id',
                        component: CategoryActualizar
                    }
                ]
            },
            {
                path: 'perfil',
                component: Profilecomponent
            },
            {
                path: 'reportar',
                component: Reportcomponent
            },
            {
                // HU08 - Impacto Ambiental del usuario
                path: 'impacto',
                component: Impactocomponent
            },
            {
                // HU20 - Guía de uso
                path: 'guia',
                component: Guiacomponent
            },
            {
                // HU11 - Chat interno del trueque (+ punto de encuentro)
                path: 'chat/:tradeId',
                component: Chatcomponent
            },
            {
                // HU21 - Comparativa de ofertas recibidas por un item
                path: 'ofertas/:itemId',
                component: Ofertascomponent
            },
            {
                // HU06 - Contratar plan premium
                path: 'premium',
                component: Premiumcomponent
            },
            {
                // HU07 - Validación de premium por el staff
                path: 'admin/premium',
                component: Adminpremiumcomponent,
                canActivate: [adminGuard]
            },
            {
                // Panel de estadisticas (admin)
                path: 'estadisticas',
                component: Estadisticascomponent,
                canActivate: [adminGuard]
            },
            {
                // Moderacion de reportes de abuso (admin)
                path: 'admin/reportes',
                component: Moderacioncomponent,
                canActivate: [adminGuard]
            },
            {
                // Verificación KYC (consolidado desde el proyecto verificacionkyc/)
                path: 'kyc',
                component: Verificacioncomponent,
                canActivate: [adminGuard],
                children: [
                    {
                        path: 'listar',
                        component: VerificacionListar
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
    },

];
