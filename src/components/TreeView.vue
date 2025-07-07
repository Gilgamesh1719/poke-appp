<template>
    <div class="tree-view">
      <h2 class="section-header">Тип покемона</h2>
      <div class="scrollable-area">
        <div v-if="loading" class="loading">Загрузка...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <ul v-else>
          <li v-for="type in pokemonTypes" :key="type.name">
            <details>
              <summary>{{ type.name }}</summary>
              <ul class="pokemon-list">
                <li 
                  v-for="pokemon in type.pokemons" 
                  :key="pokemon.name"
                  @click="selectPokemon(pokemon.url)"
                  class="pokemon-item"
                >
                  {{ pokemon.name }}
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    setup() {
      const store = useStore();
      store.dispatch('fetchPokemonTypes');
      
      const pokemonTypes = computed(() => store.state.pokemonTypes);
      const loading = computed(() => store.state.loading);
      const error = computed(() => store.state.error);
      
      const selectPokemon = (url) => {
        store.dispatch('fetchPokemonDetails', url);
      };
      
      return {
        pokemonTypes,
        loading,
        error,
        selectPokemon
      };
    }
  };
  </script>
  
  <style scoped>
  .tree-view {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .pokemon-list {
    max-height: 300px;
    overflow-y: auto;
    margin-top: 8px;
    padding-left: 15px;
  }
  
  details {
    margin-bottom: 12px;
    padding: 10px;
    background-color: #f8f9fa;
    border-radius: 8px;
    transition: all 0.3s ease;
  }
  
  details:hover {
    background-color: #e9ecef;
  }
  
  summary {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    cursor: pointer;
    outline: none;
  }
  
  .pokemon-item {
    padding: 8px 12px;
    margin: 4px 0;
    background-color: #89c4f4;
    border-radius: 6px;
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    text-transform: capitalize;
  }
  
  .pokemon-item:hover {
    background-color: #6baed6;
    transform: scale(1.02);
  }
  
  .loading {
    color: #555;
    font-style: italic;
    padding: 10px;
  }
  
  .error {
    color: #dc3545;
    padding: 10px;
    background-color: #f8d7da;
    border-radius: 6px;
  }
  </style>