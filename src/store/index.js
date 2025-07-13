import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    pokemonTypes: [],
    selectedPokemons: [], 
    error: null
  },
  mutations: {
    SET_POKEMON_TYPES(state, types) {
      state.pokemonTypes = types
    },
    ADD_SELECTED_POKEMON(state, pokemon) {
      if (!state.selectedPokemons.some(p => p.name === pokemon.name)) {
        state.selectedPokemons.push(pokemon)
      }
    },
    REMOVE_POKEMON(state, pokemonName) {
      state.selectedPokemons = state.selectedPokemons.filter(p => p.name !== pokemonName)
    },


    SET_LOADING(state, isLoading) {
      state.loading = isLoading
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    CLEAR_POKEMONS(state) {
      state.selectedPokemons = []
    },
  },
  actions: {
    async fetchPokemonTypes({ commit }) {
      try {
        commit('SET_LOADING', true)
        const response = await axios.get('https://pokeapi.co/api/v2/type')
        const types = response.data.results
        
        const typesWithPokemon = await Promise.all(
          types.map(async type => {
            const typeData = await axios.get(type.url)
            return {
              name: type.name,
              pokemons: typeData.data.pokemon.map(p => ({
                name: p.pokemon.name,
                url: p.pokemon.url
              }))
            }
          })
        )
        
        commit('SET_POKEMON_TYPES', typesWithPokemon)
      } catch (error) {
        commit('SET_ERROR', 'Failed to fetch Pokemon types')
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    async fetchPokemonDetails({ commit }, pokemonUrl) {
      try {
        commit('SET_LOADING', true)
        const response = await axios.get(pokemonUrl)
        const pokemonData = response.data
        
        const pokemon = {
          name: pokemonData.name,
          height: pokemonData.height,
          weight: pokemonData.weight,
          abilities: pokemonData.abilities.map(a => a.ability.name),
          image: pokemonData.sprites.other['official-artwork'].front_default,
          url: pokemonUrl
        }
        
        commit('ADD_SELECTED_POKEMON', pokemon)
      } catch (error) {
        commit('SET_ERROR', 'Failed to fetch Pokemon details')
      } finally {
        commit('SET_LOADING', false)
      }
    },
    
    removePokemon({ commit }, pokemonName) {
      commit('REMOVE_SELECTED_POKEMON', pokemonName)
    }
  }
})