import axios from 'axios';

export default {
  async fetchPokemonTypes({ commit }) {
    try {
      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');
      
      const response = await axios.get('https://pokeapi.co/api/v2/type');
      const types = response.data.results;
      
     
      const typesWithPokemon = await Promise.all(
        types.map(async type => {
          const typeData = await axios.get(type.url);
          return {
            name: type.name,
            pokemons: typeData.data.pokemon.map(p => ({
              name: p.pokemon.name,
              url: p.pokemon.url
            }))
          };
        })
      );
      
      commit('SET_POKEMON_TYPES', typesWithPokemon);
    } catch (error) {
      commit('SET_ERROR', 'Failed to fetch Pokemon types');
      console.error(error);
    } finally {
      commit('SET_LOADING', false);
    }
  },
  
  async fetchPokemonDetails({ commit }, pokemonUrl) {
    try {
      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');
      
      const response = await axios.get(pokemonUrl);
      const pokemonData = response.data;
      
      const pokemon = {
        name: pokemonData.name,
        height: pokemonData.height,
        weight: pokemonData.weight,
        abilities: pokemonData.abilities.map(a => a.ability.name),
        image: pokemonData.sprites.other['official-artwork'].front_default
      };
      
      commit('SET_SELECTED_POKEMON', pokemon);
    } catch (error) {
      commit('SET_ERROR', 'Failed to fetch Pokemon details');
      console.error(error);
    } finally {
      commit('SET_LOADING', false);
    }
  }
};