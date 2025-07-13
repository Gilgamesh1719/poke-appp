<template>
  <div class="pokemon-details">
    <div class="header">
      <h2>Выбранный покемон</h2>
    </div>
    
    <div class="content-wrapper">
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <span>Загрузка деталей</span>
      </div>
      
      <div v-else-if="error" class="error-state">
        {{ error }}
      </div>
      
      <transition-group 
        v-else-if="selectedPokemons.length > 0" 
        name="pokemon-card" 
        tag="div" 
        class="pokemon-grid"
      >
        <div 
          v-for="pokemon in selectedPokemons" 
          :key="pokemon.name" 
          class="pokemon-card"
        >
          <button @click="removePokemon(pokemon.name)" class="close-btn">
            ×
          </button>
          
          <div class="image-container">
            <img 
              :src="pokemon.image || 'https://via.placeholder.com/300?text=Pokemon'" 
              :alt="pokemon.name" 
              class="pokemon-image"
              @error="handleImageError"
            />
          </div>
          
          <div class="card-content">
            <h3>{{ capitalizeFirstLetter(pokemon.name) }}</h3>
            
            <div class="stats">
              <div class="stat-row">
                <span class="stat-label">Height:</span>
                <span class="stat-value">{{ formatHeight(pokemon.height) }}</span>
              </div>
              
              <div class="stat-row">
                <span class="stat-label">Weight:</span>
                <span class="stat-value">{{ formatWeight(pokemon.weight) }}</span>
              </div>
              
              <div class="abilities">
                <span class="stat-label">Abilities:</span>
                <div class="ability-tags">
                  <span 
                    v-for="(ability, index) in pokemon.abilities" 
                    :key="index" 
                    class="ability-tag"
                  >
                    {{ capitalizeFirstLetter(ability) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
      
      <div v-else class="empty-state">
        No Pokemon selected
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    
    const selectedPokemons = computed(() => store.state.selectedPokemons || [])
    const loading = computed(() => store.state.loading || false)
    const error = computed(() => store.state.error || null)
    
    const removePokemon = (name) => {
      store.commit('REMOVE_POKEMON', name)
    }
    
    const handleImageError = (event) => {
      event.target.src = 'https://via.placeholder.com/300?text=Pokemon'
    }
    
    const capitalizeFirstLetter = (string) => {
      return string ? string.charAt(0).toUpperCase() + string.slice(1) : ''
    }
    
    const formatHeight = (height) => {
      return height ? `${(height / 10).toFixed(1)} m` : 'N/A'
    }
    
    const formatWeight = (weight) => {
      return weight ? `${(weight / 10).toFixed(1)} kg` : 'N/A'
    }
    
    return {
      selectedPokemons,
      loading,
      error,
      removePokemon,
      handleImageError,
      capitalizeFirstLetter,
      formatHeight,
      formatWeight
    }
  }
}
</script>

<style scoped>
.pokemon-details {
  height: 100vh;
  width: 400px;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  padding: 0;
  font-family: 'Arial', sans-serif;
  background: #f8fafc;
  border-left: 1px solid #e2e8f0;
  overflow: hidden;
}
.header {
  padding: 20px;
  background: white;
  position: sticky;
  top: 0;
  z-index: 2;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}


h2 {
  font-size: 1.5rem;
  color: #1e3a8a;
  margin: 0;
  text-align: center;
  font-weight: 600;
}
.content-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 0 16px; 
  box-sizing: border-box; 
}


.pokemon-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  width: 100%;
  padding: 16px 0; 
  margin: 0;
}
.pokemon-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid #e2e8f0;
  position: relative;
  width: calc(100% - 1px);
  box-sizing: border-box; 
}


.pokemon-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.image-container {
  width: 100%;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #f0f4f8, #e0e8f0);
  padding: 20px;
}

.pokemon-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.card-content {
  padding: 18px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

h3 {
  margin: 0 0 16px;
  font-size: 1.3rem;
  color: #1e3a8a;
  text-align: center;
  font-weight: 500;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f4f8;
}

.stat-label {
  font-weight: 600;
  color: #1e3a8a;
  font-size: 0.95rem;
}

.stat-value {
  color: #1e40af;
  font-size: 0.95rem;
}

.abilities {
  margin-top: 16px;
}

.ability-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.ability-tag {
  background: #e0f2fe;
  color: #0369a1;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  font-size: 1.2rem;
  color: #64748b;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #f8fafc;
  color: #1e3a8a;
  transform: scale(1.1);
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 12px;
  color: #1e3a8a;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.error-state {
  padding: 20px;
  background: #fee2e2;
  border-radius: 8px;
  color: #dc2626;
  text-align: center;
  margin: 20px;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #64748b;
  font-size: 1.1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.pokemon-card-enter-active,
.pokemon-card-leave-active {
  transition: all 0.3s ease;
}

.pokemon-card-enter-from,
.pokemon-card-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>