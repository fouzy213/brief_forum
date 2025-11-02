import { Login } from '../login/login';
import { Component } from '@angular/core';
import { Snippet } from '../snippet/snippet';

@Component({
  selector: 'app-home-page',
  imports: [Login, Snippet],
  template: `
    <app-snippet />
    <app-login />
  `,
})
export class HomePage {}
