import { useState, useEffect } from "react";

const StarWars1 = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [characterDetails, setCharacterDetails] = useState({
    films: [],
    vehicles: [],
  });

  useEffect(() => {
    // Fetching list of characters
    const fetchCharacters = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/people/");
        const data = await response.json();
        setCharacters(data.results); // Store the characters in state
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, []);

  const handleCharacterChange = async (event) => {
    const characterId = event.target.value;
    setSelectedCharacter(characterId);

    if (characterId) {
      try {
        const response = await fetch(
          `https://swapi.dev/api/people/${characterId}/`
        );
        const data = await response.json();

        // Fetch films and vehicles for the selected character
        const filmPromises = data.films.map((url) =>
          fetch(url).then((res) => res.json())
        );
        const films = await Promise.all(filmPromises);
        console.log(films);

        const vehiclePromises = data.vehicles.map((url) =>
          fetch(url).then((res) => res.json())
        );
        const vehicles = await Promise.all(vehiclePromises);

        setCharacterDetails({
          films,
          vehicles,
        });
      } catch (error) {
        console.error("Error fetching character details:", error);
      }
    }
  };

  return (
    <div>
      <h1>Star Wars Characters</h1>
      <select onChange={handleCharacterChange} value={selectedCharacter || ""}>
        <option value="" disabled>
          Select a character
        </option>
        {characters.map((character) => (
          <option
            key={character.url}
            value={character.url.split("/").filter(Boolean).pop()}
          >
            {character.name}
          </option>
        ))}
      </select>

      {selectedCharacter && (
        <div>
          <h2>Character Details</h2>
          <table>
            <thead>
              <tr>
                <th>Films</th>
                <th>Vehicles</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <ul>
                    {characterDetails.films.map((film) => (
                      <li key={film.url}>{film.title}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul>
                    {characterDetails.vehicles.map((vehicle) => (
                      <li key={vehicle.url}>{vehicle.name}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StarWars1;
