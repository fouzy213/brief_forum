import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environment';

export interface Commentaire {
  id_commentaire: number;
  texte: string;
  date_publication: string;
  utilisateur: {
    id_utilisateur: number;
    nom: string;
    email: string;
  };
}

@Injectable({ providedIn: 'root' })
export class CommentService {
  url: string = environment.apiUrl;

  comments = signal<Commentaire[]>([]);
  loading = signal(false); 
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  getComments(snippetId: number): Observable<Commentaire[]> {
    this.loading.set(true);
    this.error.set(null);

    return this.http.get<Commentaire[]>(
      `${this.url}/snippets/${snippetId}/comments`,
      { withCredentials: true } 
    ).pipe(
      tap({
        next: (comments) => {
          this.comments.set(comments);
          this.loading.set(false); 
        },
        error: (error) => {
          this.error.set('Erreur lors du chargement des commentaires');
          this.loading.set(false);
        }
      })
    );
  }

  createComment(snippetId: number, texte: string): Observable<Commentaire> {
    this.loading.set(true); 
    this.error.set(null);

    return this.http.post<Commentaire>(
      `${this.url}/snippets/${snippetId}/comments`,
      { texte },
       { withCredentials: true } 
    ).pipe(
      tap({
        next: (newComment) => {
          this.comments.update(comments => [newComment, ...comments]);
          this.loading.set(false); 
        },
        error: (error) => {
          this.error.set('Erreur lors de la publication du commentaire');
          this.loading.set(false); 
        }
      })
    );
  }
}