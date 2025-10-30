1 Create Table user(
  id_user SERIAL ,
  name Varchar(50) not null
  email Varchar(320) Not Null,
  password_hash(320) Not Null,
  created_at Date,
  Primary key(id_user)
  Unique(name)
  Unique(email)
);

2 Create Table language_(
  id_language Serial,
  name Varchar(50) not null,
  Primary key(id_language),
  Unique(name)
);

3 Create Table categories(
  id_categories Serial,
  name Vaarchar (50) not null UNIQUE
  primary key(id_categories)
)


4 Create table snippet(
  id_snippet Serial,
  Titre varchar(100) not null,
  snippet Varchar(500) not null,
  created_at Date not null,
  id_user int not null,
  id_language int not null,
  primary key(id_snippet),
  foreign key(id_user) REGERENCES user(id_user)
  foreign key(id_language_) REGERENCES language (id_language)
)

5 create table comment(
  id_comment serial,
text Varchar(500) not null,
date_published Date not null,
  id_user integer not null,
  id_snippet integer not null,
  primary key(id_comment),
  foreign key(id_user) References user_(Id_user),
  foreign key(id_snippet) References snippet(id_snippet)
);

6 create Table token(
  id_token Serial,
value_jeton Varchar(320) not null,
  id_user integer not null,
  primary key(id_token),
  Unique(value_jeton),
  foreign key(id_user)References user_(id_user)
)

7 create table add_like(
  id_user Int,
  id_snippet Int,
  Primary Key(id_user,id snippet),
  Foreign key(id_user)References user(id_user),
  Foreign key(id_snippet)References snippet(id_snippet),
)

8 create table precise(
  id_snippet int,
  id_categories int,
  primary key(id_snippet,id_categories)
  foreign key(id_snippet)References snippet(id_snippet),
  foreign key(id_categories)References categories(id_categories),

)