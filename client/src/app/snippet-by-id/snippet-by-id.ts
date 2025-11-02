import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiSnippet, SnippetType } from '../services/ApiSnippet';
@Component({
  selector: 'app-snippet-by-id',
  imports: [RouterLink],
  template: `@if (!isLoading && snippet) {
    <div class="snippet-detail">
      <h1>{{ snippet.titre }}</h1>
      <p class="description">Créé le : {{ snippet.date_creation }}</p>
      <p>Auteur : {{ snippet.utilisateur.nom }}</p>
      <p>Langage : {{ snippet.langage.nom }}</p>

      <pre class="code-block"><code>{{ snippet.contenu }}</code></pre>

      @if (snippet.precise.length > 0) {
      <div class="categories">
        <span>Catégories :</span>
        @for(cat of snippet.precise; track cat.categorie.nom) {
        <span class="category">{{ cat.categorie.nom }}</span>
        }
      </div>
      }

      <h3>Commentaires :</h3>
      @if (snippet.commentaire && snippet.commentaire.length > 0) { @for(comment of
      snippet.commentaire; track snippet.commentaire.indexOf(comment)) {
      <p class="comment">
        <strong>{{ comment.utilisateur.nom }}:</strong> {{ comment.texte }}
      </p>
      } } @else {
      <p>Aucun commentaire pour ce snippet.</p>
      }

      <p class="likes">Likes : {{ snippet.aime.length }}</p>

      <button [routerLink]="['/']" class="back-btn">← Retour aux snippets</button>
    </div>
    } @else {
    <p>Chargement du snippet...</p>
    } `,
  styleUrl: './snippet-by-id.css',
})
export class SnippetById implements OnInit {
  snippet?: SnippetType;
  isLoading = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private apiSnippet: ApiSnippet) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Chargement du snippet ID:', id);

    this.apiSnippet.fetchSnippetById(id).subscribe({
      next: (data) => {
        this.snippet = data;
        this.isLoading = false;
      },

      error: (err) => {
        console.error(err);
        this.error = 'Impossible de charger le snippet';
        this.isLoading = false;
      },
    });
  }
}
