import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import { CategoriesComponent } from "./catogories/catogories";
import { Login } from "./login/login";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, CategoriesComponent, Login],
  template :`<app-navbar/>
  <main>
    <section>
      <router-outlet></router-outlet>
      <app-categories/>
      <app-login/>
    </section>
</main>
  `,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('client');
}
