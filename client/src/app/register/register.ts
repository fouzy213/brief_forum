import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule], 
  template: `
    <section>
      <h1>Enregistre-toi</h1>
      <form>
        <div class="all_login">
          <input type="text" placeholder="Nom">
          <input type="text" placeholder="Prénom">
          <input type="password" placeholder="Mot de passe">
          <input type="password" placeholder="Confirme le mot de passe">

          <select (change)="onSelectChange($event)">
            <option value="">-- Choisir une option --</option>
            <option value="js">JavaScript</option>
            <option value="ts">TypeScript</option>
            <option value="ng">Angular</option>
          </select>

          <button class="primary" type="button">Enregistre-toi</button>
        </div>
      </form>
    </section>
  `,
  styleUrls: ['./register.css'], 
})
export class Register {
  onSelectChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    console.log('Valeur sélectionnée :', select.value);
  }
}
