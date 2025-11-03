import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/ApiAuth';
import { Router, RouterModule } from '@angular/router'; 
@Component({
  selector: 'app-form-register',
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  template: `
    <div class="container">
      <h2>Formulaire d'inscription</h2>

      <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="nom">Nom *</label>
          <input
            type="text"
            id="nom"
            formControlName="nom"
            [class.invalid]="nom?.invalid && nom?.touched"
          />
          @if (nom?.invalid && nom?.touched) {
          <div class="error">
            @if (nom?.errors?.['required']) {
            <span>Le nom est requis</span>
            } @if (nom?.errors?.['minlength']) {
            <span>Le nom doit contenir au moins 2 caractères</span>
            }
          </div>
          }
        </div>

        <div class="form-group">
          <label for="pseudo">Pseudo *</label>
          <input
            type="text"
            id="pseudo"
            formControlName="pseudo"
            [class.invalid]="pseudo?.invalid && pseudo?.touched"
          />
          @if (pseudo?.invalid && pseudo?.touched) {
          <div class="error">
            @if (pseudo?.errors?.['required']) {
            <span>Le pseudo est requis</span>
            } @if (pseudo?.errors?.['minlength']) {
            <span>Le pseudo doit contenir au moins 3 caractères</span>
            }
          </div>
          }
        </div>

        <div class="form-group">
          <label for="email">Email *</label>
          <input
            type="email"
            id="email"
            formControlName="email"
            [class.invalid]="email?.invalid && email?.touched"
          />
          @if (email?.invalid && email?.touched) {
          <div class="error">
            @if (email?.errors?.['required']) {
            <span>L'email est requis</span>
            } @if (email?.errors?.['email']) {
            <span>L'email n'est pas valide</span>
            }
          </div>
          }
        </div>

        <div class="form-group">
          <label for="password">Mot de passe *</label>
          <input
            type="password"
            id="password"
            formControlName="password"
            [class.invalid]="password?.invalid && password?.touched"
          />
          @if (password?.invalid && password?.touched) {
          <div class="error">
            @if (password?.errors?.['required']) {
            <span>Le mot de passe est requis</span>
            } @if (password?.errors?.['minlength']) {
            <span>Le mot de passe doit contenir au moins 8 caractères</span>
            }
          </div>
          }
        </div>

        <div class="form-group">
          <label for="validatePassword">Confirmation du mot de passe *</label>
          <input
            type="password"
            id="validatePassword"
            formControlName="validatePassword"
            [class.invalid]="validatePassword?.invalid && validatePassword?.touched"
          />
          @if (validatePassword?.invalid && validatePassword?.touched) {
          <div class="error">
            @if (validatePassword?.errors?.['required']) {
            <span>La confirmation du mot de passe est requise</span>
            } @if (validatePassword?.errors?.['minlength']) {
            <span>Le mot de passe doit contenir au moins 8 caractères</span>
            }
          </div>
          } @if (!passwordsMatch() && validatePassword?.value && validatePassword?.touched) {
          <div class="error">
            <span>Les mots de passe ne correspondent pas</span>
          </div>
          }
        </div>

        <button
          type="submit"
          [disabled]="registrationForm.invalid || !passwordsMatch()"
          class="submit-btn"
        >
          S'inscrire
        </button>
      </form>

      @if (submittedData) {
      <div class="result">
        <h3>Données soumises :</h3>
        <pre>{{ submittedData | json }}</pre>
      </div>
      }
    </div>
  `,
  styleUrl: './form-register.css',
})
export class FormRegister {
  registrationForm: FormGroup;
  submittedData: any = null;
  message='';

  constructor(private formbuilder: FormBuilder,private router :Router,private authService: AuthService) {
    this.registrationForm = this.formbuilder.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      pseudo: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      validatePassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get nom() {
    return this.registrationForm.get('nom');
  }
  get pseudo() {
    return this.registrationForm.get('pseudo');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get password() {
    return this.registrationForm.get('password');
  }
  get validatePassword() {
    return this.registrationForm.get('validatePassword');
  }

  passwordsMatch(): boolean {
    return this.password?.value === this.validatePassword?.value;
  }
onSubmit() {
  if (this.registrationForm.valid) {
    this.authService.register(this.registrationForm.value).subscribe({
      next: (res) => {
        // Sauvegarde le token dans localStorage
        localStorage.setItem('accessToken', res.token);

        // Redirection vers la page d'accueil
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Erreur inscription', err);
      }
    });
  }
}
}