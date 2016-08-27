# Base de données

[![Build Status](https://travis-ci.org/ed-search/database.svg?branch=master)](https://travis-ci.org/ed-search/database)


## Introduction

Ce dépôt contient la base de données des articles des magazines des [Editions Diamonds](https://boutique.ed-diamond.com/). Cette base de données est utilisée dans le moteur de recherche (@TODO : ajouter le lien).


## Installation

```
git clone git@github.com:ed-search/database.git ed-database
cd ed-database
npm install
sudo npm install -g gulp  # seulement si il n'est pas encore présent sur votre système
gulp build
```

La base de données des articles devraient être compilées au format json dans le fichier `dist/articles.json`.


## Commandes

Les commandes sont des commandes `gulp` :

* `gulp validate` : valide le format des données dans le dossier data
* `gulp build` : valide et construit le fichier `dist/articles.json`


## Format de la base

### Structures des dossiers

Le dossier `data` contient un dossier par type de publication :

* `glmf` : GNU Linux Magazine France
* `glmfhs` : GNU Linux Magazine France Hors Séries
* `lp` : Linux Pratique
* `lphs` : Linux Pratique Hors Séries
* `le` : Linux Essentiel
* `lehs` : Linux Essentiel Hors Séries
* `misc` : MISC
* `mischs` : MISC Hors Séries
* `os` : Open Silicium
* `hm` : Hackable Magazine

Dans ces dossiers, on retrouve 2 types de fichiers :

* YAML : un fichier par numéro de magazine
* JPG : un fichier par couverture de numéro de magazine

### Format du Fichier YAML

Chaque fichier représente un magazine. Il est nommé XXX.yml où XXX est le numéro du magazine (*Si le numéro est inférieur à 100, ajouter des 0 à gauche pour qu'il soit sur 3 chiffres*).

Il s'agit d'un fichier YAML composé de plusieurs documents séparés par `---`.

**Le premier document doit toujours contenir des informations générales sur ce numéro de magazine.**

Il est composé des attributs suivants :

* `date` : Date de sortie au format YYYY-MM-DD
* `displayed_date` : Date au format textuel (ex : Mars/Avril 2016)
* `shop` : lien vers la page boutique pour acheter ce numéro

Tous les autres documents représenteront un article du magazine. Ce n'est pas une contrainte mais il est recommandé de les saisir dans l'ordre dans lequel ils apparaissent dans le magazine.

Chaque article est composé des attributs suivants :

* `title` : le titre de l'article
* `author` : le nom de l'auteur de l'article
* `page` : numéro de la première page de l'article
* `keywords` : un tableau de mots clés représentant l'article. utile pour faire référence à une notion importante de l'article dont le terme n'est pas présent ni dans la description ni dans le titre.
* `description` : le texte chapeau de l'article

Exemple d'un tel fichier pour Linux Pratique n°95 :

``` yml
---
date: 2016-05-01
displayed_date: Mai/Juin 2016
shop: https://boutique.ed-diamond.com/linux-pratique/938-linux-pratique-95.html

---
title: Jouez à l'architecte avec Sweet Home 3D
author: Stéphane Mourey
page: 8
keywords:
  - software
description: >
  En février, sortait la version 5.2 de Sweet Home 3D. Voici l'occasion de revenir sur ce logiciel
  à la fois ludique et utile, dont chacun de nous peut avoir besoin. Sweet Home 3D se présente en effet
  comme un "logiciel d'aménagement d'intérieur", mais en réalité ses possibilités sont si vastes que
  vous pourriez vous prendre pour un véritable architecte
```

### Format du Fichier JPG

Chaque fichier représente la couverture d'un magazine. Il est nommé XXX.jpg où XXX est le numéro du magazine (*Si le numéro est inférieur à 100, ajouter des 0 à gauche pour qu'il soit sur 3 chiffres*).

Les couvertures doivent être au format **450x600**. En règle générale, utiliser l'image de couverture dans la liseuse sur la page boutique.

## Développement

Un server de développement est disponible pour servir le contenu du dossier dist et être utilisé avec la partie web du projet.

Le lancer avec la commande :

```
gulp serve --host=localhost --port=8000
```

Paramètres :

* `host` (default: *localhost*) : l'adresse à laquelle le serveur va écouter
* `port` (default: *8000*) : le port sur lequel le serveur va écouter
