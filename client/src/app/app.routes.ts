import { HomePage } from './pages/home-page';
import { Routes } from '@angular/router';
import { FormRegister } from './form-register/form-register'; 
import { AboutPage } from './pages/about-page';
import { SnippetById } from './snippet-by-id/snippet-by-id';

export const routeConfig: Routes = [
 
 
 {
    path: '',
    component: HomePage,
    title: 'Home Page',
  },
 
  {
    path: 'about',
    component: AboutPage,
    title: 'About',
  },
 
 
  {
    path: 'register',
    component: FormRegister,
    title: 'Register',
  },


 {
    path: 'snippet/:id',
    component: SnippetById,
    title: 'SnippetById',
  },



  
];

export default routeConfig;
