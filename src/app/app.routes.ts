import { Routes } from '@angular/router';
import { Homecomponent } from './Components/homecomponent/homecomponent';
import { Logincomponent } from './Components/logincomponent/logincomponent';
import { Registrocomponent } from './Components/registrocomponent/registrocomponent';
import { Layoutcomponent } from './Components/layoutcomponent/layoutcomponent';
import { authGuard } from './Guards/auth.guard';

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
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
