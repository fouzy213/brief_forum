import { About } from '../about/about';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about-page',
  imports: [About],
  template: ` <app-about /> `,
})
export class AboutPage {}
