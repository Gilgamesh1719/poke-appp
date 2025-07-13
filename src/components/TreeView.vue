<template>
  <div class="tree-view">
    <div class="header">
      <h2>Типы покемонов</h2>
    </div>
    
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      Загрузка...
    </div>
    
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <div v-else class="types-container" ref="typesContainer">
      <div v-for="type in pokemonTypes" :key="type.name" class="type-section">
        <div class="type-header" @click="toggleType(type.name)">
          <span class="type-name">{{ type.name }}</span>
          <span class="type-arrow">{{ isOpen(type.name) ? '▼' : '▶' }}</span>
        </div>
        
        <div v-show="isOpen(type.name)" class="pokemon-list">
          <div 
            v-for="pokemon in type.pokemons" 
            :key="pokemon.name"
            @click="handlePokemonClick(pokemon.url)"
            @dblclick.prevent="openPokemonExclusive(pokemon.url)"
            class="pokemon-item"
            :class="{ 'selected': isSelected(pokemon.url) }"
          >
            {{ pokemon.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const openTypes = ref(new Set())
    const clickTimeout = ref(null)
    const typesContainer = ref(null)
    
    store.dispatch('fetchPokemonTypes')
    
    const pokemonTypes = computed(() => store.state.pokemonTypes)
    const loading = computed(() => store.state.loading)
    const error = computed(() => store.state.error)
    const selectedPokemons = computed(() => store.state.selectedPokemons)
    
    const toggleType = (typeName) => {
      if (openTypes.value.has(typeName)) {
        openTypes.value.delete(typeName)
      } else {
        openTypes.value.add(typeName)
      }
    }
    
    const isOpen = (typeName) => openTypes.value.has(typeName)
    
    const handlePokemonClick = (url) => {
      if (clickTimeout.value) {
        clearTimeout(clickTimeout.value)
        clickTimeout.value = null
        return
      }
      
      clickTimeout.value = setTimeout(() => {
        store.dispatch('fetchPokemonDetails', url)
        clickTimeout.value = null
      }, 200)
    }
    
    const openPokemonExclusive = async (url) => {
      if (clickTimeout.value) {
        clearTimeout(clickTimeout.value)
        clickTimeout.value = null
      }
      
      
      const scrollPosition = typesContainer.value.scrollTop
      
      await store.commit('CLEAR_POKEMONS')
      await store.dispatch('fetchPokemonDetails', url)
      
      
      requestAnimationFrame(() => {
        typesContainer.value.scrollTop = scrollPosition
      })
    }
    
    const isSelected = (url) => {
      return selectedPokemons.value.some(p => p.url === url)
    }
    
    return {
      pokemonTypes,
      loading,
      error,
      handlePokemonClick,
      openPokemonExclusive,
      isSelected,
      toggleType,
      isOpen,
      typesContainer
    }
  }
}
</script>

<style scoped>
.tree-view {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden; 
}

.header {
  padding: 20px 20px 10px;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
  flex-shrink: 0; 
}


h2 {
  font-family: 'Poppins', sans-serif;
  color: var(--dark-blue);
  margin: 0;
  font-size: 1.5rem;
}

.type-section {
  margin: 0 10px 10px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(30, 64, 175, 0.08);
  contain: content; 
}


.type-header {
  padding: 12px 15px;
  background-color: var(--light-blue);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  color: var(--dark-blue);
  transition: all 0.2s;
  border-radius: 12px;
}

.type-header:hover {
  background-color: #bfdbfe;
}

.type-name {
  text-transform: capitalize;
}

.type-arrow {
  font-size: 12px;
  color: var(--secondary-blue);
}

.pokemon-list {
  padding: 5px 0;
}

.pokemon-item {
  padding: 10px 20px;
  margin: 2px 10px;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: capitalize;
  border-radius: 8px;
}

.pokemon-item:hover {
  background: #bfdbfe;
}

.pokemon-item.selected {
  background: var(--secondary-blue);
  color: white;
  font-weight: 500;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  color: var(--dark-blue);
  gap: 10px;
}

.spinner {
  width: 30px;
  height: 30px;
  border: 3px solid var(--light-blue);
  border-top-color: var(--secondary-blue);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error {
  color: #ef4444;
  padding: 15px;
  background: #fee2e2;
  border-radius: 12px;
  margin: 10px;
}
.types-container {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px 0;
  contain: strict; 
}
;

</style>