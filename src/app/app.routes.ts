import { Routes } from '@angular/router';
import { Homecomponent } from './Components/homecomponent/homecomponent';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'homes',
        pathMatch:'full'
    },
    {
        path:'homes',
        component:Homecomponent

    }
];
