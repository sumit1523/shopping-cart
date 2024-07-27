// src/Pokemon1.js
import { useState, useEffect } from "react";
import axios from "axios";
import PokemonDetails from "./PokemonDetails";

const Pokemon1 = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemonUrl, setSelectedPokemonUrl] = useState("");
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
    <div>
      <h1>Pokémon Dropdown</h1>
      <select onChange={handlePokemonChange}>
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
