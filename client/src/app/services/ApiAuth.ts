import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../../../environment';
import { Observable, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
export interface User {
  nom: string;
  email: string;
  pseudo: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;

  // Signal global pour l'utilisateur
  private _user = signal<User | null>(null);
  user = computed(() => this._user());
  isAuthenticated = computed(() => this._user() !== null);

  constructor(private http: HttpClient) {}

  // ---- Enregistrement ----
  register(data: {
    nom: string;
    pseudo: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, data, {
      withCredentials: true,
    });
  }

  // ---- Login ----
login(data: { email: string; password: string }): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/auth/login`, data, { 
    withCredentials: true 
  }).pipe(
    tap((response) => {
      console.log('🔐 Réponse login:', response);
      this._user.set(response.user); 
    })
  );
}

  // ---- Logout ----
logout(): Observable<void> {
  console.log('Tentative de logout, user:', this._user());
  return this.http
    .post<void>(`${this.apiUrl}/auth/logout`, {}, { withCredentials: true })
    .pipe(tap(() => {
      console.log('Logout réussi, réinitialisation user');
      this._user.set(null);
    }));
}

  // ---- Récupérer l'utilisateur actuel ----
  refreshUser(): Observable<User> {
    return this.http
      .get<User>(`${this.apiUrl}/auth/me`, { 
        withCredentials: true 
      })
      .pipe(tap((user) => this._user.set(user)));
  }
}