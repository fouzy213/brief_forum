import { FilterService } from './../services/filterService';
import { ApiCategories, Categorie, Snippet } from '../services/ApiCategiories';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  template: `
    <ul class="category-list">
      @for (category of categories; track category.id_categorie) {
      <li class="beautiful-button" (click)="onCategorySelect(category.nom)">
        {{ category.nom }}
      </li>
      }
    </ul>
  `,
  styleUrls: ['./catogories.css'],
})
export class Categories implements OnInit {
  categories: Categorie[] = [];
  snippets: Snippet[] = [];

  constructor(private apiCategories: ApiCategories, private filterService: FilterService) {}

  ngOnInit() {
    this.apiCategories.fetchCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categories = res.results ?? res;
        console.log(this.categories);
      },
      error: (err) => console.error(err),
    });
  }

  trackById(index: number, category: Categorie): number {
    return category.id_categorie;
  }

  onCategorySelect(name: string) {
    this.filterService.setCategory(name);
    this.filterService.setLanguage(null);
  }
}
