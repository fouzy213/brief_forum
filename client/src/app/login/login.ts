import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { AuthService } from '../services/ApiAuth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
 @if (!auth.isAuthenticated()) {
  <section>
    <h1>Connecte-toi</h1>

    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <div class="all-login">

        <div class="form-group">
          <input
            type="text"
            formControlName="email"
            placeholder="Email"
            [class.invalid]="email?.invalid && email?.touched"
          />
          @if (email?.invalid && email?.touched) {
            <div class="error">
              @if (email?.errors?.['required']) {
                <span>L'email est requis</span>
              }
              @if (email?.errors?.['email']) {
                <span>L'email n'est pas valide</span>
              }
            </div>
          }
        </div>

        <div class="form-group">
          <input
            type="password"
            formControlName="password"
            placeholder="Mot de passe"
            [class.invalid]="password?.invalid && password?.touched"
          />
          @if (password?.invalid && password?.touched) {
            <div class="error">
              @if (password?.errors?.['required']) {
                <span>Le mot de passe est requis</span>
              }
              @if (password?.errors?.['minlength']) {
                <span>Le mot de passe doit contenir au moins 8 caractères</span>
              }
            </div>
          }
        </div>

        <button class="primary" type="submit" [disabled]="loginForm.invalid || loading()">
          @if (loading()) { Connexion... } @else { Connecte-toi }
        </button>
      </div>
    </form>

    @if (error()) {
      <p class="error">{{ error() }}</p>
    }
  </section>
} @else {
  <section class="login-success">
    <h2>✅ Connexion réussie</h2>
    <button (click)="goHome()">Aller à l'accueil</button>
  </section>
}

    
  `,
  styleUrls: ['./login.css'],
})
export class Login {
  // ---- Reactive Form ----
  loginForm: FormGroup;

  // ---- Signals (état local réactif) ----
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(
    private formbuilderb: FormBuilder,
    public auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formbuilderb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // Getters pour simplifier le template
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.loading.set(true);
    this.error.set(null);

    this.auth.login({ email, password }).subscribe({
      next: () => {
        this.loading.set(false);
        console.log('✅ Connexion réussie');
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.loading.set(false);
        console.error('Erreur login', err);
        this.error.set('Email ou mot de passe incorrect');
      },
    });
  }

  goHome() {
    this.router.navigateByUrl('/');
  }
}
