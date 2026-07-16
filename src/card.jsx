import { useState } from "react";

export const Card = ({ item }) => {
  const [estOuverte, setEstOuverte] = useState(false);

  return (
    <div className="card">
      <img className="card-image" src={item.cover_url} alt="" />
      <div className="card-body">
        <b className="card-tag-eyebrow">{item.qfap_tags}</b>
        <h2 className="card-title">{item.title}</h2>

        {/* details cachées */}
        <footer className={`card-details ${estOuverte ? "" : "cachee"}`}>
          <address>{item.address_name}</address>
          <p className="card-lead">{item.lead_text}</p>
        </footer>

        <span className={`tag ${item.price_type}`}>{item.price_type}</span>

        <button
          className="btn-voir-plus"
          onClick={() => setEstOuverte(!estOuverte)}
        >
          {estOuverte ? "voir moins" : "voir plus"}
        </button>
      </div>
    </div>
  );
};
