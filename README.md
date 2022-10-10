# Site Forum By INSA

Ce repository contient le code source du site de [Forum By
INSA](https://forumbyinsa.fr/). Basé sur cette
[template](https://github.com/rosstopping/tailwindcss-templates/blob/master/layouts/foundation.html),
il utilise le générateur de site statique [Hugo](https://gohugo.io/) et
[Tailwind](https://tailwindcss.com/).

### Table des matières

- [Edition depuis Github](#edition-depuis-github)
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

Les fichiers contenant le contenu des pages sont situés dans le répertoire `content`. Chaque page a un dossier contenant un fichier `index.XX.md` par traduction. Par exemple, la page décrivant l'événement est associé à deux fichiers : `/content/event/index.fr.md` (français) et `/content/event/index.en.md (anglais).

Le contenu de ces fichiers sont essentiellement du [Markdown](https://www.markdownguide.org/cheat-sheet).

Chaque fichier de contenu débute par un en-tête contenant quelques méta-données, dont le titre de la page.

![image](https://user-images.githubusercontent.com/23584745/194870394-531ad574-6ec3-4555-96cf-4b8d9a984f0e.png)

### Shortcodes

Les shortcodes permettent de formatter simplement du contenu (texte, images) en HTML adapté au thème du site.

#### centre
Par exemple, `centre` affiche un titre et (optionnelement) du texte au milieu de la page.

```
{{< centre "Déroulé de l'événement" >}}

Cette année, différentes activités vous seront proposées lors du Forum By INSA
tout au long du 25 octobre. Vous pourrez alors vous intéresser aux différents
ateliers, conférences et tables rondes qui rythmeront cette journée. Pour
comprendre le but de chacune d'elles, voici un résumé rapide de ce qui vous
attend.

{{</ centre >}}
```

Devient 

![image](https://user-images.githubusercontent.com/23584745/194871005-e8f0a7d7-7d7d-4848-851a-dbbff7bd44fd.png)

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

Les shortcodes peuvent être mis à jour dans `/layouts/shortcodes`.
Voir la [documentation](https://gohugo.io/templates/shortcode-templates/).


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
