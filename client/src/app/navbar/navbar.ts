import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/ApiAuth';
import { Categories } from '../catogories/catogories';
import { Languages } from '../languages/languages';
import { FilterService } from '../services/filterService';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, Categories, Languages],
  template: `
    <nav>
      <div class="all_navbar">
        <h1>Snippet overflow</h1>
        <ul>
          @if (auth.isAuthenticated()) {

          <li class="beautiful-button-login">Bonjour {{ auth.user()?.nom || 'Utilisateur' }}</li>
          <li class="beautiful-button-login" (click)="logout()">Déconnexion</li>
          } @else {

          <!--  non connecter -->
          <li class="beautiful-button" [routerLink]="['/register']">Inscription</li>
          <li class="beautiful-button" [routerLink]="['/login']">Connexion</li>
          }

          <li class="beautiful-button" [routerLink]="['/']">Accueil</li>
          <li class="beautiful-button" [routerLink]="['addsnippet']">Ajout Snippet</li>
          <li class="beautiful-button" (click)="toggleCategories()">Catégories</li>
          <li class="beautiful-button" (click)="toggleLanguages()">Languages</li>
          <li class="beautiful-button" [routerLink]="['about']">À propos</li>
        </ul>
      </div>

      @if (showLanguages && showCategories) {
      <app-categories  />
      <app-languages />
      } @else if (showCategories) {
      <app-categories/>
      } @else if (showLanguages) {
      <app-languages />
      }
    </nav>
  `,
  styleUrl: './navbar.css',
})
export class Navbar {
  showCategories = false;
  showLanguages = false;

  constructor(public auth: AuthService, private filterService: FilterService) {

    
  }
  toggleCategories() {
    this.showCategories = !this.showCategories;
    if (this.showCategories) this.showLanguages = false;
  }

  toggleLanguages() {
    this.showLanguages = !this.showLanguages;
    if (this.showLanguages) this.showCategories = false;
  }



  logout() {
    this.auth.logout().subscribe(() => {
      console.log('Déconnexion réussie');
    });
  }
}
