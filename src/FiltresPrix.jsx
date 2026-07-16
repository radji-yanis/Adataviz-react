export const FiltresPrix = ({ filtresPrix, gererFiltre }) => {
  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={filtresPrix.includes("gratuit")}
          onChange={() => gererFiltre("gratuit")}
        />
        Gratuit
      </label>

      <label>
        <input
          type="checkbox"
          checked={filtresPrix.includes("payant")}
          onChange={() => gererFiltre("payant")}
        />
        Payant
      </label>
    </>
  );
};
