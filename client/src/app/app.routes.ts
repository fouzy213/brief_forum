import { Routes } from '@angular/router';
import { Register } from './register/register'; 

export const routeConfig: Routes = [
  {
    path: 'register',
    component: Register,
    title: 'Register',
  },
];

export default routeConfig;
