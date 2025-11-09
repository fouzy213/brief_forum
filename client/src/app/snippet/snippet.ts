import { Component, signal, effect } from '@angular/core';
import { ApiSnippet, SnippetType } from '../services/ApiSnippet';
import { Router } from '@angular/router';
import { FilterService } from '../services/filterService';
@Component({
  selector: 'app-snippet',
  template: `
<ul class="snippet-list">
  @for (snippet of filteredSnippets(); track snippet.id_snippet) {
    <li class="snippet" (click)="goToSnippet(snippet.id_snippet)">
      {{ snippet.titre }}
    </li>
  }
</ul>
  `,
  styleUrl: './snippet.css',
})
export class Snippet {
  snippets = signal<SnippetType[]>([]);
  filteredSnippets = signal<SnippetType[]>([]);
  selectedCategory: string | null = null;
    selectedLanguage: string | null = null;


  constructor(
    private apisnippet: ApiSnippet,
    private router: Router,
    private filterService: FilterService
  ) {
    console.log('Composant Snippet initialisé');

    // Récupération des snippets depuis l'API
    this.apisnippet.fetchLanguage().subscribe({
      next: (res) => {
        const data = res.results ?? res;
        const prepared = data.map((s) => ({ ...s, categories: s.categories ?? [] }));
        this.snippets.set(prepared);
        this.applyFilter();
      },
      error: (err) => console.error('Erreur API:', err),
    });
    // Écoute du signal de catégorie via effect global
    effect(() => {
  const category = this.filterService.selectedCategory();
  const language = this.filterService.selectedLanguage();

  console.log('Filtre actif:', { category, language });

  this.selectedCategory = category;
  this.selectedLanguage = language;

  this.applyFilter();
});

  }
applyFilter() {
  const allSnippets = this.snippets();
  const selectedCategory = this.selectedCategory?.toLowerCase().trim() || null;
  const selectedLanguage = this.selectedLanguage?.toLowerCase().trim() || null;

  console.log('applyFilter appelé avec:', { selectedCategory, selectedLanguage });

  let filtered = allSnippets;

  // Filtre par catégorie si défini
  if (selectedCategory) {
    filtered = filtered.filter(snippet => {
      const categories = snippet.categories ?? [];
      return categories.some(c => c.toLowerCase().trim() === selectedCategory);
    });
  }

  // Filtre par langage si défini
  if (selectedLanguage) {
    filtered = filtered.filter(snippet =>
      snippet.langage?.nom?.toLowerCase().trim() === selectedLanguage
    );
  }

  this.filteredSnippets.set(filtered);
  console.log('Snippets filtrés:', filtered);
}


  goToSnippet(id: number) {
    console.log('Navigation vers le snippet avec id:', id);
    this.router.navigate(['/snippet', id]);
  }

  trackById(index: number, snippet: SnippetType): number {
    return snippet.id_snippet;
  }
}

