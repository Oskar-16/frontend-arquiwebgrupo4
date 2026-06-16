import { Routes } from '@angular/router';
import { Homecomponent } from './components/homecomponent/homecomponent';
import { Verificacioncomponent } from './components/verificacioncomponent/verificacioncomponent';
import { VerificacionListar } from './components/verificacioncomponent/verificacion-listar/verificacion-listar';
import { VerificacionInsertar } from './components/verificacioncomponent/verificacion-insertar/verificacion-insertar';
import { VerificacionActualizar } from './components/verificacioncomponent/verificacion-actualizar/verificacion-actualizar';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'homes',
        pathMatch: 'full'
    },
    {
        path:'homes',
        component:Homecomponent
    },
    {
        path: 'autores',
        component: Verificacioncomponent,
        children:[
            {
                path:'listar',
                component:VerificacionListar
            },
            {
                path:'nuevo',
                component:VerificacionInsertar
            },
            {
                path:'edits/:id',
                component:VerificacionActualizar
            }
        ]
    }
];
