import { Language ,ApiLanguage} from './../services/http-languages';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-languages',
  imports: [CommonModule],
  template: `<ul class="category-list">
     @for(language of languages; track language.id_language){
       <li class="beautiful-button">{{ language.nom }}</li>
      }
    </ul>`,
  styleUrl: './languages.css',
})
export class Languages implements OnInit{
 languages: Language[] = [];
  constructor(private apiLanguage: ApiLanguage) { }
 
   ngOnInit() {
     this.apiLanguage.fetchLanguage().subscribe({
       next: (res) => {
         console.log(res); 
         this.languages = res.results ?? res;
         console.log(this.languages);
       },
       error: (err) => console.error(err)
     });
   }
 
   trackById(index: number, language: Language): number {
     return language.id_language;
   }
 }

