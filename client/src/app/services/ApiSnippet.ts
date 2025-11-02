import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface SnippetType {
  id_snippet: number;
  titre: string;
  contenu: string;
  date_creation: string;
  utilisateur: { nom: string };
  langage: { nom: string };
  precise: { categorie: { nom: string } }[];
  commentaire: { texte: string; utilisateur: { nom: string } }[];
  aime: any[];
}

@Injectable({
  providedIn: 'root',
})
export class ApiSnippet {
  url: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  fetchLanguage(): Observable<{ results: SnippetType[] }> {
    return this.http.get<{ results: SnippetType[] }>(`${this.url}/snippet`);
  }
  fetchSnippetById(id: number) {
    return this.http.get<SnippetType>(`${this.url}/snippet/${id}`);
  }

  fetchprecise(id: number) {
    return this.http.get<SnippetType>(`${this.url}/precise`);
  }
}
