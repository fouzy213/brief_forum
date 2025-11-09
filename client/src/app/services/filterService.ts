import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  selectedCategory = signal<string | null>(null);
  selectedLanguage = signal<string | null>(null);

  setCategory(category: string | null) {
    this.selectedCategory.set(category);
  }

  setLanguage(language: string | null) {
    this.selectedLanguage.set(language);
  }
}
