const Countries = ({ results }) => {
  console.log(results);
  if (results.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (results.length > 1) {
    const names = results.map((r) => r.name.common);
    return (
      <div>
        {names.map((n) => {
          return (
            <>
              {n}
              <br />
            </>
          );
        })}
      </div>
    );
  } else if (results.length === 1) {
    const country = results[0];
    const languages = Object.values(country.languages);
    console.log("country", country);
    console.log(Object.values(country.languages));
    return (
      <>
        <h2>{country.name.common}</h2>
        capital {country.capital[0]}
        <br />
        area {country.area}
        <br />
        <h3>languages</h3>
        <ul>
          {languages.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <img
          src={country.flags.png}
          alt={`the flag of ${country.name.common}`}
        />
      </>
    );
  }
};

export default Countries;
