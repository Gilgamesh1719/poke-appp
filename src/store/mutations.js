export default {
    SET_POKEMON_TYPES(state, types) {
      state.pokemonTypes = types;
    },
    
    SET_SELECTED_POKEMON(state, pokemon) {
      state.selectedPokemon = pokemon;
    },
    
    SET_LOADING(state, isLoading) {
      state.loading = isLoading;
    },
    
    SET_ERROR(state, error) {
      state.error = error;
    },
    
    CLEAR_ERROR(state) {
      state.error = null;
    }
  };