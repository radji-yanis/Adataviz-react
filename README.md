# L'Agenda Parisien

Application React qui affiche les événements culturels parisiens à partir de l'API Open Data Paris.

Ce projet est la version React de mon Adataviz initialement développé en JavaScript vanilla.

## Fonctionnalités

- Récupération des événements via l'API [Open Data Paris](https://opendata.paris.fr/) (`que-faire-a-paris-`)
- Affichage des événements sous forme de cartes (image, titre, adresse, tarif, description)
- Recherche en direct par titre d'événement
- Filtres par tarif (gratuit / payant)
- Pagination "voir plus" (chargement progressif des résultats)
- Détails dépliables par carte ("voir plus" par événement)
- Mode sombre / clair
- Message d'information quand aucun événement ne correspond aux critères

## Stack technique

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- CSS avec variables personnalisées pour la gestion des thèmes clair/sombre
- API REST Open Data Paris (`fetch`)

## Structure du projet

```
src/
├── App.jsx          # Composant principal : state, fetch, filtres, pagination, thème
├── card.jsx          # Composant Card : affichage d'un événement
├── searchbar.jsx      # Composant SearchBar : champ de recherche
├── FiltresPrix.jsx   # Composant FiltresPrix : cases à cocher gratuit/payant
├── index.css          # Variables CSS et styles (thèmes clair/sombre inclus)
└── main.jsx           # Point d'entrée de l'application
```

## Installation

```bash
npm install
```

## Lancer le projet en développement

```bash
npm run dev
```

## Fonctionnement général

- `App.jsx` centralise tout l'état de l'application (`donnees`, `recherche`, `filtresPrix`, `nombresVisibles`, `theme`) et récupère les données via `useEffect` au chargement.
- Les données sont filtrées (recherche + tarif) puis découpées selon le nombre d'éléments actuellement visibles avant d'être transmises aux composants `Card`.
- Chaque composant enfant (`SearchBar`, `FiltresPrix`, `Card`) reçoit ses données et ses fonctions via des props, et remonte l'information au parent (`App`) via des callbacks.
- Le thème sombre/clair est appliqué sur la balise `<html>` via `document.documentElement.setAttribute("data-theme", theme)`, piloté par un `useEffect` dépendant de `theme`.

## Origine du projet

Version React d'un projet initialement réalisé en JavaScript vanilla (manipulation directe du DOM), dans le cadre de ma formation développeur web à Ada Tech School.
