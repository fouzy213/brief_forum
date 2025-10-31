import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import { Login } from "./login/login";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Login],
  template :`<app-navbar/>
  <main>
    <section>
      <router-outlet></router-outlet>
      <app-login/>
    </section>
</main>
  `,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('client');
}
