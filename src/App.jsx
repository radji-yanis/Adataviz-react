import { useState, useEffect } from "react";
import { Card } from "./card.jsx";
import { SearchBar } from "./searchbar.jsx";
import { FiltresPrix } from "./FiltresPrix.jsx";

export const App = () => {
  const [donnees, setDonnees] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [nombresVisibles, setNombresVisibles] = useState(10);
  const [theme, setTheme] = useState("light");
  const [filtresPrix, setFiltresPrix] = useState([]);

  const donneesFiltrees = donnees.filter((item) => {
    const correspondRecherche = item.title
      .toLowerCase()
      .includes(recherche.toLowerCase());
    const correspondPrix =
      filtresPrix.length === 0 || filtresPrix.includes(item.price_type);
    return correspondRecherche && correspondPrix;
  });
  // divise le tableau donneesFiltrees
  const donneesAffichees = donneesFiltrees.slice(0, nombresVisibles);

  const chargerDonnees = async () => {
    try {
      const reponse = await fetch(
        "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20",
      );
      const resultat = await reponse.json();
      setDonnees(resultat.results);
    } catch (erreur) {
      console.error("Erreur de chargement :", erreur.message);
    }
  };
  useEffect(() => {
    chargerDonnees();
  }, []);

  //mode Sombre
  //permet de modifier la balise html en lui donnant l'attribut data-theme
  //et permettre ainsi le changement de theme a chaque click
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const gererFiltre = (valeur) => {
    if (filtresPrix.includes(valeur)) {
      setFiltresPrix(filtresPrix.filter((v) => v !== valeur));
    } else {
      setFiltresPrix([...filtresPrix, valeur]);
    }
  };

  return (
    <div className="app" data-theme={theme}>
      {" "}
      {/* mode sommbre */}
      <button
        className="btn-theme"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
      <h1> L'Agenda Parisien </h1>
      <SearchBar onRecherche={setRecherche} />
      <FiltresPrix filtresPrix={filtresPrix} gererFiltre={gererFiltre} />
      {donneesFiltrees.length === 0 && <p> Aucun evenement correspondant </p>}
      <p>{donneesFiltrees.length} résultats</p>
      <div className="grid">
        {donneesAffichees.map((item) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
      {nombresVisibles < donneesFiltrees.length && ( // "si la condition est vrai affiche le bouton ; sinon, n'affiche rien du tout".
        <button
          className="btn-voir-plus-global"
          onClick={() => setNombresVisibles(nombresVisibles + 10)}
        >
          Voir plus
        </button>
      )}
    </div>
  );
};
