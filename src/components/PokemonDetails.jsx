import "./PokemonDetails.css";

const PokemonDetails = ({ details }) => {
  if (!details) {
    return null;
  }

  return (
    <div className="pokemon-details">
      <h2>{details.name}</h2>
      <p>Height: {details.height}</p>
      <p>Weight: {details.weight}</p>
      <h3>Abilities:</h3>
      <ul>
        {details.abilities.map((ability) => (
          <li key={ability.ability.name}>{ability.ability.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonDetails;
