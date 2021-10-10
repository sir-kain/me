---
title: How you display an img today ?
description: This is a post on My Blog about touchpoints and circling wagons.
date: 2018-09-30
tags: second tag
layout: layouts/post.njk
---

https://sia.codes/posts/eleventy-and-cloudinary-images/

Tester les images d'un site
https://webspeedtest.cloudinary.com/

Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.

## Section Header

```html
<img src="myfile.jpg" />
```

Le code pour afficher une image sur un navigateur

Et ça peut finalement devenir comme ça |> pour des raisons d'accessibilité (11ty), de performance, ou de SEO

```html
<picture>
  <source
    type="image/avif"
    srcset="myfile_600.avif 600w, myfile_300.avif 300w"
    sizes="(min-width: 760px) 600px, 300px"
    alt="Image description"
    width="600"
    height="400"
    loading="lazy"
    style="width: 100%; height: auto"
  />
  <source
    type="image/webp"
    srcset="myfile_600.web 600w, myfile_300.web 300w"
    sizes="(min-width: 760px) 600px, 300px"
    alt="Image description"
    width="600"
    height="400"
    loading="lazy"
    style="width: 100%; height: auto"
  />

  <img
    src="myfile.jpg"
    srcset="myfile_600.jpg 600w, myfile_300.jpg 300w"
    sizes="(min-width: 760px) 600px, 300px"
    alt="Image description"
    width="600"
    height="400"
    loading="lazy"
    style="width: 100%; height: auto"
  />
</picture>
```

- `<picture> and <source>` [Perf]
Il est généralement utilisé pour distribuer le même contenu en utilisant les différents formats pris en charge par les différents navigateurs.
Privilégier le format webp ou avif qui sont plus performant mais aussi prevoir un fallback de format jpg

- "scrset" [Perf] pour definir une liste d'images pour que le navigateur puisse choisir l'image la mieux adaptée par rapport à sa viewport (mobile, tablette, ou desktop) ou même de la bande passante etc.

- "sizes" [Perf] permet de definir la taille d'image qui doit se charger par rapport à la largeur de l'ecran.

- "alt" [11ty & SEO] très important, à la fois pour l'accessibilité et le SEO

- "width" et "height" pour expliciter la taille de l'image, pour que le navigateur puisse reserver l'espace à l'image.
  Si définit, le navigateur n'aura pas à télécharger toute l'image pour enfin connaitre sa taille.
  Et ça evite les bizarreries avec le scrollbar (layout shift) au moment du chargement de l'image.
  Demo visuelle avec cette video https://youtu.be/4-d_SoCHeWE

- `style="width: 100%; height: auto"`
  Permet d'eviter le "layout shift" au resize de la page

- loading="lazy" [Perf] Permet de charger l'image que quand le scrooleur se rapproche de la zone de l'image
  Les navigateurs qui le supportent, utilisent l'api `IntersectionObserver` pour ce faire.

- decoding: "async" ??