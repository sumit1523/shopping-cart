import { useState, useEffect } from "react";
import axios from "axios";
import PokemonDetails from "./PokemonDetails";

const Pokemon1 = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [, setSelectedPokemonUrl] = useState("");
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [cachedPokemonDetails, setCachedPokemonDetails] = useState({});

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=100"
        );
        setPokemonList(response.data.results);
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      }
    };

    fetchPokemonList();
  }, []);

  const handlePokemonChange = async (event) => {
    const url = event.target.value;
    setSelectedPokemonUrl(url);

    if (cachedPokemonDetails[url]) {
      setPokemonDetails(cachedPokemonDetails[url]);
      return;
    }

    try {
      const response = await axios.get(url);
      const details = response.data;
      setPokemonDetails(details);
      setCachedPokemonDetails((prevDetails) => ({
        ...prevDetails,
        [url]: details,
      }));
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "lightblue",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
      }}
    >
      <h1 style={{ color: "purple", textAlign: "center" }}>Pokémon Dropdown</h1>
      <select
        onChange={handlePokemonChange}
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid purple",
        }}
      >
        <option value="">Select a Pokémon</option>
        {pokemonList.map((pokemon) => (
          <option key={pokemon.name} value={pokemon.url}>
            {pokemon.name}
          </option>
        ))}
      </select>
      {pokemonDetails && <PokemonDetails details={pokemonDetails} />}
    </div>
  );
};

export default Pokemon1;
