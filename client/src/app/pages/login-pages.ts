import { Login } from '../login/login';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  imports: [Login, ],
  template: `
    <app-login />
  `,
})
export class LoginPage {}