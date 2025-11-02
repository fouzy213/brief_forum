import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  template: `<div class="about-container">
    <h1>À propos de Snippet Overflow</h1>

    <p class="intro">
      Bienvenue sur <strong>Snippet Overflow</strong>, la plateforme communautaire dédiée aux
      développeurs qui souhaitent partager, découvrir et améliorer leurs connaissances à travers des
      <em>snippets</em> — ces petits morceaux de code qui font toute la différence.
    </p>

    <section>
      <h2>Notre mission</h2>
      <p>
        Notre objectif est simple :
        <strong>créer un espace collaboratif où chaque ligne de code compte</strong>. Ici, vous
        pouvez :
      </p>
      <ul>
        <li>Publier vos snippets, astuces et solutions techniques,</li>
        <li>Poser des questions ou répondre à celles de la communauté,</li>
        <li>Découvrir des langages, frameworks et pratiques variés,</li>
        <li>Contribuer à un savoir collectif, libre et accessible à tous.</li>
      </ul>
    </section>

    <section>
      <h2>Une communauté pour tous</h2>
      <p>
        Que vous soyez <strong>débutant</strong> ou <strong>expert</strong>,
        <strong>Snippet Overflow</strong> est l’endroit idéal pour apprendre, échanger et faire
        évoluer vos compétences dans un esprit d’entraide et d’innovation.
      </p>
      <blockquote>“Parce que le code, c’est mieux quand il circule.”</blockquote>
    </section>
  </div>`,
  styleUrl: './about.css',
})
export class About {}
