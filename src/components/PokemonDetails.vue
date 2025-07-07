<template>
    <div class="pokemon-details">
      <h2 class="section-header">Характеристики</h2>
      <div class="scrollable-area">
        <div v-if="loading" class="loading">Загрузка...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else-if="selectedPokemon" class="details-content">
          <img :src="selectedPokemon.image" :alt="selectedPokemon.name" class="pokemon-image">
          <div class="stats">
            <p><strong>Рост:</strong> {{ selectedPokemon.height / 10 }} m</p>
            <p><strong>Вес:</strong> {{ selectedPokemon.weight / 10 }} kg</p>
            <div class="abilities">
              <strong>Способности:</strong>
              <ul>
                <li v-for="ability in selectedPokemon.abilities" :key="ability">{{ ability }}</li>
              </ul>
            </div>
          </div>
        </div>
        <div v-else class="placeholder">
          Выберете покемона
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    setup() {
      const store = useStore();
      
      const selectedPokemon = computed(() => store.state.selectedPokemon);
      const loading = computed(() => store.state.loading);
      const error = computed(() => store.state.error);
      
      return {
        selectedPokemon,
        loading,
        error
      };
    }
  };
  </script>
  
  <style scoped>
  .pokemon-details {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .details-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .pokemon-image {
    width: 200px;
    height: 200px;
    object-fit: contain;
    background-color: white;
    border-radius: 12px;
    padding: 10px;
    margin: 0 auto;
    box-shadow: 
      inset -2px -2px 8px rgba(255, 255, 255, 0.6),
      inset 2px 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .stats {
    background-color: #e0f7fa;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 
      inset -4px -4px 10px rgba(255, 255, 255, 0.6),
      inset 4px 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .stats p {
    margin: 8px 0;
    font-size: 16px;
    color: #555;
  }
  
  .stats strong {
    color: #333;
    font-weight: 600;
  }
  
  .abilities {
    margin-top: 15px;
  }
  
  .abilities ul {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 8px;
    list-style-type: none;
    padding-left: 0;
  }
  
  .abilities li {
    padding: 6px 12px;
    background-color: #89c4f4;
    color: white;
    border-radius: 16px;
    font-size: 14px;
    font-weight: 500;
    text-transform: capitalize;
  }
  
  .placeholder {
    color: #6c757d;
    font-style: italic;
    text-align: center;
    padding: 20px;
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