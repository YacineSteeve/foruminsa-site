[![CI Pipeline](https://github.com/ForumbyINSA/foruminsa-site/actions/workflows/ci.yml/badge.svg)](https://github.com/ForumbyINSA/foruminsa-site/actions/workflows/ci.yml)

# Site du Forum By INSA

Bienvenue sur la documentation du code source du site du Forum By INSA.

## Table des matières

- [Introduction](#introduction)
- [Structure du projet](#structure-du-projet)
- [Infrastructure](#infrastructure)
- [Développement et maintenance](#développement-et-maintenance)
    - [Installation](#installation)
    - [Utilisation en local](#utilisation-en-local)
    - [Déploiement](#déploiement)
- [Procédures utiles](#procédures-utiles)
- [Ressources supplémentaires](#ressources-supplémentaires)

## Introduction

## Structure du projet

## Infrastructure

## Développement et maintenance

### Installation

> [!IMPORTANT]
>
>Pour être capable d'installer et d'utiliser convenablement l'application sur votre machine, vous devez avoir les 
>éléments suivants installés :
>
>- [Git](https://git-scm.com/downloads) (version 2.43.0 ou supérieure)
>- [Node.js](https://nodejs.org/fr/download) (version 22.19.0 ou supérieure)
>- [Yarn](https://yarnpkg.com) (version 1.22.22 ou supérieure)
>- Un éditeur de texte disposant de la coloration syntaxique et d'[IntelliSense](https://code.visualstudio.com/docs/editing/intellisense), 
>  tel que [Visual Studio Code](https://code.visualstudio.com/download) (recommandé) ou [WebStorm](https://www.jetbrains.com/fr-fr/webstorm).
>- Un navigateur web moderne (Google Chrome, Mozilla Firefox, Microsoft Edge, etc.)

1. Si vous n'avez pas encore le code source du projet sur votre machine, clonez le dépôt GitHub :

   ```bash
   git clone https://github.com/ForumbyINSA/foruminsa-site
   cd foruminsa-site
   ```

2. Configurez les variables d'environnement nécessaires à l'application. Pour cela :

    - Copiez le fichier `.env.example` et renommez la copie en `.env` :
    
      ```bash
      cp .env.example .env
      ```
    
    - Ouvrez le fichier `.env` dans votre éditeur de texte et modifiez les valeurs des variables d'environnement convenablement.

3. Installez les dépendances du projet avec Yarn :

   ```bash
   yarn install
   ```

4. Lancez l'application en mode développement :

   ```bash
   yarn dev
   ```

5. Ouvrez votre navigateur web et visualisez le site en accédant à l'adresse suivante : [http://localhost:3000](http://localhost:3000).

### Utilisation en local

#### A. Envoi des modifications sur le dépôt distant

#### B. Gestion des données des entreprises et du planning

Afin d'ajouter ou de modifier les données des entreprises ou du planning:

1. Rendez vous dans le dossier [`src/data`](src/data) (dont la structure est décrite dans la section 
[Structure du projet](#structure-du-projet)) et modifiez les fichiers correspondants. Enregistrez vos modifications.

2. Exécutez le script de vérification des données pour vous assurer qu'elles sont valides :

   ```bash
   yarn check-data
   ```

   Si des erreurs sont détectées, corrigez-les avant de continuer. Le script vous fournira des informations sur les 
   erreurs. Exécutez-le à nouveau et répétez ce cycle autant de fois que nécessaire jusqu'à ce qu'aucune erreur ne subsiste.

3. Vous pouvez maintenant mettre en ligne vos modifications en suivant la procédure décrite dans la section 
[Envoi des modifications sur le dépôt distant](#envoi-des-modifications-sur-le-dépôt-distant).

### Déploiement

[//]: # (Une fois les modifications )

## Procédures utiles

### Masquer ou afficher les données du bilan carbone

## Ressources supplémentaires
