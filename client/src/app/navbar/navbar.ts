import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from '../catogories/catogories';
import { Languages } from "../languages/languages";
@Component({
  selector: 'app-navbar',
  imports: [CommonModule, CategoriesComponent, Languages],
  template: `
  <nav>
    <div class="all_navbar">
    <h1>Snippet overflow</h1>
    <ul>
      <li class="beautiful-button">About</li>
          <li class="beautiful-button">Add Subject</li>
          <li class="beautiful-button">Profile</li>
          <li class="beautiful-button" (click)="toggleCategories()">Catégories</li>
          <li class="beautiful-button" (click)="toggleLanguages()">Langages</li>
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


