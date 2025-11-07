import { Component } from '@angular/core';
import { Snippet } from '../snippet/snippet';

@Component({
  selector: 'app-home-page',
  imports: [ Snippet],
  template: `
    <app-snippet />
  `,
})
export class HomePage {}
