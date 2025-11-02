import { Component, OnInit } from '@angular/core';
import { ApiSnippet, SnippetType } from '../services/ApiSnippet';
import { Router } from '@angular/router';
@Component({
  selector: 'app-snippet',
  imports: [],
  template: `
    <ul class="snippet-list">
      @for (snippet of snippets; track snippet.id_snippet) {
      <li class="snippet" (click)="goToSnippet(snippet.id_snippet)">
        {{ snippet.titre }}
      </li>
      }
    </ul>
  `,
  styleUrl: './snippet.css',
})
export class Snippet implements OnInit {
  snippets: SnippetType[] = [];

  constructor(private apisnippet: ApiSnippet, private router: Router) {}

  ngOnInit() {
    this.apisnippet.fetchLanguage().subscribe({
      next: (res) => {
        console.log(res);
        this.snippets = res.results ?? res;
        console.log(this.snippets);
      },
      error: (err) => console.error(err),
    });
  }

  trackById(index: number, snippet: SnippetType): number {
    return snippet.id_snippet;
  }

  goToSnippet(id: number) {
    this.router.navigate(['/snippet', id]);
  }
}
