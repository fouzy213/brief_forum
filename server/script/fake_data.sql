-- Supprimer les tables si elles existent déjà (ordre inverse des dépendances)
DROP TABLE IF EXISTS precise CASCADE;
DROP TABLE IF EXISTS aime CASCADE;
DROP TABLE IF EXISTS jeton CASCADE;
DROP TABLE IF EXISTS commentaire CASCADE;
DROP TABLE IF EXISTS snippet CASCADE;
DROP TABLE IF EXISTS categorie CASCADE;
DROP TABLE IF EXISTS langage CASCADE;
DROP TABLE IF EXISTS utilisateur CASCADE;

-----------------------------------------------------------
-- 1. Table des utilisateurs
-----------------------------------------------------------
CREATE TABLE utilisateur (
  id_utilisateur SERIAL PRIMARY KEY,
  nom VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(320) NOT NULL UNIQUE,
  mot_de_passe_hash VARCHAR(320) NOT NULL,
  date_creation DATE
);

-----------------------------------------------------------
-- 2. Table des langages
-----------------------------------------------------------
CREATE TABLE langage (
  id_langage SERIAL PRIMARY KEY,
  nom VARCHAR(50) NOT NULL UNIQUE
);

-----------------------------------------------------------
-- 3. Table des catégories
-----------------------------------------------------------
CREATE TABLE categorie (
  id_categorie SERIAL PRIMARY KEY,
  nom VARCHAR(50) NOT NULL UNIQUE
);

-----------------------------------------------------------
-- 4. Table des extraits de code (snippets)
-----------------------------------------------------------
CREATE TABLE snippet (
  id_snippet SERIAL PRIMARY KEY,
  titre VARCHAR(100) NOT NULL,
  contenu VARCHAR(500) NOT NULL,
  date_creation DATE NOT NULL,
  id_utilisateur INT NOT NULL,
  id_langage INT NOT NULL,
  FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE,
  FOREIGN KEY (id_langage) REFERENCES langage(id_langage)
);

-----------------------------------------------------------
-- 5. Table des commentaires
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
-- 6. Table des jetons
-----------------------------------------------------------
CREATE TABLE jeton (
  id_jeton SERIAL PRIMARY KEY,
  valeur_jeton VARCHAR(320) NOT NULL UNIQUE,
  id_utilisateur INT NOT NULL,
  FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE
);

-----------------------------------------------------------
-- 7. Table des "likes"
-----------------------------------------------------------
CREATE TABLE aime (
  id_utilisateur INT,
  id_snippet INT,
  PRIMARY KEY (id_utilisateur, id_snippet),
  FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE,
  FOREIGN KEY (id_snippet) REFERENCES snippet(id_snippet) ON DELETE CASCADE
);

-----------------------------------------------------------
-- 8. Table de liaison entre snippets et catégories
-----------------------------------------------------------
CREATE TABLE precise (
  id_snippet INT,
  id_categorie INT,
  PRIMARY KEY (id_snippet, id_categorie),
  FOREIGN KEY (id_snippet) REFERENCES snippet(id_snippet) ON DELETE CASCADE,
  FOREIGN KEY (id_categorie) REFERENCES categorie(id_categorie)
);

-----------------------------------------------------------
-- 🚀 INSERTIONS DE DONNÉES
-----------------------------------------------------------

-- Utilisateurs
INSERT INTO utilisateur (nom, email, mot_de_passe_hash, date_creation) VALUES
('Alice', 'alice@example.com', 'hash_mdp_1', '2024-01-10'),
('Bob', 'bob@example.com', 'hash_mdp_2', '2024-02-15'),
('Charlie', 'charlie@example.com', 'hash_mdp_3', '2024-03-20');

-- Langages
INSERT INTO langage (nom) VALUES
('Python'),
('JavaScript'),
('C++'),
('SQL');

-- Catégories
INSERT INTO categorie (nom) VALUES
('Algorithmes'),
('Base de données'),
('Développement Web'),
('Sécurité');

-- Snippets
INSERT INTO snippet (titre, contenu, date_creation, id_utilisateur, id_langage) VALUES
('Tri à bulles en Python', 'def bubble_sort(tab): ...', '2024-04-01', 1, 1),
('Requête SELECT simple', 'SELECT * FROM utilisateurs;', '2024-04-05', 2, 4),
('Manipulation DOM JS', 'document.querySelector("div")...', '2024-04-07', 3, 2),
('Boucle for en C++', 'for(int i=0; i<10; i++) {...}', '2024-04-10', 1, 3);

-- Commentaires
INSERT INTO commentaire (texte, date_publication, id_utilisateur, id_snippet) VALUES
('Super utile, merci !', '2024-04-02', 2, 1),
('Je ne comprends pas la deuxième ligne.', '2024-04-03', 3, 1),
('Fonctionne parfaitement.', '2024-04-06', 1, 2),
('Astuce intéressante !', '2024-04-08', 2, 3);

-- Jetons
INSERT INTO jeton (valeur_jeton, id_utilisateur) VALUES
('abc123xyz', 1),
('def456uvw', 2),
('ghi789rst', 3);

-- Likes
INSERT INTO aime (id_utilisateur, id_snippet) VALUES
(1, 2),
(2, 1),
(2, 3),
(3, 1),
(3, 4);

-- Liaison snippet <-> catégorie
INSERT INTO precise (id_snippet, id_categorie) VALUES
(1, 1),
(1, 4),
(2, 2),
(3, 3),
(4, 1);
