import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Categories } from '../catogories/catogories';
import { Languages } from '../languages/languages';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule, Categories, Languages, RouterLink],
  template: `
    <nav>
      <div class="all_navbar">
        <h1>Snippet overflow</h1>
        <ul>
          <li class="beautiful-button" [routerLink]="['/']">Accueil</li>
          <li class="beautiful-button" [routerLink]="['about']">A propos</li>
          <li class="beautiful-button">Ajout sujet</li>
          <li class="beautiful-button" [routerLink]="['register']">Enregistrer</li>
          <li class="beautiful-button" (click)="toggleCategories()">Catégories</li>
          <li class="beautiful-button" (click)="toggleLanguages()">Languages</li>
        </ul>
      </div>
      @if (showLanguages && showCategories) {
      <app-categories />
      <app-languages />
      } @else if (showCategories) {
      <app-categories />
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
  toggleCategories() {
    this.showCategories = !this.showCategories;
    if (this.showCategories) {
      this.showLanguages = false;
    }
  }

  toggleLanguages() {
    this.showLanguages = !this.showLanguages;
    if (this.showLanguages) {
      this.showCategories = false;
    }
  }
}
