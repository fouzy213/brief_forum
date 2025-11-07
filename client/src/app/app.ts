import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { AuthService } from './services/ApiAuth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  template: `<app-navbar />
    <main>
      <section>
        <router-outlet />
      </section>
    </main> `,
  styleUrl: './app.css',
})


 export class App implements OnInit{
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.refreshUser().subscribe({
      next: () => console.log('Utilisateur connecté via cookie'),
      error: () => console.log('Pas de session active'),
    });
  }
}

