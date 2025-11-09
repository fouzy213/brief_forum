-----------------------------------------------------------
-- 🔄 Nettoyage : suppression des tables existantes
-----------------------------------------------------------
DROP TABLE IF EXISTS precise CASCADE;
DROP TABLE IF EXISTS aime CASCADE;
DROP TABLE IF EXISTS jeton CASCADE;
DROP TABLE IF EXISTS commentaire CASCADE;
DROP TABLE IF EXISTS snippet CASCADE;
DROP TABLE IF EXISTS categorie CASCADE;
DROP TABLE IF EXISTS langage CASCADE;
DROP TABLE IF EXISTS utilisateur CASCADE;

-----------------------------------------------------------
-- 1️⃣ Table des utilisateurs
-----------------------------------------------------------
CREATE TABLE utilisateur (
  id_utilisateur SERIAL PRIMARY KEY,
  nom VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(320) NOT NULL UNIQUE,
  mot_de_passe_hash VARCHAR(320) NOT NULL,
  date_creation DATE DEFAULT CURRENT_DATE
);

-----------------------------------------------------------
-- 2️⃣ Table des langages
-----------------------------------------------------------
CREATE TABLE langage (
  id_langage SERIAL PRIMARY KEY,
  nom VARCHAR(50) NOT NULL UNIQUE
);

-----------------------------------------------------------
-- 3️⃣ Table des catégories
-----------------------------------------------------------
CREATE TABLE categorie (
  id_categorie SERIAL PRIMARY KEY,
  nom VARCHAR(50) NOT NULL UNIQUE
);

-----------------------------------------------------------
-- 4️⃣ Table des snippets
-----------------------------------------------------------
CREATE TABLE snippet (
  id_snippet SERIAL PRIMARY KEY,
  titre VARCHAR(100) NOT NULL,
  contenu TEXT NOT NULL,
  date_creation DATE NOT NULL,
  id_utilisateur INT NOT NULL,
  id_langage INT NOT NULL,
  FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE,
  FOREIGN KEY (id_langage) REFERENCES langage(id_langage)
);

-----------------------------------------------------------
-- 5️⃣ Table des commentaires
-----------------------------------------------------------
CREATE TABLE commentaire (
  id_commentaire SERIAL PRIMARY KEY,
  texte VARCHAR(500) NOT NULL,
  date_publication DATE NOT NULL,
  id_utilisateur INT NOT NULL,
  id_snippet INT NOT NULL,
  FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE,
  FOREIGN KEY (id_snippet) REFERENCES snippet(id_snippet) ON DELETE CASCADE
);

-----------------------------------------------------------
-- 6️⃣ Table des jetons
-----------------------------------------------------------
CREATE TABLE jeton (
  id_jeton SERIAL PRIMARY KEY,
  valeur_jeton VARCHAR(320) NOT NULL UNIQUE,
  id_utilisateur INT NOT NULL,
  FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE
);

-----------------------------------------------------------
-- 7️⃣ Table des likes
-----------------------------------------------------------
CREATE TABLE aime (
  id_utilisateur INT,
  id_snippet INT,
  PRIMARY KEY (id_utilisateur, id_snippet),
  FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE,
  FOREIGN KEY (id_snippet) REFERENCES snippet(id_snippet) ON DELETE CASCADE
);

-----------------------------------------------------------
-- 8️⃣ Table de liaison Snippet ↔ Catégorie
-----------------------------------------------------------
CREATE TABLE precise (
  id_snippet INT,
  id_categorie INT,
  PRIMARY KEY (id_snippet, id_categorie),
  FOREIGN KEY (id_snippet) REFERENCES snippet(id_snippet) ON DELETE CASCADE,
  FOREIGN KEY (id_categorie) REFERENCES categorie(id_categorie)
);

-----------------------------------------------------------
-- 👤 Insertion des utilisateurs
-----------------------------------------------------------
INSERT INTO utilisateur (nom, email, mot_de_passe_hash, date_creation) VALUES
('Alice', 'alice@example.com', 'hash_mdp_1', '2024-01-10'),
('Bob', 'bob@example.com', 'hash_mdp_2', '2024-02-15'),
('Charlie', 'charlie@example.com', 'hash_mdp_3', '2024-03-20');

-----------------------------------------------------------
-- 💻 Insertion des langages
-----------------------------------------------------------
INSERT INTO langage (nom) VALUES
('Python'),
('JavaScript'),
('C++'),
('SQL'),
('Java'),
('PHP'),
('Rust'),
('Go');

-----------------------------------------------------------
-- 🗂️ Insertion des catégories
-----------------------------------------------------------
INSERT INTO categorie (nom) VALUES
('Algorithmes'),
('Base de données'),
('Développement Web'),
('Sécurité');

