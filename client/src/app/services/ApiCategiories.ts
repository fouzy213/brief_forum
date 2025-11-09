import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface Categorie {
  id_categorie: number;
  nom: string;
}

export interface Snippet {
  id_snippet: number;
  titre: string;
  contenu: string;
  date_creation: string;
  id_utilisateur: number;
  id_langage: number;
}


@Injectable({
  providedIn: 'root',
})
export class ApiCategories {
  url: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  fetchCategories(): Observable<{ results: Categorie[] }> {
    return this.http.get<{ results: Categorie[] }>(`${this.url}/categories`);
  }

}
