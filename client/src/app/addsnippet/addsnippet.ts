import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addsnippet',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <h2>Ajout d'un Snippet</h2>


      <div class="form-group">
        <label for="nom">Description *</label>
        <input type="text" id="nom" formControlName="nom" />

        <div class="form-group">
          <label for="text">language *</label>
          <input type="area" id="nom" formControlName="nom" />

          <div class="form-group">
            <label for="nom">Date *</label>
            <input type="datetime" id="nom" formControlName="nom" />

            <div class="form-group">
              <label for="nom"
                >Snippet *
                <textarea id="message" formControlName="message" rows="15"></textarea>
              </label>
            </div>
            <button class="primary" type="submit" >Envoyer</button>
          </div>
        </div>
      </div>

    </div>
  `,
  styleUrl: './addsnippet.css',
})
export class Addsnippet {

}
