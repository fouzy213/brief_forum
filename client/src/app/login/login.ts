import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  template: ` <section>
    <h1>Connecte toi</h1>
    <form>
      <div class="all_login">
        <input type="text" placeholder="Login" />
        <input type="password" placeholder="Password" />
        <button class="primary" type="button">Connecte toi</button>
      </div>
    </form>
  </section>`,
  styleUrl: './login.css',
})
export class Login {}
