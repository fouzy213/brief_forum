-- 1. Table des utilisateurs
CREATE TABLE utilisateur (
  id_utilisateur SERIAL,
  nom VARCHAR(50) NOT NULL,
  email VARCHAR(320) NOT NULL,
  mot_de_passe_hash VARCHAR(320) NOT NULL,
  date_creation DATE,
  PRIMARY KEY (id_utilisateur),
  UNIQUE (email)
);

-- 2. Table des langages
CREATE TABLE langage (
  id_langage SERIAL,
  nom VARCHAR(50) NOT NULL,
  PRIMARY KEY (id_langage),
  UNIQUE (nom)
);

-- 3. Table des catégories
CREATE TABLE categorie (
  id_categorie SERIAL,
  nom VARCHAR(50) NOT NULL UNIQUE,
  PRIMARY KEY (id_categorie)
);

-- 4. Table des extraits de code (snippets)
CREATE TABLE snippet (
  id_snippet SERIAL,
  titre VARCHAR(100) NOT NULL,
  contenu VARCHAR(500) NOT NULL,
  date_creation DATE NOT NULL,
  id_utilisateur INT NOT NULL,
  id_langage INT NOT NULL,
  PRIMARY KEY (id_snippet),
  FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur),
  FOREIGN KEY (id_langage) REFERENCES langage(id_langage)
);

-- 5. Table des commentaires
CREATE TABLE commentaire (
  id_commentaire SERIAL,
  texte VARCHAR(500) NOT NULL,
  date_publication DATE NOT NULL,
  id_utilisateur INT NOT NULL,
  id_snippet INT NOT NULL,
  PRIMARY KEY (id_commentaire),
  FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur),
  FOREIGN KEY (id_snippet) REFERENCES snippet(id_snippet)
);

-- 6. Table des jetons (tokens)
CREATE TABLE jeton (
  id_jeton SERIAL,
  valeur_jeton VARCHAR(320) NOT NULL,
  id_utilisateur INT NOT NULL,
  PRIMARY KEY (id_jeton),
  UNIQUE (valeur_jeton),
  FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur)
);

-- 7. Table des "likes"
CREATE TABLE aime (
  id_utilisateur INT,
  id_snippet INT,
  PRIMARY KEY (id_utilisateur, id_snippet),
  FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur),
  FOREIGN KEY (id_snippet) REFERENCES snippet(id_snippet)
);

-- 8. Table de liaison entre snippet et catégorie
CREATE TABLE precise (
  id_snippet INT,
  id_categorie INT,
  PRIMARY KEY (id_snippet, id_categorie),
  FOREIGN KEY (id_snippet) REFERENCES snippet(id_snippet),
  FOREIGN KEY (id_categorie) REFERENCES categorie(id_categorie)
);
