import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addsnippet',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <h2>Ajout d'un Snippet</h2>

      <!--       <form [formGroup]=
 --><!--       "addsubject" (ngSubmit)="onSubmit()"
 -->
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
  /* constructor  (private formbuilder: FormBuilder,private router :Router)
addsubject:FormGroup;
this.addsubject = this.formbuilder.group({
nom: ['', [Validators.required, Validators.minLength(2)]],
date:['',[Validators.required,Validators.toString]]
snippet:['',[Validators.required,Validators.minLength(120)]]
})
}


onSubmit(){ */
}
