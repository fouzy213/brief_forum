import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface Language {
  id_language: number;
  nom: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiLanguage {
  url: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  fetchLanguage(): Observable<{ results: Language[] }> {
    return this.http.get<{ results: Language[] }>(`${this.url}/languages`);
  }
}