-----------------------------------------------------------
-- 🧩 Insertion des snippets
-----------------------------------------------------------
INSERT INTO snippet (titre, contenu, date_creation, id_utilisateur, id_langage) VALUES
('Tri à bulles en Python', 'def bubble_sort(tab): ...', '2024-04-01', 1, 1),
('Requête SELECT simple', 'SELECT * FROM utilisateurs;', '2024-04-05', 2, 4),
('Manipulation DOM JS', 'document.querySelector("div")...', '2024-04-07', 3, 2),
('Boucle for en C++', 'for(int i=0; i<10; i++) {...}', '2024-04-10', 1, 3),
('Connexion PostgreSQL en Python', 'import psycopg2\nconn = psycopg2.connect(dbname="snippets", user="postgres", password="...")', '2024-04-12', 2, 1),
('Validation de formulaire en JavaScript', 'function validateForm() { const x = document.forms["myForm"]["fname"].value; if (x == "") alert("Nom requis!"); }', '2024-04-13', 3, 2),
('Jointure entre deux tables SQL', 'SELECT u.nom, s.titre FROM utilisateur u JOIN snippet s ON u.id_utilisateur = s.id_utilisateur;', '2024-04-14', 1, 4),
('Classe simple en C++', 'class Voiture { public: string marque; int vitesse; void accelerer() { vitesse += 10; } };', '2024-04-15', 3, 3),
('Lire un fichier en Python', 'with open("fichier.txt", "r") as f:\n    contenu = f.read()', '2024-04-16', 1, 1),
('Afficher du texte en HTML/JS', 'document.getElementById("message").innerText = "Bonjour le monde!";', '2024-04-17', 2, 2),
('Hello World en Java', 'public class Main { public static void main(String[] args) { System.out.println("Hello World"); } }', '2024-05-01', 1, 5),
('Connexion MySQL en PHP', '<?php $conn = new mysqli("localhost", "user", "pass", "db"); if($conn->connect_error) die("Erreur"); ?>', '2024-05-02', 2, 6),
('Boucle for en Rust', 'for i in 0..5 { println!("i = {}", i); }', '2024-05-03', 3, 7),
('Serveur web simple en Go', 'package main\nimport ("fmt"; "net/http")\nfunc handler(w http.ResponseWriter, r *http.Request) { fmt.Fprintf(w, "Hello!") }\nfunc main() { http.HandleFunc("/", handler); http.ListenAndServe(":8080", nil) }', '2024-05-04', 1, 8),
('Gestion des exceptions en Java', 'try { int x = 10 / 0; } catch (Exception e) { System.out.println("Erreur : " + e.getMessage()); }', '2024-05-05', 2, 5),
('Formulaire HTML + PHP', '<form method="POST"><input name="nom"><input type="submit"></form><?php echo $_POST["nom"]; ?>', '2024-05-06', 3, 6),
('Lecture d’un fichier en Rust', 'use std::fs;\nfn main() { let contenu = fs::read_to_string("data.txt").unwrap(); println!("{}", contenu); }', '2024-05-07', 1, 7),
('Routine concurrente en Go', 'go func() { fmt.Println("Hello depuis une goroutine!") }()', '2024-05-08', 2, 8);

-----------------------------------------------------------
-- 💬 Insertion des commentaires
-----------------------------------------------------------
INSERT INTO commentaire (texte, date_publication, id_utilisateur, id_snippet) VALUES
('Super utile, merci !', '2024-04-02', 2, 1),
('Je ne comprends pas la deuxième ligne.', '2024-04-03', 3, 1),
('Fonctionne parfaitement.', '2024-04-06', 1, 2),
('Astuce intéressante !', '2024-04-08', 2, 3),
('Très pratique pour se connecter à une base !', '2024-04-13', 1, 5),
('J\'aime l\'exemple, clair et concis.', '2024-04-14', 2, 6),
('Merci, cette requête SQL m\'a aidé.', '2024-04-15', 3, 7),
('Simple et efficace !', '2024-04-16', 2, 8),
('J\'ai pu lire mes fichiers sans souci.', '2024-04-17', 3, 9),
('Cool pour débuter en DOM !', '2024-04-18', 1, 10),
('Simple mais efficace pour débuter en Java.', '2024-05-02', 2, 11),
('PHP old-school mais ça marche toujours !', '2024-05-03', 1, 12),
('Rust est un peu verbeux mais performant.', '2024-05-04', 3, 13),
('J\'adore la simplicité de Go.', '2024-05-05', 1, 14),
('Exemple clair de gestion d\'erreur.', '2024-05-06', 3, 15),
('Bonne démo HTML + PHP.', '2024-05-07', 2, 16),
('Lecture de fichier Rust très claire.', '2024-05-08', 2, 17),
('La concurrence en Go est top !', '2024-05-09', 3, 18);

-----------------------------------------------------------
-- 🔑 Insertion des jetons
-----------------------------------------------------------
INSERT INTO jeton (valeur_jeton, id_utilisateur) VALUES
('abc123xyz', 1),
('def456uvw', 2),
('ghi789rst', 3);

-----------------------------------------------------------
-- ❤️ Insertion des likes
-----------------------------------------------------------
INSERT INTO aime (id_utilisateur, id_snippet) VALUES
(1, 2),
(2, 1),
(2, 3),
(3, 1),
(3, 4),
(1, 5),
(1, 6),
(2, 7),
(3, 5),
(3, 10),
(1, 11),
(2, 11),
(3, 12),
(1, 14),
(2, 15),
(3, 16),
(1, 17),
(3, 18);

-----------------------------------------------------------
-- 🔗 Liaison Snippet ↔ Catégorie
-----------------------------------------------------------
INSERT INTO precise (id_snippet, id_categorie) VALUES
(1, 1),
(1, 4),
(2, 2),
(3, 3),
(4, 1),
(5, 2),
(6, 3),
(7, 2),
(8, 1),
(9, 1),
(10, 3),
(11, 3),
(12, 2),
(13, 1),
(14, 3),
(15, 4),
(16, 3),
(17, 1),
(18, 1);
