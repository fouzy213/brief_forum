import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiSnippet, SnippetType } from '../services/ApiSnippet';
import { CommentService } from '../services/commentService';
import { AuthService } from '../services/ApiAuth';

@Component({
  selector: 'app-snippet-by-id',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  template: `
    @if (!isLoading && snippet) {
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
              <span class="category"> {{ cat.categorie.nom }}</span>
            }
          </div>
        }

        <div class="comments-section">
          <h3>💬 Commentaires ({{ commentService.comments().length }})</h3>
          
          @if (authService.isAuthenticated()) {
            <form [formGroup]="commentForm" (ngSubmit)="ajouterCommentaire()" class="comment-form">
              <textarea 
                formControlName="texte"
                placeholder="Votre commentaire..."
                rows="3"
                class="comment-input"
              ></textarea>
              <button 
                type="submit" 
                [disabled]="commentForm.invalid || commentService.loading()"
                class="submit-btn"
              >
                @if (commentService.loading()) {
                  ⏳ Publication...
                } @else {
                  📤 Publier
                }
              </button>
            </form>
          } @else {
            <p class="login-prompt">🔒 Connectez-vous pour commenter</p>
          }

          @if (commentService.error()) {
            <div class="error-message">
              {{ commentService.error() }}
            </div>
          }

          <!-- Liste des commentaires depuis le Service -->
          <div class="comments-list">
            @for (comment of commentService.comments(); track comment.id_commentaire) {
              <div class="comment-card">
                <div class="comment-header">
                  <strong>{{ comment.utilisateur.nom }}</strong>
                  <span class="comment-date">
                    {{ comment.date_publication | date:'dd/MM/yyyy HH:mm' }}
                  </span>
                </div>
                <p class="comment-text">{{ comment.texte }}</p>
              </div>
            } @empty {
              <p class="no-comments">Aucun commentaire pour le moment. Soyez le premier à commenter !</p>
            }
          </div>
        </div>








        <p class="likes">Likes : {{ snippet.aime.length }}</p>

        <button [routerLink]="['/']" class="back-btn">← Retour aux snippets</button>
      </div>
    } @else {
      <p>Chargement du snippet...</p>
    }
  `,
  styleUrl: './snippet-by-id.css'
})
export class SnippetById implements OnInit {
  snippet?: SnippetType;
  isLoading = true;
  error: string | null = null;

  // Services
  private route = inject(ActivatedRoute);
  private apiSnippet = inject(ApiSnippet);
  private fb = inject(FormBuilder);
  commentService = inject(CommentService);
  authService = inject(AuthService);

  // Formulaire de commentaire
  commentForm = this.fb.group({
    texte: ['', [Validators.required, Validators.minLength(1)]]
  });

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Chargement du snippet ID:', id);

    this.apiSnippet.fetchSnippetById(id).subscribe({
      next: (data) => {
        this.snippet = data;
        this.isLoading = false;
        
        // ✅ Charger les commentaires quand le snippet est chargé
        this.chargerCommentaires();
      },
      error: (err) => {
        console.error(err);
        this.error = 'Impossible de charger le snippet';
        this.isLoading = false;
      },
    });
  }

  // Méthode pour charger les commentaires
  chargerCommentaires() {
    if (this.snippet?.id_snippet) {
      this.commentService.getComments(this.snippet.id_snippet).subscribe();
    }
  }

  // Méthode pour ajouter un commentaire
  ajouterCommentaire() {
    if (this.commentForm.valid && this.snippet?.id_snippet) {
      const texte = this.commentForm.value.texte!;
      
      this.commentService.createComment(this.snippet.id_snippet, texte).subscribe({
        next: () => {
          this.commentForm.reset(); // Reset le formulaire après publication
        },
        error: (error) => {
          console.error('Erreur publication commentaire:', error);
        }
      });
    }
  }
}