import { Language, ApiLanguage } from '../services/ApiLanguages';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FilterService } from './../services/filterService';

@Component({
  selector: 'app-languages',
  imports: [CommonModule],
  template: `<ul class="languages-list">
    @for(language of languages; track language.id_language){
    <li class="beautiful-button" (click)="onLanguageSelect(language.nom)">
      {{ language.nom }}
    </li>
    }
  </ul>`,
  styleUrl: './languages.css',
})
export class Languages implements OnInit {
  languages: Language[] = [];
  constructor(private apiLanguage: ApiLanguage, private filterService: FilterService) {}

  ngOnInit() {
    this.apiLanguage.fetchLanguage().subscribe({
      next: (res) => {
        console.log(res);
        this.languages = res.results ?? res;
        console.log(this.languages);
      },
      error: (err) => console.error(err),
    });
  }

  trackById(index: number, language: Language): number {
    return language.id_language;
  }

  onLanguageSelect(name: string) {
    this.filterService.setLanguage(name);
    this.filterService.setCategory(null);
  }
}
