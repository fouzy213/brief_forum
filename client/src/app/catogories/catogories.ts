import { ApiCategories, Categorie } from './../services/http-categories';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  template: `
    <ul class="category-list">
     @for(category of categories; track category.id_categorie){
       <li class="beautiful-button">{{ category.nom }}</li>
      }
    </ul>
    
  `,
styleUrls: ['./catogories.css'],})
export class CategoriesComponent implements OnInit {
  categories: Categorie[] = [];

  constructor(private apiCategories: ApiCategories) { }

  ngOnInit() {
    this.apiCategories.fetchCategories().subscribe({
      next: (res) => {
        console.log(res); 
        this.categories = res.results ?? res;
        console.log(this.categories);
      },
      error: (err) => console.error(err)
    });
  }

  trackById(index: number, category: Categorie): number {
    return category.id_categorie;
  }
}
