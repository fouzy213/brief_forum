import { HomePage } from './pages/home-page';
import { Routes } from '@angular/router';
import { FormRegister } from './form-register/form-register'; 
import { AboutPage } from './pages/about-page';
import { SnippetById } from './snippet-by-id/snippet-by-id';
import { Addsnippet } from './addsnippet/addsnippet';
import { Login } from './login/login';

export const routeConfig: Routes = [
 
 
 {
    path: '',
    component: HomePage,
    title: 'Home Page',
  },



{
    path: 'login',
    component: Login,
    title: 'Login Page',
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

 {
    path: 'addsnippet',
    component: Addsnippet,
    title: 'Add Snippet',
  },

  
];

export default routeConfig;
