# Site Forum By INSA

Ce repository contient le code source du site de [Forum By
INSA](https://forumbyinsa.fr/). Basé sur cette
[template](https://github.com/rosstopping/tailwindcss-templates/blob/master/layouts/foundation.html),
il utilise le générateur de site statique [Hugo](https://gohugo.io/) et
[Tailwind](https://tailwindcss.com/).

### Table des matières

- [Edition depuis Github](#edition-depuis-github)
- [Edition du contenu](#edition-du-contenu)
  - [Shortcodes](#shortcodes)
  - [Images](#images)
- [Déploiement](#déploiement)
- [Modifier les identifiants de connexion ovh](#modifier-les-identifiants-de-connexion-ovh)
- [Installation et compilation locale](#installation-et-compilation-locale)

## Edition depuis Github

Il est possible de modifier les fichiers directement depuis Github. Il faut ouvrir [Github.dev](https://github.dev/ForumbyINSA/foruminsa-site).

Lorsque l'on modifie un fichier, un badge bleu apparait à gauche. 

![image](https://user-images.githubusercontent.com/23584745/194866904-fd86ee00-a86f-43af-9c51-0ee26913fb68.png)

En appuyant sur le `+`, on indique que l'on veut prendre en compte cette modification lors du *commit*.

![image](https://user-images.githubusercontent.com/23584745/194867623-dfd6bb05-9252-4042-9a36-4ee94a78be4a.png)

Si on revient sur l'[historique des commits](https://github.com/ForumbyINSA/foruminsa-site/commits/main),
on constate bien que notre changement a été pris en compte.

![image](https://user-images.githubusercontent.com/23584745/194867911-b21b52b3-3db0-4527-af85-7bf1ef4f9631.png)


## Edition du contenu

Les fichiers contenant le contenu des pages sont situés dans le répertoire `content`. Chaque page a un dossier contenant un fichier `index.XX.md` par traduction. Par exemple, la page décrivant l'événement est associé à deux fichiers : `/content/event/index.fr.md` (français) et `/content/event/index.en.md` (anglais).

Le contenu de ces fichiers sont essentiellement du [Markdown](https://www.markdownguide.org/cheat-sheet).

Chaque fichier de contenu débute par un en-tête contenant quelques méta-données, dont le titre de la page.

![image](https://user-images.githubusercontent.com/23584745/194870394-531ad574-6ec3-4555-96cf-4b8d9a984f0e.png)

### Shortcodes

Les shortcodes permettent de formatter simplement du contenu (texte, images) en HTML adapté au thème du site.

#### centre
Par exemple, `centre` affiche un titre et (optionnelement) du texte au milieu de la page.

```
{{< centre "Déroulé de l'événement" "deroule" >}}

Cette année, différentes activités vous seront proposées lors du Forum By INSA
tout au long du 25 octobre. Vous pourrez alors vous intéresser aux différents
ateliers, conférences et tables rondes qui rythmeront cette journée. Pour
comprendre le but de chacune d'elles, voici un résumé rapide de ce qui vous
attend.

{{</ centre >}}
```

Devient 

![image](https://user-images.githubusercontent.com/23584745/194871005-e8f0a7d7-7d7d-4848-851a-dbbff7bd44fd.png)

Le `"deroule"` correspond à l'`id` du tag. On peut ensuite y référer avec un
lien : `[Lien vers la partie de déroulé](#deroule)`.

`{{< centre "Ateliers" />}}` devient

![image](https://user-images.githubusercontent.com/23584745/194871544-f25a5c3d-cd3d-4d5f-bb45-d1c40c257056.png)

#### Shortcodes à plusieurs paramètres

D'autres shortcodes plus compliqués nécessitent plusieurs paramètres. Dans l'exemple ci-dessous, `src1` et `src2` désignent l'url des images. `link` désigne l'url cible du bouton "en savoir plus".

```
{{< paragraph-with-2-images-right 
    title="L'événement"
    src1="https://images.unsplash.com/photo..."
    src2="https://images.unsplash.com/photo..."
    link="event">}}

Une journée de rencontre et de discussion entre les élèves de l’INSA Toulouse
et les recruteurs. Avec plus de 50 entreprises présentes, le Forum by INSA
2022 réunit, au sein du campus, les recruteurs d’aujourd’hui et les ingénieurs
de demain. 

{{</paragraph-with-2-images-right >}}
```

![image](https://user-images.githubusercontent.com/23584745/194872782-390c807e-e5bb-4693-9444-291d14dcd30a.png)

#### Liste des shortcodes existants

- centre
- link-button
- news
- paragraph-with-2-images-left
- paragraph-with-2-images-right
- paragraph-with-image-left
- paragraph-with-image-right
- photo-section

Les shortcodes peuvent être mis à jour dans `/layouts/shortcodes`.
Voir la [documentation](https://gohugo.io/templates/shortcode-templates/).

### Images

Il est nécessaire de ne pas inclure d'url d'images d'autres sites (tels que
unsplash) mais plutôt de les mettre dans le répertoire `/assets/images` et
utiliser des liens de source relatifs :

```
{{< paragraph-with-image-right
    title="Conférences"
    src="/images/amphi.png">}}
...
{{</ paragraph-with-image-right >}}

```
ou
```
![amphis](/images/amphi.png)
```

Les images seront recompressées pour réduire leur taille et donc le temps de
changement (optimisation performance).
Learn more about hugo image compression [here](https://gohugo.io/content-management/image-processing/).

### La page de photos

La page photos utilise le shortcode `photo-section`. On y met ligne par ligne
le lien des photos dans `/assets/images`. Par exemple `images/landing.jpg`
correspond à `/assets/images/landing.jpg`.

```
{{< photo-section >}}
images/landing.jpg
images/conference.jpg
images/meeting-2.jpg
{{</ photo-section >}}
```

On peut éventuellement utiliser le shortcode `centre` pour mettre des titres et
des textes. On peut également mettre plusieurs `photo-section`.


## Déploiement

Le déploiement se fait avec les Github Actions (CI/CD). Lorque le code sur le repository est prêt à être
compilé et mis sur le serveur, on lance le *workflow* `deploy` depuis le tab *Actions* (sur la branche `main`):

![image](https://user-images.githubusercontent.com/23584745/194904471-9abd485e-abbc-416b-920a-c807e741d184.png)

Le *workflow* attend alors la validation d'un des comptes de confiance configurés lors de la
[configuration ovh](#modifier-les-identifiants-de-connexion-ovh) :

![image](https://user-images.githubusercontent.com/23584745/194905041-41e7928f-8ff4-4e9f-94d0-4f7f9587c58d.png)

![image](https://user-images.githubusercontent.com/23584745/194905148-c109fa92-8a6c-480c-81c9-35ba90af5c98.png)

![image](https://user-images.githubusercontent.com/23584745/194905228-778fee11-0577-433b-8a77-88beee0018c7.png)

Le workflow devrait alors s'exécuter.

![image](https://user-images.githubusercontent.com/23584745/194905564-fa899373-553d-4c0f-8223-a47628b9f38b.png)

Si le workflow échoue, c'est probablement dû à une erreur lors de la compilation Hugo. Il faut regarder les logs
et comprendre l'erreur.

![image](https://user-images.githubusercontent.com/23584745/194906009-2a0041fd-0470-4435-97c6-029e6be59d88.png)

Si la compilation échoue, le site ne sera pas actualisé.


# Modifier les identifiants de connexion ovh

On doit configurer l'environnement dans lequel le site sera compilé. On accède aux [paramètres](https://github.com/ForumbyINSA/foruminsa-site/settings/environments).

![image](https://user-images.githubusercontent.com/23584745/194877093-a9f38873-a1c1-46a1-88c2-e4d5a1c26c90.png)

Il est recommandé, pour des raisons de sécurité, de nécessiter la validation par un compte de confiance.

![image](https://user-images.githubusercontent.com/23584745/194877426-4277da67-be25-476c-a6bc-77b8d343cebb.png)

On limite son emploi à la branche principale (`main`).

![image](https://user-images.githubusercontent.com/23584745/194877611-23e5bf27-cf54-4af2-b9e4-0d6523d67ae9.png)

On configure ensuite les secrets :

- `OVH_HOSTING_USER` : le nom d'utilisateur d'accès ftp
- `OVH_HOSTING_PASSWORD` : le mot de passe correspondant
- `OVH_HOSTING_DOMAIN` : `ftp.clusterXXX.hosting.ovh.net`

![image](https://user-images.githubusercontent.com/23584745/194878243-decc1666-a914-4fd0-afe4-ae3adc309ab5.png)

Ne pas oublier de sauvegarder


## Installation et compilation locale

Suivre les [instructions d'installation
d'Hugo](https://gohugo.io/getting-started/installing/) puis [celles de
git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). Alternativement à `git` depuis la ligne de 
commande, [Github Desktop](https://desktop.github.com/) a une interface graphique et est sans
doute plus facile à prendre en mains.

Sur Windows, il peut être préférable de se déplacer dans le répertoire `C:\Hugo\Sites` :
```
dir C:\Hugo\Sites
```

La copie du repository peut ensuite se faire depuis la console de commande (ou depuis Github Desktop) avec
```
git clone https://github.com/ForumbyINSA/foruminsa-site.git
```

Ensuite on se déplace dans le répertoire nouvellement créé avec `cd
foruminsa-site` (Linux/MacOS) ou `dir foruminsa-site` (Windows). On peut alors
lancer hugo en mode développement :
```
hugo server
```

Le site devrait être accessible depuis
[http://localhost:1313/](http://localhost:1313/) dans le navigateur.

La compilation en mode production se fait avec :
```
hugo
```

Les fichiers devraient être dans le répertoire `public` et prêts à copier.
