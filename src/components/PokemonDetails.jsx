import PropTypes from "prop-types";
import "./PokemonDetails.css";

const PokemonDetails = ({ details }) => {
  if (!details) {
    return null;
  }

  const { name, height, weight, abilities } = details;

  return (
    <div className="pokemon-details">
      <h2>{name}</h2>
      <p>Height: {height}</p>
      <p>Weight: {weight}</p>
      <h3>Abilities:</h3>
      <ul>
        {abilities &&
          abilities.map((ability) => (
            <li key={ability.ability.name}>{ability.ability.name}</li>
          ))}
      </ul>
    </div>
  );
};

PokemonDetails.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string,
    height: PropTypes.number,
    weight: PropTypes.number,
    abilities: PropTypes.arrayOf(
      PropTypes.shape({
        ability: PropTypes.shape({
          name: PropTypes.string,
        }),
      })
    ),
  }),
};

export default PokemonDetails;
