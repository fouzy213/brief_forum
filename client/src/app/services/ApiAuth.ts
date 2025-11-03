import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { Observable } from 'rxjs';

export interface User{
    nom:string
    email:string
    pseudo:string
    password:string
}


@Injectable({ 
    providedIn: 'root' 
})
export class AuthService {
    
    constructor(private http: HttpClient) {}
    url :string = environment.apiUrl;
    

  register(data: { nom:string; email: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.url}/auth/register`, data, { headers });
  }
}
